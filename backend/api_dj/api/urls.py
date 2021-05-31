from django.db import router
from django.urls import path, include
from rest_framework import routers
from .views import DocumentoViewset
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('docs', DocumentoViewset)


urlpatterns = [
  path('', include(router.urls)),
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]