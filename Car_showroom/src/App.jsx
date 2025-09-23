import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarsList from './pages/CarsList';
import CarDetails from './pages/CarDetails';
import ContactForm from './pages/ContactForm';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarsList />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/contact/:id" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;