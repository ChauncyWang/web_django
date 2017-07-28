import os

import re

import requests
from PyQt5 import QtWidgets
from PyQt5.QtCore import QTimer, QRect, Qt, pyqtSignal, QObject, QUrl
from PyQt5.QtGui import QPainter, QColor, QFontDatabase, QFont, QPixmap
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtWidgets import QLabel, QWidget

from music.netease import NSong
from music.netease.api import Crawler

"""
QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
font = QFont("fontawesome", 10)
"""


class PlayBar(QtWidgets.QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.play_buttons = PlayButtons(self)
        self.process_bar = ProcessBar(self)
        self.song_info = QLabel(self)
        self.player = QMediaPlayer(self)
        self.cur_time = QLabel(self)
        self.total_time = QLabel(self)
        self.lyric = QLabel(self)
        self.img = QLabel(self)
        self.music = Crawler()
        self.lyrics = None
        self.lyric_index = 0
        self.song = None
        self.init()
        self.signal_slot()

    def init(self):
        """
        对子控件尽行相关的初始化
        """
        style = """
            PlayBar {background-color:#111111;}
            #lyric {color:green;}
            #cur_time,#total_time,#song_info {color:#AFAFAF;}
            #img {border-width:5px;border-style:double; border-color:#FFFFFF;}
        """
        self.play_buttons.setGeometry(0, 0, 180, 60)
        self.img.setGeometry(180, 0, 60, 60)
        self.img.setObjectName('img')
        self.song_info.setGeometry(250, 0, 200, 20)
        self.song_info.setObjectName('song_info')
        self.cur_time.setGeometry(250, 40, 40, 20)
        self.cur_time.setObjectName('cur_time')
        self.process_bar.setGeometry(300, 40, 390, 20)
        self.total_time.setGeometry(700, 40, 40, 20)
        self.total_time.setObjectName('total_time')
        self.lyric.setGeometry(400, 20, 180, 20)
        self.lyric.setObjectName("lyric")
        self.cur_time.setText("00:00")
        self.total_time.setText("00:00")
        self.setStyleSheet(style)

    def signal_slot(self):
        """
        进行槽和信号的链接
        """
        self.play_buttons.play.clicked.connect(self.play_pause)
        self.player.positionChanged.connect(self.update_position)
        self.process_bar.rate_changed.connect(self.set_position)

    def set_song(self, song):
        """
        设置 PlayBar 要播放的歌曲
        :param song: 歌曲
        """
        if isinstance(song, NSong):
            self.player.stop()
            self.song = song
            m = song.dt // 1000 // 60
            s = song.dt // 1000 - 60 * m
            self.total_time.setText("%02d:%02d" % (m, s))
            self.song_info.setText(song.name + "-" + song.artist[0].name)
            self.lyrics = self.music.get_song_lyric_by_id(self.song.id).split("\n")
            self.lyric_index = 0
            self.player.setMedia(QMediaContent(QUrl(song.url)))
            self.process_bar.loaded = False
            self.process_bar.rate = 0
            self.player.bufferStatusChanged.connect(self.update_load)
            self.player.play()
            pic = QPixmap()
            pic.loadFromData(requests.get(self.song.album.pic_url).content)
            self.img.setPixmap(pic)
            self.img.setScaledContents(True)

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
        ms = x - 1000 * 60 * m - 1000 * s

        while self.lyric_index < len(self.lyrics):
            line = self.lyrics[self.lyric_index]
            result = re.search(r'\[(\d*):(\d*).(\d*)]', line)
            if result is None:
                self.lyric_index += 1
            else:
                time = int(result.group(1)) * 1000 * 60 + int(result.group(2)) * 1000 + int(result.group(3))
                if time <= x:
                    line = line[line.index(']') + 1:]
                    self.lyric.setText(line)
                    self.lyric_index += 1
                else:
                    break

        self.cur_time.setText("%02d:%02d" % (m, s))
        self.process_bar.rate = x / self.song.dt
        self.update()

    def update_load(self, x):
        if self.player.state() == 1:
            if x == 100:
                self.process_bar.rate = 0
                self.process_bar.loaded = True
                self.player.bufferStatusChanged.disconnect(self.update_load)
            else:
                self.process_bar.rate = x / 100
                self.process_bar.update()

    def set_position(self, x):
        self.player.setPosition(x * self.song.dt)
        self.player.play()


class ProcessBar(QWidget):
    """
    进度条
    """
    # 进度条被鼠标点击、拖拽产生的信号
    click = pyqtSignal(float)
    rate_changed = pyqtSignal(float)
    # 进度点内圆半径
    in_radius = 3
    # 进度点外圆半径
    out_radius = 10

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

    def mousePressEvent(self, event):
        self.clicked = True
        self.update_rate(event)

    def mouseMoveEvent(self, event):
        if self.clicked:
            self.update_rate(event)

    def mouseReleaseEvent(self, QMouseEvent):
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
        in_color = QColor(255, 0, 0)
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


class PlayButtons(QWidget):
    style = "#left,#right {color:#AFAFAF;}" \
            "#play,#left:hover,#right:hover,#play:hover {color:#FFFFFF;}"

    def __init__(self, parent=None):
        super().__init__(parent)
        # http://www.bootcss.com/p/font-awesome/design.html
        QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
        self.left = self.new_label("left", '\uf048', 15)
        self.left.setGeometry(20, 10, 40, 40)
        self.play = self.new_label("play", '\uf04b', 24)
        self.play.setGeometry(65, 0, 60, 60)
        self.right = self.new_label("right", "\uf051", 15)
        self.right.setGeometry(120, 10, 40, 40)
        self.setStyleSheet(self.style)
        self.playing = True
        self.update()

    def new_label(self, name, text, size):
        """
        根据 label 的名字，文本，字体大小 生成一个带 点击信号的 QLabel
        :param name:label 的名字
        :param text:label 的文本
        :param size:label 的字体大小
        :return:一个带 点击信号的 QLabel
        """
        font = QFont("fontawesome", size)
        label = ClickLabel(self)
        label.setObjectName(name)
        label.setFont(font)
        label.setText(text)
        label.setAlignment(Qt.AlignCenter)
        return label


class ClickLabel(QLabel):
    """
    拥有点击事件信号的 QLabel,
    在 mousePressEvent 中发射信号
    """
    clicked = pyqtSignal()

    def __init__(self, parent=None):
        super().__init__(parent)

    def mousePressEvent(self, event):
        self.clicked.emit()
