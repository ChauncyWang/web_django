from PyQt5 import QtWidgets
from PyQt5.QtGui import QFont, QFontDatabase
from PyQt5.QtWidgets import QLabel

from .res import res

class PlayBar(QtWidgets.QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.setFixedSize(800, 40)
        self.total_time = 5 * 60 * 1000 + 20 * 1000;
        self.cur_time = 0
        QFontDatabase.addApplicationFont('url(font:/font/fontawesome-webfont.ttf)')
        font = QFont("FontAwesome", 10)
        print(font.styleName())
        self.leftLabel = QLabel(self)
        self.leftLabel.setGeometry(0,0,40,40)
        self.leftLabel.setFont(font)
        self.leftLabel.setText("\uf04b")
        self.leftLabel.setText("\uf04b")