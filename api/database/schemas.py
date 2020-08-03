
from flask_marshmallow import Marshmallow, fields
from marshmallow import fields, ValidationError
ma = Marshmallow()


def initialize_ma(app):
    ma.init_app(app)


def must_not_be_blank(data):
    if not data:
        raise ValidationError("Data not provided")


class RoleSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String(validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class CountrySchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String(validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class CitySchema(ma.SQLAlchemyAutoSchema):
    id = fields.Integer()
    name = fields.String(validate=must_not_be_blank)
    country_id = fields.Integer(
        data_key="countryId", validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class AddressSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    street_name = fields.String(
        data_key='streetName', validate=must_not_be_blank)
    city_id = fields.Integer(data_key='cityId', validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class UserSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String(validate=must_not_be_blank)
    surname = fields.String(validate=must_not_be_blank)
    email = fields.Email(validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')
    
