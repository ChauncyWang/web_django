import os

from PyQt5 import QtWidgets
from PyQt5.QtCore import QFile, QTimer, QRect
from PyQt5.QtGui import QFont, QFontDatabase, QPainter, QColor
from PyQt5.QtWidgets import QLabel

"""
QFontDatabase.addApplicationFont(os.path.dirname(__file__) + '/res/font/fontawesome-webfont.ttf')
font = QFont("fontawesome", 10)
"""


class PlayBar(QtWidgets.QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.total_time = 5 * 60 * 1000 + 20 * 1000
        self.cur_time = 0
        self.setFixedSize(600, 40)
        self.l_w = self.r_w = self.v_w = 100
        self.i_w = self.i_h = self.l_h = self.v_h = self.r_h = self.height()
        self.t_h = 20
        self.t_w = 40
        self.bar_w = self.width() - (self.l_w + self.i_w + self.v_w + self.r_w)

        self.leftLabel = QLabel(self)
        self.leftLabel.setGeometry(self.l_w + self.i_w, self.i_h - self.t_h, self.t_w, self.t_h)
        self.leftLabel.setText('00:00')

        self.rightLabel = QLabel(self)
        self.rightLabel.setGeometry(self.l_w + self.i_w + self.bar_w-self.t_w, 20, 40, 20)
        m = self.total_time // 1000 // 60
        s = self.total_time // 1000 - m * 60
        self.rightLabel.setText("%02d:%02d" % (m, s))

        timer = QTimer(self)
        timer.setInterval(1000)
        timer.start()
        timer.timeout.connect(self.update_time)

    def update_time(self):
        m = self.cur_time // 1000 // 60
        s = self.cur_time // 1000 - m * 60
        self.leftLabel.setText("%02d:%02d" % (m, s))
        self.cur_time += 1000
        self.per = self.cur_time / self.total_time
        self.update()

    def paintEvent(self, event):
        painter = QPainter(self)
        base_color = QColor(0, 20, 20)
        in_color = QColor(255, 0, 0)
        out_color = QColor(255, 255, 255)
        painter.setBrush(base_color)
        rect = QRect(self.l_w + self.i_w + self.t_w + 7, self.i_h - 20 + 7, 300 - 7, 5)
        painter.drawRoundedRect(rect, 3, 3)
