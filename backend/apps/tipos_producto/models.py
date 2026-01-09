from django.db import models


class TipoProducto(models.Model):
    tipo_producto = models.CharField(max_length=100)

    def __str__(self):
        return self.tipo_producto
