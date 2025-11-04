// pages/ProvidersPage.js
import React, { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import background from './images/home.jpg';
import sideImage from './images/parking9.png'; // reuse image for visual consistency

const ProvidersPage = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/providers')
      .then(res => setProviders(res.data))
      .catch(err => console.error('Error fetching providers:', err));
  }, []);

  const filteredProviders = providers.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  const containerStyle = {
    display: 'flex',
    height: '100vh',
    backgroundImage: `url(${background})`,
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
    padding: '2rem',
    backdropFilter: 'blur(4px)',
  };

  const rightStyle = {
    flex: 1,
    background: `url(${sideImage}) no-repeat center center`,
    backgroundSize: 'contain',
    display: window.innerWidth >= 768 ? 'block' : 'none',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  };

  const inputStyle = {
    padding: '0.6rem',
    marginBottom: '1rem',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const backBtnStyle = {
    marginTop: '1rem',
    background: 'black',
    color: 'white',
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle} />
      <div style={contentStyle}>
        <div style={leftStyle}>
          <div style={cardStyle}>
            <h2 style={{ color: 'black', marginBottom: '1rem' }}>🅿️ Smart Parking</h2>
            <h2 style={{ color: 'black', marginBottom: '1rem' }}>🧭 Parking Providers</h2>
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={inputStyle}
            />

            {filteredProviders.length === 0 ? (
              <p>No matching providers found.</p>
            ) : (
              filteredProviders.map(p => (
                <div key={p._id} className="list-item" style={{ marginBottom: '1rem' }}>
                  <div><strong>{p.name}</strong> ({p.email})</div>
                  <div>🅿️ Available Slots: {p.availableSlots ?? 'N/A'}</div>
                  <div><i><Link to="/login">Login to book</Link></i></div>
                </div>
              ))
            )}

            <button onClick={() => navigate('/')} style={backBtnStyle}>
              ⬅ Home
            </button>
          </div>
        </div>
        <div style={rightStyle}></div>
      </div>
    </div>
  );
};

export default ProvidersPage;
