import sys

from PyQt5.QtCore import QUrl
from PyQt5.QtMultimedia import QMediaPlayer, QMediaContent
from PyQt5.QtWidgets import QApplication

from music.netease.api import Crawler
from music.ui import components

app = QApplication(sys.argv)
w = components.PlayBar()
# w = MyWidget.ProcessBar()
w.show()
a = Crawler()
w.set_song(a.search_songs("我好像在哪见过你",0,1)[0])
sys.exit(app.exec_())