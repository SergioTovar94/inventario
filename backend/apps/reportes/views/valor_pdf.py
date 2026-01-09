from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.db.models import Sum
from apps.productos.models import Producto

class ReporteValorPDF:

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

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="reporte_valor.pdf"'

        p = canvas.Canvas(response, pagesize=letter)
        width, height = letter

        y = height - 40
        p.setFont("Helvetica-Bold", 14)
        p.drawString(40, y, "Reporte de Valor del Inventario")

        y -= 30
        p.setFont("Helvetica", 10)

        total = 0
        for prod in qs:
            linea = f"{prod.codigo} | {prod.tipo} | {prod.estado} | ${prod.precio}"
            p.drawString(40, y, linea)
            y -= 15
            total += prod.precio

            if y < 40:
                p.showPage()
                y = height - 40

        y -= 20
        p.setFont("Helvetica-Bold", 12)
        p.drawString(40, y, f"Valor total: ${total}")

        p.showPage()
        p.save()
        return response
