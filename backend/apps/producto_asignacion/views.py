from rest_framework import viewsets
from .models import ProductoAsignacion
from .serializers import ProductoAsignacionSerializer
from rest_framework.permissions import IsAuthenticated

class ProductoAsignacionViewSet(viewsets.ModelViewSet):
    queryset = ProductoAsignacion.objects.all()
    serializer_class = ProductoAsignacionSerializer
