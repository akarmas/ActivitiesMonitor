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



# Django Imports

from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import HttpResponse

from django.contrib.gis.db import models
from django.contrib.gis.db.models.query import *
from django.contrib.gis.geos import Polygon

# General Imports

import os
import json
import pycurl
import binascii
import urllib
from urllib import *
from StringIO import StringIO

# Model Imports

from activedata.models import *

# Util imports

from util.arg_parse import *

# Create your views here.

def index(request):

	return render(request, 'activedata/index.html')

@csrf_exempt
def show_demo(request):
	
	results = []

	res = ActiveEntries.objects.all()
	
	for x in res:
		results.append(x.location.wkt)

	return HttpResponse(json.dumps(results))


@csrf_exempt
def analyze(request):
	
	res1 = []
	res2 = []
	res3 = []
	results = []

	gender = int(request.POST['gender'])
	car = int(request.POST['car'])
	thres1 = int(request.POST['thres1'])
	thres2 = int(request.POST['thres2'])
	weekday = int(request.POST['weekday'])
	activity = int(request.POST['activity'])

	# calculate result records set based on user analysis options

	resultset, ota_query = query_builder(gender, car, thres1, thres2, weekday, activity)

	if len(resultset) != 0:	

		# contruct results array for visualization

		for item in resultset:
			res1.append(item.location.wkt)

		# calculate top 3 OTA that contain the more records in the result set

		ota_set = Ota.objects.all().raw(ota_query)
		for item in ota_set:
			res2.append(dict(name=item.name_ota, coords=item.geom.wkt))

		# calculate spatial mean value of the result set

		spmean = resultset.collect().centroid.wkt
		res3.append(spmean)

	results.append(res1)
	results.append(res2)
	results.append(res3)

	return HttpResponse(json.dumps(results))
