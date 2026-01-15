from rest_framework import serializers
from .models import Producto
from apps.marcas.models import Marca
from apps.tipos_producto.models import TipoProducto

class ProductoSerializer(serializers.ModelSerializer):
    asignacion_activa = serializers.SerializerMethodField()
    tipo_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoProducto.objects.all(),
        source="tipo",
        write_only=True
    )
    marca_id = serializers.PrimaryKeyRelatedField(
        queryset=Marca.objects.all(),
        source="marca",
        write_only=True
    )

    tipo_id_value = serializers.IntegerField(source="tipo.id", read_only=True)
    marca_id_value = serializers.IntegerField(source="marca.id", read_only=True)

    tipo = serializers.StringRelatedField(read_only=True)
    marca = serializers.StringRelatedField(read_only=True)

    # Campos legibles nuevos
    uso_value = serializers.CharField(source="get_uso_display", read_only=True)
    propiedad_value = serializers.CharField(source="get_propiedad_display", read_only=True)

    class Meta:
        model = Producto
        fields = "__all__"
        
    def get_asignacion_activa(self, obj):
        asignacion = obj.asignaciones.filter(
            activa=True
        ).select_related("funcionario").first()

        if not asignacion:
            return None

        return {
            "id": asignacion.id,
            "funcionario_id": asignacion.funcionario.id,
            "funcionario_nombre": asignacion.funcionario.nombre,
            "fecha_asignacion": asignacion.fecha_asignacion,
        }

