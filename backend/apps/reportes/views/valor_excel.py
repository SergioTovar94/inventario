from django.http import HttpResponse
from openpyxl import Workbook
from django.db.models import Sum
from apps.productos.models import Producto

class ReporteValorExcel:

    @staticmethod
    def export(request):
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

        wb = Workbook()
        ws = wb.active
        ws.title = "Reporte de Valor"

        # Encabezados
        ws.append([
            "Código", "Serial", "Tipo", "Marca",
            "Estado", "Uso", "Propiedad", "Precio"
        ])

        total = 0

        for p in qs:
            ws.append([
                p.codigo,
                p.serial,
                str(p.tipo),
                str(p.marca),
                p.estado,
                p.uso,
                p.propiedad,
                float(p.precio),
            ])
            total += p.precio

        ws.append([])
        ws.append(["", "", "", "", "", "", "TOTAL", float(total)])

        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response["Content-Disposition"] = 'attachment; filename="reporte_valor.xlsx"'

        wb.save(response)
        return response
