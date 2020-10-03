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
from config import config
from ml_models.password_strength_model import generate_password_strength_model
from ml_models.xss_model import generate_xss_model


app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, "assets/database/", 'db.sqlite')
print(app.config['SQLALCHEMY_DATABASE_URI'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['JWT_SECRET_KEY'] = 'dadad'
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.username


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {'role': user.email}


initialize_db(app)
initialize_ma(app)
initialize_routes(api)
#generate_xss_model()
if __name__ == '__main__':
    app.run(debug=True, threaded=True)
