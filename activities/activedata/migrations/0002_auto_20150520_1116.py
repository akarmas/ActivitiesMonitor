# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('activedata', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activeentries',
            name='origin',
            field=models.ForeignKey(to='activedata.ActiveEntries', null=True),
            preserve_default=True,
        ),
    ]
