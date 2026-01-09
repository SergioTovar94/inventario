from rest_framework import viewsets, permissions
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.select_related('marca').all().order_by('-id')
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['tipo', 'marca__id', 'estado']
    search_fields = ['serial', 'tipo']
    ordering_fields = ['id', 'serial', 'precio', 'estado', 'fecha_compra']
