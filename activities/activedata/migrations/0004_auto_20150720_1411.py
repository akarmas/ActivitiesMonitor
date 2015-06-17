# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activedata', '0003_ota'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ota',
            name='shape_area',
            field=models.CharField(default=b'', max_length=100),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='ota',
            name='shape_leng',
            field=models.CharField(default=b'', max_length=100),
            preserve_default=True,
        ),
    ]
