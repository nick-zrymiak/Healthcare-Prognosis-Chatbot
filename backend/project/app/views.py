
# https://www.youtube.com/watch?v=n2T9rmFmo48&list=PLp0YVWys_jC4BHq4TST-ab3SERecwzX4p&index=12&t=2460s

from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from . serializers import * 
from rest_framework.response import Response
from django.http import HttpResponse

def index(request):
        return HttpResponse("Hello This is my myproj2")
def info(request):
        return HttpResponse("this is another info")

class ReactView(APIView):
    def get(self, request):
        output = [{"employee":output.employee,
                    "department": output.department}
                    for output in React.objects.all()]
        # output = {'my name is awshaf'}
        return Response(output)
    
    def post(self,request):
        serializers = ReactSerializer(data=request.data)
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response (serializer.data)

    
