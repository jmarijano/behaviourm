import json

def kae():
    with open('MOCK_DATA.json') as json_file:
        data = json.load(json_file)
        for p in data['data']:
            print('Name: '+ p['name'])
            print('Country_id: '+p['country_id'])