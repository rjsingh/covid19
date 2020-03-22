import json
import os
import inflect
from tabulate import tabulate
import urllib.request
from geopy import distance
from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="Nominatim", timeout=10)
def getClosestCouncil(loc, counties):
    cache_file = "location_cache.json"
    countiesLoc = {}

    if os.path.isfile(cache_file):
        print("Using cache file...")
        with open(cache_file, 'r') as f:
            countiesLoc = json.load(f)
    else:
        print("Downloading data...")
        # get lat/long of all counties
        for i, c in enumerate(counties):
            l = geolocator.geocode(c)
            countiesLoc[c] = {"latitude": l.latitude, "longitude": l.longitude}
        # cache it for next time.
        with open(cache_file, 'w') as f:
            f.write(json.dumps(countiesLoc))
    
    # now calculate distance between 'loc' and each of these counties
    countiesDist = {}
    for name, countieLoc in countiesLoc.items():
        dist = distance.distance((loc.latitude, loc.longitude),
                                 (countieLoc['latitude'], countieLoc['longitude'])).miles
        countiesDist[name] = dist
    
    # now sort countieLoc by distance (value)
    return {k:v for k, v in sorted(countiesDist.items(), key=lambda item: item[1])}

def getCovid19Data():
    content = urllib.request.urlopen('https://www.arcgis.com/sharing/rest/content/items/b684319181f94875a6879bbc833ca3a6/data').read()
    content = content.decode('utf-8')
    content = content.splitlines(True)
    countyMap = {}
    for line in content[1:]:
        parts = line.split(',')
        del parts[0]
        county = ",".join(parts[:-1])
        county = county.strip().replace("\"", "")
        cases = "".join(parts[-1:]).strip()
        countyMap[county] = int(cases)
    
    return {k:v for k, v in sorted(countyMap.items(), key=lambda item: item[1])}

def getRanks(countyMap):
    # Rank counties by number affected.
    rank = {}
    cases = sorted(list(set(countyMap.values())), reverse=True)
    for idx, c in enumerate(cases):
        rank[c] = idx
    return rank

countyMap = getCovid19Data()
ranks = getRanks(countyMap)
print("Total: %s" % (str(sum(countyMap.values()))))

myLocation = geolocator.geocode("Cambridge")
closestCouncil = getClosestCouncil(myLocation, countyMap.keys())

# format data for displaying nicely in command line.
outputData = []
word_engine = inflect.engine()
for county, dist in closestCouncil.items():
    cases = countyMap[county]
    outputData.append([county, cases, word_engine.ordinal(ranks[cases]), "%.2f" % dist])

print(tabulate(outputData, headers=["Location", "Cases", "Rank", "Distance to you"]))