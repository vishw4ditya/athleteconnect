import axios from 'axios';

// Use relative path for production (same server) or env variable for development
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (formData) => api.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

// Athletes API
export const athletesAPI = {
  getStats: () => api.get('/athletes/stats'),
  getAll: () => api.get('/athletes'),
  getById: (id) => api.get(`/athletes/${id}`),
  updateProfile: (formData) => api.put('/athletes/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  addVideo: (videoData) => api.post('/athletes/videos', videoData),
  deleteVideo: (videoId) => api.delete(`/athletes/videos/${videoId}`)
};

export default api;
