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

import sys,os
import string

from rasdaman import *



def main(argv):
	
	name = argv[1] # name of the xls activities file
	name_csv = name.strip('xls') + 'csv'

	#command = "ssconvert %s %s" %(name, name_csv)
	#p = os.popen(command)
	#p.close()

	psql = PsQL("activities_project", "djangouser")
	
	with open(name_csv, "r+") as dfile :
		entryid = 0
		prof_state = ''
		for line in dfile:

			if 'DATE,TIME' in line:
				continue

			line = line.replace('"', '').strip('\n').split(',')

			# get profile

			profile = line[8]

			# get origin
			event = line[4]
			origin = line[6]

			# check if profile already exists

			test = psql.get("select name from activedata_profiles where name = \'" + profile + "\' ")

			# if not insert profile

			if not (test == profile):
				psql.do("insert into activedata_profiles (name, age, gender, car) values ( \'" + line[8]  + "\'," + line[9] + ",\'" + line[10] + "\',\'" + line[11] + "\')")

			# insert activity entry

			if (event == origin) or (prof_state != profile):
				entryid = psql.get("insert into activedata_activeentries (timestamp, event, transport, comment, location, origin_id, profile_id )  values ( \'" + line[0].replace('/', '-') + " " + line[1]  + "\',\'" + line[4] + "\',\'" + line[5] + "\',\'" + line[7]  + "\',ST_GeomFromText(\'POINT(" + line[2] + " " + line[3] + ")\', 4326), NULL, \'" + line[8] + "\' ) returning id")
			else:
				entryid = psql.get("insert into activedata_activeentries (timestamp, event, transport, comment, location, origin_id, profile_id )  values ( \'" + line[0].replace('/', '-') + " " + line[1]  + "\',\'" + line[4] + "\',\'" + line[5] + "\',\'" + line[7]  + "\',ST_GeomFromText(\'POINT(" + line[2] + " " + line[3] + ")\', 4326)," + entryid + ", \'" + line[8] + "\' ) returning id")
			
			prof_state = profile


if __name__ == "__main__":
	main(sys.argv)
