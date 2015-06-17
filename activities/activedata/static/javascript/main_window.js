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
Main Ext Call
***************/

Ext.onReady(function() {

    new Ext.Viewport({
        layout: "fit",
        hideBorders: true,
        items: {
            layout: "border",
            deferredRender: false,
            items: [mapPanel,
            {
                xtype: 'panel',
                border:true,
                region: 'west',
                id:'map_panel',
                title: 'Options',
                width: 200,
                layout: 'accordion',
                collapsible: true,
                collapseMode: "mini",
                resizable:true,
                activeItem: 0,
                layoutConfig: {
                    animate: true,
                    sequence: true
                },
                items:[layers_tree, analysis_options, legend_panel]
            }]
        }
    });

});
