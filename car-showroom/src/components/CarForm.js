// src/components/CarForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { carsAPI } from '../services/api';

const CarForm = ({ car, showrooms, onSuccess, onClose }) => {
  const isEditing = Boolean(car);
  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object({
    make: Yup.string()
      .min(2, 'Make must be at least 2 characters')
      .max(30, 'Make must be less than 30 characters')
      .required('Make is required'),
    model: Yup.string()
      .min(1, 'Model must be at least 1 character')
      .max(50, 'Model must be less than 50 characters')
      .required('Model is required'),
    year: Yup.number()
      .integer('Year must be a whole number')
      .min(1900, 'Year must be 1900 or later')
      .max(currentYear + 1, `Year cannot be later than ${currentYear + 1}`)
      .required('Year is required'),
    price: Yup.number()
      .positive('Price must be a positive number')
      .min(1, 'Price must be at least $1')
      .max(10000000, 'Price cannot exceed $10,000,000')
      .required('Price is required'),
    mileage: Yup.number()
      .integer('Mileage must be a whole number')
      .min(0, 'Mileage cannot be negative')
      .max(999999, 'Mileage cannot exceed 999,999'),
    showroom_id: Yup.number()
      .positive('Please select a showroom')
      .required('Showroom is required'),
    image_url: Yup.string()
      .url('Must be a valid URL'),
    description: Yup.string()
      .max(1000, 'Description must be less than 1000 characters'),
    color: Yup.string()
      .max(20, 'Color must be less than 20 characters'),
    engine: Yup.string()
      .max(50, 'Engine must be less than 50 characters'),
    transmission: Yup.string()
      .max(30, 'Transmission must be less than 30 characters'),
    fuel_type: Yup.string()
      .max(20, 'Fuel type must be less than 20 characters')
  });

  const initialValues = {
    make: car?.make || '',
    model: car?.model || '',
    year: car?.year || '',
    price: car?.price || '',
    mileage: car?.mileage || '',
    showroom_id: car?.showroom_id || '',
    image_url: car?.image_url || '',
    description: car?.description || '',
    color: car?.color || '',
    engine: car?.engine || '',
    transmission: car?.transmission || '',
    fuel_type: car?.fuel_type || ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Convert string numbers to actual numbers
      const formData = {
        ...values,
        year: parseInt(values.year),
        price: parseFloat(values.price),
        mileage: values.mileage ? parseInt(values.mileage) : null,
        showroom_id: parseInt(values.showroom_id)
      };

      let response;
      if (isEditing) {
        response = await carsAPI.update(car.id, formData);
      } else {
        response = await carsAPI.create(formData);
      }

      onSuccess(response.data, isEditing);
      alert(`Car ${isEditing ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error saving car:', error);
      alert(`Failed to ${isEditing ? 'update' : 'create'} car`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-modal">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Car' : 'Add New Car'}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="car-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="make">Make *</label>
                  <Field
                    type="text"
                    id="make"
                    name="make"
                    className="form-input"
                    placeholder="e.g., Toyota"
                  />
                  <ErrorMessage name="make" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="model">Model *</label>
                  <Field
                    type="text"
                    id="model"
                    name="model"
                    className="form-input"
                    placeholder="e.g., Camry"
                  />
                  <ErrorMessage name="model" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="year">Year *</label>
                  <Field
                    type="number"
                    id="year"
                    name="year"
                    className="form-input"
                    min="1900"
                    max={currentYear + 1}
                  />
                  <ErrorMessage name="year" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price ($) *</label>
                  <Field
                    type="number"
                    id="price"
                    name="price"
                    className="form-input"
                    min="1"
                    step="0.01"
                  />
                  <ErrorMessage name="price" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="mileage">Mileage</label>
                  <Field
                    type="number"
                    id="mileage"
                    name="mileage"
                    className="form-input"
                    min="0"
                  />
                  <ErrorMessage name="mileage" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="showroom_id">Showroom *</label>
                  <Field
                    as="select"
                    id="showroom_id"
                    name="showroom_id"
                    className="form-select"
                  >
                    <option value="">Select Showroom</option>
                    {showrooms.map(showroom => (
                      <option key={showroom.id} value={showroom.id}>
                        {showroom.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="showroom_id" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Image URL</label>
                <Field
                  type="url"
                  id="image_url"
                  name="image_url"
                  className="form-input"
                  placeholder="https://example.com/car-image.jpg"
                />
                <ErrorMessage name="image_url" component="div" className="error-message" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="color">Color</label>
                  <Field
                    type="text"
                    id="color"
                    name="color"
                    className="form-input"
                    placeholder="e.g., Blue"
                  />
                  <ErrorMessage name="color" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="engine">Engine</label>
                  <Field
                    type="text"
                    id="engine"
                    name="engine"
                    className="form-input"
                    placeholder="e.g., 2.5L V6"
                  />
                  <ErrorMessage name="engine" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="transmission">Transmission</label>
                  <Field
                    as="select"
                    id="transmission"
                    name="transmission"
                    className="form-select"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                    <option value="CVT">CVT</option>
                  </Field>
                  <ErrorMessage name="transmission" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="fuel_type">Fuel Type</label>
                  <Field
                    as="select"
                    id="fuel_type"
                    name="fuel_type"
                    className="form-select"
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </Field>
                  <ErrorMessage name="fuel_type" component="div" className="error-message" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe the car's features, condition, etc."
                />
                <ErrorMessage name="description" component="div" className="error-message" />
              </div>

              <div className="form-actions">
                <button type="button" onClick={onClose} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="submit-btn">
                  {isSubmitting ? 'Saving...' : (isEditing ? 'Update Car' : 'Add Car')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CarForm;