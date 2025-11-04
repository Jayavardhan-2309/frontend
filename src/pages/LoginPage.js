//LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import homeBg from './images/home.jpg';
import sideImage from './images/parking7.png'; // use uploaded image

const LoginPage = ({ onLogin }) => {
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
  display: window.innerWidth >= 768 ? 'block' : 'none', // show on larger screens
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
            <LoginForm onLogin={onLogin} />
            <p style={textStyle}>
              Home <Link to="/" style={linkStyle}>Home</Link><br />
              Don’t have an account? <Link to="/register" style={linkStyle}>Register</Link>
            </p>
          </div>
        </div>
        <div style={rightStyle} className="login-side-image"></div>
      </div>
    </div>
  );
};

export default LoginPage;
