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
      ans = analysisDecision(temp)
      return HttpResponse(ans) 
   return HttpResponse('else response')


def analysisDecision(patientVals):
    i=0
    # This is the vector v found from LDA computed in MATLAB script.
    v=[0.003051012515295, -0.665373047907120, -0.351677368105463, -0.009179098146992, -0.001452521668132, 0.408370530219093, -0.139506054033309, 0.011118892402065, -0.549605003321498, -0.118476977793541, -0.288003580178490, -0.589426564972052, -0.521617653186352]
    # This is the threshold yielding 86% accuracy (details found in MATLAB script)
    thresh=-2.4
    # This loop computes the inner product of the user data inputted with the vector v as per the LDA process to find the variable that maximally separates the 2 classes
    patientV=0
    while(i<13):
        patientV+=patientVals[i]*v[i]
        i=i+1
    print(patientV)

    # Decision found here: comparison with the threshold. If > threshold then patient is healthy. Otherwise patient has heart disease
    if(patientV<=thresh):
      return "The data provided tells us that you might be at risk of heart disease. Please consult your doctor to find out a possible course of action."
    else: 
      return "Looks like you are good"



