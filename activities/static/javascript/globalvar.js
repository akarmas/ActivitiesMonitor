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


/**Adress petascope server is hosted**/
var petascope = "http://localhost:8181/PetaScope/wcps";

var PNGimages = [];

/* GeoExt globals */
var tree;
var mapPanel;
var map;
var mainPanel;
var toolbarItems = [];
var resultsScreen;
var resultsPanelRegular;
var resultsPanelPans;
var tabPanel;
var demoData;

OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/* Help globals */

var wcpsquery;

var tmp_url;

/* Global to count queries executed */

var qnumber = 1;











