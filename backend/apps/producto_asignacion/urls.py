from rest_framework.routers import DefaultRouter
from .views import ProductoAsignacionViewSet

router = DefaultRouter()
router.register(r'', ProductoAsignacionViewSet, basename='productoasignacion')

urlpatterns = router.urls
