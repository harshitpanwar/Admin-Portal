// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import UserFormPage from './components/UserForm/UserFormPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateUser from './components/CreateUser/CreateUser';
import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';


const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-form" element={<UserFormPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-user" element={<CreateUser />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
