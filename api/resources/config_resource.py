from flask import Blueprint, request, jsonify, Response
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from flask_jwt_extended import get_jwt_identity, jwt_required
from config.config import zapisi


class SqliConfig(Resource):
    @jwt_required
    @cross_origin()
    def post(self):
        value = request.get_json().get('value')
        if value is None:
            return jsonify(error="Wrong request"), 500
        try:
            sqli = float(value)
            if (sqli < 0):
                return jsonify(error="Enter a number larger than 0!"), 500
            zapisi('risk_assestment', 'sqli', str(sqli))
            return jsonify(), 200
        except:
            return jsonify(error="Enter a number"), 500

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class XssConfig(Resource):
    @jwt_required
    @cross_origin()
    def post(self):
        value = request.get_json().get('value')
        if value is None:
            return jsonify(error="Wrong request"), 500
        try:
            xss = float(value)
            if(xss < 0):
                return jsonify(error="Enter a number larger than 0!"), 500
            zapisi('risk_assestment', 'xss', str(xss))
            return jsonify()
        except:
            return jsonify(error="Enter a number!"), 500

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class PasswordConfig(Resource):
    @jwt_required
    @cross_origin()
    def post(self):
        value = request.get_json().get('value')
        if value is None:
            return jsonify(error="Wrong request"), 500
        try:
            xss = float(value)
            if(xss < 0):
                return jsonify(error="Enter a number larger than 0!"), 500
            zapisi('risk_assestment', 'password', str(xss))
            return jsonify()
        except:
            return jsonify(error="Enter a number!"), 500

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
