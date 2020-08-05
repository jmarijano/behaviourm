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


class LoginApi(Resource):
    @cross_origin()
    def post(self):
        try:
            user_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
            pass
        username = request.json['username']
        password = request.json['password']
        user = User.query.filter(User.username == username).first()
        if not user:
            return jsonify("User not found"), 404
        if check_password_hash(user.password, password):
            user.password = ''
            user = user_schema.dump(user)
            print(user)
            return user_schema.jsonify(user)
        else:
            return jsonify("Wrong password"), 500
