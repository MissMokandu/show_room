from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']= 'sqllite///cars.db'

db = SQLAlchemy(app)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    name = db.Column(db.String(100), nullable = False)
    price = db.Column(db.Float, nullable = False)
    year = db.Column(db.Integer, nullable = False)
    type = db.Column(db.String(50), nullable = False)
    image_url =db.Column(db.String(200))

def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "price": self.price,
        "year": self.year,
        "type": self.type,
        "image_url": self.image_url
    }

with app.app_context():
    db.create_all()
