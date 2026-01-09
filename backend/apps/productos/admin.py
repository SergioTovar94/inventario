from django.contrib import admin
from .models import Producto

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id','tipo','marca','precio','estado','fecha_compra')
    search_fields = ('tipo__tipo_producto','marca__nombre')
    list_filter = ('tipo','marca','estado')
