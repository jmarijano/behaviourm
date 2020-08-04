from flask import Blueprint, request, jsonify, Response
from database.models import User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import UserSchema
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import ValidationError


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class UsersApi(Resource):
    @cross_origin()
    def get(self):
        current_user = get_jwt_identity()
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify({'data': result})

    @cross_origin()
    def post(self):
        try:
            user_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        name = request.json['name']
        surname = request.json['surname']
        email = request.json['email']
        password = request.json['password']
        role_id = request.json['roleId']
        address_id = request.json['addressId']
        department_id = request.json['departmentId']
        new_product = User(name, surname, email, generate_password_hash(
            password, method='sha256'), role_id, address_id, department_id)
        db.session.add(new_product)
        db.session.commit()
        return user_schema.jsonify({'data': new_product})

    @cross_origin()
    def options(self):
        return jsonify()


class UserApi(Resource):
    @cross_origin()
    def get(self, id):
        user = User.query.get(id)
        return user_schema.jsonify(user)

    @cross_origin()
    def put(self, id):
        try:
            user_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        user = User.query.get(id)
        name = request.json['name']
        surname = request.json['surname']
        email = request.json['email']
        password = request.json['password']
        role_id = request.json['roleId']
        address_id = request.json['addressId']
        department_id = request.json['departmentId']
        user.name = name
        user.surname = surname
        user.email = email
        user.password = generate_password_hash(password, method='sha256')
        user.role_id = role_id
        user.address_id = address_id
        user.department_id = department_id
        user.updated_on = db.func.now()
        db.session.commit()
        return user_schema.jsonify({'data': user})

    @cross_origin()
    def delete(self, id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return user_schema.jsonify(user)

    @cross_origin()
    def options(self):
        return jsonify()
