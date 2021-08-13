from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import User

from django.http import HttpResponse



def index(request):
   response = User.objects.all()
   return HttpResponse(response)


def runChat(request):
   # print [1,2], '\n', [3,4]
   # [1,2]
   # [3,4]
   response = 'runchat function ran'
   return HttpResponse(response)

# In Javascript:

# console.log([1,2],'\n',[3,4])
# prints

# [1,2] '\n' [3,4
   # var postreponse = User.objects.all()
