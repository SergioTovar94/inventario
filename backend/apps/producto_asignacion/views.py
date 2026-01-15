from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.utils.timezone import now

from .models import ProductoAsignacion
from .serializers import ProductoAsignacionSerializer
from apps.productos.models import Producto


class ProductoAsignacionViewSet(viewsets.ModelViewSet):
    """
    Maneja:
    - Asignar un producto a un funcionario
    - Devolver (cerrar) una asignación
    - Consultar la asignación activa de un producto
    """

    queryset = ProductoAsignacion.objects.select_related(
        "producto", "funcionario"
    )
    serializer_class = ProductoAsignacionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Asignar producto a funcionario
        - Solo si el producto está DISPONIBLE
        - Marca el producto como ASIGNADO
        """
        producto = serializer.validated_data["producto"]

        if producto.uso != Producto.USO_DISPONIBLE:
            raise serializers.ValidationError(
                {"producto": "El producto no está disponible para asignación."}
            )

        producto.uso = Producto.USO_ASIGNADO
        producto.save()

        serializer.save(activa=True)

    def partial_update(self, request, *args, **kwargs):
        """
        Devolver producto (cerrar asignación)
        """
        asignacion = self.get_object()

        if not asignacion.activa:
            return Response(
                {"detail": "La asignación ya está cerrada."},
                status=status.HTTP_400_BAD_REQUEST
            )

        asignacion.activa = False
        asignacion.fecha_devolucion = now()
        asignacion.save()

        producto = asignacion.producto
        producto.uso = Producto.USO_DISPONIBLE
        producto.save()

        serializer = ProductoAsignacionSerializer(asignacion)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="activa-por-producto")
    def activa_por_producto(self, request):
        """
        GET /api/asignaciones-productos/activa-por-producto/?producto_id=ID
        """
        producto_id = request.query_params.get("producto_id")

        if not producto_id:
            return Response(
                {"error": "producto_id es requerido"},
                status=status.HTTP_400_BAD_REQUEST
            )

        asignacion = (
            ProductoAsignacion.objects
            .filter(producto_id=producto_id, activa=True)
            .select_related("producto", "funcionario")
            .first()
        )

        if not asignacion:
            return Response(None, status=status.HTTP_200_OK)

        serializer = ProductoAsignacionSerializer(asignacion)
        return Response(serializer.data, status=status.HTTP_200_OK)
