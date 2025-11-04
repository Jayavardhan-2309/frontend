import React, { useState } from 'react';
import api from '../utils/axiosInstance';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Toggle for admin login
  const navigate = useNavigate(); 

const login = async () => {
  try {
    const res = await api.post('/auth/login', {
      email,
      password,
      isAdmin
    });

    const user = res.data.user;
    const normalizedUser = {
      ...user,
      photo: user.photo
        ? user.photo.startsWith('/uploads')
          ? `http://localhost:5000${user.photo}`
          : user.photo
        : ''
    };

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    onLogin(normalizedUser);
    navigate('/app'); // Correct route
  } catch (error) {
    alert(error.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="card">
      <h2 style={{ color: 'black' }}>{isAdmin ? 'Admin Login' : 'User Login'}</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <button className="primary" onClick={login}>Login</button>

      <button
        className="secondary"
        style={{ marginTop: '0.5rem', backgroundColor: isAdmin ? '#dc3545' : '#007bff' }}
        onClick={() => setIsAdmin(!isAdmin)}
      >
        {isAdmin ? 'Switch to User Login' : 'Switch to Admin Login'}
      </button>
    </div>
  );
};

export default LoginForm;
