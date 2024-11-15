import React, { useState , useEffect } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/AddProduct.css';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const navigate = useNavigate()
  const host = "https://carmangemenbackend.onrender.com"
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
    description: '',
    userId: JSON.parse(localStorage.getItem("user"))._id
  });

  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false); // Separate loading for images

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image uploads with a limit of 10 images
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + carDetails.images.length > 10) {
      toast.error('You can only upload up to 10 images');
      return;
    }

    setImageLoading(true); 

    const imageUrls = [];
    files.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'insta-clone'); 
      formData.append('cloud_name', 'dzou03k4g'); 

      fetch('https://api.cloudinary.com/v1_1/dzou03k4g/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          imageUrls.push(data.secure_url);

          if (imageUrls.length === files.length) {
            setCarDetails((prevDetails) => ({
              ...prevDetails,
              images: [...prevDetails.images, ...imageUrls],
            }));
            setImageLoading(false); 
            toast.success('Images uploaded successfully');
          }
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setImageLoading(false); 
          toast.error('Error uploading image');
        });
    });
  };

  // Handle tags as comma-separated values
  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(',').map((tag) => tag.trim());
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      tags: tagsArray,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${host}/api/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carDetails),
      });

      const data = await response.json();
      navigate("/")

      if (response.ok) {
        toast.success('Car successfully added');
        navigate("/")
        setCarDetails({
          name: '', model: '', year: '', price: '', mileage: '', fuelType: '',
          engine: '', color: '', transmission: '', condition: '', location: '',
          tags: '', images: [], carType: '', company: '', dealer: '',
          description: '', userId: JSON.parse(localStorage.getItem("user"))._id
        });
      } else {
        toast.error(data.message || 'Failed to create car');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }

    setLoading(false);
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="add-product-container">
        <div className="add-product-main-content">
          <h2 className="add-product-title">Add Product</h2>
          <div className="add-product-form-container">
            <form onSubmit={handleSubmit}>
              <div className="add-product-form-group">
                <label>Name*</label>
                <input type="text" name="name" value={carDetails.name} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Model*</label>
                <input type="text" name="model" value={carDetails.model} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Year*</label>
                <input type="number" name="year" value={carDetails.year} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Price*</label>
                <input type="number" name="price" value={carDetails.price} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Mileage*</label>
                <input type="text" name="mileage" value={carDetails.mileage} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Fuel Type*</label>
                <input type="text" name="fuelType" value={carDetails.fuelType} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Engine*</label>
                <input type="text" name="engine" value={carDetails.engine} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Color*</label>
                <input type="text" name="color" value={carDetails.color} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Transmission*</label>
                <input type="text" name="transmission" value={carDetails.transmission} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Condition*</label>
                <input type="text" name="condition" value={carDetails.condition} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Location*</label>
                <input type="text" name="location" value={carDetails.location} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Tags (comma separated)*</label>
                <input type="text" name="tags" onChange={handleTagsChange} />
              </div>

              <div className="add-product-form-group">
                <label>Images* (Max 10 images)</label>
                <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
                {imageLoading && <p>Uploading images...</p>} {/* Show loading text for image uploads */}
              </div>

              <div className="add-product-form-group">
                <label>Car Type*</label>
                <input type="text" name="carType" value={carDetails.carType} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Company*</label>
                <input type="text" name="company" value={carDetails.company} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Dealer*</label>
                <input type="text" name="dealer" value={carDetails.dealer} onChange={handleChange} required />
              </div>

              <div className="add-product-form-group">
                <label>Description*</label>
                <textarea
                  name="description"
                  value={carDetails.description}
                  onChange={handleChange}
                  placeholder="Enter car description"
                  required
                />
              </div>

              <button type="submit" className="add-product-submit-btn" disabled={loading}>
                {loading ? 'Saving...' : 'Save Product'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
