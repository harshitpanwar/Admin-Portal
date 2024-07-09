import React from 'react';
import axios from '../../utils/axiosConfig';
import './DeleteCustomerModal.css';

const DeleteCustomerModal = ({ customerId, onClose, onDelete }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/customers/${customerId}`);
            onDelete();
            onClose();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <p>Are you sure you want to delete this customer?</p>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );
};

export default DeleteCustomerModal;
