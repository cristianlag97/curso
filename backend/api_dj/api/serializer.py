from django.db import models
from rest_framework import fields, serializers
from .models import Documento

class DocumentoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Documento
    fields = '__all__'