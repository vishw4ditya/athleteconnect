import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { athletesAPI } from '../services/api';
import '../styles/Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    totalAthletes: 0,
    totalVideos: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await athletesAPI.getStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    }
    return num.toString();
  };
  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="home-nav">
          <div className="home-logo">
            <svg height="32" viewBox="0 0 24 24" width="32">
              <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>AthleteHub</span>
          </div>
          <div className="home-nav-links">
            <Link to="/athletes" className="nav-link">Athletes</Link>
            <Link to="/login" className="btn-secondary">Sign in</Link>
            <Link to="/register" className="btn-instagram">Get Started</Link>
          </div>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Athletic Journey Starts Here</h1>
          <p className="hero-subtitle">Connect, Share, and Get Discovered</p>
          <p className="hero-description">
            Join thousands of athletes showcasing their talent. Build your profile, 
            upload performance videos, and connect with scouts, coaches, and fans worldwide.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-instagram">Create Your Profile</Link>
            <Link to="/login" className="btn-white">Sign In</Link>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="stats-container">
          <div className="stat-item">
            <h3>{loading ? '...' : formatNumber(stats.totalAthletes)}</h3>
            <p>Active Athletes</p>
          </div>
          <div className="stat-item">
            <h3>{loading ? '...' : formatNumber(stats.totalVideos)}</h3>
            <p>Videos Uploaded</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Everything You Need to Succeed</h2>
        <p className="features-section-subtitle">Powerful tools to showcase your athletic talent</p>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">👤</span>
            <h3>Professional Profile</h3>
            <p>Create a comprehensive athlete profile with your stats, achievements, photos, and contact information</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎥</span>
            <h3>Video Portfolio</h3>
            <p>Upload unlimited performance videos from YouTube, Vimeo, or any platform to showcase your skills</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📞</span>
            <h3>Direct Communication</h3>
            <p>Scouts and coaches can contact you directly via email or phone - no barriers</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🏆</span>
            <h3>Achievement Showcase</h3>
            <p>Highlight your awards, championships, and milestones to stand out from the competition</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3>Secure & Private</h3>
            <p>Your data is protected with enterprise-grade security and authentication</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Mobile Optimized</h3>
            <p>Access your profile and manage content from any device, anywhere</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take Your Career to the Next Level?</h2>
          <p>Join AthleteHub today and start connecting with opportunities that matter</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn-white">Create Free Account</Link>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 AthleteHub. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
