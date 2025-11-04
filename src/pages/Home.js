// Home.js
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import home from './images/parking4.png';

const Home = ({ user, logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/app');
  }, [user, navigate]);

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${home})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="home-overlay">
        <nav className="home-navbar">
          <h1 className="logo">🅿️ Smart Parking</h1>
          <div>
            {/* Show About Us always, but show login/register only if not logged in */}
            <Link to="/about" className="btn">About Us</Link>
            {!user && (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn">Register</Link>
              </>
            )}
          </div>
        </nav>

        <div className="home-body">
          <div className="home-content">
            <h2>Park Smarter, Not Harder.</h2>
            <p>Seamlessly book and manage your parking slots in real time with confidence and convenience.</p>
            <div className="home-actions">
              {!user && (
                <>
                  <Link to="/login" className="cta-btn">🚀 Get Started</Link>
                </>
              )}
            </div>
          </div>
          <div className="provider-section">
            <h3>🧭 Find Your Parking Provider</h3>
            <button className="cta-btn" onClick={() => navigate('/providers')}>
              🔍 Get to Know Your Providers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
