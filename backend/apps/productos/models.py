from django.db import models
from apps.marcas.models import Marca
from apps.tipos_producto.models import TipoProducto

class Producto(models.Model):

    # --- Estado físico ---
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

    # --- Uso / disponibilidad ---
    USO_DISPONIBLE = 'DISPONIBLE'
    USO_ASIGNADO = 'ASIGNADO'
    USO_EN_REPARACION = 'EN_REPARACION'
    USO_DADO_DE_BAJA = 'DADO_DE_BAJA'
    USO_PRESTADO = 'PRESTADO'

    USOS = [
        (USO_DISPONIBLE, 'Disponible'),
        (USO_ASIGNADO, 'Asignado'),
        (USO_EN_REPARACION, 'En reparación'),
        (USO_DADO_DE_BAJA, 'Dado de baja'),
        (USO_PRESTADO, 'Prestado'),
    ]

    # --- Propiedad ---
    PROPIO = 'PROPIO'
    PRESTADO = 'PRESTADO'
    ALQUILADO = 'ALQUILADO'

    PROPIEDADES = [
        (PROPIO, 'Propio'),
        (PRESTADO, 'Prestado'),
        (ALQUILADO, 'Alquilado'),
    ]

    codigo = models.CharField(max_length=50, unique=True)
    serial = models.CharField(max_length=100, unique=True)
    tipo = models.ForeignKey(TipoProducto, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADOS, default=ESTADO_BUENO)
    uso = models.CharField(max_length=20, choices=USOS, default=USO_DISPONIBLE)
    propiedad = models.CharField(max_length=20, choices=PROPIEDADES, default=PROPIO)
    fecha_compra = models.DateField()

    # 👇 NUEVO CAMPO
    detalles = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.codigo} - {self.serial}"

