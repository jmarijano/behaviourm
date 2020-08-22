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
from werkzeug.security import check_password_hash


class SqliAnomalyDepartmentUser(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value, d.name AS name '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'INNER JOIN department d ON (d.id = u.department_id) '
            'WHERE d.id= :tDId '
            'AND s.user_id != :tUserId')
        result = db.engine.execute(
            sql, tDId=user.department_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliAnomalyUser(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql_last = text(
            'SELECT * '
            'FROM SQLI s '
            'WHERE s.user_id = :tUserId '
            'ORDER BY s.id DESC '
            'LIMIT 1'
        )
        result_last = db.engine.execute(sql_last, tUserId=user.id)
        sql = text(
            'SELECT AVG(value) AS value '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'WHERE u.id = :tUserId')
        result = db.engine.execute(sql, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result_last]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliAnomalyRoleUser(Resource):
    @ cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value, r.name as name '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'INNER JOIN role r ON (r.id = u.role_id) '
            'WHERE r.id = :tRoleId '
            'AND s.user_id != :tUserId'
        )
        result = db.engine.execute(
            sql, tRoleId=user.role_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliUserAverage(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql_current_user = text(
            'SELECT AVG(value) AS value, u.name || " " || u.surname as name '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'WHERE u.id = :tUserId'
        )
        result_current_user = db.engine.execute(
            sql_current_user, tUserId=user.id
        )
        return jsonify({'data': [dict(row) for row in result_current_user]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliDepartmentAverage(Resource):
    @cross_origin()
    def get(self):
        sql = text(
            'SELECT '
            'd.name as name, '
            'AVG(s.value) as value '
            'FROM '
            'SQLI s '
            'INNER JOIN user u ON(u.id=s.user_id) '
            'INNER JOIN department d ON(d.id=u.department_id) '
            'GROUP BY '
            'd.id'
        )
        result = db.engine.execute(
            sql
        )
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class SqliRoleAverage(Resource):
    @cross_origin()
    def get(self):
        sql = text(
            'SELECT '
            'r.name as name, '
            'AVG(s.value) as value '
            'FROM '
            'SQLI s '
            'INNER JOIN user u ON(u.id=s.user_id) '
            'INNER JOIN role r ON(r.id=u.role_id) '
            'GROUP BY '
            'r.id'
        )
        result = db.engine.execute(
            sql
        )
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssRoleAverage(Resource):
    @cross_origin()
    def get(self):
        sql = text(
            'SELECT '
            'r.name as name, '
            'AVG(x.value) as value '
            'FROM '
            'Xss x '
            'INNER JOIN user u ON(u.id=x.user_id) '
            'INNER JOIN role r ON(r.id=u.role_id) '
            'GROUP BY '
            'r.id'
        )
        result = db.engine.execute(
            sql
        )
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssDepartmentAverage(Resource):
    @cross_origin()
    def get(self):
        sql = text(
            'SELECT '
            'd.name as name, '
            'AVG(x.value) as value '
            'FROM '
            'Xss x '
            'INNER JOIN user u ON(u.id=x.user_id) '
            'INNER JOIN department d ON(d.id=u.department_id) '
            'GROUP BY '
            'd.id'
        )
        result = db.engine.execute(
            sql
        )
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssUserAverage(Resource):
    @cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql_current_user = text(
            'SELECT AVG(value) AS value, u.name || " " || u.surname as name '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'WHERE u.id = :tUserId'
        )
        result_current_user = db.engine.execute(
            sql_current_user, tUserId=user.id
        )
        return jsonify({'data': [dict(row) for row in result_current_user]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssAnomalyDepartmentUser(Resource):
    @ cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value, d.name as name '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'INNER JOIN department d ON (d.id = u.department_id) '
            'WHERE d.id= :tDId '
            'AND X.user_id != :tUserId')
        result = db.engine.execute(
            sql, tDId=user.department_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssAnomalyUser(Resource):
    @ cross_origin()
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

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssAnomalyRoleUser(Resource):
    @ cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT AVG(value) AS value, r.name as name '
            'FROM Xss x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'INNER JOIN role r ON (r.id = u.role_id) '
            'WHERE r.id = :tRoleId '
            'AND x.user_id != :tUserId'
        )
        result = db.engine.execute(
            sql, tRoleId=user.role_id, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class PasswordStrengthDepartment(Resource):
    @ cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT PASSWORD '
            'FROM USER U '
            'INNER JOIN DEPARTMENT D ON (d.id = u.department_id) '
            'WHERE u.id != :tUserId'
        )
        result = db.engine.execute(
            sql, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
