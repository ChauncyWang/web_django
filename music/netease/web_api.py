import json

from music.netease import NSong, SearchType
from music.netease.config import *
from music.netease.encrypt import encrypted_request
import requests


class EncryptRequest:
    """
    对参数进行加密的请求
    """

    @staticmethod
    def post(url, data=None, headers=None):
        """
        POST 请求
        :param url: post url
        :param data: post 的数据
        :param headers: post 请求的头
        :return: post 请求返回的信息
        """
        data = encrypted_request(data)
        return requests.post(url, data=data, headers=headers)

    @staticmethod
    def get(url, params=None, headers=None):
        """
        Get 请求　
        :param url: get请求的 url
        :param params: get 请求参数
        :param headers: get 请求的头
        :return: get 请求的数据
        """
        params = encrypted_request(params)
        return requests.get(url, params=params, headers=headers)


def search(content, type, offset):
    limit = 20
    params = {'s': content, 'type': type, 'offset': offset,
              'sub': 'false', 'limit': limit}
    return EncryptRequest.post(search_url, params)


def search_song(content, offset):
    r = search(content, SearchType.song, offset)
    if r.status_code == 200:
        r = json.loads(r.text)
        code = r['code']
        if code == 200:
            result = r['result']['songs']
            songs = []
            for song in result:
                print(NSong(song))
        else:
            raise Exception("param failed！！！")

    else:
        raise Exception("post failed！！！")


def get_song_url_by_id(id):
    params = {'ids': id, 'br': 320000, 'csrf_token': ''}
    result = EncryptRequest.post(song_url, params)
    return result['data'][0]['url']
