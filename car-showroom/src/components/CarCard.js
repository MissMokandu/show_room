// src/components/CarCard.js
import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="car-card">
      <div className="car-image">
        {car.image_url ? (
          <img src={car.image_url} alt={car.name} />
        ) : (
          <div className="placeholder-image">
            <span>🚗</span>
            <p>No Image</p>
          </div>
        )}
      </div>

      <div className="car-info">
        <h3 className="car-title">
          {car.year} {car.name}
        </h3>

        <p className="car-price">{formatPrice(car.price)}</p>

        <div className="car-details">
          <span className="detail-item">
            <strong>Year:</strong> {car.year}
          </span>
          <span className="detail-item">
            <strong>Type:</strong> {car.type}
          </span>
        </div>

        <div className="car-actions">
          <Link to={`/cars/${car.id}`} className="view-details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
