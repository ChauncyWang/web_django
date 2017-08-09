import json
from http import cookiejar

import requests

from music import Songs, Song, Artists, Artist
from music.qq.config import search_url, key_url, play_url


class QQMusicAPI:
    """
    QQ音乐 api
    """

    def __init__(self, timeout=60, proxy=None):
        self.session = requests.session()
        self.timeout = timeout
        self.proxies = {'http': proxy, 'https': proxy}
        self.session.cookies = cookiejar.LWPCookieJar('a.c')

    def get(self, url, params=None, headers=None):
        """
        get 请求
        :param url: 请求地址
        :param params: 参数
        :param headers: 请求头
        :return: 响应
        """
        resp = self.session.get(url, params=params, headers=headers)
        if resp.status_code == 200:
            return resp

    def search(self, content, t, page, num=40):
        """
        搜索
        :param content: 搜索内容
        :param t: 搜索类型
        :param page: 页数
        :param num: 每页大小
        :return:请求结果
        """
        params = {'t': t, 'p': page, 'n': num, 'w': content, 'cr': '1'}
        resp = self.get(search_url, params).text
        resp = json.loads(resp[resp.index('(') + 1:resp.rindex(')')])
        return resp

    def search_song(self, content, page=0, num=40):
        data = self.search(content, 0, page, num)
        code = data['code']
        if code == 0:
            list = data['data']['song']['list']
            songs = Songs()
            for i in list:
                song = Song()
                song.name = i['songname']
                song.album = i['albumname']
                song.artists = Artists()
                for j in i['singer']:
                    a = Artist()
                    a.name = j['name']
                    song.artists.append(a)
                song.dt = i['interval'] * 1000
                songs.append(song)
                print(song)
            return songs

    def get_key(self, mid, file='M800%s.mp3'):
        params = {
            'g_tk': '5381',
            'jsonpCallback': 'jsonpCallback',
            'loginUin': '0',
            'hostUin': '0',
            'format': 'json',
            'inCharset': 'utf8',
            'outCharset': 'utf8',
            'notice': '0',
            'platform': 'yqq',
            'needNewCode': '0',
            'cid': '205361747',
            'callback': 'callback',
            'uin': '0',
            'songmid': mid,
            'filename': file % mid,
            'guid': '534549750',
        }
        resp = self.get(key_url, params).text
        if isinstance(resp, str):
            resp = json.loads(resp[resp.index('(') + 1:resp.rindex(')')])
        print(resp['data']['items'][0]['vkey'])
        print(resp['data']['items'][0]['filename'])
        self.get_song(resp['data']['items'][0]['filename'], resp['data']['items'][0]['vkey'])

    def get_song(self, file_name, vkey):
        params = {'vkey': vkey, 'guid': '534549750', 'fromtag': '66', 'uin': '0'}
        resp = self.get(play_url + file_name, params)
        try:
            resp = resp.content
            with open(file_name, 'wb') as f:
                f.write(resp)
        except:
            print('gggg')
            return
