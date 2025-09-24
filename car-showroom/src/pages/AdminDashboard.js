// src/pages/AdminDashboard.js
import { useState, useEffect } from 'react';
import { carsAPI, contactsAPI, showroomAPI } from '../services/api';
import CarForm from '../components/CarForm';
import ShowroomForm from '../components/ShowroomForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cars');
  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarForm, setShowCarForm] = useState(false);
  const [showShowroomForm, setShowShowroomForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [carsResponse, showroomsResponse, contactsResponse] = await Promise.all([
        carsAPI.getAll(),
        showroomAPI.getAll(),
        contactsAPI.getAll()
      ]);
      setCars(carsResponse.data);
      setShowrooms(showroomsResponse.data);
      setContacts(contactsResponse.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await carsAPI.delete(carId);
        setCars(cars.filter(car => car.id !== carId));
        alert('Car deleted successfully');
      } catch (error) {
        alert('Failed to delete car');
      }
    }
  };


  const handleCarFormSuccess = (carData, isEdit) => {
    if (isEdit) {
      setCars(cars.map(car => car.id === carData.id ? carData : car));
    } else {
      setCars([...cars, carData]);
    }
    setShowCarForm(false);
    setEditingItem(null);
  };

  const handleShowroomFormSuccess = (showroomData, isEdit) => {
    if (isEdit) {
      setShowrooms(showrooms.map(showroom => 
        showroom.id === showroomData.id ? showroomData : showroom
      ));
    } else {
      setShowrooms([...showrooms, showroomData]);
    }
    setShowShowroomForm(false);
    setEditingItem(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'cars' ? 'active' : ''}`}
            onClick={() => setActiveTab('cars')}
          >
            Cars ({cars.length})
          </button>
          <button 
            className={`tab ${activeTab === 'showrooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('showrooms')}
          >
            Showrooms ({showrooms.length})
          </button>
          <button 
            className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacts')}
          >
            Contacts ({contacts.length})
          </button>
        </div>

        {/* Cars Tab */}
        {activeTab === 'cars' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>Manage Cars</h2>
              <button 
                onClick={() => setShowCarForm(true)}
                className="add-btn"
              >
                + Add New Car
              </button>
            </div>
            
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Car</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Showroom</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map(car => (
                    <tr key={car.id}>
                      <td>
                        {car.image_url ? (
                          <img src={car.image_url} alt={`${car.make} ${car.model}`} className="table-image" />
                        ) : (
                          <div className="table-placeholder">Car</div>
                        )}
                      </td>
                      <td>{car.make} {car.model}</td>
                      <td>{car.year}</td>
                      <td>${car.price.toLocaleString()}</td>
                      <td>{showrooms.find(s => s.id === car.showroom_id)?.name || 'N/A'}</td>
                      <td>
                        <button 
                          onClick={() => {
                            setEditingItem(car);
                            setShowCarForm(true);
                          }}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteCar(car.id)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cars.length === 0 && <p className="no-data">No cars available</p>}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="tab-content">
            <div className="tab-header">
              <h2>Customer Contacts</h2>
            </div>
            
            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Car Interest</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(contact => (
                    <tr key={contact.id}>
                      <td>{formatDate(contact.created_at)}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        {contact.car ? 
                          `${contact.car.year} ${contact.car.make} ${contact.car.model}` : 
                          'N/A'
                        }
                      </td>
                      <td>
                        <div className="message-preview">
                          {contact.message.length > 50 ? 
                            `${contact.message.substring(0, 50)}...` : 
                            contact.message
                          }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contacts.length === 0 && <p className="no-data">No contacts available</p>}
            </div>
          </div>
        )}

        {/* Car Form Modal */}
        {showCarForm && (
          <CarForm 
            car={editingItem}
            showrooms={showrooms}
            onSuccess={handleCarFormSuccess}
            onClose={() => {
              setShowCarForm(false);
              setEditingItem(null);
            }}
          />
        )}

        {/* Showroom Form Modal */}
        {showShowroomForm && (
          <ShowroomForm 
            showroom={editingItem}
            onSuccess={handleShowroomFormSuccess}
            onClose={() => {
              setShowShowroomForm(false);
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;