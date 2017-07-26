from music import Song, Album, Artist, Quality


class NSong(Song):
    """
    网易歌曲信息
    """

    def __init__(self, dic):
        super().__init__()
        self.id = dic['id']
        self.name = dic['name']
        for i in dic['ar']:
            self.artist.append(NArtist(i))
        self.alias = dic['alia']
        self.album = NAlbum(dic['al'])
        self.mv = dic['mv']
        self.url = None

    def __str__(self):
        s = "  "
        for art in self.artist:
            s += art.name
        return "%s-%s\n%s\n%s\n" % (self.name,self.alias, s, self.album.name)


class NArtist(Artist):
    """
    网易歌手
    """

    def __init__(self, dic):
        super().__init__()
        self.id = dic['id']
        self.name = dic['name']
        self.alias = dic['alias']


class NAlbum(Album):
    """
    网易专辑
    """

    def __init__(self, dic):
        super().__init__()
        self.id = dic['id']
        self.name = dic['name']
        self.pic_url = dic['picUrl']
        self.pic = dic['pic']



class NQuality(Quality):
    """
    网易音乐质量
    """

    def __init__(self, dic):
        super().__init__()
        self.bit_rate = dic['br']
        self.size = dic['size']


class SearchType:
    """
    搜索的类型
    # 歌曲 1
    # 专辑 10
    # 歌手 100
    # 歌单 1000
    # 用户 1002
    # mv 1004
    # 歌词 1006
    # 主播电台 1009
    """
    song = 1
    album = 10
    singer = 100
    song_sheet = 1000
    user = 1002
    mv = 1004
    lyric = 1006
    radio_station = 1009
