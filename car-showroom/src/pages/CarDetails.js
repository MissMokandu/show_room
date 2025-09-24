// src/pages/CarDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import ContactForm from '../components/ContactForm';

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await carsAPI.getById(id);
      setCar(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load car details');
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="car-details">
      <div className="container">
        <Link to="/cars" className="back-link">← Back to Cars</Link>
        
        <div className="car-details-content">
          <div className="car-images">
            {car.image_url ? (
              <img 
                src={car.image_url} 
                alt={`${car.make} ${car.model}`}
                className="main-image"
              />
            ) : (
              <div className="placeholder-image large">
                <span>🚗</span>
                <p>No Image Available</p>
              </div>
            )}
          </div>
          
          <div className="car-info-detailed">
            <h1>{car.year} {car.make} {car.model}</h1>
            <p className="price">{formatPrice(car.price)}</p>
            
            <div className="specifications">
              <h3>Specifications</h3>
              <div className="spec-grid">
                <div className="spec-item">
                  <strong>Make:</strong>
                  <span>{car.make}</span>
                </div>
                <div className="spec-item">
                  <strong>Model:</strong>
                  <span>{car.model}</span>
                </div>
                <div className="spec-item">
                  <strong>Year:</strong>
                  <span>{car.year}</span>
                </div>
                <div className="spec-item">
                  <strong>Mileage:</strong>
                  <span>{car.mileage?.toLocaleString() || 'N/A'} miles</span>
                </div>
                {car.engine && (
                  <div className="spec-item">
                    <strong>Engine:</strong>
                    <span>{car.engine}</span>
                  </div>
                )}
                {car.transmission && (
                  <div className="spec-item">
                    <strong>Transmission:</strong>
                    <span>{car.transmission}</span>
                  </div>
                )}
                {car.fuel_type && (
                  <div className="spec-item">
                    <strong>Fuel Type:</strong>
                    <span>{car.fuel_type}</span>
                  </div>
                )}
                {car.color && (
                  <div className="spec-item">
                    <strong>Color:</strong>
                    <span>{car.color}</span>
                  </div>
                )}
              </div>
            </div>
            
            {car.description && (
              <div className="description">
                <h3>Description</h3>
                <p>{car.description}</p>
              </div>
            )}
            
            {car.showroom && (
              <div className="showroom-info">
                <h3>Showroom Information</h3>
                <p><strong>Name:</strong> {car.showroom.name}</p>
                {car.showroom.address && (
                  <p><strong>Address:</strong> {car.showroom.address}</p>
                )}
                {car.showroom.phone && (
                  <p><strong>Phone:</strong> {car.showroom.phone}</p>
                )}
                {car.showroom.email && (
                  <p><strong>Email:</strong> {car.showroom.email}</p>
                )}
              </div>
            )}
            
            <div className="action-buttons">
              <button 
                onClick={() => setShowContactForm(true)}
                className="contact-btn"
              >
                Contact About This Car
              </button>
              {car.showroom && (
                <Link 
                  to={`/showrooms/${car.showroom.id}`}
                  className="showroom-btn"
                >
                  View Showroom
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {showContactForm && (
          <ContactForm 
            car={car}
            onClose={() => setShowContactForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CarDetails;