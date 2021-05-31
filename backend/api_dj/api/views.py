from django.shortcuts import render
from rest_framework import viewsets
from .models import Documento
from .serializer import DocumentoSerializer
from rest_framework.permissions import IsAuthenticated

class DocumentoViewset(viewsets.ModelViewSet):
  # permission_classes = (IsAuthenticated,)
  queryset = Documento.objects.all().order_by('id')
  serializer_class = DocumentoSerializer
