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
