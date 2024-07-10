import React, { useContext, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './CreateCustomer.css';
import { AuthContext } from '../../context/AuthContext';

const CreateCustomer = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('Sharjah golf and shooting club');
    const [nationality, setNationality] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/create-customer', {
                name,
                department,
                nationality,
                idNumber,
                mobileNumber,
            });
            setError('Customer Create Successfully')
            navigate('/customer/dashboard');
        } catch (error) {
            setError(error.message);
            console.error('Error creating customer:', error);
        }
    };

    return (
        <div className="create-customer">
            <h1>Create Customer</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: <br/>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {
                    user.role === 'superadmin' &&                 
                    <label>
                    Department: <br/>
                    {/* <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    /> */}
                    <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                        <option value="Sharjah golf and shooting club">Sharjah golf and shooting club</option>
                        <option value="نادي الذيد الرياضي الثقافي">نادي الذيد الرياضي الثقافي</option>
                    </select>
                </label>
                }

                <label>
                    Nationality: <br/>
                    <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />
                </label>
                <label>
                    ID Number: <br/>
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                </label>
                <label>
                    Mobile Number: <br/>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </label>
                <button type="submit">Create</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CreateCustomer;
