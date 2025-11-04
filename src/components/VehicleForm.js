// VehicleForm.js
import React, { useState, useEffect } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import carImage from './images/bookhere.png'; // use uploaded car image

const VehicleForm = () => {
  const [number, setNumber] = useState('');
  const [owner, setOwner] = useState('');
  const [slot, setSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    api.get('/slots')
      .then(res => {
        const freeSlots = res.data.filter(slot => !slot.isOccupied);
        setAvailableSlots(freeSlots);
      })
      .catch(console.error);
  }, []);

  const addVehicle = async () => {
    if (!number || !owner || !slot) return alert('Please fill all fields');
    try {
      await api.post('/vehicles', { number, owner, slot });

      const selectedSlot = availableSlots.find(s => s.slotNumber === slot);
      if (selectedSlot) {
        await api.put(`/slots/${selectedSlot._id}`, { isOccupied: true });
      }

      setNumber('');
      setOwner('');
      setSlot('');
      window.location.reload();
    } catch (error) {
      console.error('Vehicle add error:', error.response?.data || error.message);
      alert('Failed to add vehicle');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.formSection}>
          <h2 style={styles.heading}>🚗 Add Vehicle</h2>
          <input
            style={styles.input}
            placeholder="Vehicle Number"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Owner Name"
            value={owner}
            onChange={e => setOwner(e.target.value)}
          />
          <select
            style={styles.input}
            value={slot}
            onChange={e => setSlot(e.target.value)}
          >
            <option value="">Select Available Slot</option>
            {availableSlots.map(s => (
              <option key={s._id} value={s.slotNumber}>
                {s.slotNumber} - {s.adminName}
              </option>
            ))}
          </select>
          <button style={styles.button} onClick={addVehicle}>
            ➕ Add
          </button>
        </div>

        <div style={styles.imageSection}>
          <img src={carImage} alt="Car Illustration" style={styles.image} />
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 0 15px rgba(0,0,0,0.25)',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(10px)',
  },
  formSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingRight: '2rem',
  },
  heading: {
    textAlign: 'center',
    color: '#000',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.7rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    opacity: 0.9,
  },
};

export default VehicleForm;
