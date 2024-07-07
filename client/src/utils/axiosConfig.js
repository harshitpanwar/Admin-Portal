import axios from 'axios';
import { REACT_APP_API_URL } from '../env';

const instance = axios.create({
  baseURL: `${REACT_APP_API_URL}/api`, // Replace with your backend URL
  withCredentials: true,
});

export default instance;
