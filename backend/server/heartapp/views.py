from django.shortcuts import render

from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import User

from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt



def index(request):
   response = User.objects.all()
   return HttpResponse(response)

@csrf_exempt 
def runChat(request):
   if request.method == 'POST':
      response = 'post maybe to the backend'
      return HttpResponse(response)
   return HttpResponse('else response')

