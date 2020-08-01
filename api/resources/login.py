from flask import Blueprint, request, jsonify, Response
from database.models import User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import UserSchema
from flask_restful import Resource

user_schema = UserSchema()
users_schema = UserSchema(many=True)

