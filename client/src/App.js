// src/App.js
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import UserFormPage from './components/UserForm/UserFormPage';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CreateUser from './components/CreateUser/CreateUser';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './context/AuthContext';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard';
import CreateCustomer from './components/CreateCustomer/CreateCustomer';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css'

const App = () => {

  const {loading, user} = useContext(AuthContext);
  const [style, setStyle] = useState({});


  // add window width event listener
  useEffect(() => {
    window.addEventListener('resize', () => {
      if(user && user.role && window.innerWidth > 768) {
        setStyle({marginLeft: '200px'});
      }
      else{
        setStyle({});
      }
    });
  }, [user, user?.role])

  useEffect(() => {

    if(user && user.role && window.innerWidth > 768) {
      setStyle({marginLeft: '200px'});
    }
    else{
      setStyle({});
    }
  }, [ window.innerWidth, user, user?.role])



  if(loading) return <div>Loading...</div>;

  return (
    <div>
      <Router>
        <Navbar/>

        <div className="app-container">
          {user && user.role && <Sidebar/>}
          <div className="content" style={style}>
            <br/>
            <br/>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/user-form" element={<UserFormPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/customer/dashboard" element={<CustomerDashboard/>} />
              <Route path="/admin/create-user" element={<CreateUser />} />
              <Route path="/customer/create-customer" element={<CreateCustomer/>} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default App;
