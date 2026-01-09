from django.contrib import admin
from .models import ProductoAsignacion

@admin.register(ProductoAsignacion)
class ProductoAsignacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'producto', 'funcionario', 'fecha_asignacion')
    list_filter = ('fecha_asignacion',)
    search_fields = ('producto__tipo_producto__tipo_producto', 'funcionario__nombre')
