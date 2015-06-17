# ***********************************************************************
# Copyright (C) 2015 Thanasis Karmas <thanasis.karmas@gmail.com>
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
# ************************************************************************/



#from django.db import models

from django.contrib.gis.db import models

# Create your models here.

class Profiles(models.Model):

	# Regular Django fields corresponding to the attributes of
	# each user profile
	
	name = models.CharField(max_length=50, primary_key=True)
	age = models.IntegerField(default=0)
	gender = models.CharField(max_length=1, default='F')
	car = models.CharField(max_length=3, default='No')
	

	# Returns the string representation of the model.
	def __unicode__(self):              # __str__ on Python 3
		return self.name

class ActiveEntries(models.Model):

	# Regular Django fields corresponding to the attributes of
	# each coverage

	timestamp = models.DateTimeField(default='1111-11-11 15:15:15')
	event = models.CharField(max_length=100, default='nothing')
	transport = models.CharField(max_length=100, default='Walking')
	comment = models.CharField(max_length=200, default='')
	origin = models.ForeignKey('ActiveEntries', null=True)
	profile = models.ForeignKey('Profiles', default='prof_0')

	# GeoDjango-specific: a geometry field (PointFieldField), and
	# overriding the default manager with a GeoManager instance.

	location = models.PointField()
	objects = models.GeoManager()

	# Returns the string representation of the model.
	def __unicode__(self):              # __str__ on Python 3
		return self.event

class Ota(models.Model):
	# Regular Django fields corresponding to the attributes of
	# each coverage

	objectid = models.IntegerField(default=0)
	code_ota = models.CharField(max_length=20, default='')
	shape_leng = models.CharField(max_length=100, default='')
	shape_area = models.CharField(max_length=100, default='')
	name_ota = models.CharField(max_length=100, default='')
	code_nom = models.CharField(max_length=10, default='')
	name_nom = models.CharField(max_length=100, default='')

	# GeoDjango-specific: a geometry field (PointFieldField), and
	# overriding the default manager with a GeoManager instance.

	geom = models.MultiPolygonField()
	objects = models.GeoManager()

	# Returns the string representation of the model.
	def __unicode__(self):              # __str__ on Python 3
		return self.name_ota
