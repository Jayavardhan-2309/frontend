import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VehicleForm from './components/VehicleForm';
import VehicleList from './components/VehicleList';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import Amounts from './components/Amounts';
import DashboardLayout from './components/DashboardLayout';
import ProfilePage from './components/ProfilePage';
import ProvidersPage from './pages/ProvidersPage';
import AboutPage from './pages/AboutPage';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (token && storedUser) {
    const parsedUser = JSON.parse(storedUser);
    parsedUser.token = token;
    setUser(parsedUser);
  }
  setLoading(false); // done checking
}, []);


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };
if (loading) return null; // or <LoadingScreen />

return (
  <Router>
    {loading ? null : (
      <Routes>
        <Route path="/" element={<Home user={user} logout={logout} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage onRegister={setUser} />} />
        <Route
          path="/app"
          element={user ? <DashboardLayout user={user} logout={logout} /> : <Navigate to="/login" />}
        >
          <Route index element={<VehicleForm />} />
          <Route path="form" element={<VehicleForm />} />
          <Route path="list" element={<VehicleList />} />
          <Route path="slots" element={<SlotList />} />
          <Route path="addSlot" element={<SlotForm />} />
          <Route path="amounts" element={<Amounts />} />
          <Route path="calc" element={<Amounts viewAs="user" />} />
          <Route path="profile" element={<ProfilePage user={user} setUser={setUser} />} />
          
        </Route>
        <Route path="/providers" element={<ProvidersPage />} />
      </Routes>
    )}
  </Router>
);

};


export default App;
