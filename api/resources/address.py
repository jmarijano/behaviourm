from flask import Blueprint, request, jsonify, Response
from database.models import Address, Sqli, User, Xss
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required, get_jwt_claims
from ml_models.sqli_model import predict_sqli
from ml_models.xss_model import predict_xss

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class AddressesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        username = get_jwt_identity()
        claims = get_jwt_claims()
        print(claims)
        all_addresses = Address.query.all()
        result = addresses_schema.dump(all_addresses)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            address_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        username = get_jwt_identity()
        claims = get_jwt_claims()
        print(claims)
        user_id = User.query.filter(User.username == username).first().id
        street_name = request.json['streetName']
        city_id = request.json['cityId']
        value = predict_sqli(street_name)
        xss_value = predict_xss(street_name)
        new_product = Address(street_name, city_id)
        new_sqli = Sqli(value, user_id, False, street_name)
        new_xss = Xss(xss_value, user_id, False, street_name)
        db.session.add(new_sqli)
        db.session.add(new_xss)
        db.session.add(new_product)
        value = predict_sqli(str(city_id))
        new_sqli = Sqli(value, user_id, False, str(city_id))
        #db.session.add(new_sqli)
        db.session.add(new_xss)
        db.session.commit()
        return address_schema.jsonify({'data': new_product})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class AddressApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        address = Address.query.get(id)
        return address_schema.jsonify(address)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            address_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        address = Address.query.get(id)
        street_name = request.json['streetName']
        city_id = request.json['cityId']
        address.street_name = street_name
        address.city_id = city_id
        address.updated_on = db.func.now()
        username = get_jwt_identity()
        user_id = User.query.filter(User.username == username).first().id
        value = predict_sqli(street_name)
        new_sqli = Sqli(value, user_id, False, street_name)
        xss_value = predict_xss(street_name)
        new_xss = Xss(xss_value, user_id, False, street_name)
        db.session.add(new_xss)
        db.session.add(new_sqli)
        value = predict_sqli(str(city_id))
        #new_sqli = Sqli(value, user_id, False, str(city_id))
        #db.session.add(new_sqli)
        db.session.commit()
        return address_schema.jsonify({'data': address})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        print(get_jwt_identity())
        address = Address.query.get(id)
        db.session.delete(address)
        db.session.commit()
        return address_schema.jsonify(address)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
