import sys

from PyQt5.QtCore import QUrl
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtWidgets import QApplication

from music.netease.api import Crawler
from music.ui import components

app = QApplication(sys.argv)
w = components.PlayBar()
a = Crawler()
w.set_song(a.search_songs("九九八十一", 0, 1)[0])
# w = MyWidget.ProcessBar()
w.show()
sys.exit(app.exec_())
