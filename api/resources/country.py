from flask import Blueprint, request, jsonify, Response
from database.models import Country, Sqli, User, Xss
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import CountrySchema
from flask_restful import Resource
from sqlalchemy import func
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict_sqli
from ml_models.xss_model import predict_xss

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)


class CountriesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_countries = Country.query.all()
        result = countries_schema.dump(all_countries)
        return jsonify(
            data=result,
        )

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            country_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        name = request.json['name']
        new_product = Country(name)
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
        value = predict_sqli(name)
        xss_value = predict_xss(name)
        db.session.add(new_product)
        new_sqli = Sqli(value, user_id, False, name)
        new_xss = Xss(xss_value, user_id, False, name)
        db.session.add(new_sqli)
        db.session.add(new_xss)
        db.session.commit()
        return country_schema.jsonify({'data': new_product})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class CountryApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        country = Country.query.get(id)
        print(country.cities[0].name)
        return country_schema.jsonify(country)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            country_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        country = Country.query.get(id)
        name = request.json['name']
        country.name = name
        country.updated_on = db.func.now()
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
        value = predict_sqli(name)
        xss_value = predict_xss(name)
        new_sqli = Sqli(value, user_id, False, name)
        new_xss = Xss(xss_value, user_id, False, name)
        db.session.add(new_sqli)
        db.session.add(new_xss)
        db.session.commit()
        return country_schema.jsonify({'data': country})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        country = Country.query.get(id)
        db.session.delete(country)
        db.session.commit()
        return country_schema.jsonify(country)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
