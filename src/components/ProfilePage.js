import React, { useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

const ProfilePage = () => {
  const storedUser = JSON.parse(localStorage.getItem('user')) || {};
  const [name, setName] = useState(storedUser.name || '');
  const [isAdmin, setIsAdmin] = useState(storedUser.isAdmin || false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (storedUser.photo) {
      const fullPath = storedUser.photo.startsWith('/uploads')
        ? `http://localhost:5000${storedUser.photo}`
        : storedUser.photo;
      setPreview(fullPath);
    }
  }, [storedUser.photo]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const toggleRole = () => setIsAdmin(!isAdmin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('isAdmin', isAdmin);
    if (photo) formData.append('photo', photo);

    try {
      const token = localStorage.getItem('token');
      const res = await api.put('/auth/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const fullPath = res.data.photo?.startsWith('/uploads')
        ? `http://localhost:5000${res.data.photo}`
        : res.data.photo;

      const updatedUser = { ...res.data, photo: fullPath };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setPreview(fullPath);
      alert('Profile updated!');
      window.location.reload();
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('Update failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '90vh',
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        background: '#fff',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#222'
        }}>👤 Profile</h2>

        {preview && (
          <>
            <img
              src={preview}
              alt="Profile"
              onClick={() => setShowPopup(true)}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 1.5rem',
                display: 'block',
                border: '2px solid #007bff',
                cursor: 'pointer'
              }}
            />
            {showPopup && (
              <div
                onClick={() => setShowPopup(false)}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.8)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1000
                }}
              >
                <img
                  src={preview}
                  alt="Full Profile"
                  style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    borderRadius: '10px',
                    boxShadow: '0 0 20px rgba(255,255,255,0.5)'
                  }}
                />
              </div>
            )}
          </>
        )}

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          {/* Username */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontWeight: 'bold', color: '#333' }}>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
          </div>

          {/* Role toggle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontWeight: 'bold', color: '#333' }}>Role:</label>
            <button
              type="button"
              onClick={toggleRole}
              style={{
                backgroundColor: isAdmin ? '#ff4d4d' : '#00ffaa',
                color: '#000',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {isAdmin ? 'Switch to User' : 'Switch to Admin'}
            </button>
          </div>

          {/* File Upload */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ width: '140px', fontWeight: 'bold', color: '#333' }}>Upload Picture:</label>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>

          {/* Save Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="submit"
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: '#007bff',
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              💾 Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
