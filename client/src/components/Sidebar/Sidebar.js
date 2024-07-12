// Sidebar.js

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Sidebar.css'; // Import the CSS for styling

const Sidebar = () => {
    const {user} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [style, setStyle] = useState({});
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    // add window width event listener
    useEffect(() => {
        window.addEventListener('resize', () => {
          if(user && user.role && window.innerWidth > 768) {
            setStyle({width: '200px'});
            setIsMobile(false);
          }
          else{
            setStyle({left: '0'});
            setIsMobile(true);
          }
        });
      }, [user, user?.role])
    
      useEffect(() => {
    
        if(user && user.role && window.innerWidth > 768) {
          setStyle({width: '200px'});
          setIsMobile(false);
        }
        else{
          setStyle({left: '0'});
          setIsMobile(true);
        }
      }, [ window.innerWidth, user, user?.role])
    
    
    return (
        <div>
            {
                !isOpen && isMobile &&          
                <button className="toggle-button" onClick={toggleSidebar}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-right"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                    </svg>
                </button>
            }

            <div style={style} className={`sidebar ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                    {user && (user.role === 'superadmin' || user.role === 'admin') && <Link to="/admin/dashboard">Admin Dashboard</Link>}

                    </li>
                    <li>
                    {user && user.role && <Link to="/customer/dashboard">Customer Dashboard</Link>}
                    </li>
                </ul>
                {
                    isMobile && isOpen && 
                    <button className="close-button" onClick={toggleSidebar}>
                    {/* sidebar icon from ui library */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                    </button>

                }
            </div>
        </div>
    );
};

export default Sidebar;
