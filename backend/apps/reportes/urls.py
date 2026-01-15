from django.urls import path
from .views.valor import ReporteValorInventario
from .views.valor_excel import ReporteValorExcel
from .views.valor_pdf import ReporteValorPDF
from .views.productos_asignados import ReporteProductosAsignados

urlpatterns = [
    path("valor-inventario/", ReporteValorInventario.as_view()),
    path("valor-inventario/excel/", ReporteValorExcel.export),
    path("valor-inventario/pdf/", ReporteValorPDF.export),
    path("productos-asignados/", ReporteProductosAsignados.as_view()),
]
