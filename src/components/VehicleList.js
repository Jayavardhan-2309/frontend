//VehicleList.js
import React, { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import noVehiclesImage from './images/bookings.png';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.get('/vehicles')
      .then(res => {
        setVehicles(res.data);
        setFilteredVehicles(res.data);
      })
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = vehicles.filter(vehicle =>
      vehicle.number.toLowerCase().includes(term) ||
      vehicle.owner.toLowerCase().includes(term) ||
      vehicle.slot.toLowerCase().includes(term)
    );
    setFilteredVehicles(filtered);
  };

  const notifyVehicle = async (vehicleId) => {
    try {
      await api.put(`/vehicles/${vehicleId}/notify`);
      setVehicles(prev =>
        prev.map(v => (v._id === vehicleId ? { ...v, notified: true } : v))
      );
      setFilteredVehicles(prev =>
        prev.map(v => (v._id === vehicleId ? { ...v, notified: true } : v))
      );
    } catch (err) {
      alert('Failed to mark as notified');
    }
  };

  return (
  <div className="card">
    <h2 style={{ color: 'black' }}>📄 Vehicle Bookings</h2>

    <input
      type="text"
      placeholder="Search by slot, vehicle number, or name"
      value={searchTerm}
      onChange={handleSearch}
      style={{
        marginBottom: '1rem',
        padding: '0.5rem',
        width: '90%',
        borderRadius: '5px',
        border: '1px solid #ccc'
      }}
    />

    {filteredVehicles.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img src={noVehiclesImage} alt="No Vehicles" style={{ width: '250px', opacity: 0.8 }} />
        <p style={{ color: '#555', fontSize: '1.1rem' }}>No vehicles booked yet.</p>
      </div>
    ) : (
      filteredVehicles.map(vehicle => (
        <div key={vehicle._id} className="list-item">
          {vehicle.number} - {vehicle.owner} - Slot: {vehicle.slot || 'Unassigned'}

          <button
            className={vehicle.notified ? 'success' : 'primary'}
            onClick={() => notifyVehicle(vehicle._id)}
          >
            {vehicle.notified ? 'Notified ✅' : 'Notify'}
          </button>
        </div>
      ))
    )}
  </div>
);

};

export default VehicleList;
