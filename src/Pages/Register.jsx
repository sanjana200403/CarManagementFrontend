import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://carmangemenbackend.onrender.com/api/auth/register', {
        username :name,
        email,
        password,
      });
      
      if (response.data) {
        setSuccess('Registration successful!');
        console.log(response.data.user)
        localStorage.setItem('user',JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token);
        navigate("/")
        navigate("/")
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <div className="login-illustration">
            <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg" alt="illustration" />
          </div>
          <div className="login-form">
            <h1>Welcome to Spyn!</h1>
            <p>Register your account</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <div className='account'>
              
              <p>Don't Have an account ? </p>
              <Link to="/login">
              <b>Login</b>
              </Link>
              </div>
  
        
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
