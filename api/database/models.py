from .db import db

class Role(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45),unique = True)
    created_on = db.Column(db.DateTime,server_default=db.func.now())
    updated_on = db.Column(db.DateTime,server_default=db.func.now(),server_onupdate=db.func.now())
    def __init__(self,name):
        self.name=name


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45),unique = True)
    created_on = db.Column(db.DateTime,server_default=db.func.now())
    updated_on = db.Column(db.DateTime,server_default=db.func.now(),server_onupdate=db.func.now())
    cities = db.relationship("City",backref='country',lazy=True)

    def __init__(self, name):
        self.name=name

class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45),unique = True)
    country_id=db.Column(db.Integer, db.ForeignKey('country.id'),nullable=False)
    created_on = db.Column(db.DateTime,server_default=db.func.now())
    updated_on = db.Column(db.DateTime,server_default=db.func.now(),server_onupdate=db.func.now())

    def __init__(self, name,coutry_id):
        self.name=name
        self.country_id=coutry_id
