import json
import os
import inflect
from tabulate import tabulate
import urllib.request
from geopy import distance
from geopy.geocoders import Nominatim
from flask import Flask, jsonify, render_template

def getClosestCouncil(loc, counties):
    geolocator = Nominatim(user_agent="Nominatim",
                           timeout=10,
                           format_string="%s, UK")
    cache_file = "location_cache.json"
    countiesLoc = {}

    if os.path.isfile(cache_file):
        with open(cache_file, 'r') as f:
            countiesLoc = json.load(f)
    else:
        # get lat/long of all counties
        for i, c in enumerate(counties):
            l = geolocator.geocode(c)
            countiesLoc[c] = {"latitude": l.latitude, "longitude": l.longitude}
        # cache it for next time.
        with open(cache_file, 'w') as f:
            f.write(json.dumps(countiesLoc))

    # now calculate distance between 'loc' and each of these counties
    countiesDist = {name:0 for name in countiesLoc.keys()}
    if loc:
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
        cases = cases.replace(",", "")
        countyMap[county] = int(cases)

    return {k:v for k, v in sorted(countyMap.items(), key=lambda item: item[1])}

def getRanks(countyMap):
    # Rank counties by number affected.
    rank = {}
    cases = sorted(list(set(countyMap.values())), reverse=True)
    for idx, c in enumerate(cases):
        rank[c] = idx+1
    return rank

def getCovid19Numbers(locationName):
    geolocator = Nominatim(user_agent="Nominatim", timeout=10)
    countyMap = getCovid19Data()
    ranks = getRanks(countyMap)
    myLocation = None
    if locationName:
        myLocation = geolocator.geocode(locationName)
    closestCouncil = getClosestCouncil(myLocation, countyMap.keys())

    # format data for displaying nicely in command line.
    outputData = []
    word_engine = inflect.engine()
    for county, dist in closestCouncil.items():
        cases = countyMap[county]
        outputData.append({'county': county, 'cases': cases,
                           'rank': word_engine.ordinal(ranks[cases]),
                           'distance': "%.2f" % dist})

    if not myLocation:
        # if user didn't provide a location then return items sorted by number of cases
        outputData = sorted(outputData, key=lambda item: item['cases'], reverse=True)

    return { "your_location": myLocation.address if myLocation else "<unknown location>", "data": outputData }

app = Flask(__name__, static_folder='/app/static', template_folder='/app/')

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/location/")
@app.route("/location/<location>")
def getLocation(location=None):
    print(location)
    response = jsonify(getCovid19Numbers(location))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/total")
def getTotalNumberOfCases():
    countyMap = getCovid19Data()
    return str(sum(countyMap.values()))