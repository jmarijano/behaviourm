
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
    username = fields.String(validate=must_not_be_blank)
    password = fields.String(validate=must_not_be_blank)
    role_id = fields.Integer(data_key='roleId', validate=must_not_be_blank)
    department_id = fields.Integer(
        data_key='departmentId', validate=must_not_be_blank)
    address_id = fields.Integer(
        data_key='addressId', validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class DepartmentSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    name = fields.String()
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class SqliSchema(ma.SQLAlchemySchema):
    id = fields.Integer()
    user_id = fields.Integer(data_key='userId', validate=must_not_be_blank)
    text = fields.String(data_key="text", validate=must_not_be_blank)
    value = fields.Float(data_key='value', validate=must_not_be_blank)
    is_sqli = fields.Boolean(data_key='isSqli', validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')


class XssSchema():
    id = fields.Integer()
    user_id = fields.Integer(data_key='userId', validate=must_not_be_blank)
    text = fields.String(data_key="text", validate=must_not_be_blank)
    value = fields.Float(data_key='value', validate=must_not_be_blank)
    is_sqli = fields.Boolean(data_key='isSqli', validate=must_not_be_blank)
    created_on = fields.DateTime(data_key='createdOn')
    updated_on = fields.DateTime(data_key='updatedOn')
