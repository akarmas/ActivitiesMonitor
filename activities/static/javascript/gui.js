/***********************************************************************
# Copyright (C) 2015 Thanasis Karmas <thanasis.karmas@gmail.com>
# Copyright (C) 2014 Thanasis Karmas <thanasis.karmas@gmail.com>
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


var polygonVertices;	//hold coordinates in EPSG:4326	
var polVert; 			//hold coordinates in EPSG:900913

function newPolygonAdded (evt) 
{
	alert('Polygon completed.\nHit Process geometry to continue or Remove Vectors to abort.');
	
	polVert = vector.features[0].geometry.getBounds();
	polygonVertices = polVert.clone().transform(map.getProjectionObject(),
                new OpenLayers.Projection("EPSG:4326"));
	editControl.deactivate(); //stops the drawing
}

function initdragwindows()
{
	$.getScript('http://code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
		 $('#indatabase')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
	});
	$.getScript('http://code.jquery.com/ui/1.10.3/jquery-ui.js', function() {
		 $('#tasks')
            .draggable({ containment: "parent", distance: 1, handle: "#title-wrapper" });
	});
}
