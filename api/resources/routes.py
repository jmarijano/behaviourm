from .role import RoleApi, RolesApi
from .city import CitiesApi, CityApi
from .country import CountriesApi, CountryApi

def initialize_routes(api):
    api.add_resource(RolesApi, '/roles')
    api.add_resource(RoleApi, '/roles/<id>')

    api.add_resource(CitiesApi,'/cities')
    api.add_resource(CityApi,'/cities/<id>')
    
    api.add_resource(CountriesApi,'/countries')
    api.add_resource(CountryApi,'/countries/<id>')