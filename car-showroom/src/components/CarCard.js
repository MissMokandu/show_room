// src/components/CarCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="car-card">
      <div className="car-image">
        {car.image_url ? (
          <img src={car.image_url} alt={`${car.make} ${car.model}`} />
        ) : (
          <div className="placeholder-image">
            <span>🚗</span>
            <p>No Image</p>
          </div>
        )}
      </div>
      
      <div className="car-info">
        <h3 className="car-title">
          {car.year} {car.make} {car.model}
        </h3>
        
        <p className="car-price">{formatPrice(car.price)}</p>
        
        <div className="car-details">
          <span className="detail-item">
            <strong>Year:</strong> {car.year}
          </span>
          <span className="detail-item">
            <strong>Mileage:</strong> {car.mileage?.toLocaleString() || 'N/A'} miles
          </span>
          {car.showroom && (
            <span className="detail-item">
              <strong>Showroom:</strong> {car.showroom.name}
            </span>
          )}
        </div>
        
        {car.description && (
          <p className="car-description">
            {car.description.length > 100 
              ? `${car.description.substring(0, 100)}...` 
              : car.description
            }
          </p>
        )}
        
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