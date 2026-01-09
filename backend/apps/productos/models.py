from django.db import models
from apps.marcas.models import Marca
from apps.tipos_producto.models import TipoProducto

class Producto(models.Model):

    ESTADO_EXCELENTE = 'EXCELENTE'
    ESTADO_BUENO = 'BUENO'
    ESTADO_REGULAR = 'REGULAR'
    ESTADO_DANADO = 'DANADO'

    ESTADOS = [
        (ESTADO_EXCELENTE, 'Excelente'),
        (ESTADO_BUENO, 'Bueno'),
        (ESTADO_REGULAR, 'Regular'),
        (ESTADO_DANADO, 'Dañado'),
    ]

    codigo = models.CharField(max_length=50, unique=True)
    serial = models.CharField(max_length=100, unique=True)
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(
        max_length=20,
        choices=ESTADOS,
        default=ESTADO_BUENO
        )
    fecha_compra = models.DateField()

    def __str__(self):
        return f"{self.codigo} - {self.serial}"