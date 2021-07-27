from django.shortcuts import render

from django.http import HttpResponse

def home(request):
    return HttpResponse("Hellooo, Django!")

def awshaf(request):
    return HttpResponse("Name: Awshaf Ishtiaque, Age 23")



# *******TUTUORIAL Form https://www.valentinog.com/blog/drf/
# Create your views here.
# from .models import App
# from .serializers import AppSerializer
# from rest_framework import generics

# class AppListCreate(generics.ListCreateAPIView):
#     queryset = App.objects.all()
#     serializer_class = AppSerializer
