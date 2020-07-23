from flask import Blueprint, request, jsonify, Response
from database.models import User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import UserSchema
from flask_restful import Resource

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class UsersApi(Resource):
    @cross_origin()
    def get(self):
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify({'data': result})

    def post(self):
        name = request.json['name']
        new_product = User(name)
        db.session.add(new_product)
        db.session.commit()
        return user_schema.jsonify({'data': new_product})


class UserApi(Resource):
    def get(self, id):
        user = User.query.get(id)
        return user_schema.jsonify(user)

    def put(self, id):
        user = User.query.get(id)
        name = request.json['name']
        user.name = name
        user.updated_on = db.func.now()
        db.session.commit()
        return user_schema.jsonify({'data': user})

    def delete(self, id):
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return user_schema.jsonify(user)
