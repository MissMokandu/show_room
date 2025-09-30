import os
import re
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Car, Admin, Showroom, Contact, Buyer

# -------------------------------
# App Setup
# -------------------------------
app = Flask(__name__, static_folder='../car-showroom/build', static_url_path='/')

# -------------------------------
# Database Config
# -------------------------------
app.config["SQLALCHEMY_DATABSE_URI"]="sqlite:///database.db"


app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.environ.get("SECRET_KEY", "your_secret_key")

# -------------------------------
# Extensions
# -------------------------------
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# -------------------------------
# Routes
# -------------------------------
@app.route('/cars', methods=['GET'])
def list_cars():
    cars = Car.query.all()
    return jsonify([car.to_dict() for car in cars])

@app.route('/cars', methods=['POST'])
def add_car():
    data = request.get_json()
    car = Car(
        name=data['name'],
        price=data['price'],
        year=data['year'],
        type=data['type'],
        image_url=data.get('image_url'),
        showroom_id=data['showroom_id']
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.to_dict()), 201

@app.route('/cars/<int:id>', methods=['GET'])
def get_car(id):
    car = Car.query.get_or_404(id)
    return jsonify(car.to_dict())

@app.route('/cars/<int:id>', methods=['PUT'])
def update_car(id):
    car = Car.query.get_or_404(id)
    data = request.get_json()
    car.name = data.get('name', car.name)
    car.price = data.get('price', car.price)
    car.year = data.get('year', car.year)
    car.type = data.get('type', car.type)
    car.image_url = data.get('image_url', car.image_url)
    car.showroom_id = data.get('showroom_id', car.showroom_id)
    db.session.commit()
    return jsonify(car.to_dict())

@app.route('/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get_or_404(id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({"message": "Car deleted successfully"}), 200

# -------- Admin --------
@app.route('/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    if Admin.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    admin = Admin(username=data['username'], showroom_id=data['showroom_id'])
    admin.set_password(data['password'])
    db.session.add(admin)
    db.session.commit()
    return jsonify(admin.to_dict()), 201

@app.route('/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    admin = Admin.query.filter_by(username=data['username']).first()
    if admin and admin.check_password(data['password']):
        return jsonify({"message": "Login successful", "admin": admin.to_dict()}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# -------- Buyer --------
@app.route('/buyer/signup', methods=['POST'])
def buyer_signup():
    data = request.get_json()
    if Buyer.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    if Buyer.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400
    buyer = Buyer(username=data['username'], email=data['email'])
    buyer.set_password(data['password'])
    db.session.add(buyer)
    db.session.commit()
    return jsonify(buyer.to_dict()), 201

@app.route('/buyer/login', methods=['POST'])
def buyer_login():
    data = request.get_json()
    buyer = Buyer.query.filter_by(username=data['username']).first()
    if buyer and buyer.check_password(data['password']):
        return jsonify({"message": "Login successful", "buyer": buyer.to_dict()}), 200
    return jsonify({"error": "Invalid credentials"}), 401

# -------- Contacts --------
@app.route('/contacts', methods=['GET'])
def list_contacts():
    contacts = Contact.query.all()
    return jsonify([contact.to_dict() for contact in contacts])

@app.route('/contacts', methods=['POST'])
def create_contact():
    data = request.get_json()
    contact = Contact(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        message=data['message']
    )
    db.session.add(contact)
    db.session.commit()
    return jsonify(contact.to_dict()), 201

@app.route('/contacts/<int:id>', methods=['GET'])
def get_contact(id):
    contact = Contact.query.get_or_404(id)
    return jsonify(contact.to_dict())

@app.route('/contacts/<int:id>', methods=['PUT'])
def update_contact(id):
    contact = Contact.query.get_or_404(id)
    data = request.get_json()
    contact.name = data.get('name', contact.name)
    contact.email = data.get('email', contact.email)
    contact.phone = data.get('phone', contact.phone)
    contact.message = data.get('message', contact.message)
    db.session.commit()
    return jsonify(contact.to_dict())

@app.route('/contacts/<int:id>', methods=['DELETE'])
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    db.session.delete(contact)
    db.session.commit()
    return jsonify({"message": "Contact deleted successfully"}), 200

# -------- Frontend Serving --------
@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# -------------------------------
# Run Local Dev
# -------------------------------
with app.app_context():
    db.create_all()
app.run(debug=True, port=5001)




