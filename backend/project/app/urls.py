from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', app.index, name="index"),
]


