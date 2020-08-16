from flask import Blueprint, request, jsonify, Response
from flask_cors import CORS, cross_origin
from database.schemas import AddressSchema
from flask_restful import Resource
import json
from flask_jwt_extended import get_jwt_identity, jwt_required
from config.config import zapisi


class SqliConfig(Resource):
    @cross_origin()
    def post(self):
        value = request.get_json().get('value')
        if value is None:
            return jsonify(error="Wrong request"), 500
        try:
            sqli = float(value)
            if (sqli < 0 or sqli > 1):
                return jsonify(error="Enter a number between 0 and 1!"), 500
            zapisi('uba', 'sqli', str(sqli))
            return jsonify(), 200
        except:
            return jsonify(error="Enter a number"), 500


class XssConfig(Resource):
    @cross_origin()
    def post(self):
        value = request.get_json().get('value')
        if value is None:
            return jsonify(error="Wrong request"), 500
        try:
            xss = float(value)
            if(xss < 0 or xss > 1):
                return jsonify(error="Enter a number between 0 and 1!"), 500
            zapisi('uba', 'xss',str(xss))
            return jsonify()
        except:
            return jsonify(error="Enter a number!"), 500
