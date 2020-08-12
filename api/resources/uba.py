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
from ml_models.password_strength_model import predict_password_strength

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class SqliApi(Resource):
    @cross_origin()
    def post(self):
        predict_password_strength("12312312312312312asdasdq2312464sdfvcvnbbhzj!2qer$#%#$%#$%")
        return jsonify(hello="World")
