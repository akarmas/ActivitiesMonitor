/***********************************************************************
# Copyright (C) 2015 Thanasis Karmas <thanasis.karmas@gmail.com>
# Copyright (C) 2014 Thanasis Karmas <thanasis.karmas@gmail.com>
# Copyright (C) 2013 Angelos Tzotsos <tzotsos@gmail.com>
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
************************************************************************/


/**************
Map
***************/

map = new OpenLayers.Map(
	{
    	allOverlays: false,
    	displayProjection: new OpenLayers.Projection("EPSG:900913"),
	});

var center = new OpenLayers.LonLat(24.3,38.4).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));

var map_mousePosCtr = new OpenLayers.Control.MousePosition();
map.addControl(map_mousePosCtr);

var vector = new OpenLayers.Layer.Vector("Vectors");

/*
//Show layer of demo data
demoData = new OpenLayers.Layer.Vector("Demo Polygons");

var wkt = new OpenLayers.Format.WKT();

var polygonFeature;

for (var i = 0; i < demo_polygons.length; i++) {
	polygonFeature = wkt.read(demo_polygons[i]);
	polygonFeature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),
									  new OpenLayers.Projection("EPSG:900913"));
	demoData.addFeatures([polygonFeature]);
}
*/

function clearVector() 
{
    vector.destroyFeatures(); //erase drawn geometry
}
