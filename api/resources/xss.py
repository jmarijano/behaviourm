from flask import Blueprint, request, jsonify, Response
from database.models import Xss, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import SqliSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict

xss_schema = SqliSchema()
xsses_schema = SqliSchema(many=True)


class XssesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_xss = Xss.query.all()
        print("Broj zapisa: " + str(Xss.query.count()))
        result = xsses_schema.dump(all_xss)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        xss = Xss.query.get(id)
        return xss_schema.jsonify(xss)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            xss_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        xss = Xss.query.get(id)
        is_sqli = request.json['isSqli']
        xss.is_sqli = is_sqli
        xss.updated_on = db.func.now()
        db.session.commit()
        return xss_schema.jsonify({'data': xss})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        print(get_jwt_identity())
        xss = Xss.query.get(id)
        db.session.delete(xss)
        db.session.commit()
        return xss_schema.jsonify(xss)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
