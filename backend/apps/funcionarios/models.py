from django.db import models
from apps.areas.models import Area

class Funcionario(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

