from .role import RoleApi, RolesApi
from .city import CitiesApi, CityApi
from .country import CountriesApi, CountryApi
from .address import AddressApi, AddressesApi
from .user import UserApi, UsersApi
from .department import DepartmentApi, DepartmentsApi
from .login import LoginApi
from .sqli import SqliApi, SqlisApi
from .xss import XssApi, XssesApi
from .uba import (SqliAnomalyDepartmentUser, SqliAnomalyUser, SqliAnomalyRoleUser,
                  XssAnomalyDepartmentUser, XssAnomalyUser,
                  XssAnomalyRoleUser, PasswordStrengthDepartment,
                  SqliUserAverage, XssUserAverage, XssDepartmentAverage,
                  SqliDepartmentAverage, XssRoleAverage, SqliRoleAverage, Evaluation,
                  PasswordStrengthRole)
from .config_resource import SqliConfig, XssConfig, PasswordConfig


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

    api.add_resource(SqliAnomalyDepartmentUser, '/uba/sqli/department/user')
    api.add_resource(SqliAnomalyUser, '/uba/sqli/user')
    api.add_resource(SqliAnomalyRoleUser, '/uba/sqli/role/user')
    api.add_resource(SqliUserAverage, '/uba/sqli/user/average')
    api.add_resource(SqliDepartmentAverage, '/uba/sqli/department')
    api.add_resource(SqliRoleAverage, '/uba/sqli/role')

    api.add_resource(XssAnomalyDepartmentUser, '/uba/xss/department/user')
    api.add_resource(XssAnomalyUser, '/uba/xss/user')
    api.add_resource(XssAnomalyRoleUser, '/uba/xss/role/user')
    api.add_resource(XssUserAverage, '/uba/xss/user/average')
    api.add_resource(XssRoleAverage, '/uba/xss/role')
    api.add_resource(XssDepartmentAverage, '/uba/xss/department')

    api.add_resource(PasswordStrengthDepartment,
                     '/uba/passwordStrenght/department')
    api.add_resource(PasswordStrengthRole,
                     '/uba/passwordStrenght/role')
    api.add_resource(Evaluation, '/uba/evaluation')

    api.add_resource(SqliConfig, '/config/sqli')
    api.add_resource(XssConfig, '/config/xss')
    api.add_resource(PasswordConfig, '/config/password')
