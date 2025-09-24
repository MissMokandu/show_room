import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carsAPI } from '../services/api';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carsAPI.getAll();
      setCars(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car =>
    car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cars-page">
      <h1>Our Cars</h1>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search cars by make or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="cars-grid">
        {filteredCars.map(car => (
          <div key={car.id} className="car-card">
            {car.image_url && (
              <img src={car.image_url} alt={`${car.make} ${car.model}`} />
            )}
            <div className="car-info">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p className="price">${car.price?.toLocaleString()}</p>
              <p>Mileage: {car.mileage?.toLocaleString() || 'N/A'} miles</p>
              <Link to={`/cars/${car.id}`} className="btn btn-secondary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCars.length === 0 && !loading && (
        <p className="no-results">No cars found matching your search.</p>
      )}
    </div>
  );
};

export default Cars;