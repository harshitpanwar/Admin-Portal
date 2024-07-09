// src/components/AdminDashboard.js
import React, { useContext, useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    password: '',
    role: '',
    name: '',
    nationality: '',
    idNumber: '',
    mobileNumber: ''
  });
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, fromDate, toDate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/admin/users', {
        params: {
          page: currentPage,
          limit: 10,
          from: fromDate,
          to: toDate
        }
      });
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      password: '',
      role: user.role,
      name: user.name,
      // nationality: user.nationality,
      // idNumber: user.idNumber,
      // mobileNumber: user.mobileNumber
    });
    setEditModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/users/${selectedUser._id}`, formData);
      fetchUsers();
      setEditModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/admin/users/${selectedUser._id}`);
      fetchUsers();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreateUser = () => {
    navigate('/admin/create-user');
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="filter-container">
        <label htmlFor="fromDate">From: </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <label htmlFor="toDate">To: </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <button className="create-user-button" onClick={handleCreateUser}>Create User</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Department</th>
            <th>Role</th>
            <th>Name</th>
            {/* <th>Nationality</th>
            <th>ID Number</th>
            <th>Mobile Number</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.department}</td>
              <td>{user.role}</td>
              <td>{user.name}</td>
              {/* <td>{user.nationality}</td>
              <td>{user.idNumber}</td>
              <td>{user.mobileNumber}</td> */}
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <form onSubmit={handleEditSubmit}>

              <label htmlFor="password">Password:</label>
              <input
                type="text"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <label htmlFor="role">Role:</label>
              <select id="role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="user">User</option>
                {user.role === 'superadmin' && <option value="admin">Admin</option>}
              </select>

              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {/* <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              />
              <label htmlFor="idNumber">ID Number:</label>
              <input
                type="text"
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
              />
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
              /> */}
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditModalOpen(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
            <button onClick={handleDeleteConfirm}>Yes</button>
            <button onClick={() => setDeleteModalOpen(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
