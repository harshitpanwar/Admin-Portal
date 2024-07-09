import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosConfig';
import './EditCustomerModal.css';

const EditCustomerModal = ({ customer, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: customer.name || '',
        nationality: customer.nationality || '',
        idNumber: customer.idNumber || '',
        mobileNumber: customer.mobileNumber || '',
        department: customer.department || '',
    });

    useEffect(() => {
        setFormData({
            name: customer.name || '',
            nationality: customer.nationality || '',
            idNumber: customer.idNumber || '',
            mobileNumber: customer.mobileNumber || '',
            department: customer.department || '',
        });
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/customers/${customer._id}`, formData);
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Customer</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Nationality:
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        ID Number:
                        <input
                            type="text"
                            name="idNumber"
                            value={formData.idNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Mobile Number:
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Department:
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Update</button><br/>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerModal;
