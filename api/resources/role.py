from flask import Blueprint, request, jsonify, Response
from database.models import Role
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import RoleSchema
from flask_restful import Resource
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required

role_schema = RoleSchema()
roles_schema = RoleSchema(many=True)


class RolesApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_roles = Role.query.all()
        result = roles_schema.dump(all_roles)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            role_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        name = request.json['name']
        new_product = Role(name)
        db.session.add(new_product)
        db.session.commit()
        return role_schema.jsonify({'data': new_product})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class RoleApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        role = Role.query.get(id)
        return role_schema.jsonify(role)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            role_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        role = Role.query.get(id)
        name = request.json['name']
        role.name = name
        role.updated_on = db.func.now()
        db.session.commit()
        return role_schema.jsonify({'data': role})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        role = Role.query.get(id)
        db.session.delete(role)
        db.session.commit()
        return role_schema.jsonify(role)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
