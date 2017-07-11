import json

from wxoa.services.config import *
import requests


class Rebot:
    """
    tuling rebot api
    """
    code = None
    text = None
    url = None
    @staticmethod
    def answer(info, loc=None):
        data = {'key': rebot_APIkey, 'info': info}
        if loc is not None:
            data['loc'] = loc
        data = json.dumps(data)
        response = requests.post(rebot_url, data=data)

        r = json.loads(response.content.decode("UTF8"))
        Rebot.code = r['code']
        if Rebot.code == "100000":
            Rebot.text = r['text']
        Rebot.url = r['url']
