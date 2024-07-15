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

export default instance;
