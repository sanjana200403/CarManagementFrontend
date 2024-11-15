import React, { useState, useEffect } from 'react';
import { FaHome, FaTicketAlt, FaEnvelope, FaUser, FaBars } from 'react-icons/fa'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate("/login")
    
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">
            <Link to={"/"}>
          <img
            width={"100px"}
            height={"30px"}
            src="https://bl-i.thgim.com/public/incoming/32t9i4/article65313925.ece/alternates/FREE_1200/Spyne%20Black%20png.png"
            alt=""
            />
            </Link>
        </h1>
        <ul className={`nav-links ${isMobile ? 'mobile' : ''}`}>
          {isAuthenticated ? (
            <>
              <li><Link to="/addProduct" className={isActive('/addProduct')}>
                <FaHome style={{ color: 'black' }} />
                <span className="nav-item-title">Add Car</span>
              </Link></li>

              <li><Link to="/myCars" className={isActive('/myCars')}>
                <FaTicketAlt style={{ color: 'black' }} />
                <span className="nav-item-title">My Cars</span>
              </Link></li>

              

              <li><button onClick={handleLogout} className="nav-item-title"
              style={{
               padding:"3px 5px",
               backgroundColor:"blue",
               color:"white",
               cursor:"pointer"
              }}
              >
                Logout
              </button></li>
            </>
          ) : (
            // Show login link if the user is not authenticated
            <li><Link to="/login" className={isActive('/login')}>
              <FaEnvelope style={{ color: 'black' }} />
              <span className="nav-item-title">Login</span>
            </Link></li>
          )}
        </ul>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <FaBars />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
