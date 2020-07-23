from flask import Blueprint, request, jsonify, Response
from database.models import Address
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource

address_schema = AddressSchema()
addresses_schema = AddressSchema(many=True)


class AddressesApi(Resource):
    @cross_origin()
    def get(self):
        all_addresses = Address.query.all()
        result = addresses_schema.dump(all_addresses)
        return jsonify({'data': result})

    def post(self):
        name = request.json['name']
        new_product = Address(name)
        db.session.add(new_product)
        db.session.commit()
        return address_schema.jsonify({'data': new_product})


class AddressApi(Resource):
    def get(self, id):
        address = Address.query.get(id)
        return address_schema.jsonify(address)

    def put(self, id):
        address = Address.query.get(id)
        name = request.json['name']
        address.name = name
        address.updated_on = db.func.now()
        db.session.commit()
        return address_schema.jsonify({'data': address})

    def delete(self, id):
        address = Address.query.get(id)
        db.session.delete(address)
        db.session.commit()
        return address_schema.jsonify(address)
