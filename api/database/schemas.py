
from flask_marshmallow import Marshmallow

ma = Marshmallow()
def initialize_ma(app):
    ma.init_app(app)
    
class RoleSchema(ma.Schema):
    class Meta:
        fields = ('name','created_on','updated_on')