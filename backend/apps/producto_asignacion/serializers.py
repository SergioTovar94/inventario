from rest_framework import serializers
from .models import ProductoAsignacion

class ProductoAsignacionSerializer(serializers.ModelSerializer):
    producto_codigo = serializers.CharField(
        source="producto.codigo", read_only=True
    )
    funcionario_nombre = serializers.CharField(
        source="funcionario.nombre", read_only=True
    )

    class Meta:
        model = ProductoAsignacion
        fields = "__all__"
