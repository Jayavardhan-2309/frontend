// Amounts.js
import React, { useEffect, useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import noDataImage from './images/transaction.png';

const Amounts = ({viewAs=null}) => {
  const [amounts, setAmounts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if(viewAs==='user') setIsAdmin(false);
    else setIsAdmin(storedUser?.isAdmin);

    api.get('/amounts')
      .then(res => setAmounts(res.data))
      .catch(console.error);
  }, [viewAs]);

  // User clicks "Pay"
  const markAsPaid = async (id) => {
    try {
      await api.patch(`/amounts/${id}/pay`);
      setAmounts(amounts.map(a =>
        a._id === id ? { ...a, paid: true } : a
      ));
    } catch (err) {
      alert('Failed to mark as paid');
    }
  };

  // Admin deletes paid record
  const deleteRecord = async (id) => {
    try {
      await api.delete(`/amounts/${id}`);
      setAmounts(amounts.filter(a => a._id !== id));
    } catch (err) {
      alert('Failed to delete record');
    }
  };

  const visibleAmounts = amounts.filter(item => !isAdmin || item.paid);

  return (
  <div className="card">
    <h2 style={{ color: 'black' }}>{isAdmin ? '💰 Collected Amounts' : '💰 My Amounts'}</h2>

    {visibleAmounts.length === 0 ? (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <img src={noDataImage} alt="No Data" style={{ width: '250px', opacity: 0.8 }} />
        <p style={{ color: '#555', fontSize: '1.1rem' }}>No amounts to show yet.</p>
      </div>
    ) : (
      visibleAmounts.map(item => (
        <div key={item._id} className="list-item">
          <div><strong>{item.number}</strong> - {item.owner}</div>
          <div>Slot: {item.slot}</div>
          <div>Entry: {new Date(item.parkedAt).toLocaleString()}</div>
          <div>Exit: {new Date(item.exitedAt).toLocaleString()}</div>
          <div><strong>Total: ₹{item.totalAmount}</strong></div>

          {!isAdmin && (
            <button
              className="primary"
              onClick={() => markAsPaid(item._id)}
              disabled={item.paid}
            >
              {item.paid ? 'Paid ✅' : 'Pay'}
            </button>
          )}

          {isAdmin && (
            <button
              className="danger"
              onClick={() => deleteRecord(item._id)}
            >
              🗑 Delete
            </button>
          )}
        </div>
      ))
    )}
  </div>
);
};

export default Amounts;
