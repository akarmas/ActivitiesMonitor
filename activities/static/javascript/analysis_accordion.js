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


/*********************
Analysis
**********************/
var gender;
var car_user;
var thres1;
var thres2;
var weekday;
var activity;

var analysis_options = new Ext.form.FormPanel({
	title: 'Analysis Options',
	autoScroll: true,
	padding:5,
	items:[{
		xtype: 'combo',
		fieldLabel: 'Gender',
		fieldLabel: 'Gender',
		store: new Ext.data.SimpleStore({
			data: [
				[1, 'M / F'],
				[2, 'M'],
				[3, 'F'],
			],
			id: 0,
			fields: ['value', 'text']
		}),
		valueField: 'value',
		displayField: 'text',
		triggerAction: 'all',
		mode: 'local',
		width: 70,
        forceSelection: true,
		editable: false,
		listeners: { 
			select: function(combo, records) {
                // note that records are a array of records to be prepared for multiselection
                // therefore use records[0] to access the selected record
				gender = combo.getValue();		
			}
		}
	},
	{
		xtype: 'combo',
		fieldLabel: 'Car User',
		fieldLabel: 'Car User',
		store: new Ext.data.SimpleStore({
			data: [
				[1, 'Car'],
				[2, 'No Car'],
				[3, 'Indifferent'],
			],
			id: 1,
			fields: ['value', 'text']
		}),
		valueField: 'value',
		displayField: 'text',
		triggerAction: 'all',
		mode: 'local',
		width: 70,
        forceSelection: true,
		editable: false,
		listeners: { 
			select: function(combo, records) {
                // note that records are a array of records to be prepared for multiselection
                // therefore use records[0] to access the selected record
				car_user = combo.getValue();		
			}
		}	
	},
	{
		xtype: 'combo',
		fieldLabel: 'Weekday',
		fieldLabel: 'Weekday',
		store: new Ext.data.SimpleStore({
			data: [
				[0, 'Monday'],
				[1, 'Tuesday'],
				[2, 'Wednesday'],
				[3, 'Thursday'],
				[4, 'Friday'],
				[5, 'Saturday'],
				[6, 'Sunday'],
				[7, 'Mon-Fri'],
				[8, 'Weekend'],
			],
			id: 1,
			fields: ['value', 'text']
		}),
		valueField: 'value',
		displayField: 'text',
		triggerAction: 'all',
		mode: 'local',
		width: 70,
        forceSelection: true,
		editable: false,
		listeners: { 
			select: function(combo, records) {
                // note that records are a array of records to be prepared for multiselection
                // therefore use records[0] to access the selected record
				weekday = combo.getValue();		
			}
		}	
	},
	{
		xtype: 'combo',
		fieldLabel: 'Activity',
		fieldLabel: 'Activity',
		store: new Ext.data.SimpleStore({
			data: [
				[0, 'Home'],
				[1, 'Education'],
				[2, 'Shopping'],
				[3, 'Work'],
				[4, 'Leisure time'],
				[5, 'Other']
			],
			id: 1,
			fields: ['value', 'text']
		}),
		valueField: 'value',
		displayField: 'text',
		triggerAction: 'all',
		mode: 'local',
		width: 70,
        forceSelection: true,
		editable: false,
		listeners: { 
			select: function(combo, records) {
                // note that records are a array of records to be prepared for multiselection
                // therefore use records[0] to access the selected record
				activity = combo.getValue();		
			}
		}	
	},
	{
		xtype:'multislider',
		fieldLabel: 'Age',
		horizontal:true,
		height: 20,
		length: 100,
		minvalue:0,
		minvalue:100,
		values:[0, 100],
		plugins : new Ext.slider.Tip(),	
		listeners: {
			change: function(el){ 
				thres1 = el.thumbs[0].value;
				thres2 = el.thumbs[1].value;
			}	
		}
	}
	],
	buttons: [{
		text: 'Analyze',
		handler: function(){
			if(gender == null || car_user == null || thres1 == null || thres2 == null
					|| weekday == null || activity == null) {
				alert('All analysis options must be set.\n Check them again.');
				return;
			}
			analysis();
		}
	}]
});


