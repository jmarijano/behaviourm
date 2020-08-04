from flask import Blueprint, request, jsonify, Response
from database.models import Country
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import CountrySchema
from flask_restful import Resource
from sqlalchemy import func
from marshmallow import ValidationError

country_schema = CountrySchema()
countries_schema = CountrySchema(many=True)


class CountriesApi(Resource):
    @cross_origin()
    def get(self):
        all_countries = Country.query.all()
        result = countries_schema.dump(all_countries)
        return jsonify(
            data=result,
        )

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

    @cross_origin()
    def options(self):
        return jsonify()


class CountryApi(Resource):

    @cross_origin()
    def get(self, id):
        country = Country.query.get(id)
        print(country.cities[0].name)
        return country_schema.jsonify(country)

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

    @cross_origin()
    def delete(self, id):
        country = Country.query.get(id)
        db.session.delete(country)
        db.session.commit()
        return country_schema.jsonify(country)

    @cross_origin()
    def options(self):
        return jsonify()
