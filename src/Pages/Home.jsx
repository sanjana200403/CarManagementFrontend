import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TailSpin } from 'react-loader-spinner';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading  ] = useState(false)
  const [filteredCars, setFilteredCars] = useState([]); 
  const host = "https://carmangemenbackend.onrender.com"
  useEffect(() => {
    // Fetch car data from the backend API
    const fetchCars = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${host}/api/cars`); 
        const data = await response.json();
        setCars(data); 
        setFilteredCars(data);
        setLoading(false) 
      } catch (error) {
        console.error('Error fetching cars:', error);
        setLoading(false) 
      }
    };

    fetchCars(); 
  }, []);

  // Handle changes in the search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter cars based on search query
    const filtered = cars.filter(car =>
      car.name.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) || 
      car.location.toLowerCase().includes(query) 
    );

    setFilteredCars(filtered);
  };

  return (
    <>
     
      <Navbar/>
      <header className="header">
        <h1>GLIDE</h1>
        <h2>Your Luxury Car, Everywhere, Anytime</h2>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search for Cars.."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button type="submit">Search</button>
        </form>
      </header>
      
       { loading && 
         <div className="loading" style={{
          // height:"100vh"
         }}>
          <TailSpin/>
         </div>

      }
    {  !loading && <main className="main-content">
        <section className="recommend-section">
          <h2>Cars We Recommend</h2>
          <div className="car-cards">
            {filteredCars.length > 0 ? (
              filteredCars.map(car => (
                <Link
                  to={`/${car._id}`}
                  key={car._id}
                  style={{ textDecoration: 'none' }}
                >
                  <CarCard
                    name={car.name}
                    dealer={`${car.dealer}`}
                    image={car.images[0]} 
                  />
                </Link>
              ))
            ) : (
              <p>No cars found.</p>
            )}
          </div>
        </section>
      </main> }
    </>
  );
};

export default HomePage;
