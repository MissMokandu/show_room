from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cars.db'


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


@app.route('/cars', methods=['GET'])
def list_cars():
    cars = Car.query.all()
    return jsonify([car.to_dict() for car in cars])

@app.route('/cars', methods=['POST'])
def add_car():
    data = request.get_json
    car = Car(
        name = data['name'],
        price = data['price'],
        year = data['year'],
        type = data['type'],
        image_url = data.get('image_url')
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.to_dict()),201

if __name__ == "__main__":
    app.run(debug=True)