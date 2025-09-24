// src/pages/Showrooms.js
import React, { useState, useEffect } from 'react';
import { showroomsAPI, carsAPI } from '../services/api';

const Showrooms = () => {
  const [showrooms, setShowrooms] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [showroomsResponse, carsResponse] = await Promise.all([
        showroomsAPI.getAll(),
        carsAPI.getAll()
      ]);
      setShowrooms(showroomsResponse.data);
      setCars(carsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load showrooms');
      setLoading(false);
    }
  };

  const getShowroomCarCount = (showroomId) => {
    return cars.filter(car => car.showroom_id === showroomId).length;
  };

  const getShowroomCars = (showroomId) => {
    return cars.filter(car => car.showroom_id === showroomId);
  };

  if (loading) return <div className="loading">Loading showrooms...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="showrooms-page">
      <div className="container">
        <h1>Our Showrooms</h1>
        <p className="page-description">
          Browse our network of premium car showrooms, each offering a carefully curated selection of vehicles.
        </p>

        <div className="showrooms-grid">
          {showrooms.map(showroom => {
            const showroomCars = getShowroomCars(showroom.id);
            const carCount = showroomCars.length;
            
            return (
              <div key={showroom.id} className="showroom-card">
                <div className="showroom-header">
                  <h2>{showroom.name}</h2>
                  <span className="car-count">{carCount} cars available</span>
                </div>
                
                <div className="showroom-info">
                  {showroom.address && (
                    <div className="info-item">
                      <strong>Address:</strong>
                      <span>{showroom.address}</span>
                    </div>
                  )}
                  
                  {showroom.phone && (
                    <div className="info-item">
                      <strong>Phone:</strong>
                      <span>{showroom.phone}</span>
                    </div>
                  )}
                  
                  {showroom.email && (
                    <div className="info-item">
                      <strong>Email:</strong>
                      <span>{showroom.email}</span>
                    </div>
                  )}
                  
                  {showroom.hours && (
                    <div className="info-item">
                      <strong>Hours:</strong>
                      <span>{showroom.hours}</span>
                    </div>
                  )}
                </div>

                {showroom.description && (
                  <div className="showroom-description">
                    <p>{showroom.description}</p>
                  </div>
                )}

                {showroomCars.length > 0 && (
                  <div className="showroom-cars-preview">
                    <h3>Featured Cars</h3>
                    <div className="cars-preview-grid">
                      {showroomCars.slice(0, 3).map(car => (
                        <div key={car.id} className="car-preview">
                          <div className="car-preview-image">
                            {car.image_url ? (
                              <img src={car.image_url} alt={`${car.make} ${car.model}`} />
                            ) : (
                              <div className="placeholder-small">Car</div>
                            )}
                          </div>
                          <div className="car-preview-info">
                            <h4>{car.year} {car.make} {car.model}</h4>
                            <p className="car-preview-price">
                              ${car.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {showroomCars.length > 3 && (
                      <p className="more-cars">
                        + {showroomCars.length - 3} more cars
                      </p>
                    )}
                  </div>
                )}

                <div className="showroom-actions">
                  <a href={`tel:${showroom.phone}`} className="contact-btn">
                    Call Now
                  </a>
                  {showroom.email && (
                    <a href={`mailto:${showroom.email}`} className="email-btn">
                      Send Email
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showrooms.length === 0 && (
          <div className="no-showrooms">
            <p>No showrooms available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Showrooms;