import React, { useEffect, useState } from 'react';
import '../styles/MyCars.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [loading , setLoading] = useState(false)
   const host = "https://carmangemenbackend.onrender.com";
  const user = JSON.parse(localStorage.getItem('user')) || {}; 
  const userID = user._id; 
  useEffect(() => {
    if (!userID) {
      console.error('User ID not found');
      return;
    }

    // Fetch cars for this specific user
    const fetchUserCars = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${host}/api/cars/user/${userID}`);
        const data = await response.json();
        setLoading(false)
        setCars(data); 
      } catch (error) {
        console.error('Error fetching user cars:', error);
      }
    };

    fetchUserCars(); 
  }, [userID]);

  return (
    <>
      <Navbar />
      <div className="my-cars">
        <h1>All My Cars</h1>
        {
        loading && 
         <div className="loading" style={{
          height:"100vh"
         }}>
          <TailSpin/>
         </div>

      }
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="my-cars-card">
              <img src={car.images[0]} alt={car.name} />
              <div className="card-details">
                <h3>{car.name}</h3>
                <p>{car.description}</p>
                <Link to={`/${car._id}`}>
                <button>See Details</button>
                </Link>
                
              </div>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </>
  );
};

export default MyCars;
