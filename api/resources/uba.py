from flask import Blueprint, request, jsonify, Response
from database.models import Address, User
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required
from ml_models.sqli_model import predict_sqli
from ml_models.password_strength_model import predict_password_strength
from sqlalchemy.sql import func
from sqlalchemy import text
from werkzeug.security import check_password_hash
from config.config import dohvati_value


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
        sql_without_last_row = text(
            'SELECT AVG(S.VALUE) AS value, '
            '"Prijašnje vrijednosti" as name '
            'FROM SQLI S '
            'INNER JOIN user u ON (u.id = S.user_id) '
            'WHERE u.id = :tUserId '
            'AND S.id < (SELECT MAX(id) FROM SQLI where user_id = u.id)'
        )
        result = db.engine.execute(sql_without_last_row, tUserId=user.id)
        output = []
        for row in result:
            output.append(dict(row))
        sql_last_row = text(
            'SELECT AVG(s.value) AS value, '
            '"Zadnja vrijednost" as name '
            'FROM sqli s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'WHERE u.id = :tUserId '
            'AND s.id = (SELECT MAX(id) FROM sqli WHERE user_id = u.id)'
        )
        result_last_row = db.engine.execute(sql_last_row, tUserId=user.id)
        for row in result_last_row:
            output.append(dict(row))
        return jsonify({'data': output})

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
        sql_without_last_row = text(
            'SELECT AVG(x.value) AS value, '
            '"Prijašnje vrijednosti" as name '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'WHERE u.id = :tUserId '
            'AND x.id < (SELECT MAX(id) FROM XSS where user_id = u.id)'
        )
        result = db.engine.execute(sql_without_last_row, tUserId=user.id)
        output = []
        for row in result:
            output.append(dict(row))
        sql_last_row = text(
            'SELECT AVG(x.value) AS value, '
            '"Zadnja vrijednost" as name '
            'FROM XSS x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'WHERE u.id = :tUserId '
            'AND x.id = (SELECT MAX(id) FROM XSS WHERE user_id = u.id)'
        )
        result_last_row = db.engine.execute(sql_last_row, tUserId=user.id)
        for row in result_last_row:
            output.append(dict(row))
        return jsonify({'data': output})

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
        department_id = request.get_json().get('departmentId')
        sql = text(
            'SELECT u.password AS value, u.name || " " || u.surname as name '
            'FROM USER u '
            'INNER JOIN DEPARTMENT d ON (d.id = u.department_id) '
            'WHERE d.id = :tDepartmentId'
        )
        result_current_user = db.engine.execute(
            sql, tDepartmentId=department_id
        )
        output = []
        for row in result_current_user:
            temp = dict(row)
            value = predict_password_strength(temp['value'])[0]
            temp['value'] = str(value)
            output.append(temp)
        return jsonify({'data': output})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class PasswordStrengthRole(Resource):
    @ cross_origin()
    def post(self):
        user_id = request.get_json().get('userId')
        user = User.query.filter(User.id == user_id).first()
        sql = text(
            'SELECT PASSWORD '
            'FROM USER U '
            'INNER JOIN Role r ON (r.id = u.department_id) '
            'WHERE u.id != :tUserId'
        )
        result = db.engine.execute(
            sql, tUserId=user.id)
        return jsonify({'data': [dict(row) for row in result]})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class Evaluation(Resource):
    @cross_origin()
    def get(self):

        config_sqli = float(dohvati_value('risk_assestment', 'sqli'))
        config_xss = float(dohvati_value('risk_assestment', 'xss'))
        config_password = float(dohvati_value('risk_assestment', 'password'))

        sql_sqli = text(
            'SELECT SUM(s.value) as sqli, '
            'u.name || " " || u.surname as name '
            'FROM SQLI s '
            'INNER JOIN user u ON (u.id = s.user_id) '
            'GROUP BY u.id '
            'ORDER BY u.id'
        )
        output = []
        xss = []
        passwords = []
        result_sqli = db.engine.execute(
            sql_sqli)
        sql_xss = text(
            'SELECT SUM(x.value) as xss '
            'FROM Xss x '
            'INNER JOIN user u ON (u.id = x.user_id) '
            'GROUP BY u.id '
            'ORDER BY u.id'
        )
        result_xss = db.engine.execute(
            sql_xss)

        sql_password = text(
            'SELECT u.password as password '
            'FROM user u '
            'ORDER BY u.id'
        )
        result_password = db.engine.execute(
            sql_password)

        for row in result_password:
            dictionary = dict(row)
            value = predict_password_strength(dictionary['password'])[0]
            passwords.append(str(value))
        i = 0
        for row in result_sqli:
            temp = dict(row)
            temp['sqli'] = str(float(temp['sqli'])*config_sqli)
            output.append(temp)
        for row in result_xss:
            xss.append(dict(row)['xss'])
        for row in output:
            row['xss'] = str(float(xss[i])*config_xss)
            password_strength = float(passwords[i])
            if password_strength == 0:
                row['password'] = str(password_strength)
            else:
                row['password'] = str(config_password/password_strength)
            print(row)
            i += 1

        return jsonify({'data': output})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
