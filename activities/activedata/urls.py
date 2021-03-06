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



from django.conf.urls import patterns, url
from activedata import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
	url(r'^show_demo/$', views.show_demo, name='show_demo'),
	url(r'^analyze/$', views.analyze, name='analyze'),
)

