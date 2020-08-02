from flask import Flask
from flask_restful import Api
from database.db import initialize_db
from database.schemas import initialize_ma
import os
from resources.routes import initialize_routes
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)
basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, "assets/database/", 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'changeit'
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)

initialize_db(app)
initialize_ma(app)
initialize_routes(api)

if __name__ == '__main__':
    app.run(debug=True)
