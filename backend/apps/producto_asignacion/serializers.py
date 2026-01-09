from rest_framework import serializers
from .models import ProductoAsignacion

class ProductoAsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoAsignacion
        fields = "__all__"