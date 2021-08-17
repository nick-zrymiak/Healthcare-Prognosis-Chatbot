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
      response = 'post made from to the backend'
      # response = request.POST.get("getrow")
      # print(request.POST.get("getrow"))
      print(request.POST.get('title'))
      return HttpResponse(response) 
   return HttpResponse('else response') 

# def mriCancer(reqeust): #expect: im
#    if request.method =='POST':
#       #your code
#       return (yes || no)

