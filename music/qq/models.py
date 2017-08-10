from music import *


class SearchType:
    """
    搜索的类型
    """
    song = 0
    album = 8
    lyric = 7
    mv = 12
    types = {song: '歌曲', album: '专辑', mv: 'MV', lyric: '歌词', }

    @staticmethod
    def str(t):
        return SearchType.types[t]


class QSong(Song):
    def __init__(self):
        self.id = None
        self.mid = None
        self.name = None
        self.dt = None
        self.action = None
        self.pay = None


class QArtist(Artist):
    def __init__(self):
        self.id = None
        self.mid = None
        self.name = None


class QArtists(Artists):
    def __init__(self):
        super().__init__()


class QAlbum(Album):
    def __init__(self):
        self.id = None
        self.mid = None
        self.name = None
