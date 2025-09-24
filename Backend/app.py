from flask import Flask, request, jsonify
from models import db, Car, Admin  # import models here
from werkzeug.security import generate_password_hash
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

# List cars
@app.route('/cars', methods=['GET'])
def list_cars():
    cars = Car.query.all()
    return jsonify([car.to_dict() for car in cars])

# Add car
@app.route('/cars', methods=['POST'])
def add_car():
    data = request.get_json()
    car = Car(
        name=data['name'],
        price=data['price'],
        year=data['year'],
        type=data['type'],
        image_url=data.get('image_url')
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.to_dict()), 201

# Delete car
@app.route('/cars/<int:id>', methods=['DELETE'])
def delete_car(id):
    car = Car.query.get_or_404(id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({"message": "Car deleted successfully"}), 200

# Admin signup
@app.route('/admin/signup', methods=['POST'])
def admin_signup():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'])
    admin = Admin(username=data['username'], password=hashed_password)
    db.session.add(admin)
    db.session.commit()
    return jsonify({"message": "Admin created successfully"}), 201

if __name__ == "__main__":
    app.run(debug=True)
