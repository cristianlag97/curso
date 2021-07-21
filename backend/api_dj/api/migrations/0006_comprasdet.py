# Generated by Django 3.1.7 on 2021-07-19 02:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_comprasenc'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComprasDet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_creacion', models.DateField(auto_now_add=True)),
                ('fecha_modificacion', models.DateField(auto_now=True)),
                ('cantidad', models.IntegerField(default=0)),
                ('precio', models.FloatField(default=0)),
                ('descuento', models.FloatField(default=0)),
                ('cabecera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.comprasenc')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.producto')),
            ],
            options={
                'verbose_name_plural': 'Detalle de compras',
            },
        ),
    ]
