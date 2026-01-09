from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum
from apps.productos.models import Producto

class ReporteValorInventario(APIView):

    def get(self, request):
        qs = Producto.objects.all()

        estado = request.GET.get("estado")
        uso = request.GET.get("uso")
        propiedad = request.GET.get("propiedad")

        if estado:
            qs = qs.filter(estado=estado)
        if uso:
            qs = qs.filter(uso=uso)
        if propiedad:
            qs = qs.filter(propiedad=propiedad)

        return Response({
            "valor_total": qs.aggregate(Sum("precio"))["precio__sum"] or 0,
            "cantidad_activos": qs.count()
        })
