from rest_framework import viewsets
from .models import TipoProducto
from .serializers import TipoProductoSerializer
from rest_framework.permissions import IsAuthenticated

class TipoProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para CRUD completo de TipoProducto.
    """
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados pueden acceder
