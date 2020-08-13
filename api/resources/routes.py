from .role import RoleApi, RolesApi
from .city import CitiesApi, CityApi
from .country import CountriesApi, CountryApi
from .address import AddressApi, AddressesApi
from .user import UserApi, UsersApi
from .department import DepartmentApi, DepartmentsApi
from .login import LoginApi
from .sqli import SqliApi, SqlisApi
from .xss import XssApi, XssesApi
from .uba import UbaApi


def initialize_routes(api):
    api.add_resource(RolesApi, '/roles')
    api.add_resource(RoleApi, '/roles/<id>')

    api.add_resource(CitiesApi, '/cities')
    api.add_resource(CityApi, '/cities/<id>')

    api.add_resource(CountriesApi, '/countries')
    api.add_resource(CountryApi, '/countries/<id>')

    api.add_resource(AddressesApi, '/addresses')
    api.add_resource(AddressApi, '/addresses/<id>')

    api.add_resource(UsersApi, '/users')
    api.add_resource(UserApi, '/users/<id>')

    api.add_resource(DepartmentsApi, '/departments')
    api.add_resource(DepartmentApi, '/departments/<id>')

    api.add_resource(LoginApi, '/login')

    api.add_resource(SqlisApi, '/sqlis')
    api.add_resource(SqliApi, '/sqlis/<id>')

    api.add_resource(XssesApi, '/xsses')
    api.add_resource(XssApi, '/xsses/<id>')

    api.add_resource(UbaApi, '/uba/<id>')
