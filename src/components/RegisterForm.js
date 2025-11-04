// RegisterForm.js
import React, { useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import { useNavigate } from 'react-router-dom';
const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin register
  const navigate = useNavigate(); 
  const register = async () => {
    try {
      const res = await api.post('/auth/register', {
        name,
        email,
        password,
        isAdmin
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onRegister(res.data.user);
      navigate('/app');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="card">
      <h2 style={{ color: 'black' }}>{isAdmin ? 'Admin Register' : 'User Register'}</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <button className="primary" onClick={register}>Register</button>

      <button
        className="secondary"
        style={{ marginTop: '0.5rem', backgroundColor: isAdmin ? '#dc3545' : '#007bff' }}
        onClick={() => setIsAdmin(!isAdmin)}
      >
        {isAdmin ? 'Switch to User Register' : 'Switch to Admin Register'}
      </button>
    </div>
  );
};

export default RegisterForm;
