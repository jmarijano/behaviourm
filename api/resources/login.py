from flask import Blueprint, request, jsonify, Response
from database.models import User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import UserSchema
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from marshmallow import ValidationError
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class LoginApi(Resource):
    @cross_origin()
    def post(self):
        username = request.get_json().get('username')
        password = request.get_json().get('password')
        if not username or not password:
            return jsonify(error="Wrong request"),500
        user = User.query.filter(User.username == username).first()
        if not user:
            return jsonify(error="User not found"), 404
        if check_password_hash(user.hashed_password, password):
            access_token = create_access_token(identity=username)
            return jsonify(accessToken=access_token)
        else:
            return jsonify(error="Wrong password"), 500

    @cross_origin()
    def options(self):
        return jsonify()
