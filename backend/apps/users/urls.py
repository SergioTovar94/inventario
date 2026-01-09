from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserListView
from .views import EmailTokenObtainPairView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path('login/', EmailTokenObtainPairView.as_view(), name='login'),

    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('all/', UserListView.as_view(), name='user-list'),

]
