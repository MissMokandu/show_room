import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { carsAPI } from "../services/api";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("year-desc");
  const [selectedType, setSelectedType] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await carsAPI.getAll();
      setCars(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load cars");
    } finally {
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

  const uniqueTypes = [...new Set(cars.map((car) => car.type))];

  const filteredAndSortedCars = cars
    .filter((car) => {
      const matchesSearch =
        !searchTerm ||
        (car.name &&
          car.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (car.type &&
          car.type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        car.year.toString().includes(searchTerm);

      const matchesType = !selectedType || car.type === selectedType;
      const matchesMinYear = !minYear || car.year >= parseInt(minYear);
      const matchesMaxYear = !maxYear || car.year <= parseInt(maxYear);
      const matchesMinPrice = !minPrice || car.price >= parseFloat(minPrice);
      const matchesMaxPrice = !maxPrice || car.price <= parseFloat(maxPrice);

      return (
        matchesSearch &&
        matchesType &&
        matchesMinYear &&
        matchesMaxYear &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "price-desc":
          return b.price - a.price;
        case "price-asc":
          return a.price - b.price;
        default:
          return 0;
      }
    });

  if (loading) return <div className="loading">Loading our inventory...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cars-page">
      <div className="container">
        <div className="page-header">
          <h1>Our Car Inventory</h1>
          <p className="subtitle">
            Discover your perfect vehicle from our carefully selected collection
          </p>
        </div>

        <div className="controls-section">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by name, type, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-section">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="year-desc">Newest First</option>
              <option value="year-asc">Oldest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Year:</label>
            <input
              type="number"
              placeholder="Min Year"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max Year"
              value={maxYear}
              onChange={(e) => setMaxYear(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Price:</label>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="filter-input"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="results-info">
          <p>
            Showing {filteredAndSortedCars.length} of {cars.length} vehicles
          </p>
        </div>

        <div className="cars-grid">
          {filteredAndSortedCars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-image">
                {car.image_url ? (
                  <img src={car.image_url} alt={car.name} />
                ) : (
                  <div className="placeholder-image">
                    <span>🚗</span>
                    <p>No Image</p>
                  </div>
                )}
              </div>

              <div className="car-info">
                <h3 className="car-title">
                  {car.year} {car.name}
                </h3>

                <p className="car-price">{formatPrice(car.price)}</p>

                <div className="car-details">
                  <span className="detail-item">
                    <strong>Year:</strong> {car.year}
                  </span>
                  <span className="detail-item">
                    <strong>Type:</strong> {car.type}
                  </span>
                </div>

                <div className="car-actions">
                  <Link to={`/cars/${car.id}`} className="view-details-btn">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedCars.length === 0 && !loading && (
          <div className="no-results">
            <h3>No vehicles found</h3>
            <p>
              Try adjusting your search terms or browse all our available cars.
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {cars.length === 0 && !loading && (
          <div className="no-inventory">
            <h3>Our inventory is being updated</h3>
            <p>Please check back soon for our latest vehicle arrivals.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
