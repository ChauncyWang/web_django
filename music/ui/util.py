import logging
from contextlib import closing
from threading import Thread

import requests
from PyQt5.QtCore import QObject, pyqtSignal


def download(url, file, update, finished):
    thread = Download(url, file)
    if callable(update):
        thread.data_updated.connect(update)
    if callable(finished):
        thread.data_finished.connect(finished)
    thread.start()


class Download(QObject, Thread):
    """
    下载线程，利用 url 进行下载
    """
    # 下载过程的 信号
    data_updated = pyqtSignal(float)
    # 下载完成的 信号
    data_finished = pyqtSignal(str)

    def __init__(self, url, file, chunk_size=1024):
        super(Thread, self).__init__()
        super(QObject, self).__init__(None)
        self.url = url
        self.file = file
        self.chunk_size = chunk_size

    def run(self):
        with closing(requests.get(self.url, stream=True)) as response:
            logging.info("开始下载文件:[url:%s, 保存位置:%s]" % (self.url, self.file))
            content_size = int(response.headers['content-length'])  # 内容体总大小
            S = 0
            with open(self.file, "wb") as file:
                for data in response.iter_content(chunk_size=self.chunk_size):
                    file.write(data)
                    S += len(data)
                    self.data_updated.emit(S / content_size)
        self.data_finished.emit(self.file)
        logging.info("下载完成(%s)!" % self.file)
