// src/components/UserFormPage.js
import React, { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import './UserFormPage.css';
import { AuthContext } from '../../context/AuthContext';

const UserFormPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    nationality: '',
    idNumber: '',
    mobileNumber: '',
  });
  const [error, setError] = useState('');
  const {user} = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/users/me');
        const user = response.data;
        delete(user?._id);
        delete(user?.__v);
        setUserData(response.data);
      } catch (err) {
        setError('Error fetching user data');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...userData
      }
      await axios.put(`/users/me?id=${user._id}`, payload);
      setError('User details updated successfully');
    } catch (err) {
      setError('Error updating user details');
    }
  };

  return (
    <div className="user-form-container">
      <div className="user-form">
        <h2>Edit User Details</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nationality</label>
            <input
              type="text"
              name="nationality"
              value={userData.nationality}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>ID Number</label>
            <input
              type="text"
              name="idNumber"
              value={userData.idNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={userData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="update-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFormPage;
