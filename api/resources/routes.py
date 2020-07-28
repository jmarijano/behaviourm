from .role import RoleApi, RolesApi
from .city import CitiesApi, CityApi
from .country import CountriesApi, CountryApi
from .address import AddressApi,AddressesApi
from .user import UserApi,UsersApi


def initialize_routes(api):
    api.add_resource(RolesApi, '/roles')
    api.add_resource(RoleApi, '/roles/<id>')

    api.add_resource(CitiesApi, '/cities')
    api.add_resource(CityApi, '/cities/<id>')

    api.add_resource(CountriesApi, '/countries')
    api.add_resource(CountryApi, '/countries/<id>')

    api.add_resource(AddressesApi,'/addresses')
    api.add_resource(AddressApi,'/addresses/<id>')

    api.add_resource(UsersApi,'/users')
    api.add_resource(UserApi,'/users/<id>')
