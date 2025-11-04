// SlotForm.js
import React, { useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import slotImage from './images/addslot.png'; // ✅ use the slot illustration you uploaded

const SlotForm = () => {
  const [slotNumber, setSlotNumber] = useState('');

  const addSlot = async () => {
    if (!slotNumber) return alert('Enter slot number');
    try {
      await api.post('/slots', { slotNumber });
      alert('Successfully added a slot');
      setSlotNumber('');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || 'Slot exists');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.formSection}>
          <h2 style={styles.heading}>🅿️ Add Parking Slot</h2>
          <input
            style={styles.input}
            placeholder="Slot Number"
            value={slotNumber}
            onChange={e => setSlotNumber(e.target.value)}
          />
          <button style={styles.button} onClick={addSlot}>
            ➕ Add Slot
          </button>
        </div>

        <div style={styles.imageSection}>
          <img src={slotImage} alt="Slot" style={styles.image} />
        </div>
      </div>
    </div>
  );
};

// ✅ Inline Styles
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
    maxWidth: '700px',
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
  },
  imageSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    opacity: 0.9,
  },
};

export default SlotForm;
