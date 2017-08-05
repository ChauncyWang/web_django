import logging
import sys

import os

from PyQt5.QtCore import Qt, QAbstractItemModel
from PyQt5.QtGui import QFontDatabase, QStandardItemModel
from PyQt5.QtWidgets import QApplication, QLabel, QTableWidget, QTableWidgetItem, QWidget, QTableView

from music.netease.api import NeteaseAPI
from music.ui.components import PlayBar, TitleBar, MainWindow, SearchTable
from music.ui.util import Download, download
from music.ui import resource

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s')


app = QApplication(sys.argv)
# a = Crawler()
# play = PlayBar()
# play.show()
# play.set_song(a.search_songs("告白气球", 0, 1)[0])
a = MainWindow()
a.show()
qss = open(os.path.dirname(__file__) + "/ui/Default.qss", 'r').read()
app.setStyleSheet(qss)
sys.exit(app.exec_())
