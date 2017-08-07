import os
import re

from PyQt5.QtCore import QRect, Qt, pyqtSignal, QUrl, QRectF
from PyQt5.QtGui import QPainter, QColor, QFontDatabase, QFont, QPixmap, QPalette, QPen, QBrush, QPainterPath
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtWidgets import QLabel, QApplication, QLineEdit, QFrame, QMainWindow, QTableWidget, QTableWidgetItem, \
    QAbstractItemView, QComboBox, QSlider, QGraphicsDropShadowEffect

from music import Song
from music.netease.models import *
from music.netease.api import NeteaseAPI
from music.ui.util import download_mp3, download_img

"""
QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
font = QFont("fontawesome", 10)
"""


class MainWindow(QMainWindow):
    """
    主窗口
    """

    def __init__(self, parent=None):
        super(QMainWindow, self).__init__(parent)
        QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
        self.play_bar = PlayBar(self)
        self.title = TitleBar(self)
        self.left_frame = QFrame(self)
        self.music = NeteaseAPI()
        self.main_frame = SearchTable(self)
        self.main_frame.update_model()
        self.init()
        self.signal_slot()

    def init(self):
        self.setWindowFlags(Qt.FramelessWindowHint)
        self.setFixedSize(800, 600)
        self.title.setGeometry(0, 0, 800, 60)
        self.title.setObjectName("title_bar")
        self.left_frame.setGeometry(0, 60, 200, 460)
        self.left_frame.setObjectName("left_frame")
        self.main_frame.setGeometry(200, 60, 600, 460)
        self.main_frame.setObjectName("main_frame")
        self.play_bar.setGeometry(0, 540, 800, 60)
        self.play_bar.setObjectName("play_bar")
        self.setObjectName("main_window")

    def signal_slot(self):
        self.title.search_icon.clicked.connect(self.search_song)
        self.main_frame.play_song.connect(self.play_bar.set_song)

    def search_song(self):
        songs = self.music.search_songs(self.title.input.text(), 0, 20)
        self.main_frame.set_songs(songs)
        self.main_frame.update_model()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Return:
            self.search_song()


class PlayBar(QFrame):
    """
    音乐播放器下边的播放栏
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
        self.play_buttons = PlayButtons(self)
        self.process_bar = ProgressBar(self)
        self.song_info = QLabel(self)
        self.player = QMediaPlayer()
        self.cur_time = QLabel(self)
        self.total_time = QLabel(self)
        self.lyric = Lyric()
        self.quality = QComboBox(self)
        self.volume_icon = AwesomeLabel(self, 'volume_icon', '\uf027', 40)
        self.volume = QSlider(self)

        self.music = NeteaseAPI()
        self.img = QLabel(self)
        self.song = None
        self.init()
        self.signal_slot()

    def paintEvent(self, event):
        self.play_buttons.setGeometry(0, 0, 160, self.height())
        self.img.setGeometry(180, 0, 60, 60)
        self.song_info.setGeometry(250, 0, 200, 30)
        font = QFont()
        font.setPixelSize(12)
        self.cur_time.setGeometry(260, 30, 40, 10)
        self.cur_time.setFont(font)
        self.cur_time.setAlignment(Qt.AlignCenter)
        self.process_bar.setGeometry(300, 30, self.width() - 300 - 200 - 40, 10)
        self.total_time.setGeometry(self.width() - 200 - 40, 30, 40, 10)
        self.total_time.setFont(font)
        self.total_time.setAlignment(Qt.AlignCenter)
        self.volume_icon.setGeometry(self.width() - 200, 10, 40, 40)
        self.volume.setOrientation(Qt.Horizontal)
        self.volume.setGeometry(self.width() - 160, 10, 160, 40)
        self.quality.setGeometry(250, 40, 100, 20)

    def init(self):
        """
        对子控件进行相关的初始化
        """
        style = """
            PlayBar {background-color:#FFFFFF;}
            #cur_time,#total_time,#song_info {color:#AFAFAF;}
            #img {border-width:5px;border-style:double; border-color:#FFFFFF;}
        """
        self.img.setObjectName('img')
        self.song_info.setObjectName('song_info')
        self.cur_time.setObjectName('cur_time')
        self.total_time.setObjectName('total_time')
        font = QFont()
        font.setPixelSize(80)
        self.cur_time.setText("00:00")
        self.total_time.setText("00:00")

        self.quality.addItem("超高品质")
        self.quality.addItem("高品质")
        self.quality.addItem("标准")

        self.lyric.show()

        # self.setStyleSheet(style)

    def signal_slot(self):
        """
        进行信号和槽的链接
        """
        self.play_buttons.play.clicked.connect(self.play_pause)
        self.player.positionChanged.connect(self.update_position)
        self.process_bar.rate_changed.connect(self.set_position)
        self.volume.valueChanged.connect(self.player.setVolume)

    def set_song(self, song):
        """
        设置 PlayBar 要播放的歌曲
        :param song: 歌曲
        """
        if isinstance(song, NSong):
            self.player.stop()
            self.process_bar.loaded = False
            self.song = song
            m = song.dt // 1000 // 60
            s = song.dt // 1000 - 60 * m
            self.total_time.setText("%02d:%02d" % (m, s))
            self.song_info.setText(song.name + "-" + str(song.artists))
            self.lyric.set_lyrics(self.music.get_song_lyric(self.song.id))
            self.process_bar.rate = 0
            download_mp3(song.url, song.name, self.download_music_update, self.download_music_finished)
            download_img(song.album.pic_url, song.album.name, None, self.download_head_img_finished)
            self.player.play()
            self.update()

    def play_pause(self):
        """
        播放/暂停切换的槽
        """
        self.play_buttons.playing = not self.play_buttons.playing
        if self.play_buttons.playing:
            self.play_buttons.play.setText("\uf04b")
            self.player.play()
        else:
            self.play_buttons.play.setText("\uf04c")
            self.player.pause()
        self.update()

    def update_position(self, x):
        m = x // 1000 // 60
        s = x // 1000 - 60 * m
        self.cur_time.setText("%02d:%02d" % (m, s))
        self.process_bar.rate = x / self.song.dt
        self.lyric.update_lyric(x)
        self.update()

    def download_music_update(self, x):
        """
        歌曲下载过程的槽
        :param x: 下载百分比
        """
        self.process_bar.rate = x
        self.process_bar.update()

    def download_music_finished(self, file_name):
        """
        歌曲下载完成的槽
        :param file_name: 歌曲存储位置
        """
        self.player.setMedia(QMediaContent(QUrl.fromLocalFile(file_name)))
        self.process_bar.loaded = True
        self.player.play()

    def download_head_img_finished(self, file_name):
        """
        头像下载完成的槽
        :param file_name: 头像存储位置
        """
        pic = QPixmap()
        pic.loadFromData(open(file_name, 'rb').read())
        self.img.setPixmap(pic)
        self.img.setScaledContents(True)

    def set_position(self, x):
        self.player.setPosition(x * self.song.dt)
        self.player.play()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Space:
            self.play_pause()


class ProgressBar(QFrame):
    """
    进度条
    """
    # 进度条被鼠标点击、拖拽产生的信号
    click = pyqtSignal(float)
    rate_changed = pyqtSignal(float)
    # 进度点内圆半径
    in_radius = 1
    # 进度点外圆半径
    out_radius = 4

    # 进度拖动点击的信号
    def __init__(self, parent=None):
        """
        初始化
        :param parent: 父窗体
        """
        super().__init__(parent)
        # 是否鼠标点击了，拖拽事件时调用
        self.clicked = False
        # 当前进度
        self.rate = 0
        # 是否加载完成
        self.loaded = False

        self.setMouseTracking(True)

    def mousePressEvent(self, event):
        self.clicked = True
        self.update_rate(event)

    def mouseMoveEvent(self, event):
        if self.clicked:
            self.update_rate(event)

    def mouseReleaseEvent(self, event):
        self.clicked = False

    def update_rate(self, event):
        """
        更新进度比率
        :param event:鼠标点击事件的参数
        """
        x = event.x()
        if x > self.out_radius and self.loaded:
            if x < self.width() - self.out_radius:
                self.rate = (x - self.out_radius) / (self.width() - 2 * self.out_radius)
                self.click.emit(self.rate)
                self.rate_changed.emit(self.rate)
                self.update()

    def paintEvent(self, event):
        """
        重写绘制事件，自己绘图
        :param event: 绘图事件
        """
        painter = QPainter(self)
        painter.setRenderHint(QPainter.SmoothPixmapTransform)
        painter.setRenderHint(QPainter.Antialiasing)
        base_color = QColor(255, 255, 255)
        load_color = QColor(200, 200, 200)
        in_color = QColor(214, 124, 103)
        out_color = QColor(255, 255, 255)

        d_r = self.out_radius - self.in_radius
        w = self.width() - 2 * self.out_radius
        if self.loaded:
            # 绘制进度条基础
            painter.setPen(Qt.NoPen)
            painter.setBrush(load_color)
            rect = QRect(d_r, d_r, w + 2 * self.in_radius, self.in_radius * 2)
            painter.drawRoundedRect(rect, self.in_radius, self.in_radius)
            # 绘制进度条当前长度
            painter.setPen(Qt.NoPen)
            painter.setBrush(in_color)
            rect = QRect(d_r, d_r, w * self.rate + 2 * self.in_radius, self.in_radius * 2)
            painter.drawRoundedRect(rect, self.in_radius, self.in_radius)
            # 绘制进度条节点外圆
            painter.setPen(Qt.NoPen)
            painter.setBrush(out_color)
            painter.drawEllipse(w * self.rate, 0, 2 * self.out_radius, 2 * self.out_radius)
            # 绘制进度条节点内圆
            painter.setPen(Qt.NoPen)
            painter.setBrush(in_color)
            painter.drawEllipse(w * self.rate + d_r, d_r, 2 * self.in_radius, 2 * self.in_radius)
        else:
            # 绘制进度条基础
            painter.setPen(Qt.NoPen)
            painter.setBrush(base_color)
            rect = QRect(d_r, d_r, w + 2 * self.in_radius, self.in_radius * 2)
            painter.drawRoundedRect(rect, self.in_radius, self.in_radius)
            # 绘制加载进度条
            painter.setPen(Qt.NoPen)
            painter.setBrush(load_color)
            rect = QRect(d_r, d_r, w * self.rate + 2 * self.in_radius, self.in_radius * 2)
            painter.drawRoundedRect(rect, self.in_radius, self.in_radius)


class PlayButtons(QFrame):
    style = "#left,#right {color:#AFAFAF;}" \
            "#play,#left:hover,#right:hover,#play:hover {color:#FFFFFF;}"

    def __init__(self, parent=None):
        super().__init__(parent)
        # http://www.bootcss.com/p/font-awesome/design.html
        self.left = AwesomeLabel(self, "left", '\uf048', 15)
        self.left.setGeometry(20, 10, 40, 40)
        self.play = AwesomeLabel(self, "play", '\uf04b', 24)
        self.play.setGeometry(65, 0, 60, 60)
        self.right = AwesomeLabel(self, "right", "\uf051", 15)
        self.right.setGeometry(120, 10, 40, 40)
        self.setStyleSheet(self.style)
        self.playing = True
        self.update()


class TitleBar(QFrame):
    """
    标题栏
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        self.search_icon = AwesomeLabel(self, "search_icon", '\uf002', 40)
        self.input = QLineEdit(self)
        self.min_icon = AwesomeLabel(self, "minimum", '\uf068', 20)
        self.max_icon = AwesomeLabel(self, "maximum", '\uf067', 20)
        self.close_icon = AwesomeLabel(self, "close_icon", '\uf00d', 20)
        self.mouse_press_pos = None
        self.init()
        self.signal_slot()

    def init(self):
        self.setFixedSize(800, 60)
        self.input.setGeometry(100, 10, 200, 40)
        self.input.setStyleSheet("color:#FFFFFF;border:2px solid;border-radius:20px;"
                                 "background-color:#80808080;padding-left:10px;")
        self.search_icon.setGeometry(250, 10, 40, 40)
        self.search_icon.setStyleSheet("color:#FFFFFF")
        self.min_icon.setGeometry(self.width() - 60, 20, 20, 20)
        self.max_icon.setGeometry(self.width() - 40, 20, 20, 20)
        self.close_icon.setGeometry(self.width() - 20, 20, 20, 20)

    def signal_slot(self):
        self.close_icon.clicked.connect(QApplication.exit)

    def mousePressEvent(self, event):
        self.mouse_press_pos = event.pos()

    def mouseMoveEvent(self, event):
        x = event.pos().x() - self.mouse_press_pos.x() + self.parent().pos().x()
        y = event.pos().y() - self.mouse_press_pos.y() + self.parent().pos().y()
        self.parent().setGeometry(x, y, self.parent().width(), self.parent().height())


class ClickableLabel(QLabel):
    """
    拥有点击事件信号的 QLabel,
    在 mousePressEvent 中发射信号
    """
    clicked = pyqtSignal()
    send = pyqtSignal(str)

    def __init__(self, parent=None):
        super(QLabel, self).__init__(parent)

    def mousePressEvent(self, event):
        self.clicked.emit()
        self.send.emit(self.objectName())


class AwesomeLabel(ClickableLabel):
    """
    使用 awesome 图标字体的标签
    """
    font = QFont('fontawesome')

    def __init__(self, parent, obj_name, text, size):
        super(ClickableLabel, self).__init__(parent)
        self.setObjectName(obj_name)
        AwesomeLabel.font.setPixelSize(size)
        self.setFont(AwesomeLabel.font)
        self.setAlignment(Qt.AlignCenter)
        self.setText(text)


class SearchTable(QTableWidget):
    play_song = pyqtSignal(Song)

    def __init__(self, parent=None):
        super(QTableWidget, self).__init__(parent)
        self.songs = []
        self.verticalHeader().setVisible(False)
        self.setEditTriggers(QAbstractItemView.NoEditTriggers)
        # self.setSelectionBehavior(QAbstractItemView.SelectRows)

    def set_songs(self, songs):
        self.songs = songs
        self.update_model()

    def update_model(self):
        self.clear()
        self.setColumnCount(4)
        self.setRowCount(1 + len(self.songs))
        self.setHorizontalHeaderItem(0, QTableWidgetItem("歌曲"))
        self.setHorizontalHeaderItem(1, QTableWidgetItem("歌手"))
        self.setHorizontalHeaderItem(2, QTableWidgetItem("专辑"))
        self.setHorizontalHeaderItem(3, QTableWidgetItem("播放"))
        self.setColumnWidth(0, 100)
        self.setColumnWidth(1, 100)
        self.setColumnWidth(2, 100)
        self.setColumnWidth(3, 100)
        for i in range(0, len(self.songs)):
            self.setItem(i, 0, QTableWidgetItem(self.songs[i - 1].name))
            self.setItem(i, 1, QTableWidgetItem(str(self.songs[i - 1].artists)))
            self.setItem(i, 2, QTableWidgetItem(self.songs[i - 1].album.name))
            if self.songs[i - 1].url is not None:
                lab = AwesomeLabel(None, str(i - 1), "B", 15)
                self.setCellWidget(i, 3, lab)
                lab.send.connect(self.play_clicked)

    def play_clicked(self, name):
        self.play_song.emit(self.songs[int(name)])


class Lyric(QFrame):
    def __init__(self, parent=None):
        super(QFrame, self).__init__(parent)
        self.lyric = QLabel(self)
        self.lyric2 = QLabel(self)
        self.single_line = True
        self.lock = False
        self.enter = False
        self.press = False
        self.press_x = 0
        self.press_y = 0

        self.lyrics = None
        self.init()

    def init(self):
        self.setGeometry(400, 800, 800, 80)
        self.setObjectName('lyric_bar')
        self.setWindowFlags(Qt.SubWindow | Qt.Popup | Qt.FramelessWindowHint | Qt.WindowStaysOnTopHint)
        self.setAttribute(Qt.WA_TranslucentBackground, True)
        self.setMouseTracking(True)
        self.lyric.setObjectName('lyric')
        self.lyric2.setObjectName('lyric2')
        self.lyric2.hide()

    def set_lyrics(self, lyric):
        self.lyrics = lyric.split('\n')

    def update_lyric(self, x):
        lyric_index = 0
        while lyric_index < len(self.lyrics):
            line = self.lyrics[lyric_index]
            result = re.search(r'\[(\d*):(\d*).(\d*)]', line)
            if result is None:
                lyric_index += 1
            else:
                time = int(result.group(1)) * 1000 * 60 + int(result.group(2)) * 1000 + int(result.group(3))
                if time <= x + 0.2:
                    line = line[line.index(']') + 1:]
                    line2 = self.lyrics[lyric_index + 1]
                    line2 = line2[line2.index(']') + 1:]
                    if not self.single_line:
                        if lyric_index % 2 == 0:
                            self.lyric.setText(line)
                            self.lyric.setStyleSheet('color: #00FF80;')
                            self.lyric2.setText(line2)
                            self.lyric2.setStyleSheet('color: #FF0080;')
                        else:
                            self.lyric2.setText(line)
                            self.lyric2.setStyleSheet('color: #00FF80;')
                            self.lyric.setText(line2)
                            self.lyric.setStyleSheet('color: #FF0080;')

                        self.update()
                    else:
                        self.lyric.setText(line)
                    lyric_index += 1
                else:
                    break

    def paintEvent(self, event):
        p1 = 10
        p2 = 20
        if self.single_line:
            self.lyric.setGeometry(p1, p2, self.width() - 2 * p1, self.height() - p1 - p2)
            self.lyric.setAlignment(Qt.AlignCenter)
            self.lyric2.hide()
        else:
            w = self.width() - 2 * p1
            h = (self.height() - p1 - p2) / 2
            self.lyric.setGeometry(p1, p2, w, h)
            self.lyric.setAlignment(Qt.AlignLeft)
            self.lyric2.setGeometry(p1, p2 + h, w, h)
            self.lyric2.setAlignment(Qt.AlignRight)
            self.lyric2.show()
        font = QFont()
        font.setPixelSize(self.lyric.height() * 0.8)
        self.lyric.setFont(font)
        self.lyric2.setFont(font)

        if not self.lock:
            if self.enter:
                self.setCursor(Qt.OpenHandCursor)
                painter = QPainter(self)
                path = QPainterPath()
                rect = QRectF(0, 0, self.width(), self.height())
                path.addRoundedRect(rect, 10, 10)
                painter.fillPath(path, QColor(0, 0, 0, 55))
                pen = QPen()
                pen.setWidth(2)
                pen.setColor(QColor(255, 255, 255, 180))
                painter.setPen(pen)
                painter.drawRoundedRect(self.rect(), 10, 10)
                painter.drawRoundedRect(3, 3, self.width() - 6, self.height() - 6, 8, 8)

    def enterEvent(self, event):
        self.enter = True
        self.update()

    def leaveEvent(self, event):
        self.enter = False
        self.update()

    def resizeEvent(self, event):
        self.enter = True

    def mousePressEvent(self, event):
        self.press = True
        self.press_x = event.pos().x()
        self.press_y = event.pos().y()

    def mouseReleaseEvent(self, event):
        self.press = False

    def mouseMoveEvent(self, event):
        if self.press:
            dx = self.pos().x() + event.pos().x() - self.press_x
            dy = self.pos().y() + event.pos().y() - self.press_y
            self.setGeometry(dx, dy, self.width(), self.height())

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Space:
            self.single_line = not self.single_line
        self.update()
