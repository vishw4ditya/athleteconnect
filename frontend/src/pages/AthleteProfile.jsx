import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { athletesAPI } from '../services/api';
import '../styles/AthleteProfile.css';

const AthleteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAthleteProfile();
  }, [id]);

  const fetchAthleteProfile = async () => {
    try {
      const response = await athletesAPI.getById(id);
      setAthlete(response.data.athlete);
    } catch (err) {
      setError('Failed to load athlete profile');
      console.error('Error fetching athlete:', err);
    } finally {
      setLoading(false);
    }
  };

  const getVideoEmbedUrl = (url) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (loading) {
    return (
      <div className="athlete-profile-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading athlete profile...</p>
        </div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="athlete-profile-container">
        <div className="error-state">
          <p>{error || 'Athlete not found'}</p>
          <Link to="/athletes" className="btn-back">Back to Athletes</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="athlete-profile-container">
      <header className="profile-header">
        <nav className="profile-nav">
          <div className="profile-logo">
            <Link to="/">
              <svg height="32" viewBox="0 0 24 24" width="32">
                <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>AthleteHub</span>
            </Link>
          </div>
          <div className="profile-nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/athletes" className="nav-link">Athletes</Link>
            <Link to="/login" className="btn-secondary">Sign in</Link>
            <Link to="/register" className="btn-instagram">Get Started</Link>
          </div>
        </nav>
      </header>

      <div className="profile-content">
        <button onClick={() => navigate('/athletes')} className="btn-back-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Athletes
        </button>

        <div className="profile-hero">
          <div className="profile-banner">
            <div className="profile-photo-large-wrapper">
              {athlete.photo ? (
                <img 
                  src={athlete.photo} 
                  alt={athlete.name}
                  className="profile-photo-large"
                />
              ) : (
                <div className="profile-photo-large-placeholder">
                  {athlete.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="profile-info-section">
            <h1>{athlete.name}</h1>
            <p className="profile-subtitle">{athlete.sport} • {athlete.position}</p>
            <p className="profile-location">📍 {athlete.location}</p>
            
            <div className="profile-stats-bar">
              <div className="stat-item">
                <span className="stat-value">{athlete.videoUrls?.length || 0}</span>
                <span className="stat-label">Videos</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{athlete.age}</span>
                <span className="stat-label">Age</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">@{athlete.userID}</span>
                <span className="stat-label">Username</span>
              </div>
            </div>

            <div className="contact-buttons">
              <a href={`mailto:${athlete.email}`} className="btn-contact-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                Email
              </a>
              <a href={`tel:${athlete.phone}`} className="btn-contact-large">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call
              </a>
            </div>
          </div>
        </div>

        {athlete.achievements && (
          <div className="achievements-card">
            <h2>🏆 Achievements</h2>
            <p>{athlete.achievements}</p>
          </div>
        )}

        <div className="videos-section">
          <div className="videos-header">
            <h2>🎥 Performance Videos</h2>
            <span className="video-count">{athlete.videoUrls?.length || 0} {athlete.videoUrls?.length === 1 ? 'video' : 'videos'}</span>
          </div>

          {!athlete.videoUrls || athlete.videoUrls.length === 0 ? (
            <div className="no-videos">
              <p>📹 No videos available yet</p>
            </div>
          ) : (
            <div className="videos-grid">
              {athlete.videoUrls.map((video) => (
                <div key={video._id} className="video-card">
                  <div className="video-thumbnail">
                    <div className="video-wrapper">
                      <iframe
                        src={getVideoEmbedUrl(video.url)}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.title}</h3>
                    <div className="video-meta">
                      <span className="video-date">
                        {new Date(video.addedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-watch">
                      Watch Full Video
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="profile-footer">
        <p>© 2026 AthleteHub • Connecting Athletes Worldwide</p>
      </footer>
    </div>
  );
};

export default AthleteProfile;
