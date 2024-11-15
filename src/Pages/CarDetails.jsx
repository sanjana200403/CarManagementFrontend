import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CarDetails.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';


const CarDetail = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const host = "https://carmangemenbackend.onrender.com"

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${host}/api/cars/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        if (!response.ok) {
          throw new Error('Failed to fetch car');
        }
        const data = await response.json();
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${host}/api/cars/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
      alert('Car deleted successfully');
      navigate('/'); // Redirect to car listing after deletion
    } catch (error) {
      setError(error.message);
    }
  };


  const userId = JSON.parse(localStorage.getItem('user'))._id; 
  const isAuthorized = car && car.userId === userId; 
  // if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // if (!car) return <p>Car not found</p>;

  return (
    <>
    <Navbar/>
    {loading && 
    <div className='loading' style={{
      height: "100vh"
    }}>
    <TailSpin/>
    </div>
    }
    {!loading && <div className="car-detail-container">
      <div className="car-details-header">
        <h2 className="car-title">{car.name}</h2>
        {isAuthorized && (
          <div className="actions">
            <Link to={`/${car._id}/update`}>
            <button className="update" >Update</button>
            </Link>
            
            <button className="delete" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="description">
        {car.description || 'Description not available'}
      </div>
      <div className="car-images">
        {car.images && car.images.length > 0 ? (
          car.images.map((img, index) => (
            <img key={index} src={img} alt={car.name} className="car-image" />
          ))
        ) : (
          <div className="no-image">No Image Available</div>
        )}
      </div>
      <div className="car-posted" style={{display:"flex" , gap:"10px"}}>
        <h4>Posted By :</h4>
        <p>{car?.dealer}</p>
      </div>
      <h2 style={{ textAlign: 'center' }}>Additional Details</h2>
      <div className="additional-details">
        <div className="sub-details">
          <h3>Price</h3>
          <p>{car.price}</p>
        </div>
        <div className="sub-details">
          <h3>Mileage</h3>
          <p>{car.mileage}</p>
        </div>
        <div className="sub-details">
          <h3>Year</h3>
          <p>{car.year}</p>
        </div>
        <div className="sub-details">
          <h3>Fuel Type</h3>
          <p>{car.fuelType}</p>
        </div>
        <div className="sub-details">
          <h3>Color</h3>
          <p>{car.color}</p>
        </div>
        <div className="sub-details">
          <h3>Engine</h3>
          <p>{car.engine}</p>
        </div>
        <div className="sub-details">
          <h3>Transmission</h3>
          <p>{car.transmission}</p>
        </div>
        <div className="sub-details">
          <h3>Condition</h3>
          <p>{car.condition}</p>
        </div>
        <div className="sub-details">
          <h3>Location</h3>
          <p>{car.location}</p>
        </div>
        <div className="sub-details">
          <h3>Car Type</h3>
          <p>{car.carType}</p>
        </div>
        <div className="sub-details">
          <h3>Company</h3>
          <p>{car.company}</p>
        </div>
        <div className="sub-details">
          <h3>Dealer</h3>
          <p>{car.dealer}</p>
        </div>
      </div>
   
    </div>}
    </>
  );
};

export default CarDetail;
