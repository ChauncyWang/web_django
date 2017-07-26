import json
import requests

from music.netease import NSong, SearchType
from music.netease.config import *
from music.netease.encrypt import encrypted_request

from music.netease.exception import *


class Crawler:
    """
    音乐爬虫
    """

    def __init__(self):
        self.session = requests.session()

    def post(self, url, data=None, headers=None):
        """
        对data 进行加密的 POST 请求
        :param url: post url
        :param data: post 的数据
        :param headers: post 请求的头
        :return: post 请求返回的信息
        """
        data = encrypted_request(data)
        return self.session.post(url, data=data, headers=headers)

    def get(self, url, params=None, headers=None):
        """
        Get 请求
        """
        return self.session.get(url, params=params, headers=headers)

    def search(self, content, _type, offset, limit=20):
        """
        进行搜索
        :param content: 要搜索的内容
        :param _type: 搜索类型
        :param offset: 偏移量
        :param limit:每页大小
        :return: json 数据类型的信息
        """
        params = {'s': content, 'type': _type, 'offset': offset,
                  'sub': 'false', 'limit': limit}
        return self.post(search_url, params)

    @exception
    def search_song(self, content, offset, limit=20):
        """
        搜索歌曲
        :param content: 搜索内容
        :param offset: 偏移量
        :param limit:每页大小
        :return: 搜索到的 json 数据类型的歌曲信息
        """
        r = self.search(content, SearchType.song, offset, limit)
        if r.status_code == 200:
            try:
                r = json.loads(r.text)
                code = r['code']
                if code == 200:
                    result = r['result']['songs']
                    songs = []
                    for song in result:
                        s = NSong(song)
                        s.url = self.get_song_url_by_id(s.id)
                        songs.append(s)
                    return songs
                else:
                    raise ParameterException(r['code'], r['msg'])
            except KeyError:
                raise MayOldAPIException(KeyError)
        else:
            raise RequestException(r.status_code)

    @exception
    def get_song_url_by_id(self, _id):
        params = {'ids': [_id], 'br': 320000, 'csrf_token': ''}
        result = self.post(song_url, params)
        result = json.loads(result.text)
        try:
            return result['data'][0]['url']
        except Exception as e:
            return None

    @exception
    def get_song_lyric_by_id(self, _id):
        params = {'id': _id, 'lv': -1, 'kv': -1, 'tv': -1}
        result = self.get(lyric_url, params)
        result = json.loads(result.text)
        print(result['lrc']['lyric'])
