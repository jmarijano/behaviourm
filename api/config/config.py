import configparser

config = configparser.ConfigParser()
config.read('assets/config.ini')


def dohvati_value(section, key):
    return config[section][key]


def zapisi(section, key, value):
    config.set(section, key, value)
    with open('assets/config.ini', 'w') as file:
        config.write(file)
