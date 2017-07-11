from django.test import TestCase

# Create your tests here.
from wxoa.services.rebot import Rebot

Rebot.answer("讲个笑话!")
print(Rebot.code, Rebot.text, Rebot.url)
