from django.db import models
from rest_framework import fields, serializers
from .models import *

class DocumentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Documento
    fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
  class Meta:
    model = Categoria
    fields = '__all__'