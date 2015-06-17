# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveEntries',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('timestamp', models.DateTimeField(default=b'1111-11-11 15:15:15')),
                ('event', models.CharField(default=b'nothing', max_length=100)),
                ('transport', models.CharField(default=b'Walking', max_length=100)),
                ('comment', models.CharField(default=b'', max_length=200)),
                ('location', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('origin', models.ForeignKey(default=-1, to='activedata.ActiveEntries')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Profiles',
            fields=[
                ('name', models.CharField(max_length=50, serialize=False, primary_key=True)),
                ('age', models.IntegerField(default=0)),
                ('gender', models.CharField(default=b'F', max_length=1)),
                ('car', models.CharField(default=b'No', max_length=3)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='activeentries',
            name='profile',
            field=models.ForeignKey(default=b'prof_0', to='activedata.Profiles'),
            preserve_default=True,
        ),
    ]
