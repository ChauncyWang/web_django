import re
from bs4 import BeautifulSoup
import requests
import urllib.parse

from pymongo import MongoClient
from multiprocessing import Queue

queue = Queue()
s = set()


def en(item):
    url = 'https://baike.baidu.com/item/%s' % item
    data = requests.get(url).content.decode('utf8')
    bsObj = BeautifulSoup(data, 'lxml')
    for a in bsObj.findAll('a', {'href': re.compile("/item/.*?")}):
        href = urllib.parse.unquote('' if a.get('href') is None else a.get('href'))
        href = href[6:]
        if href not in s:
            s.add(href)
            queue.put(href)
            print(str(len(s)) + ":" + href)
    en(queue.get())


def mongodb():
    client = MongoClient()
    db = client.db
    conn = db.db_conn

    conn.insert({'wc': 'wc'})
    conn.insert({'wc1': 'wc1'})
    for a in conn.find():
        print(a)


en("南北战争")
