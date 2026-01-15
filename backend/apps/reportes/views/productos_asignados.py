from rest_framework.views import APIView
from rest_framework.response import Response

from apps.producto_asignacion.models import ProductoAsignacion


class ReporteProductosAsignados(APIView):
    """
    Reporte de productos actualmente asignados,
    filtrable por funcionario
    """

    def get(self, request):
        funcionario_id = request.GET.get("funcionario")

        qs = ProductoAsignacion.objects.select_related(
            "producto",
            "funcionario",
            "producto__tipo",
            "producto__marca",
        ).filter(activa=True)

        if funcionario_id:
            qs = qs.filter(funcionario_id=funcionario_id)

        data = []
        for a in qs:
            data.append({
                "funcionario_id": a.funcionario.id,
                "funcionario_nombre": a.funcionario.nombre,
                "codigo": a.producto.codigo,
                "tipo": a.producto.tipo.tipo_producto,
                "marca": a.producto.marca.nombre,
                "estado": a.producto.estado,
                "uso": a.producto.uso,
            })

        return Response(data)
