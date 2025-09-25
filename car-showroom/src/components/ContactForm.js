// src/components/ContactForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { contactsAPI } from '../services/api';

const ContactForm = ({ car, onClose }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .max(500, 'Message must be less than 500 characters')
      .required('Message is required')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const contactData = {
        ...values,
        car_id: car.id,
        subject: `Inquiry about ${car.year} ${car.make} ${car.model}`,
        created_at: new Date().toISOString()
      };

      await contactsAPI.create(contactData);
      alert('Your message has been sent successfully! We will contact you soon.');
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form-overlay">
      <div className="contact-form-modal">
        <div className="modal-header">
          <h2>Contact About {car.year} {car.make} {car.model}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            phone: '',
            message: `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} listed for $${car.price.toLocaleString()}. Could you please provide more information?`
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="e.g., (555) 123-4567"
                  className="form-input"
                />
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows="5"
                  className="form-textarea"
                />
                <ErrorMessage name="message" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;