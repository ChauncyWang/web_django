class Song:
    """
    歌曲
    """
    def __init__(self, _id, name, alias, album):
        self.id = _id
        self.name = name
        self.alias = alias
        self.album = album


class Art:
    """
    艺术家，演唱者，歌手
    """
    def __init__(self, _id, name, alias):
        self.id = _id
        self.name = name
        self.alias = alias


class Album:
    """
    专辑
    """
    def __init__(self, _id, name, pic_url, pic_str, pic):
        self.id = _id
        self.name = name
        self.pic_url = pic_url
        self.pic_str = pic_str
        self.pic = pic


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
