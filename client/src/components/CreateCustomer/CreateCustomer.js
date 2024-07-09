import React, { useContext, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './CreateCustomer.css';
import { AuthContext } from '../../context/AuthContext';

const CreateCustomer = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
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
            // navigate('/customer/dashboard');
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
                    Department:
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </label>
                }

                <label>
                    Nationality:
                    <input
                        type="text"
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                    />
                </label>
                <label>
                    ID Number:
                    <input
                        type="text"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                    />
                </label>
                <label>
                    Mobile Number:
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
