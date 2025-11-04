// SlotList.js
import React, { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import noSlotsImage from './images/noslot.png'; // replace with your slot image

const SlotList = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    api.get('/slots')
      .then(res => setSlots(res.data))
      .catch(err => console.error('Error fetching slots:', err));
  }, []);

  const toggleOccupancy = async (slot) => {
    try {
      const updated = await api.put(`/slots/${slot._id}`, {
        isOccupied: !slot.isOccupied
      });

      setSlots(slots.map(s => (s._id === slot._id ? updated.data : s)));
    } catch (error) {
      alert('Failed to update slot status');
    }
  };

  return (
    <div className="card">
      <h2 style={{ color: 'black' }}>🅿️ Manage Parking Slots</h2>

      {slots.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <img
            src={noSlotsImage}
            alt="No Slots"
            style={{ width: '240px', opacity: 0.8 }}
          />
          <p style={{ color: '#555', fontSize: '1.1rem' }}>No parking slots available yet.</p>
        </div>
      ) : (
        slots.map(slot => (
          <div key={slot._id} className="list-item">
            <div>
              <strong>Slot:</strong> {slot.slotNumber}
              <br />
              <span>Status: <b>{slot.isOccupied ? '🚫 Occupied' : '✅ Available'}</b></span>
            </div>
            <button
              className="primary"
              style={{ marginTop: '0.5rem' }}
              onClick={() => toggleOccupancy(slot)}
            >
              Mark {slot.isOccupied ? 'Available' : 'Occupied'}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SlotList;
