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


/*********************
Legend panel
**********************/

var layerRec; // hold here what legends will be shown in the panel

// hide legends from panel for layers 6=greek cadastral and 10=help vectors
// see map_panel.js for the layer numbers
//layerRec = mapPanel.layers.getAt(3);
//layerRec.set("hideInLegend", true);

// use empty layer as base to show all necessary legends as one png image
layerRec = mapPanel.layers.getAt(1);
//layerRec.set("legendURL", "/static/images/newlegends.png");

var legend_panel = new GeoExt.LegendPanel({
    map: map,
    title: 'Legend',
    autoScroll: true,
	padding: 5,
    defaults: {
        style: 'padding:5px',           
        baseParams: {
            format: 'image/png',
            }
        }
    });
