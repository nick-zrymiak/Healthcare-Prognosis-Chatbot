from rest_framework import serializers
from .models import User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('fullName', 'age')