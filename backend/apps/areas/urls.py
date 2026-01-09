from django.urls import path
from .views import AreaViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', AreaViewSet, basename='areas')

urlpatterns = router.urls
