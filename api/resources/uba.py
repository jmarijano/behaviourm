from flask import Blueprint, request, jsonify, Response
from database.models import Address, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict
from ml_models.password_strength_model import predict_password_strength
from sqlalchemy.sql import func
from sqlalchemy import text


class SqliAnomalyDepartment(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        print(user.department_id)
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'INNER JOIN department d ON (d.id = u.department_id) '
            'WHERE d.id= :tDId '
            'AND s.user_id != :tUserId')
        result = db.engine.execute(
            sql, tDId=user.department_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})


class SqliAnomalyUser(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql_last=text(
            'SELECT * '
            'FROM SQLI s '
            'WHERE s.user_id = :tUserId '
            'ORDER BY s.id DESC '
            'LIMIT 1'
        )
        result_last=db.engine.execute(sql_last,tUserId=user.id)
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'WHERE u.id = :tUserId')
        result = db.engine.execute(sql, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})


class SqliAnomalyRole(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'INNER JOIN role r ON (r.id = u.role_id) '
            'WHERE r.id = :tRoleId '
            'AND s.user_id != :tUserId'
        )
        result = db.engine.execute(
            sql, tRoleId=user.role_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

class XssAnomalyDepartment(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'INNER JOIN department d ON (d.id = u.department_id) '
            'WHERE d.id= :tDId '
            'AND X.user_id != :tUserId')
        result = db.engine.execute(
            sql, tDId=user.department_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

class XssAnomalyUser(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'WHERE u.id = :tUserId')
        result = db.engine.execute(sql, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

class XssAnomalyRole(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM Xss x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'INNER JOIN role r ON (r.id = u.role_id) '
            'WHERE r.id = :tRoleId '
            'AND x.user_id != :tUserId'
        )
        result = db.engine.execute(
            sql, tRoleId=user.role_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})