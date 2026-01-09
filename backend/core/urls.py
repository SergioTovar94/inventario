from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # API de tus módulos
    path('api/users/', include('apps.users.urls')),
    path('api/areas/', include('apps.areas.urls')),
    path('api/marcas/', include('apps.marcas.urls')),
    path('api/funcionarios/', include('apps.funcionarios.urls')),
    path('api/productos/', include('apps.productos.urls')),
    path('api/tipos-producto/', include('apps.tipos_producto.urls')),
    path('api/asignaciones-productos/', include('apps.producto_asignacion.urls')),
]
