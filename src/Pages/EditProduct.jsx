import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import '../styles/AddProduct.css'; 
import Navbar from '../components/Navbar';
import { TailSpin } from 'react-loader-spinner';

const EditProduct = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState({
    name: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    fuelType: '',
    engine: '',
    color: '',
    transmission: '',
    condition: '',
    location: '',
    tags: '',
    images: [],
    carType: '',
    company: '',
    dealer: '',
    userId: JSON.parse(localStorage.getItem("user"))._id
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token is found
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`https://carmangemenbackend.onrender.com/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setCarDetails(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Error fetching car details");
          setLoading(false);
        });
    }
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImagesChange = (e) => {
    const files = e.target.files;
    const imageUrls = [];
    setLoading(true);

    Array.from(files).forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'insta-clone');
      formData.append('cloud_name', 'dzou03k4g');

      fetch('https://api.cloudinary.com/v1_1/dzou03k4g/image/upload', {
        method: 'PUT',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          imageUrls.push(data.secure_url);

          // Check if total images exceed 10
          if (imageUrls.length + carDetails.images.length > 10) {
            toast.error('You can only upload up to 10 images.');
            setLoading(false);
            return;
          }

          // If the total number of images doesn't exceed 10, proceed
          if (imageUrls.length === files.length) {
            setCarDetails((prevDetails) => ({
              ...prevDetails,
              images: [...prevDetails.images, ...imageUrls],
            }));
            setLoading(false);
          }
        })
        .catch(() => {
          toast.error('Error uploading image');
          setLoading(false);
        });
    });
  };

  const handleTagsChange = (e) => {
    const value = e.target.value;
    if(value){
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setCarDetails((prevDetails) => ({
          ...prevDetails,
          tags: tagsArray,
        }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://carmangemenbackend.onrender.com/api/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carDetails),
      });

      const data = await response.json();
      setLoading(false)

      if (response.ok) {
        toast.success('Car successfully updated');
        // Update the carDetails with the latest data returned from the server
        setCarDetails(data);  // Assuming the response contains the updated car details
      } else {
        toast.error(data.message || 'Failed to save car');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
   
   <div className="add-product-container">
        <Toaster />
        <div className="add-product-main-content">
          <h2 className="add-product-title">Edit Product</h2>
          <div className="add-product-form-container">
            <form onSubmit={handleSubmit}>
              <div className="add-product-form-group">
                <label>Name*</label>
                <input
                  type="text"
                  name="name"
                  value={carDetails.name}
                  onChange={handleChange}
                  placeholder="Enter car name"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Model*</label>
                <input
                  type="text"
                  name="model"
                  value={carDetails.model}
                  onChange={handleChange}
                  placeholder="Enter car model"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Year*</label>
                <input
                  type="number"
                  name="year"
                  value={carDetails.year}
                  onChange={handleChange}
                  placeholder="Enter manufacturing year"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Price*</label>
                <input
                  type="number"
                  name="price"
                  value={carDetails.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Mileage*</label>
                <input
                  type="text"
                  name="mileage"
                  value={carDetails.mileage}
                  onChange={handleChange}
                  placeholder="Enter mileage"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Fuel Type*</label>
                <input
                  type="text"
                  name="fuelType"
                  value={carDetails.fuelType}
                  onChange={handleChange}
                  placeholder="Enter fuel type (Petrol, Diesel, etc.)"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Engine*</label>
                <input
                  type="text"
                  name="engine"
                  value={carDetails.engine}
                  onChange={handleChange}
                  placeholder="Enter engine type"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Color*</label>
                <input
                  type="text"
                  name="color"
                  value={carDetails.color}
                  onChange={handleChange}
                  placeholder="Enter car color"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Transmission*</label>
                <input
                  type="text"
                  name="transmission"
                  value={carDetails.transmission}
                  onChange={handleChange}
                  placeholder="Enter transmission type"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Condition*</label>
                <input
                  type="text"
                  name="condition"
                  value={carDetails.condition}
                  onChange={handleChange}
                  placeholder="Enter car condition"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Location*</label>
                <input
                  type="text"
                  name="location"
                  value={carDetails.location}
                  onChange={handleChange}
                  placeholder="Enter location (City, State)"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Tags*</label>
                <input
                  type="text"
                  name="tags"
                  value={carDetails.tags}
                  onChange={handleTagsChange}
                  placeholder="Enter tags (comma separated)"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Product Photos*</label>
                <input
                  type="file"
                  name="images"
                  onChange={handleImagesChange}
                  multiple
                  accept="image/*"
                  required
                />
                {loading && <p>Uploading...</p>}
              </div>

              <div className="add-product-form-group">
                <label>Car Type*</label>
                <input
                  type="text"
                  name="carType"
                  value={carDetails.carType}
                  onChange={handleChange}
                  placeholder="Enter car type (SUV, Sedan, etc.)"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Company*</label>
                <input
                  type="text"
                  name="company"
                  value={carDetails.company}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="add-product-form-group">
                <label>Dealer*</label>
                <input
                  type="text"
                  name="dealer"
                  value={carDetails.dealer}
                  onChange={handleChange}
                  placeholder="Enter dealer name"
                  required
                />
              </div>

              <button type="submit" className="add-product-submit-btn">
                {loading ? 'Saving...' : 'Update Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
