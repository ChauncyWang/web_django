import hashlib
import logging
from contextlib import closing
from threading import Thread

import os
import requests
from PyQt5.QtCore import QObject, pyqtSignal


class HttpThread(QObject, Thread):
    """
    利用多线程进行一次 http 请求
    """
    # 下载过程的 信号
    data_updated = pyqtSignal(float)
    # 下载完成的 信号
    data_finished = pyqtSignal(str)

    def __init__(self, url, path, file_name, chunk_size=1024):
        super(Thread, self).__init__()
        super(QObject, self).__init__()
        self.url = url
        self.path = path
        self.file_name = file_name
        self.chunk_size = chunk_size

        if not os.path.exists(path):
            logging.info("缓存文件夹[%s]不存在!" % path)
            logging.info("创建缓存文件夹[%s]..." % path)
            os.makedirs(path)

    def run(self):
        # md = hashlib.md5()
        # md.update(self.file_name.encode('utf8'))
        # file_name = md.hexdigest()
        # file_name = self.path + file_name
        file_name = self.path + self.file_name
        if os.path.exists(file_name):
            logging.info("发现缓存文件[%s]." % file_name)
        else:
            with closing(requests.get(self.url, stream=True)) as response:
                logging.info("开始下载文件:[url:%s, 保存位置:%s]" % (self.url, file_name))
                content_size = int(response.headers['content-length'])  # 文件总大小
                s = 0
                with open(file_name, 'wb') as file:
                    for data in response.iter_content(chunk_size=self.chunk_size):
                        file.write(data)
                        s += len(data)
                        self.data_updated.emit(s / content_size)
        self.data_finished.emit(file_name)
        logging.info('文件下载完成[%s].' % file_name)


def download(url, path, file, update, finished):
    thread = HttpThread(url, path, file)
    if callable(update):
        thread.data_updated.connect(update)
    if callable(finished):
        thread.data_finished.connect(finished)
    thread.start()


def download_img(url, file, update, finished):
    logging.info('开始下载歌手头像...')
    file_path = os.path.dirname(__file__) + '/cache/img/'
    download(url, file_path, file, update, finished)


def download_mp3(url, file, update, finished):
    logging.info('开始下载歌曲...')
    file_path = os.path.dirname(__file__) + '/cache/mp3/'
    download(url, file_path, file, update, finished)


def download_lyric(url, file, update, finished):
    logging.info('开始下载歌词...')
    file_path = os.path.dirname(__file__) + '/cache/lyric/'
    download(url, file_path, file, update, finished)
