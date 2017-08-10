import json
from http import cookiejar

import requests
from html.parser import HTMLParser

from music.api import BaseAPI
from music.exception_handle import *
from music.qq.config import *
from music.qq.models import *


class QQMusicAPI(BaseAPI):
    """
    QQ音乐 api
    """

    def __init__(self, timeout=60, proxy=None):
        self.session = requests.session()
        self.timeout = timeout
        self.proxies = {'http': proxy, 'https': proxy}
        self.session.cookies = cookiejar.LWPCookieJar('a.c')

    def get(self, url, params=None, headers=None, stream=False):
        """
        get 请求
        :param stream:
        :param url: 请求地址
        :param params: 参数
        :param headers: 请求头
        :return: 响应
        """
        resp = self.session.get(url, params=params, headers=headers, stream=stream)
        if resp.status_code == 200:
            return resp

    def post(self, url, data=None, headers=None):
        resp = self.session.post(url, data=data, headers=headers)

    def search(self, content, t, page, num=40):
        """
        搜索
        :param content: 搜索内容
        :param t: 搜索类型
        :param page: 页数
        :param num: 每页大小
        :return:请求结果
        """
        params = {
            't': t,
            'p': page,
            'n': num,
            'w': content,
            'cr': '1',
            'new_json': '1',
        }
        resp = self.get(search_url, params).text
        resp = json.loads(resp[resp.index('(') + 1:resp.rindex(')')])
        return resp

    def search_songs(self, content, page=0, num=40):
        data = self.search(content, 0, page, num)
        code = data['code']
        if code == 0:
            list = data['data']['song']['list']
            songs = Songs()
            for i in list:
                song = Parse.parse_song(i)
                songs.append(song)
                # see paydownload
            return songs

    def get_key(self, mid, file='M800%s.mp3'):
        params = {
            'g_tk': '5381',
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
        return resp['data']['items'][0]['filename'], resp['data']['items'][0]['vkey']

    def get_song_url(self, file_name, vkey):
        params = {'vkey': vkey, 'guid': '534549750', 'fromtag': '66', 'uin': '0'}
        url = play_url + file_name + '?'
        for p in params.keys():
            url += "%s=%s&" % (p, params[p])
        return url[:len(url) - 1]

    def get_lyric(self, _id, mid):
        params = {
            'nobase64': '1',
            'musicid': _id,
            'callback': 'jsonp1',
            'g_tk': '5381',
            'jsonpCallback': 'jsonp1',
            'loginUin': '0',
            'hostUin': '0',
            'format': 'jsonp',
            'inCharset': 'utf8',
            'outCharset': 'utf-8',
            'notice': '0',
            'platform': 'yqq',
            'needNewCode': '0',
        }
        header = {
            'Referer': 'https://y.qq.com/n/yqq/song/%s.html' % mid
        }
        data = self.get(lyric_url, params, headers=header).text

        data = data[data.index('(') + 1:data.rindex(')')]
        data = json.loads(data)
        data = data['lyric']

        html_parser = HTMLParser()
        data = html_parser.unescape(data)
        print(data)

    def can_play(self, song):
        return song.action != 3

    @exception
    def album_img(self, song):
        """"""
        url = album_img_url % song.album.mid
        resp = self.get(url)
        if resp.status_code == 200:
            return resp.content
        else:
            raise RequestException(resp.status_code)


class Parse:
    @staticmethod
    @exception
    def parse_song(dic):
        try:
            song = QSong()
            song.id = dic['id']
            song.mid = dic['mid']
            song.name = dic['name']
            song.artists = Parse.parse_artists(dic['singer'])
            song.album = Parse.parse_album(dic['album'])
            song.dt = dic['interval'] * 1000
            song.action = dic['action']['msg']
            song.pay = dic['pay']['pay_down']
            return song
        except KeyError:
            raise QParseException("Parse Song Exception")

    @staticmethod
    @exception
    def parse_artist(dic):
        try:
            artist = QArtist()
            artist.id = dic['id']
            artist.mid = dic['mid']
            artist.name = dic['name']
            return artist
        except KeyError:
            raise QParseException("Parse Artist Exception")

    @staticmethod
    def parse_artists(dic):
        artists = Artists()
        for i in dic:
            artist = Parse.parse_artist(i)
            artists.append(artist)
        return artists

    @staticmethod
    @exception
    def parse_album(dic):
        try:
            album = QAlbum()
            album.id = dic['id']
            album.mid = dic['mid']
            album.name = dic['name']
            return album
        except KeyError:
            raise QParseException("Parse Album Exception")
