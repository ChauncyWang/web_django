from django.forms import forms
from django.http import HttpResponse
from django.shortcuts import render, render_to_response


# Create your views here.
from learn.models import User


class UserForm(forms.Form):
    userName = forms.Field()
    headImg = forms.FileField()


def register(request):
    if request.method == "POST":
        uf = UserForm(request.POST, request.FILES)
        if uf.is_valid():
            userName = uf.cleaned_data['userName']
            headImg = uf.cleaned_data['headImg']

            user = User()
            user.userName = userName
            user.headImg = headImg
            user.save()
            return HttpResponse("OK!!!")
        else:
            return HttpResponse("Fail!!!!")
    else:
        uf = UserForm()
    return render_to_response('register.html', {"uf":uf})
