import json
from random import *

minLat = 29   # bottom
maxLat = 45   # top
minLng = -122 # left
maxLng = -77  # right

maxHeat = 10000

dataPointCount = 1000

def main():
  data = []

  for i in range(0, dataPointCount):
    data.append({
      "lat": uniform(minLat, maxLat),
      "lng": uniform(minLng, maxLng),
      "value": uniform(0, maxHeat)
    })

  with open('../app/data/jsonPollutionData.json', 'w+') as jsonFile:
    json.dump(data, jsonFile, indent=4)

if __name__ == "__main__":
  main()
