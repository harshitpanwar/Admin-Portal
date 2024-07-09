// src/components/CreateUser.js
import React, { useContext, useState } from 'react';
import axios from '../../utils/axiosConfig';
import './CreateUser.css'
import { AuthContext } from '../../context/AuthContext';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role for normal users
  const [department, setDepartment] = useState(''); // State for department selection
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const {user} = useContext(AuthContext);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/admin/create-user', {
        username,
        password,
        role,
        department,
        name,
        // nationality,
        // idNumber,
        // mobileNumber,
      });
      setError('User created successfully.');

    } catch (error) {
      setError(error?.response?.data?.message);
      console.error('Create user error:', error);
    }
  };

  return (
    <div className="create-customer">
      <h2>Create Staff User</h2>
      <form onSubmit={handleCreateUser}>
        <label>
          Username:<br/>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:<br/>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role:<br/>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            {user.role === 'superadmin' && <option value="admin">Admin</option>}
          </select>
        </label>
        {user.role === 'superadmin' && (
          <label>
            Department:
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </label>
        )}
        <label>
          Name:<br/>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* <label>
          Nationality:<br/>
          <input
            type="text"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </label>
        <label>
          ID Number:<br/>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
        </label>
        <label>
          Mobile Number:<br/>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label> */}
        <button type="submit">Create User</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CreateUser;
