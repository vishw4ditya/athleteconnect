import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { athletesAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, checkAuth } = useAuth();
  const [videos, setVideos] = useState([]);
  const [videoForm, setVideoForm] = useState({ title: '', url: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    age: '',
    sport: '',
    position: '',
    phone: '',
    location: '',
    achievements: '',
    photo: null
  });

  useEffect(() => {
    if (user) {
      setVideos(user.videoUrls || []);
      // Initialize edit form with current user data
      setEditForm({
        name: user.name || '',
        age: user.age || '',
        sport: user.sport || '',
        position: user.position || '',
        phone: user.phone || '',
        location: user.location || '',
        achievements: user.achievements || '',
        photo: null
      });
    }
  }, [user]);

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await athletesAPI.addVideo(videoForm);
      setVideos(response.data.videoUrls);
      setVideoForm({ title: '', url: '' });
      setSuccess('Video added successfully!');
      await checkAuth(); // Refresh user data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add video');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      const response = await athletesAPI.deleteVideo(videoId);
      setVideos(response.data.videoUrls);
      setSuccess('Video deleted successfully!');
      await checkAuth(); // Refresh user data
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete video');
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
    setError('');
    setSuccess('');
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Reset form to current user data
    if (user) {
      setEditForm({
        name: user.name || '',
        age: user.age || '',
        sport: user.sport || '',
        position: user.position || '',
        phone: user.phone || '',
        location: user.location || '',
        achievements: user.achievements || '',
        photo: null
      });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditPhotoChange = (e) => {
    setEditForm(prev => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(editForm).forEach(key => {
        if (editForm[key] && key !== 'photo') {
          formData.append(key, editForm[key]);
        }
      });
      
      if (editForm.photo) {
        formData.append('photo', editForm.photo);
      }

      await athletesAPI.updateProfile(formData);
      await checkAuth(); // Refresh user data
      setSuccess('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-content">
          <div className="dashboard-logo">
            <svg height="28" viewBox="0 0 24 24" width="28">
              <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
            <span>AthleteHub</span>
          </div>
          <div className="dashboard-nav-actions">
            <Link to="/athletes" className="nav-link">Athletes</Link>
            <button onClick={handleLogout} className="btn-logout">Sign Out</button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <aside className="profile-section">
          <div className="profile-header">
            {user.photo ? (
              <div className="avatar-wrapper">
                <img 
                  src={user.photo} 
                  alt={user.name}
                  className="profile-photo"
                />
              </div>
            ) : (
              <div className="avatar-wrapper">
                <div className="profile-photo" style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', fontWeight: '700', color: 'white'}}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <div className="profile-info">
              <h2>{user.name}</h2>
              <p style={{color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '4px'}}>{user.sport} • {user.position}</p>
              <p style={{color: 'var(--color-text-tertiary)', fontSize: '13px'}}>@{user.userID}</p>
              <button 
                onClick={handleEditProfile} 
                className="btn-edit-profile"
                style={{
                  marginTop: '12px',
                  padding: '8px 20px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{videos.length}</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat">
              <span className="stat-value">{user.age}</span>
              <span className="stat-label">Age</span>
            </div>
            <div className="stat">
              <span className="stat-value">0</span>
              <span className="stat-label">Views</span>
            </div>
          </div>

          <div style={{marginTop: '16px'}}>
            <div className="profile-detail">
              <strong>📍</strong>
              <span>{user.location}</span>
            </div>
          </div>

          <div className="contact-section">
            <h3>Contact Info</h3>
            <div className="contact-info">
              <p>📧 <a href={`mailto:${user.email}`}>{user.email}</a></p>
              <p>📱 <a href={`tel:${user.phone}`}>{user.phone}</a></p>
            </div>
          </div>

          {user.achievements && (
            <div className="achievements-section">
              <h3>Achievements</h3>
              <p>{user.achievements}</p>
            </div>
          )}
        </aside>

        <main className="videos-section">
          <div className="videos-header">
            <h2>My Videos</h2>
            <span className="video-count">{videos.length} {videos.length === 1 ? 'video' : 'videos'}</span>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleVideoSubmit} className="video-form">
            <h3>✨ Add New Video</h3>
            <div className="form-group">
              <label>Video Title</label>
              <input
                type="text"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                required
                placeholder="Enter video title"
              />
            </div>
            <div className="form-group">
              <label>Video URL (YouTube, Vimeo, or direct link)</label>
              <input
                type="url"
                value={videoForm.url}
                onChange={(e) => setVideoForm({ ...videoForm, url: e.target.value })}
                required
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <button type="submit" className="btn-instagram" disabled={loading}>
              {loading ? 'Adding...' : '✨ Add Video'}
            </button>
          </form>

          <div className="videos-grid">
            {videos.length === 0 ? (
              <p className="no-videos">📹 No videos yet. Add your first performance video above!</p>
            ) : (
              videos.map((video) => (
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
                      <span className="video-date">{new Date(video.addedAt).toLocaleDateString()}</span>
                      <span className="video-views">👁 0 views</span>
                    </div>
                    <div className="video-actions">
                      <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                        Open
                      </a>
                      <button 
                        onClick={() => handleDeleteVideo(video._id)} 
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <footer className="dashboard-footer">
        <p>© 2026 AthleteHub • Scouts and coaches can reach you through your contact info</p>
      </footer>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay" onClick={handleCloseEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>✏️ Edit Profile</h2>
              <button className="modal-close" onClick={handleCloseEditModal}>×</button>
            </div>
            
            <form onSubmit={handleUpdateProfile} className="edit-profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={editForm.age}
                    onChange={handleEditFormChange}
                    required
                    min="1"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Sport</label>
                  <input
                    type="text"
                    name="sport"
                    value={editForm.sport}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={editForm.position}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Achievements</label>
                <textarea
                  name="achievements"
                  value={editForm.achievements}
                  onChange={handleEditFormChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Update Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  onChange={handleEditPhotoChange}
                  accept="image/*"
                />
              </div>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseEditModal} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-instagram" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
