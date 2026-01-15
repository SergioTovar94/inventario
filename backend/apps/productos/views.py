from rest_framework import viewsets, permissions
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = (
        Producto.objects
        .select_related('marca', 'tipo')        # FK directas
        .prefetch_related('asignaciones__funcionario')  # 👈 CLAVE
        .order_by('-id')
    )
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['tipo', 'marca', 'estado', 'uso', 'propiedad']
    search_fields = ['serial', 'tipo']
    ordering_fields = [
        'id', 'codigo', 'serial', 'precio',
        'estado', 'uso', 'propiedad', 'fecha_compra'
    ]

