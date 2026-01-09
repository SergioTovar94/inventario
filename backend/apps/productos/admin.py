from django.contrib import admin
from .models import Producto

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'serial', 'tipo', 'marca', 'estado', 'uso', 'propiedad', 'fecha_compra']
    list_filter = ['estado', 'uso', 'propiedad', 'tipo', 'marca']
    search_fields = ['codigo', 'serial']