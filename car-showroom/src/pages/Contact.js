// src/pages/Contact.js
import React, { useState } from 'react';
import { contactsAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactData = {
        ...formData,
        subject: 'General Inquiry',
        created_at: new Date().toISOString()
      };

      await contactsAPI.create(contactData);
      alert('Thank you for your message! We will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header text-center">
          <h1>Contact Auto Gallery</h1>
          <p>Get in touch with us for any questions about our vehicles or services</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Visit Our Showroom</h2>
            
            <div className="info-section">
              <h3>Address</h3>
              <p>Nairobi, Kenya<br />
                 P.O Box: 1267</p>
            </div>

            <div className="info-section">
              <h3>Phone</h3>
              <p><a href="tel:(555)123-4567">(254) 123-4567</a></p>
            </div>

            <div className="info-section">
              <h3>Email</h3>
              <p><a href="mailto:info@autogallery.com">info@autogallery.com</a></p>
            </div>

            <div className="info-section">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 7:00 PM<br />
                 Saturday: 9:00 AM - 6:00 PM<br />
                 Sunday: 12:00 PM - 5:00 PM</p>
            </div>

            <div className="info-section">
              <h3>Services</h3>
              <ul>
                <li>Quality Pre-Owned Vehicles</li>
                <li>Brand New Cars</li>
                <li>Trade-In Evaluations</li>
                <li>Rent a car</li>
                <li>Service & Maintenance</li>
              </ul>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(254) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        <div className="directions-section text-center">
          <h2>Find Us</h2>
          <p>Located in the heart of the automotive district, we're easy to find with plenty of parking available.</p>
          
          <div className="map-placeholder card">
            <h3>Interactive Map</h3>
            <p>Directions to Auto Gallery</p>
            <p><strong>From Downtown:</strong> Take Main Street north for 2 miles, turn right on Auto Gallery Drive</p>
            <p><strong>From Highway:</strong> Exit 13, follow signs to business district</p>
            <p><strong>Parking:</strong> Free customer parking available in front and side lots</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;