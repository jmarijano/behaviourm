from flask import Blueprint, request, jsonify, Response
from database.models import Sqli, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import SqliSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict

sqli_schema = SqliSchema()
sqlis_schema = SqliSchema(many=True)


class SqlisApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_sqlis = Sqli.query.all()
        print("Broj zapisa: " + str(Sqli.query.count()))
        result = sqlis_schema.dump(all_sqlis)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        sqli = Sqli.query.get(id)
        return sqli_schema.jsonify(sqli)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            sqli_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        sqli = Sqli.query.get(id)
        is_sqli = request.json['isSqli']
        sqli.is_sqli = is_sqli
        sqli.updated_on = db.func.now()
        db.session.commit()
        return sqli_schema.jsonify({'data': sqli})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        print(get_jwt_identity())
        sqli = Sqli.query.get(id)
        db.session.delete(sqli)
        db.session.commit()
        return sqli_schema.jsonify(sqli)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
