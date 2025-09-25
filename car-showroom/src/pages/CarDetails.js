// src/pages/CarDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { carsAPI } from "../services/api";
import ContactForm from "../components/ContactForm";

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
      setError("Failed to load car details");
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="car-details">
      <div className="container">
        <Link to="/cars" className="back-link">
          ← Back to Cars
        </Link>

        <div className="car-details-content">
          <div className="car-images">
            {car.image_url ? (
              <img src={car.image_url} alt={car.name} className="main-image" />
            ) : (
              <div className="placeholder-image large">
                <span>car</span>
                <p>No Image Available</p>
              </div>
            )}
          </div>

          <div className="car-info-detailed">
            <h1>
              {car.year} {car.name}
            </h1>
            <p className="price">{formatPrice(car.price)}</p>

            <div className="specifications">
              <h3>Vehicle Specifications</h3>
              <div className="spec-grid">
                <div className="spec-item">
                  <strong>Name:</strong>
                  <span>{car.name}</span>
                </div>
                <div className="spec-item">
                  <strong>Year:</strong>
                  <span>{car.year}</span>
                </div>
                <div className="spec-item">
                  <strong>Type:</strong>
                  <span>{car.type}</span>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <h3>Interested in this vehicle?</h3>
              <p>
                Contact us today to schedule a test drive or get more
                information about this {car.year} {car.name}.
              </p>

              <div className="contact-info">
                <div className="contact-item">
                  <strong>Visit Us:</strong>
                  <span>123 Auto Gallery Drive, Your City, ST 12345</span>
                </div>
                <div className="contact-item">
                  <strong>Call Us:</strong>
                  <span>(555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <strong>Email Us:</strong>
                  <span>info@autogallery.com</span>
                </div>
                <div className="contact-item">
                  <strong>Hours:</strong>
                  <span>Mon-Fri: 9AM-7PM, Sat: 9AM-6PM, Sun: 12PM-5PM</span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={() => setShowContactForm(true)}
                className="contact-btn primary"
              >
                Get More Information
              </button>
              <a href="tel:(254) 123-4567" className="phone-btn secondary">
                Call Now
              </a>
              <Link to="/about" className="about-btn secondary">
                About Our Gallery
              </Link>
            </div>
          </div>
        </div>

        {showContactForm && (
          <ContactForm car={car} onClose={() => setShowContactForm(false)} />
        )}
      </div>
    </div>
  );
};

export default CarDetails;
