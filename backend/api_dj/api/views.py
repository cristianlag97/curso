from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializer import *

class DocumentoViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Documento.objects.all().order_by('id')
  serializer_class = DocumentoSerializer

class CategoriaViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Categoria.objects.all().order_by('descripcion')
  serializer_class = CategoriaSerializer

class SubCategoriaViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = SubCategoria.objects.all().order_by('descripcion')
  serializer_class = SubCategoriaSerializer

class ProductoViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Producto.objects.all().order_by('descripcion')
  serializer_class = ProductoSerializer

class ProveedorViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Proveedor.objects.all().order_by('nombre')
  serializer_class = ProveedorSerializer

class ComprasViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = ComprasEnc.objects.all().order_by('id')
  serializer_class = ComprasSerializer

class ComprasDetViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = ComprasDet.objects.all().order_by('id')
  serializer_class = ComprasDetSerializer