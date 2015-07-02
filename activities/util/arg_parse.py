#!/usr/bin/env python

# ***********************************************************************
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
# ************************************************************************/



from activedata.models import *

def query_builder(gender, car, thres1, thres2, weekday, activity):
	
	# gender filter

	if gender == 1:
		with_gender = False
	elif gender == 2:
		with_gender = True
		gend = 'M'
	else:
		with_gender = True
		gend = 'F'
		  
	# car user filter

	if car == 1:
		with_car = True
		ca = 'Yes'
	elif gender == 2:
		with_car = True
		ca = 'No'
	else:
		with_car = False

	# activity filter
	
	if activity == 0:
		ev = 'Home'
	elif activity == 1:
		ev = 'Education'
	elif activity == 2:
		ev = 'Shopping'
	elif activity == 3:
		ev = 'Work'
	elif activity == 4:
		ev = 'Leisure time'
	else:
		ev = 'Other'

	# execute all filters against the database	

	if with_gender and with_car:
		
		res_set = ActiveEntries.objects.all().filter(event=ev).filter(profile__gender=gend).filter(profile__car=ca).filter(profile__age__lte=thres2).filter(profile__age__gte=thres1)
		
		raw_query = 'select * from activedata_ota as ota where ota.id in (select ota.id from activedata_activeentries as entries, activedata_ota as ota, activedata_profiles as prof where entries.profile_id = prof.name and entries.event=\'%s\' and prof.gender=\'%s\' and prof.car=\'%s\' and prof.age<=%s and prof.age>=%s ' %(ev, gend, ca, str(thres2), str(thres1))

	elif with_gender and (not with_car):
		
		res_set = ActiveEntries.objects.all().filter(event=ev).filter(profile__gender=gend).filter(profile__age__lte=thres2).filter(profile__age__gte=thres1)
		
		raw_query = 'select * from activedata_ota as ota where ota.id in (select ota.id from activedata_activeentries as entries, activedata_ota as ota, activedata_profiles as prof where entries.profile_id = prof.name and entries.event=\'%s\' and prof.gender=\'%s\' and prof.age<=%s and prof.age>=%s ' %(ev, gend, str(thres2), str(thres1))

	elif (not with_gender) and with_car:
		
		res_set = ActiveEntries.objects.all().filter(event=ev).filter(profile__car=ca).filter(profile__age__lte=thres2).filter(profile__age__gte=thres1)
		
		raw_query = 'select * from activedata_ota as ota where ota.id in (select ota.id from activedata_activeentries as entries, activedata_ota as ota, activedata_profiles as prof where entries.profile_id = prof.name and entries.event=\'%s\' and prof.car=\'%s\' and prof.age<=%s and prof.age>=%s ' %(ev, ca, str(thres2), str(thres1))

	else:
		
		res_set = ActiveEntries.objects.all().filter(event=ev).filter(profile__age__lte=thres2).filter(profile__age__gte=thres1)
		
		raw_query = 'select * from activedata_ota as ota where ota.id in (select ota.id from activedata_activeentries as entries, activedata_ota as ota, activedata_profiles as prof where entries.profile_id = prof.name and entries.event=\'%s\' and prof.age<=%s and prof.age>=%s  ' %(ev, str(thres2), str(thres1))

	# weekday filter
	
	filtered_out = []
	
	if (weekday >= 0) and (weekday <= 6 ):
		if weekday == 6:
			par = 0
		else:
			par = weekday + 1
		raw_query = raw_query + 'and extract(DOW from entries.timestamp) =' + str(par)
		for item in res_set:
			if item.timestamp.weekday() != weekday:
				filtered_out.append(item.id)
	elif weekday == 7:
		raw_query = raw_query + 'and extract(DOW from entries.timestamp)>=1 and extract(DOW from entries.timestamp)<=5 '
		for item in res_set:
			if item.timestamp.weekday() > 4:
				filtered_out.append(item.id)
	else:
		raw_query = raw_query + 'and (extract(DOW from entries.timestamp)=0 or extract(DOW from entries.timestamp)=6) '
		for item in res_set:
			if item.timestamp.weekday() <= 4:
				filtered_out.append(item.id)
	
	final_set = res_set.exclude(id__in=filtered_out)

	end_raw_query = ' and st_contains(ota.geom, entries.location) group by ota.name_ota, ota.geom, ota.id order by count(*) desc limit 3)'

	raw_query = raw_query + end_raw_query
	
	return final_set, raw_query
