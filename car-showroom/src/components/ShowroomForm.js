// src/components/ShowroomForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { showroomsAPI } from '../services/api';

const ShowroomForm = ({ showroom, onSuccess, onClose }) => {
  const isEditing = Boolean(showroom);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be less than 100 characters')
      .required('Name is required'),
    address: Yup.string()
      .min(10, 'Address must be at least 10 characters')
      .max(200, 'Address must be less than 200 characters')
      .required('Address is required'),
    phone: Yup.string()
      .matches(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
      .min(10, 'Phone number must be at least 10 digits')
      .required('Phone number is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    hours: Yup.string()
      .max(100, 'Hours must be less than 100 characters'),
    description: Yup.string()
      .max(500, 'Description must be less than 500 characters')
  });

  const initialValues = {
    name: showroom?.name || '',
    address: showroom?.address || '',
    phone: showroom?.phone || '',
    email: showroom?.email || '',
    hours: showroom?.hours || '',
    description: showroom?.description || ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (isEditing) {
        response = await showroomsAPI.update(showroom.id, values);
      } else {
        response = await showroomsAPI.create(values);
      }

      onSuccess(response.data, isEditing);
      alert(`Showroom ${isEditing ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error saving showroom:', error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} showroom`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Showroom' : 'Add New Showroom'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="showroom-form">
              <div className="form-group">
                <label htmlFor="name">Showroom Name *</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g., Premium Auto Gallery"
                />
                <ErrorMessage name="name" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  placeholder="e.g., 123 Main Street, City, State 12345"
                />
                <ErrorMessage name="address" component="div" className="error-message" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="e.g., (555) 123-4567"
                  />
                  <ErrorMessage name="phone" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="e.g., contact@showroom.com"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hours">Business Hours</label>
                <Field
                  type="text"
                  id="hours"
                  name="hours"
                  className="form-input"
                  placeholder="e.g., Mon-Fri: 9AM-6PM, Sat: 9AM-5PM, Sun: Closed"
                />
                <ErrorMessage name="hours" component="div" className="error-message" />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe your showroom, specialties, services, etc."
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Showroom' : 'Add Showroom')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ShowroomForm;