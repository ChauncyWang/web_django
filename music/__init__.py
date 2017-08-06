class Song:
    """
    歌曲
    """

    def __init__(self):
        self.name = None
        self.artist = []
        self.album = None


class Artist:
    """
    艺术家，演唱者，歌手
    """

    def __init__(self):
        self.name = None


class Artists(list):
    def __init__(self):
        super().__init__()

    def __str__(self):
        s = ''
        for t in self:
            if isinstance(Artist, t):
                s += t.name
                s += '/'

        s = s[:len(s) - 1]
        return s


class Album:
    """
    专辑
    """

    def __init__(self):
        self.name = None


class Quality:
    def __init__(self):
        self.bit_rate = None
        self.size = None
