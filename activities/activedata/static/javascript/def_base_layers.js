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
Base Layers
***************/

var empty_base = new OpenLayers.Layer("Base",{isBaseLayer: true, numZoomLevels: 30, projection:new OpenLayers.Projection("EPSG:900913")});

var osm = new OpenLayers.Layer.OSM("OpenStreetMap");


var ghyb = new OpenLayers.Layer.Google(
    "Google Hybrid",
    {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22, visibility: false}
);

                          
