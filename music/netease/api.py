import json

from music.netease.config import url
from music.netease.encrypt import encrypted_request
import requests


def get():
    search_content = "周杰伦"
    limit = 50
    search_type = 1
    params = {'s': search_content, 'type': search_type, 'offset': 0,
              'sub': 'false', 'limit': limit}

    a = requests.post(url, data=encrypted_request(params))
    a = json.loads(a.text)

    url1 = 'http://music.163.com/weapi/song/enhance/player/url?csrf_token='
    csrf = ''
    params = {'ids': [a['result']['songs'][0]['id']], 'br': 320000, 'csrf_token': csrf}
    result = requests.post(url1, data=encrypted_request(params))
    result = json.loads(result.text)
    print(result)

get()


class SearchType:
    """
    # type：搜索的类型
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