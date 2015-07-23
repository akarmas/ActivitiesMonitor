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


function analysis()
{
	var xmlhttp = new XMLHttpRequest();
	
	var PageToSendTo = "/activities/analyze/";
	var params = "gender=" + gender;
	params+= "&car=" + car_user;
	params+= "&thres1=" + thres1;
	params+= "&thres2=" + thres2;
	params+= "&weekday=" + weekday;
	params+= "&activity=" + activity; 

	xmlhttp.onreadystatechange = function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			res_points = JSON.parse(xmlhttp.responseText)[0];
			ota_polygons = JSON.parse(xmlhttp.responseText)[1];
			sp_mean = JSON.parse(xmlhttp.responseText)[2];
		
			if (res_points.length == 0) {
				alert('There are no available data that meet the analysis options.');
				return
			}	

			var wkt = new OpenLayers.Format.WKT();
			
			// Construct Heat Map Layer			
	
			var testData = {
					max: 50,
                    data: []
             }; 
	
			for (var i = 0; i < res_points.length; i++) {
    			pointFeature = wkt.read(res_points[i]);
    			pointFeature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),
                                      new OpenLayers.Projection("EPSG:900913"));
				c = Math.floor(Math.random()*50);
				testData.data.push({lonlat:new OpenLayers.LonLat(pointFeature.geometry.x, pointFeature.geometry.y), count:c});
			}
			
			showData = new OpenLayers.Layer.Heatmap("Analysis_HeatMap_" + qnumber.toString(), map, testData,
                {visible: true, radius: 20}, 
                {isBaseLayer: false, opacity: 1, projection: new OpenLayers.Projection("EPSG:900913")});
			
			var pointFeature;
			
			// Construct centroid layer

			style_centroid = {strokeColor: "#00FF00",
                            strokeOpacity: 1,
                            strokeWidth: 3,
                            fillColor: "#00FF00",
                            fillOpacity: 1,
                            pointRadius: 15,
                            pointerEvents: "visiblePainted",
			};

			showData3 = new OpenLayers.Layer.Vector("Analysis_Centroid_" + qnumber.toString(), 
						{isBaseLayer:false}
			);
			showData3.style = style_centroid;

			pointFeature = wkt.read(sp_mean[0]);
    		pointFeature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),
                                      new OpenLayers.Projection("EPSG:900913"));
    		showData3.addFeatures([pointFeature]);
			
			// Construct top 3 OTA layer

			showData2 = new OpenLayers.Layer.Vector("Analysis_OTA_" + qnumber.toString(), {isBaseLayer:false});

			var polygonFeature;
			
			for (var i = 0; i < ota_polygons.length; i++) {
    			polygonFeature = wkt.read(ota_polygons[i].coords);
    			polygonFeature.geometry.transform(new OpenLayers.Projection("EPSG:4326"),
                                      new OpenLayers.Projection("EPSG:900913"));
				style1 = {strokeColor: '#0000ff',
						strokeOpacity: 1,
						strokeWidth: 5,
						fillOpacity: 0.5,
						label: ota_polygons[i].name
 				};
				polygonFeature.style = style1;
    			showData2.addFeatures([polygonFeature]);
			}		
			
			map.addLayers([showData, showData2, showData3]);
			
			qnumber += 1;
		}
	}
	xmlhttp.open("POST", PageToSendTo, true);  
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");  
	xmlhttp.send(params);
}

