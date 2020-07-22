from flask import Blueprint, request, jsonify, Response
from database.models import Role
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import RoleSchema
from flask_restful import Resource

role_schema = RoleSchema()
roles_schema= RoleSchema(many=True)

class RolesApi(Resource):
    @cross_origin()
    def get(self):
        all_roles=Role.query.all()
        result = roles_schema.dump(all_roles)
        return jsonify({'data':result})

    def post(self):
        name = request.json['name']
        new_product=Role(name)
        db.session.add(new_product)
        db.session.commit()
        return role_schema.jsonify({'data':new_product})

class RoleApi(Resource):
    def get(self,id):
        role = Role.query.get(id)
        return role_schema.jsonify(role)

    def put(self,id):
        role = Role.query.get(id)
        name = request.json['name']
        role.name=name
        role.updated_on = db.func.now()
        db.session.commit()
        return role_schema.jsonify({'data':role})

    def delete(self,id):
        role = Role.query.get(id)
        db.session.delete(role)
        db.session.commit()
        return role_schema.jsonify(role)