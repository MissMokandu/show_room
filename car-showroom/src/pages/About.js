// src/pages/About.js
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-content">
            <h1>About Auto Gallery</h1>
            <p className="lead">Your trusted partner in finding the perfect pre-owned vehicle</p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="our-story">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded over 12 years ago, Auto Gallery has been serving the community with 
                quality pre-owned and brand new vehicles and exceptional customer service. What started as 
                a small family business has grown into a trusted name in the automotive industry, 
                built on the principles of honesty, transparency, and customer satisfaction.
              </p>
              <p>
                We understand that buying a car is one of life's significant decisions. That's 
                why we've dedicated ourselves to making the process as smooth and trustworthy 
                as possible, ensuring every customer drives away confident in their purchase.
              </p>
            </div>
            <div className="story-image">
              <div className="placeholder-image">
                <img src="https://img.freepik.com/premium-photo/depict-row-new-cars-neatly-lined-up-showroom-highlighting-variety-choices_693425-49568.jpg" alt='Our Showroom'/>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mission">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <div className="mission-grid">
              <div className="mission-item">
                <div className="mission-icon">🎯</div>
                <h3>Quality First</h3>
                <p>Every vehicle undergoes rigorous inspection to ensure it meets our high standards before reaching our lot.</p>
              </div>
              <div className="mission-item">
                <div className="mission-icon">🤝</div>
                <h3>Customer Focus</h3>
                <p>Your satisfaction is our priority. We're here to help you find the right vehicle for your needs and budget.</p>
              </div>
              <div className="mission-item">
                <div className="mission-icon">💎</div>
                <h3>Transparency</h3>
                <p>No hidden fees, no surprises. We believe in honest pricing and clear communication throughout your experience.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-detailed">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-detail">
              <h3>Premium Vehicle Selection</h3>
              <p>
                Our inventory features carefully selected cars, trucks, and SUVs from 
                trusted manufacturers. Each vehicle is chosen for its reliability, 
                condition, and value proposition.
              </p>
            </div>
            <div className="service-detail">
              <h3>Comprehensive Inspections</h3>
              <p>
                Every vehicle receives a thorough multi-point inspection covering 
                engine, transmission, brakes, electrical systems, and more to ensure 
                quality and safety.
              </p>
            </div>
            <div className="service-detail">
              <h3>Flexible Financing</h3>
              <p>
                We work with multiple lenders to offer competitive financing options 
                for all credit situations. Our finance team helps you find the best 
                rates and terms for your budget.
              </p>
            </div>
            <div className="service-detail">
              <h3>After-Sale Support</h3>
              <p>
                Our relationship doesn't end at the sale. We provide ongoing support, 
                maintenance services, and warranty options to keep you satisfied long 
                after your purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Contact Section */}
        <section className="location-contact">
          <h2>Visit Our Showroom</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <h3>📍 Location</h3>
                <p>Nairobi, Kenya<br />P.O Box: 1267</p>
              </div>
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p><a href="tel:(254)123-4567">(254) 123-4567</a></p>
              </div>
              <div className="contact-item">
                <h3>✉️ Email</h3>
                <p><a href="mailto:info@autogallery.com">info@autogallery.com</a></p>
              </div>
              <div className="contact-item">
                <h3>🕒 Hours</h3>
                <p>
                  Monday - Friday: 9:00 AM - 7:00 PM<br />
                  Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: 12:00 PM - 5:00 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <h2>Our Track Record</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Vehicles Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <div className="cta-content">
            <h2>Ready to Find Your Perfect Vehicle?</h2>
            <p>
              Experience the Auto Gallery difference. Browse our current inventory 
              or visit our showroom to speak with our knowledgeable team.
            </p>
            <div className="cta-buttons">
              <Link to="/cars" className="cta-btn primary">
                Browse Our Inventory
              </Link>
              <Link to="/contact" className="cta-btn secondary">
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;