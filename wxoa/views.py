import os

from django.http import HttpResponse
from django.shortcuts import render
# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from web_django.settings import BASE_DIR
from wxoa.services.receive import parse_xml_msg
from wxoa.services.untils import validate_token


@csrf_exempt
def hello(request):
    if request.method == "GET":
        re = validate_token(request.GET)
        if re == "false":
            return render(request, "index.html")
        else:
            return HttpResponse(validate_token(request.GET))
    else:
        print("POST")
        r = parse_xml_msg(request.body)
        c = {'fromUser': r.ToUserName, 'toUser': r.FromUserName, 'content': r.Content}
        return render(request, "re_msg_text.xml", c)
