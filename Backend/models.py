from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Showroom(db.Model):
    __tablename__ = 'showrooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200))

    cars = db.relationship('Car', backref='showroom', lazy=True)
    admins = db.relationship('Admin', backref='showroom', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "cars": [car.to_dict() for car in self.cars],
            "admins": [admin.to_dict() for admin in self.admins]
        }

class Car(db.Model):
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(200))

    showroom_id = db.Column(db.Integer, db.ForeignKey('showrooms.id'))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "year": self.year,
            "type": self.type,
            "image_url": self.image_url,
            "showroom_id": self.showroom_id
        }

class Admin(db.Model):
    __tablename__ = 'admins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)

    showroom_id = db.Column(db.Integer, db.ForeignKey('showrooms.id'))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "showroom_id": self.showroom_id
        }

