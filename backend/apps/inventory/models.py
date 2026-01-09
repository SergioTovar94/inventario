from django.db import models
from apps.users.models import User

class Item(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
