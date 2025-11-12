// components/DashboardLayout.js
import React from 'react';
import logo from '../logo.svg';
import logo1 from '../logo1.svg'
import '../App.css';
import { Outlet, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <div style={{display: 'flex',height: '100vh', width: '100vw',overflow: 'hidden',position: 'relative', zIndex: '1'}}>
    <div className="App-logo" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${!user.isAdmin ? logo : logo1})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.7,
        zIndex: '-1',
      }}></div>
    <aside className="sidebar" 
      style={{
        overflowY: user.isAdmin ? 'auto' : 'visible',
        maxHeight: '100vh'
      }}
    >
        <h2>🅿️ Smart Parking</h2>
        <button onClick={() => navigate('/app/profile')}>👤 Profile</button>
        {!user.isAdmin ? (
          <>
            <button onClick={() => navigate('/app/form')}>🚗 Book Slot</button>
            <button onClick={() => navigate('/app/amounts')}>💰 My Amounts</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/app/form')}>🚗 Book Slot</button>
            <button onClick={() => navigate('/app/list')}>📄 Bookings</button>
            <button onClick={() => navigate('/app/slots')}>🅿️ Manage Slots</button>
            <button onClick={() => navigate('/app/addSlot')}>➕ Add Slot</button>
            <button onClick={() => navigate('/app/amounts')}>💰 Collected Amounts</button>
            <button onClick={() => navigate('/app/calc')}>🧮 Calculate</button>
          </>
        )}
        <button className="danger" onClick={logout}>Logout</button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
