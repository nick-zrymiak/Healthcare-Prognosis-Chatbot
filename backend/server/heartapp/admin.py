from django.contrib import admin

# Register your models here.
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('fullName', 'age')

admin.site.register(User,UserAdmin)