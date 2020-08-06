from flask import Blueprint, request, jsonify, Response
from database.models import Department
from database.db import db
from flask_cors import CORS, cross_origin
from database.schemas import DepartmentSchema
from flask_restful import Resource
import json
from marshmallow import ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required

department_schema = DepartmentSchema()
departments_schema = DepartmentSchema(many=True)


class DepartmentsApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self):
        all_departments = Department.query.all()
        print("Broj zapisa: " + str(Department.query.count()))
        result = departments_schema.dump(all_departments)
        return jsonify({'data': result})

    @jwt_required
    @cross_origin()
    def post(self):
        try:
            department_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        name = request.json['name']
        new_product = Department(name)
        db.session.add(new_product)
        db.session.commit()
        return department_schema.jsonify({'data': new_product})

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()


class DepartmentApi(Resource):
    @jwt_required
    @cross_origin()
    def get(self, id):
        department = Department.query.get(id)
        return department_schema.jsonify(department)

    @jwt_required
    @cross_origin()
    def put(self, id):
        try:
            department_schema.load(request.json)
        except ValidationError as err:
            return jsonify(err.messages), 500
        department = Department.query.get(id)
        name = request.json['name']
        department.name = name
        department.updated_on = db.func.now()
        db.session.commit()
        return department_schema.jsonify({'data': department})

    @jwt_required
    @cross_origin()
    def delete(self, id):
        department = Department.query.get(id)
        db.session.delete(department)
        db.session.commit()
        return department_schema.jsonify(department)

    @jwt_required
    @cross_origin()
    def options(self):
        return jsonify()
