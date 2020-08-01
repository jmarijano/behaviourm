from flask import Flask
from flask_restful import Api
from database.db import initialize_db
from database.schemas import initialize_ma
import os
from resources.routes import initialize_routes
from setup import kae
import numpy as np
import pandas as pd
from database.model.password_strength_model import func


app = Flask(__name__)
api = Api(app)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + \
    os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

initialize_db(app)
initialize_ma(app)
initialize_routes(api)

kae()

func()
if __name__ == '__main__':
    data = pd.read_csv("datasets/password_strength.csv",',',error_bad_lines=False)
    app.run(debug=True)
