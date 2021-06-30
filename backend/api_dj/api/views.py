from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializer import *
from rest_framework.permissions import IsAuthenticated

class DocumentoViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Documento.objects.all().order_by('id')
  serializer_class = DocumentoSerializer

class CategoriaViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Categoria.objects.all().order_by('descripcion')
  serializer_class = CategoriaSerializer
