from rest_framework import serializers
from .models import Funcionario

class FuncionarioSerializer(serializers.ModelSerializer):
    
    area_nombre = serializers.CharField(source="area.nombre", read_only=True)
    
    class Meta:
        model = Funcionario
        fields = '__all__'
