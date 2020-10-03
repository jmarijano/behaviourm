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
        if not username:
            return jsonify(error="Unesite korisnicko ime!"), 500
        if not password:
            return jsonify(error="Unesite lozinku!"), 500
        user = User.query.filter(User.username == username).first()
        if not user:
            return jsonify(error="Korisnik ne postoji"), 404
        if check_password_hash(user.hashed_password, password):
            access_token = create_access_token(identity=user)
            return jsonify(accessToken=access_token)
        else:
            return jsonify(error="Kriva lozinka"), 500

    @cross_origin()
    def options(self):
        return jsonify()
