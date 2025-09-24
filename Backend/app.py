from flask import Flask, request, jsonify
from models import db, Car, Admin, Showroom
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///showroom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "your_secret_key"

db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

# with app.app_context():
#     db.create_all()

# -----------------------
# Car Routes
# -----------------------
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
        showroom_id=data['showroom_id']  # assign showroom
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.to_dict()), 201

@app.route('/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get_or_404(id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({"message": "Car deleted successfully"}), 200

# -----------------------
# Admin Routes
# -----------------------
@app.route('/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    if Admin.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400

    admin = Admin(
        username=data['username'],
        showroom_id=data['showroom_id']
    )
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

if __name__ == "__main__":
    app.run(debug=True)
