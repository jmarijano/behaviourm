from .role import RoleApi, RolesApi

def initialize_routes(api):
    api.add_resource(RolesApi, '/roles')
    api.add_resource(RoleApi, '/roles/<id>')