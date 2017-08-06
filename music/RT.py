from music.netease.api import NeteaseAPI


def test():
    a = NeteaseAPI().search_albums('告白气球')
    for t in a:
        print(t)

test()
