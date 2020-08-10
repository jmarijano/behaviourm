from flask import Blueprint, request, jsonify, Response
from database.models import Address
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict
from ml_models.password_strength_model import func

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class SqliApi(Resource):
    @cross_origin()
    def post(self):
        func()
        return jsonify(hello="World")
