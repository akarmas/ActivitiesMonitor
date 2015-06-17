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


/*****************************
Base Layers and Overlays Tree
*****************************/

var layer_root = new Ext.tree.TreeNode({
    text: 'Thematic Levels',
    expanded: true
});

var base_root = new GeoExt.tree.BaseLayerContainer({
    text: 'Base Layers',
    expanded: true,
    layerStore: new GeoExt.data.LayerStore({
        map: map
    }),
	loader: {
        filter: function(record) {
            return record.get("layer").name != 'Base' && record.get("layer").isBaseLayer == true
        }
    }
});

var overlay_root = new GeoExt.tree.OverlayLayerContainer({
    text: 'Analysis Results',
    expanded: true,
    layerStore: new GeoExt.data.LayerStore({
        map: map
    }),
	loader: {
        filter: function(record) {
            return record.get("layer").name != 'Demo Polygons' && record.get("layer").isBaseLayer == false
        }
    }
});


layer_root.appendChild(base_root);
layer_root.appendChild(overlay_root);


layers_tree = new Ext.tree.TreePanel({
    title: "Layers",
    region: 'west',
    width: 200,
    split: true,
    collapsible: true,
    collapseMode: "mini",
    autoScroll: true,
    root: layer_root,
});

