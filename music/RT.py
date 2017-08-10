import logging
import sys

import requests
from PyQt5.QtWidgets import QApplication

from music.netease.api import NeteaseAPI
from music.qq.api import QQMusicAPI
from music.ui.components import *
from music.ui.util import download

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s (%(filename)s:%(lineno)d) [%(threadName)s]-[%(levelname)s]: %(message)s', )


def test():
    a = NeteaseAPI().search_songs('S.H.E')
    for t in a:
        print(t)


def test1():
    s = NeteaseAPI()
    a = s.get_toplist()
    print(a[0]['toplist'][0]['name'])
    s.get_toplist_songs(a[0]['toplist'][0]['id'])


def test2():
    s = QQMusicAPI()
    a = s.search_song('告白气球', 0, 1)
    for t in a:
        s.get_lyric(t.id, t.mid)


def test_time_label():
    app = QApplication(sys.argv)
    a = QMainWindow()
    b = VolumeButton(a)
    b.signal_volume_changed.connect(print)
    a.show()
    sys.exit(app.exec_())


test2()
