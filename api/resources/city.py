from flask import Blueprint, request, jsonify, Response
from database.models import City
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import CitySchema
from flask_restful import Resource
import json
import sys
from marshmallow import ValidationError

city_schema = CitySchema()
cities_schema = CitySchema(many=True)


class CitiesApi(Resource):
    @cross_origin()
    def get(self):
        all_cities = City.query.all()
        print(City.query.count())
        result = cities_schema.dump(all_cities)
        return jsonify({'data': result})

    @cross_origin()
    def post(self):
        try:
            city_schema.load(request.json)
        except ValidationError as err:
            print (err.messages)
            return jsonify(err.messages), 404
        name = request.json['name']
        country_id = request.json['countryId']
        new_product = City(name, country_id)
        db.session.add(new_product)
        db.session.commit()
        return city_schema.jsonify({'data': new_product})

    @cross_origin()
    def options(self):
        return jsonify()


class CityApi(Resource):
    @cross_origin()
    def get(self, id):
        city = City.query.get(id)
        return city_schema.jsonify(city)

    @cross_origin()
    def put(self, id):
        try:
            city_schema.load(request)
        except ValidationError as err:
            return jsonify(err.messages), 404
        city = City.query.get(id)
        name = request.json['name']
        country_id = request.json['countryId']
        city.name = name
        city.country_id = country_id
        city.updated_on = db.func.now()
        db.session.commit()
        return city_schema.jsonify({'data': city})

    @cross_origin()
    def delete(self, id):
        city = City.query.get(id)
        db.session.delete(city)
        db.session.commit()
        return city_schema.jsonify(city)

    @cross_origin()
    def options(self):
        return jsonify()
