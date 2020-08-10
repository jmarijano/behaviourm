from flask import Blueprint, request, jsonify, Response
from database.models import City, Sqli, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import CitySchema
from flask_restful import Resource
import json
import sys
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict

city_schema = CitySchema()
cities_schema = CitySchema(many=True)


class CitiesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_cities = City.query.all()
        print(City.query.count())
        result = cities_schema.dump(all_cities)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            city_schema.load(request.json)
        except ValidationError as err:
            print(err.messages)
            return jsonify(err.messages), 500
        name = request.json['name']
        country_id = request.json['countryId']
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
        value = predict(name)
        new_product = City(name, country_id)
        new_sqli = Sqli(value, user_id, False)
        db.session.add(new_sqli)
        db.session.add(new_product)
        value = predict(str(country_id))
        new_sqli = Sqli(value, user_id, False)
        db.session.add(new_sqli)
        db.session.commit()
        return city_schema.jsonify({'data': new_product})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class CityApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        city = City.query.get(id)
        return city_schema.jsonify(city)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            city_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        city = City.query.get(id)
        name = request.json['name']
        country_id = request.json['countryId']
        city.name = name
        city.country_id = country_id
        city.updated_on = db.func.now()
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
        value = predict(name)
        new_sqli = Sqli(value, user_id, False)
        db.session.add(new_sqli)
        value = predict(str(country_id))
        new_sqli = Sqli(value, user_id, False)
        db.session.commit()
        return city_schema.jsonify({'data': city})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        city = City.query.get(id)
        db.session.delete(city)
        db.session.commit()
        return city_schema.jsonify(city)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
