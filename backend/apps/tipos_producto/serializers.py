from rest_framework import serializers
from .models import TipoProducto

class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = "__all__"