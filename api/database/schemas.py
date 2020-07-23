
from flask_marshmallow import Marshmallow

ma = Marshmallow()


def initialize_ma(app):
    ma.init_app(app)


class RoleSchema(ma.Schema):
    class Meta:
        fields = ('name', 'created_on', 'updated_on')


class CountrySchema(ma.Schema):
    class Meta:
        fields = ('name, created_on', 'updated_on')


class CitySchema(ma.Schema):
    class Meta:
        fields = ('name', 'country_id', 'created_on', 'updated_on')


class AddressSchema(ma.Schema):
    class Meta:
        fields=('street_name', 'city_id', 'created_on', 'updated_on')

class UserSchema(ma.Schema):
    class Meta:
        fields= ('name','surname','email','role_id','created_on', 'updated_on')
