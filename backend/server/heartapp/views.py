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
def lda(request):
   if request.method == 'POST':
      response = 'post made from to the backend'
      temp = request.body
      print(temp)
      return HttpResponse(request.body) 
   return HttpResponse('else response') 


