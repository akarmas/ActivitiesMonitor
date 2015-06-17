/***********************************************************************
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
************************************************************************/


function show_demo()
{	
	var xmlhttp = new XMLHttpRequest();
	
	var PageToSendTo = "/activities/show_demo/";
	var params = "var=";

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			demo_points = JSON.parse(xmlhttp.responseText);
			
			demoData = new OpenLayers.Layer.Vector("Demo Activities", {isBaseLayer:false});

			var wkt = new OpenLayers.Format.WKT();

			var pointFeature;

			for (var i = 0; i < demo_points.length; i++) {
    			pointFeature = wkt.read(demo_points[i]);
    			pointFeature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),
                                      new OpenLayers.Projection("EPSG:900913"));
    			demoData.addFeatures([pointFeature]);
			}
			map.addLayers([demoData]);

		}
	}
	xmlhttp.open("POST", PageToSendTo, true);  
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
	xmlhttp.send(params);

}



