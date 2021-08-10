from django.db import models

# Create your models here.
class User(models.Model):
    fullName = models.CharField(max_length=250)
    age = models.IntegerField(default=0)
    def __str__(self):
        return self.fullName
