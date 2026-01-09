import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser(response.data.athlete);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token && mounted) {
        try {
          const response = await authAPI.getMe();
          if (mounted) {
            setUser(response.data.athlete);
          }
        } catch (err) {
          console.error('Auth check failed:', err);
          if (mounted) {
            localStorage.removeItem('token');
            setUser(null);
          }
        }
      }
      if (mounted) {
        setLoading(false);
      }
    };
    
    initAuth();
    
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.athlete);
    return response.data;
  };

  const register = async (formData) => {
    const response = await authAPI.register(formData);
    localStorage.setItem('token', response.data.token);
    setUser(response.data.athlete);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export context for custom hook
export { AuthContext };
