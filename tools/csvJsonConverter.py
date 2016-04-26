import csv
import json

id = 0
owner = 1
lat = 2
lng = 3
state = 4
city = 5

def main():
  # Open new file
  with open('../data/welldata.csv', 'rU') as csvFile:
    csvData = csv.reader(csvFile)

    states = {}
    data = []

    for i, row in enumerate(csvData):
      if row[state] not in states:
        states[row[state]] = 0

      if states[row[state]] >= -1:
        rowData = {
          "id":row[id],
          "owner":row[owner],
          "lat":row[lat],
          "lng":row[lng],
          "state":row[state],
          "city":row[city]
        }
        data.append(rowData)

        states[row[state]] += 1

    with open('../data/jsonWelldata.json', 'w+') as jsonFile:
      json.dump(data, jsonFile, indent=4)

if __name__ == "__main__":
  main()
