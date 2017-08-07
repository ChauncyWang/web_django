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
