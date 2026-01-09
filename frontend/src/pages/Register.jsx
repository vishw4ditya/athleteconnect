import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userID: '',
    name: '',
    email: '',
    age: '',
    sport: '',
    position: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
    achievements: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword' && formData[key]) {
          data.append(key, formData[key]);
        }
      });

      await register(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <svg height="64" viewBox="0 0 24 24" width="64">
            <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
          </svg>
          <h1>AthleteHub</h1>
        </div>
        <h2>Create Your Athlete Profile</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>User ID *</label>
              <input
                type="text"
                name="userID"
                value={formData.userID}
                onChange={handleChange}
                required
                placeholder="Enter unique user ID"
              />
            </div>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="1"
                placeholder="Your age"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sport *</label>
              <input
                type="text"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
                placeholder="e.g., Basketball, Football"
              />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                placeholder="e.g., Forward, Midfielder"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 234 567 8900"
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Achievements</label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="3"
              placeholder="List your achievements and awards..."
            />
          </div>

          <div className="form-group">
            <label>Profile Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Min 6 characters"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button type="submit" className="btn-instagram" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
