from rest_framework.routers import DefaultRouter
from .views import TipoProductoViewSet

router = DefaultRouter()
router.register(r'', TipoProductoViewSet, basename='tipos-producto')

urlpatterns = router.urls
