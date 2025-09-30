import axios from "axios";

const API_BASE_URL = "https://show-room-aype.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cars API
export const carsAPI = {
  getAll: () => api.get("/cars"),
  getById: (id) => api.get(`/cars/${id}`),
  create: (carData) => api.post("/cars", carData),
  update: (id, carData) => api.put(`/cars/${id}`, carData),
  delete: (id) => api.delete(`/cars/${id}`),
};

// Contacts API
export const contactsAPI = {
  create: (contactData) => api.post("/contacts", contactData),
  getAll: () => api.get("/contacts"),
  getById: (id) => api.get(`/contacts/${id}`),
  update: (id, contactData) => api.put(`/contacts/${id}`, contactData),
  delete: (id) => api.delete(`/contacts/${id}`),
};

// Error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
