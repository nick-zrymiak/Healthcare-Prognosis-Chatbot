from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import User

from django.http import HttpResponse



def index(request):
   response = User.objects.all()
   return HttpResponse(response)