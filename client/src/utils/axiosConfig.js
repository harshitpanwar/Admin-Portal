import axios from 'axios';
import { REACT_APP_API_URL } from '../env';

const instance = axios.create({
  baseURL: `${REACT_APP_API_URL}/api`, // Replace with your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// on response, if token is expired, redirect to login
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
