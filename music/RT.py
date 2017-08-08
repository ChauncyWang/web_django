import sys
from PyQt5.QtWidgets import QApplication

from music.netease.api import NeteaseAPI
from music.qq.api import QQMusicAPI
from music.ui.components import *


def test():
    a = NeteaseAPI().search_albums('告白气球')
    for t in a:
        print(t)


def test1():
    s = NeteaseAPI()
    a = s.get_toplist()
    print(a[0]['toplist'][0]['name'])
    s.get_toplist_songs(a[0]['toplist'][0]['id'])


def test2():
    s = QQMusicAPI()
    a = s.search('告白气球', 0, 1)
    for t in a['data']['song']['list']:
        a = s.get_key(t['songmid'])


def test_time_label():
    app = QApplication(sys.argv)
    a = ProgressGroup()
    a.slot_total_time(1000000)
    a.slot_cur_time(100000)
    a.show()
    sys.exit(app.exec_())

test_time_label()