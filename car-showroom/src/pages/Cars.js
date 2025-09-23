import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carsAPI } from '../services/api';
import CarCard from '../components/CarCard';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const response = await carsAPI.getAll();
      // Get first 3 cars as featured
      setFeaturedCars(response.data.slice(0, 3));
      setLoading(false);
    } catch (err) {
      setError('Failed to load featured cars');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Car Showroom</h1>
          <p>Discover your perfect vehicle from our premium collection</p>
          <Link to="/cars" className="cta-button">
            Browse All Cars
          </Link>
        </div>
      </section>

      <section className="featured-cars">
        <div className="container">
          <h2>Featured Cars</h2>
          <div className="cars-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          {featuredCars.length === 0 && (
            <p className="no-cars">No featured cars available at the moment.</p>
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>Premium Quality</h3>
              <p>All our vehicles undergo thorough inspection and quality checks</p>
            </div>
            <div className="feature">
              <h3>Best Prices</h3>
              <p>Competitive pricing with flexible financing options available</p>
            </div>
            <div className="feature">
              <h3>Full Service</h3>
              <p>Complete after-sales service and maintenance support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;