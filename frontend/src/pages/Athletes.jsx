import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { athletesAPI } from '../services/api';
import '../styles/Athletes.css';

const Athletes = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('');

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await athletesAPI.getAll();
      setAthletes(response.data.athletes);
    } catch (err) {
      setError('Failed to load athletes');
      console.error('Error fetching athletes:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.sport.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === '' || athlete.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  const uniqueSports = [...new Set(athletes.map(athlete => athlete.sport))];

  if (loading) {
    return (
      <div className="athletes-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading athletes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="athletes-container">
      <header className="athletes-header">
        <nav className="athletes-nav">
          <div className="athletes-logo">
            <Link to="/">
              <svg height="32" viewBox="0 0 24 24" width="32">
                <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              <span>AthleteHub</span>
            </Link>
          </div>
          <div className="athletes-nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/athletes" className="nav-link active">Athletes</Link>
            <Link to="/login" className="btn-secondary">Sign in</Link>
            <Link to="/register" className="btn-instagram">Get Started</Link>
          </div>
        </nav>
      </header>

      <div className="athletes-content">
        <div className="athletes-hero">
          <h1>Discover Athletes</h1>
          <p>Connect with talented athletes from around the world</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filters-section">
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by name, sport, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="sport-filter"
            value={filterSport}
            onChange={(e) => setFilterSport(e.target.value)}
          >
            <option value="">All Sports</option>
            {uniqueSports.map(sport => (
              <option key={sport} value={sport}>{sport}</option>
            ))}
          </select>
        </div>

        <div className="athletes-stats">
          <p>Showing {filteredAthletes.length} of {athletes.length} athletes</p>
        </div>

        {filteredAthletes.length === 0 ? (
          <div className="no-results">
            <p>No athletes found matching your criteria</p>
          </div>
        ) : (
          <div className="athletes-grid">
            {filteredAthletes.map((athlete) => (
              <div key={athlete._id} className="athlete-card">
                <Link to={`/athletes/${athlete._id}`} className="athlete-card-link">
                  <div className="athlete-photo-wrapper">
                    {athlete.photo ? (
                      <img 
                        src={athlete.photo} 
                        alt={athlete.name}
                        className="athlete-photo"
                      />
                    ) : (
                      <div className="athlete-photo-placeholder">
                        {athlete.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  
                  <div className="athlete-info">
                    <h3>{athlete.name}</h3>
                    <p className="athlete-sport">{athlete.sport} • {athlete.position}</p>
                    <p className="athlete-location">📍 {athlete.location}</p>
                    
                    {athlete.achievements && (
                      <p className="athlete-achievements">{athlete.achievements.substring(0, 100)}...</p>
                    )}
                    
                    <div className="athlete-stats-mini">
                      <span>🎥 {athlete.videoUrls?.length || 0} videos</span>
                      <span>👤 {athlete.age} yrs</span>
                    </div>
                  </div>
                </Link>

                <div className="athlete-actions">
                  <a href={`mailto:${athlete.email}`} className="btn-contact" onClick={(e) => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    Email
                  </a>
                  <a href={`tel:${athlete.phone}`} className="btn-contact" onClick={(e) => e.stopPropagation()}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="athletes-footer">
        <p>© 2026 AthleteHub • Connecting Athletes Worldwide</p>
      </footer>
    </div>
  );
};

export default Athletes;
