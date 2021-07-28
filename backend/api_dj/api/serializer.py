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

class SubCategoriaSerializer(serializers.ModelSerializer):
  cat_descripcion = serializers.ReadOnlyField(source='categoria.descripcion')
  class Meta:
    model = SubCategoria
    fields = ("id", "categoria", "descripcion", "cat_descripcion")

class ProductoSerializer(serializers.ModelSerializer):
  scat_descripcion = serializers.ReadOnlyField(source='subcategoria.descripcion')
  class Meta:
    model = Producto
    fields = ("id", "codigo", "descripcion", "exitencias", "precio", "subcategoria", "scat_descripcion")

class ProveedorSerializer(serializers.ModelSerializer):
  class Meta:
    model = Proveedor
    fields = '__all__'

class ComprasDetSerializer(serializers.ModelSerializer):
  producto_descripcion = serializers.ReadOnlyField(source='producto.descripcion')
  class Meta:
    model = ComprasDet
    fields = ('cabecera', 'id', 'producto', 'cantidad', 'precio',
              'subtotal', 'descuento', 'total', 'producto_descripcion')

class ComprasSerializer(serializers.ModelSerializer):
  detalle = ComprasDetSerializer(many = True, read_only=True)

  class Meta:
    model = ComprasEnc
    fields  = ['id', 'proveedor', 'fecha', 'detalle']