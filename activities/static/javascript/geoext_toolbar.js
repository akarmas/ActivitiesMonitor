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
Toolbar
***************/

var ctrl, action, actions = {};
var editControl;

// ZoomToMaxExtent control
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomToMaxExtent(),
    map: map,
    //text: "max extent",
    iconCls:'controls_map_zoomtomapextent',
    tooltip: "Max Extent Map"
});
actions["max_extent"] = action;
toolbarItems.push(action);

// Navigation control
action = new GeoExt.Action({
    //text: "nav",
    iconCls:'controls_map_navigation',
    control: new OpenLayers.Control.Navigation(),
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    pressed: true,
    tooltip: "Map Navigation",
    // check item options
    group: "draw",
    checked: true
});
actions["nav"] = action;
toolbarItems.push(action);

// ZoomBox control
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomBox(),
    map: map,
    toggleGroup: "draw",
    iconCls:'controls_map_zoombox',
    tooltip: "Zoom in Box",
    group: "draw"
});
actions["zoombox"] = action;
toolbarItems.push(action);

// ZoomIn control
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomIn(),
    map: map,
    iconCls:'controls_map_zoomin',
    tooltip: "Zoom-in"
});
actions["zoomin"] = action;
toolbarItems.push(action);

// ZoomOut control
action = new GeoExt.Action({
    control: new OpenLayers.Control.ZoomOut(),
    map: map,
    iconCls:'controls_map_zoomout',
    tooltip: "Zoom-out"
});
actions["zoomout"] = action;
toolbarItems.push(action);

// Navigation history
ctrl = new OpenLayers.Control.NavigationHistory();
map.addControl(ctrl);

action = new GeoExt.Action({
    //text: "previous",
    iconCls:'controls_map_zoomtoprevious',
    control: ctrl.previous,
    disabled: true,
    tooltip: "Previous zoom"
});
actions["previous"] = action;
toolbarItems.push(action);

action = new GeoExt.Action({
    //text: "next",
    iconCls:'controls_map_zoomtonext',
    control: ctrl.next,
    disabled: true,
    tooltip: "Next zoom"
});
actions["next"] = action;
toolbarItems.push(action);
toolbarItems.push("-");

// Measure distance control
action = new GeoExt.Action({
    iconCls:'controls_map_measureline',
    control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
        eventListeners: {
            measure: function(evt) {
                alert("Distance: " + evt.measure + " " + evt.units);
            }
        }
    }),
    map: map,
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Distance Measure",
    group: "draw"
});
actions["measure_distance"] = action;
toolbarItems.push(action);

// Measure area control
action = new GeoExt.Action({
    iconCls:'controls_map_measurearea',
    control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
        eventListeners: {
            measure: function(evt) {
                alert("Area: " + evt.measure + " square " + evt.units);
            }
        }
    }),
    map: map,
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Area measure",
    group: "draw"
});
actions["measure_distance"] = action;
toolbarItems.push(action);

toolbarItems.push("-");

/////////////////////////////
// Draw/Edit Feature controls
/////////////////////////////

/*
action = new GeoExt.Action({
    //text: "draw poly",
    iconCls:'controls_map_drawpolygon',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Polygon,
		{eventListeners:{"featureadded": newPolygonAdded}} //handler newPolygonAdded in gui.js
    ),
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Draw Polygon",
    // check item options
    group: "draw"
});
actions["draw_poly"] = action;
toolbarItems.push(action);
*/

/**
action = new GeoExt.Action({
    //text: "draw line",
    iconCls:'controls_map_drawline',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Path
    ),
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Draw Line",
    // check item options
    group: "draw"
});
actions["draw_line"] = action;
toolbarItems.push(action);

action = new GeoExt.Action({
    //text: "draw point",
    iconCls:'controls_map_drawpoint',
    control: new OpenLayers.Control.DrawFeature(
        vector, OpenLayers.Handler.Point
    ),
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Draw Point",
    // check item options
    group: "draw"
});
actions["draw_point"] = action;
toolbarItems.push(action);
**/

/*
editControl = new OpenLayers.Control.ModifyFeature(vector);

action = new GeoExt.Action({
    iconCls:'controls_map_editfeature',
    control: editControl,
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Process geometry",
    // check item options
    group: "draw",
    handler: function(){
		tophp();
        // var node = layers_tree.getSelectionModel().getSelectedNode();
        // if (node && node.layer instanceof OpenLayers.Layer.Vector) {
            // //app.mapPanel.map.removeLayer(node.layer);
            // editControl.deactivate();
            // editControl.layer = node.layer;
            // editControl.activate();
            // Ext.Msg.alert('Click', node.layer.name);
        // }
        // else {
            // editControl.layer = vector;
        // }
        //Ext.Msg.alert('Click', 'You did something.');
    }
});
actions["edit_features"] = action;
toolbarItems.push(action);

action = new Ext.Action({
    tooltip: "Remove vectors",
    handler: function(){
        clearVector();
		polygonVertices = null; //clear geometry related variables
		resultsScreen.collapse(); //collapse results screen
        resultsPanelRegular.destroy();   //clear results screen from old results
        resultsPanelPans.destroy();
        tabPanel.destroy();
	},
    iconCls: 'controls_map_vectordelete'
});
actions["delete_vector"] = action;
toolbarItems.push(action);
toolbarItems.push("-");
*/

/////////////////////////////
// GetFeatureInfo controls
/////////////////////////////

action = new GeoExt.Action({
    iconCls:'controls_map_getfeatureinfo',
    handler: function(){
        new GeoExt.Popup({
            map: map,
            title: "About ActivitiesMonitor",
            width: 250,
            height: 100,
            layout: 'fit',
            html: "<div><center><p>This application was designed and developed by</p>" +
                      " <p><a href='http://gr.linkedin.com/in/karmas'>Athanasios Karmas</a></p></center></div>",
        }).show();
    }
});
actions["getfeatureinfo"] = action;
toolbarItems.push(action);
toolbarItems.push("-");


/*
action = new GeoExt.Action({
    iconCls:'controls_map_demo',
    control: editControl,
    map: map,
    // button options
    toggleGroup: "draw",
    allowDepress: false,
    tooltip: "Demo",
    handler: function(){
		show_demo();
    }
});
actions["getfeatureinfo"] = action;
toolbarItems.push(action);
*/

/*

///////////////////////////
// Return GeoTiff
///////////////////////////

action = new Ext.Action({
    tooltip: "Return GeoTiff",
    handler: function(){
        get_geotiff()
    },
    iconCls: 'controls_map_download_geotiff'
});
actions["return_geotiff"] = action;
toolbarItems.push(action);
toolbarItems.push("-");

////////////////////////////
// YouTube Link
////////////////////////////

action = new Ext.Action({
    tooltip: "Walkthrough",
    handler: function(){
        var win = window.open("http://youtu.be/7rlqeK60RGA", '_blank');
  		win.focus();        
    },
    iconCls: 'controls_youtube_link'
});
actions["youtube_link"] = action;
toolbarItems.push(action);


*/
