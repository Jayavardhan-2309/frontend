import React from 'react';
import './AboutPage.css';
import background from './images/home.jpg'; // optional background image
import { useNavigate } from 'react-router-dom';
const AboutPage = () => {
    const navigate=useNavigate();
  return (
    <div
      className="about-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="about-overlay">
        <div className="about-card">
          <h1>About Smart Parking</h1>
          <p>
            🅿️ <strong>Smart Parking</strong> is a next-generation parking system that enables users to book, manage, and track parking slots in real-time.
          </p>
          <p>
            Whether you're a <strong>driver</strong> looking to avoid parking hassles or a <strong>provider</strong> managing multiple slots — our platform empowers you with the tools to streamline the entire process.
          </p>
          <p>
            ✅ Real-time availability<br />
            ✅ Secure login & profile management<br />
            ✅ Admin control panel for slot & revenue tracking<br />
            ✅ Sleek and user-friendly experience
          </p>
          <p>
            We are committed to reducing congestion, saving time, and helping cities become smarter.
          </p>
          <p style={{ fontStyle: 'italic' }}>Thank you for choosing us! 🚀</p>
        </div>
        <button onClick={()=>navigate("/")}>back</button>
      </div>
    </div>
  );
};

export default AboutPage;
