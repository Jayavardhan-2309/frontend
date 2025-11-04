//RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import homeBg from './images/home.jpg';
import sideImage from './images/parking11.png'; // use the same decorative image as Login

const RegisterPage = ({ onRegister }) => {
  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundImage: `url(${homeBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 0,
  };

  const contentStyle = {
    display: 'flex',
    width: '100%',
    zIndex: 1,
  };

  const leftStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(5px)',
  };

  const rightStyle = {
    flex: 1,
    background: `url(${sideImage}) no-repeat center center`,
    backgroundSize: 'contain',
    display: window.innerWidth >= 768 ? 'block' : 'none', // Responsive
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  };

  const logoStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    marginBottom: '1rem',
    textAlign: 'center',
  };

  const textStyle = {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.95rem',
    color: '#333',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <div style={leftStyle}>
          <div style={cardStyle}>
            <div style={logoStyle}>🅿️ Smart Parking</div>
            <RegisterForm onRegister={onRegister} />
            <p style={textStyle}>
              Home <Link to="/" style={linkStyle}>Home</Link><br />
              Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
            </p>
          </div>
        </div>
        <div style={rightStyle} className="register-side-image"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
