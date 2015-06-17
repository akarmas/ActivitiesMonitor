# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('activedata', '0002_auto_20150520_1116'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ota',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('objectid', models.IntegerField(default=0)),
                ('code_ota', models.CharField(default=b'', max_length=20)),
                ('shape_leng', models.IntegerField(default=0)),
                ('shape_area', models.IntegerField(default=0)),
                ('name_ota', models.CharField(default=b'', max_length=100)),
                ('code_nom', models.CharField(default=b'', max_length=10)),
                ('name_nom', models.CharField(default=b'', max_length=100)),
                ('geom', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
