import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.get('/root');
      if (res.data.user) {
        setUser(res.data.user);
      } else {
        setUser({ authenticated: true });
      }
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(credentials) {
    try {
      const res = await axiosInstance.post('/auth/login', credentials);
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      
      toast.success('You are now logged in!');
      navigate('/', { replace: true });
      
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        toast.error(error.response.data.message || 'Invalid credentials');
      } else if (error.request) {
        toast.error('Cannot connect to server. Please try again.');
      } else {
        toast.error('Login failed. Please try again.');
      }
      
      throw error;
    }
  }

  async function signup(data) {
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      
      toast.success('Welcome to MemoDeck!');
      navigate('/', { replace: true });
      
      return res.data;
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        toast.error(error.response.data.message || 'Signup failed. Try again.');
      } else if (error.request) {
        toast.error('Cannot connect to server. Please try again.');
      } else {
        toast.error('Signup failed. Try again.');
      }
      
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login', { replace: true });
    toast.success('Logged out successfully');
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  return context;
}