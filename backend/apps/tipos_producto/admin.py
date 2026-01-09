from django.contrib import admin
from .models import TipoProducto

@admin.register(TipoProducto)
class TipoProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo_producto')
    search_fields = ('tipo_producto',)
