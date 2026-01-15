from django.db import models
from apps.funcionarios.models import Funcionario
from apps.productos.models import Producto

class ProductoAsignacion(models.Model):
    producto = models.ForeignKey(
        Producto,
        related_name="asignaciones",
        on_delete=models.CASCADE
    )
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    fecha_asignacion = models.DateTimeField(auto_now_add=True)
    fecha_devolucion = models.DateTimeField(null=True, blank=True)
    activa = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.producto} → {self.funcionario}"
