import configparser

config = configparser.ConfigParser()
config.read('assets/config.ini')

def dohvati_value(section, key):
    return config[section][key]

