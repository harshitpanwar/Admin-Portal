import React, { createContext, useState, useEffect } from 'react';
import { removeJwt } from '../utils/auth';
import axios from '../utils/axiosConfig';
import {REACT_APP_API_URL} from '../env'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
          const response = await axios.get(`${REACT_APP_API_URL}/api/users/me`);
          setUser(response.data);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        removeJwt();
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    removeJwt();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
