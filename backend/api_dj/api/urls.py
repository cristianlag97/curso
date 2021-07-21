from django.db import router
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

router = routers.DefaultRouter()
router.register('docs', DocumentoViewset)
router.register('categoria', CategoriaViewset)
router.register('subcategoria', SubCategoriaViewset)
router.register('producto', ProductoViewset)
router.register('proveedor', ProveedorViewset)
router.register('compras', ComprasViewset)
router.register('compras-detalle', ComprasDetViewset)


urlpatterns = [
  path('', include(router.urls)),
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]