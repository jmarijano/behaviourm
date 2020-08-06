from flask import Blueprint, request, jsonify, Response
from database.models import Address
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class AddressesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_addresses = Address.query.all()
        print("Broj zapisa: " + str(Address.query.count()))
        result = addresses_schema.dump(all_addresses)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            address_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        street_name = request.json['streetName']
        city_id = request.json['cityId']
        print(street_name, city_id)
        new_product = Address(street_name, city_id)
        db.session.add(new_product)
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
        db.session.commit()
        return address_schema.jsonify({'data': address})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        address = Address.query.get(id)
        db.session.delete(address)
        db.session.commit()
        return address_schema.jsonify(address)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
