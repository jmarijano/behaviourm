from flask import Blueprint, request, jsonify, Response
from database.models import Address, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict
from ml_models.password_strength_model import predict_password_strength

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class SqliAnomaly(Resource):
    @cross_origin()
    def get(self, id):
        user = User.query.filter(User.id == id).filter.first()
        print(user.name)
        predict_password_strength(
            "12312312312312312asdasdq2312464sdfvcvnbbhzj!2qer$#%#$%#$%")
        return jsonify(hello="World")


class SqliAnomalyDepartment(Resource):
    @cross_origin()
    def post(self, id):
        print("kae")


class SqliAnomalyUser(Resource):
    @cross_origin()
    def get(self, id):
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
