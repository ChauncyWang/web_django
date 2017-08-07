class Song:
    """
    歌曲
    """

    def __init__(self):
        self.name = None
        self.artists = None
        self.album = None

    def __str__(self):
        return '%s %s %s' % (self.name, self.artists, self.album)


class Songs(list):
    def __str__(self):
        s = ''
        for t in self:
            if isinstance(t, Song):
                s += t.name
                s += '/'
        return s[:len(s) - 1]


class Artist:
    """
    艺术家，演唱者，歌手
    """

    def __init__(self):
        self.name = None

    def __str__(self):
        return self.name


class Artists(list):
    def __init__(self):
        super().__init__()

    def __str__(self):
        s = ''
        for t in self:
            if isinstance(t, Artist):
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
        self.artists = None

    def __str__(self):
        return '%s,%s' % (self.name, str(self.artists))


class Quality:
    def __init__(self):
        self.bit_rate = None
        self.size = None
