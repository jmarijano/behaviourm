from flask import Blueprint, request, jsonify, Response
from database.models import Country
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import CountrySchema
from flask_restful import Resource
from sqlalchemy import func
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)


class CountriesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_countries = Country.query.all()
        result = countries_schema.dump(all_countries)
        for country in all_countries:
            print(country.cities.all())
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
        db.session.add(new_product)
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
