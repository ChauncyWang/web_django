import json
import logging

import requests

from music.netease import NSong, SearchType, NArtist, config
from music.netease.config import *
from music.netease.encrypt import encrypted_request

from music.netease.exception import *
from http import cookiejar


class NeteaseAPI:
    """
    网易云音乐 API
    """

    def __init__(self, timeout=60, proxy=None):
        self.session = requests.session()
        self.timeout = timeout
        self.proxies = {'http': proxy, 'https': proxy}
        self.session.cookies = cookiejar.LWPCookieJar(cookie_path)

    @exception
    def post(self, url, data=None, headers=header):
        """
        对data 进行加密的 POST 请求
        :param url: post url
        :param data: post 的数据
        :param headers: post 请求的头
        :return: post 请求返回的信息
        """
        response = self.session.post(url, data=encrypted_request(data), headers=headers, proxies=self.proxies)
        if response.status_code == 200:
            return response
        else:
            raise RequestException(response.status_code)

    @exception
    def get(self, url, params=None, headers=header):
        """
        Get 请求
        """
        response = self.session.get(url, params=params, headers=headers, proxies=self.proxies)
        if response.status_code == 200:
            return response
        else:
            raise RequestException(response.status_code)

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
    def search_songs(self, content, offset, limit=20):
        """
        搜索歌曲
        :param content: 搜索内容
        :param offset: 偏移量
        :param limit:每页大小
        :return: 搜索到的 json 数据类型的歌曲信息
        """
        logging.info("搜索音乐:[搜索内容:%s, 偏移:%s, 页限制:%s]" % (content, offset, limit))
        result = json.loads(self.search(content, SearchType.song, offset, limit).text)
        if result['code'] == 200:
            result_songs = result['result']['songs']
            songs = []
            for song in result_songs:
                s = NSong(song)
                s.url = self.get_song_url_by_id(s.id)
                songs.append(s)
            return songs
        else:
            raise ParameterException(result['code'], result['msg'])

    @exception
    def search_artists(self, content, offset, limit=40):
        """
        查询艺术家
        :param content: 要查询的内容
        :param offset: 位置偏移量
        :param limit: 查询的返回数量
        :return: 一个长度为 limit 的艺术家列表
        """
        result = json.loads(self.search(content, SearchType.artist, offset, limit).text)
        if result['code'] == 200:
            result_artists = result['result']['artists']
            artists = []
            for artist in result_artists:
                s = NArtist(artist)
                artists.append(s)
            return artists
        else:
            raise ParameterException(result['code'], result['msg'])

    @exception
    def search_albums(self, content, offset, limit=40):
        result = json.loads(self.search(content, SearchType.album, offset, limit).text)

    @exception
    def get_song_url_by_id(self, _id):
        """
        根据歌曲id获取播放链接
        :param _id:歌曲id
        :return:歌曲链接
        """
        params = {'ids': [_id], 'br': 320000, 'csrf_token': ''}
        response = self.post(song_url, params)
        response = json.loads(response.text)
        return response['data'][0]['url']

    @exception
    def get_songs_url_by_songs(self, songs):
        """
        根据歌曲列表获取列表内歌曲的链接
        :param songs: 歌曲列表
        :return: 链接列表
        """
        ids = []
        for song in songs:
            ids.append(song.id)
        params = {'ids': ids, 'br': 320000, 'csrf_token': ''}
        response = self.post(song_url, params)
        response = json.loads(response.text)
        result = []
        for song in response['data']:
            result.append(song['url'])
        return result

    @exception
    def get_song_lyric_by_id(self, _id):
        """
        根据歌曲id获取歌词
        :param _id: 歌曲id
        :return: 歌词
        """
        params = {'id': _id, 'lv': -1, 'kv': -1, 'tv': -1}
        result = self.get(lyric_url, params)
        result = json.loads(result.text)
        return result['lrc']['lyric']
