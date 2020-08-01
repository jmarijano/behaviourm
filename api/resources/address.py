from flask import Blueprint, request, jsonify, Response
from database.models import Address
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class AddressesApi(Resource):
    @cross_origin()
    def get(self):
        all_addresses = Address.query.all()
        print("Broj zapisa: " + str(Address.query.count()))
        result = addresses_schema.dump(all_addresses)
        return jsonify({'data': result})

    @cross_origin()
    def post(self):
        street_name = request.json['street_name']
        city_id = request.json['city_id']
        new_product = Address(street_name, city_id)
        db.session.add(new_product)
        db.session.commit()
        return address_schema.jsonify({'data': new_product})


class AddressApi(Resource):
    @cross_origin()
    def get(self, id):
        address = Address.query.get(id)
        return address_schema.jsonify(address)

    @cross_origin()
    def put(self, id):
        address = Address.query.get(id)
        street_name = request.json['street_name']
        city_id = request.json['city_id']
        address.street_name = street_name
        address.updated_on = db.func.now()
        db.session.commit()
        return address_schema.jsonify({'data': address})

    @cross_origin()
    def delete(self, id):
        address = Address.query.get(id)
        db.session.delete(address)
        db.session.commit()
        return address_schema.jsonify(address)
