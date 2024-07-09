// Sidebar.js

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css'; // Import the CSS for styling

const Sidebar = () => {
    const {user} = useContext(AuthContext);
    return (
        <div className="sidebar">
            <ul>
                <li>
                {user && (user.role === 'superadmin' || user.role === 'admin') && <Link to="/admin/dashboard">Admin Dashboard</Link>}

                </li>
                <li>
                {user && user.role && <Link to="/customer/dashboard">Customer Dashboard</Link>}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
