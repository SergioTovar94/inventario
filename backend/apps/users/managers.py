from django.contrib.auth.base_user import BaseUserManager
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("El email debe ser proporcionado")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            date_joined=timezone.now(),  # importante
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
