class Song:
    """
    歌曲
    """

    def __init__(self):
        self.id = None
        self.name = None
        self.alias = None
        self.artist = []
        self.album = None
        self.mv = None


class Artist:
    """
    艺术家，演唱者，歌手
    """

    def __init__(self):
        self.id = None
        self.name = None
        self.alias = None
        self.album_size = None
        self.mv_size = None
        self.pic_url = None
        self.pic_id = None


class Album:
    """
    专辑
    """

    def __init__(self):
        self.id = None
        self.name = None
        self.pic_url = None
        self.pic = None


class Quality:
    def __init__(self):
        self.bit_rate = None
        self.size = None
