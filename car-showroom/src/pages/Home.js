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
      // Get newest 4 cars as featured, sorted by year
      const sortedCars = response.data.sort((a, b) => b.year - a.year);
      setFeaturedCars(sortedCars.slice(0, 4));
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
          <h1>Welcome to Auto Gallery</h1>
          <p>Your premier destination for quality pre-owned vehicles. Discover your perfect car from our carefully curated collection of reliable, inspected automobiles.</p>
          <div className="hero-actions">
            <Link to="/cars" className="cta-button primary">
              Browse Our Inventory
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Visit Our Showroom
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-cars">
        <div className="container">
          <div className="section-header">
            <h2>Featured Vehicles</h2>
            <p>Check out our newest arrivals and customer favorites</p>
          </div>
          
          <div className="cars-grid">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          
          {featuredCars.length > 0 && (
            <div className="section-footer">
              <Link to="/cars" className="view-all-btn">
                View All {featuredCars.length > 0 ? `${featuredCars.length}+ ` : ''}Vehicles
              </Link>
            </div>
          )}
          
          {featuredCars.length === 0 && (
            <div className="no-cars">
              <h3>New inventory arriving soon</h3>
              <p>We're constantly adding quality vehicles to our collection. Check back soon for our latest arrivals!</p>
              <Link to="/contact" className="contact-btn">
                Get Notified of New Arrivals
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="about-preview">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Your Trusted Auto Gallery</h2>
              <p>With years of experience in the automotive industry, we pride ourselves on providing exceptional service and quality vehicles. Every car in our inventory is carefully inspected and comes with our commitment to transparency and customer satisfaction.</p>
              <ul className="about-highlights">
                <li>Thorough multi-point inspections on every vehicle</li>
                <li>Transparent pricing with no hidden fees</li>
                <li>Financing options available for all credit types</li>
                <li>Comprehensive warranty and service support</li>
              </ul>
              <Link to="/about" className="learn-more-btn">
                Learn More About Us
              </Link>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>500+</h3>
                <p>Satisfied Customers</p>
              </div>
              <div className="stat">
                <h3>10+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Quality Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Complete automotive solutions under one roof</p>
          </div>
          
          <div className="services-grid">
            <div className="service">
              <h3>Quality Pre-Owned Vehicles</h3>
              <p>Carefully selected and thoroughly inspected cars, trucks, and SUVs from trusted manufacturers</p>
            </div>
            <div className="service">
              <h3>Flexible Financing</h3>
              <p>Competitive rates and flexible terms to fit your budget, with options for all credit situations</p>
            </div>
            <div className="service">
              <div className="service-icon"></div>
              <h3>Service & Maintenance</h3>
              <p>Professional automotive service and maintenance to keep your vehicle running at its best</p>
            </div>
            <div className="service">
              <h3>Extended Warranties</h3>
              <p>Protect your investment with comprehensive warranty options for added peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Vehicle?</h2>
            <p>Visit our showroom today or contact us to learn more about our current inventory and services.</p>
            <div className="contact-info-brief">
              <div className="contact-item">
                <strong>Location</strong> Nairobi, Kenya, 1276
              </div>
              <div className="contact-item">
                <strong>Phone</strong> (254) 123-4567
              </div>
              <div className="contact-item">
                <strong>Time</strong> Mon-Fri: 9AM-7PM, Weekends: 9AM-6PM
              </div>
            </div>
            <Link to="/contact" className="contact-cta-btn">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;