
from flask_marshmallow import Marshmallow, fields
from marshmallow import fields
ma = Marshmallow()


def initialize_ma(app):
    ma.init_app(app)


class RoleSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String()
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class CountrySchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String()
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class CitySchema(ma.SQLAlchemyAutoSchema):
    id = fields.Integer()
    name = fields.String()
    country_id = fields.Integer(data_key="countryId")
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class AddressSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    street_name = fields.String(data_key='streetName')
    city_id = fields.Integer(data_key='cityId')
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        fields = ('id', 'name', 'surname', 'email',
                  'role_id', 'created_on', 'updated_on')
