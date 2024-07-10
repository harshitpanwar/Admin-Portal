import React, { useState, useEffect, useContext } from 'react';
import axios from '../../utils/axiosConfig';
import EditCustomerModal from '../EditCustomerModal/EditCustomerModal';
import DeleteCustomerModal from '../DeleteCustomerModal/DeleteCustomerModal';
import '../AdminDashboard/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CustomerDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCustomers();
    }, [currentPage, pageSize, fromDate, toDate]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/customers', {
                params: { page: currentPage, pageSize, from: fromDate, to: toDate },
            });
            setCustomers(response.data.customers);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleCreateCustomer = () => {
        navigate('/customer/create-customer')
    }
    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setIsEditModalOpen(true);
    };

    const handleDelete = (customerId) => {
        setSelectedCustomer(customerId);
        setIsDeleteModalOpen(true);
    };

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    return (
        <div className="customer-dashboard">
            <h1>Customer Dashboard</h1>
            <div className="filter-container">
            <label htmlFor="fromDate">From: </label>

                <input type="date" value={fromDate} onChange={handleFromDateChange} />
                <label htmlFor="fromDate">To: </label>

                <input type="date" value={toDate} onChange={handleToDateChange} />
            </div>
            <button className="create-user-button" onClick={handleCreateCustomer}>Create Customer</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Nationality</th>
                        <th>ID Number</th>
                        <th>Mobile Number</th>
                        <th>Department</th>
                        {user.role !== 'user' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.nationality}</td>
                            <td>{customer.idNumber}</td>
                            <td>{customer.mobileNumber}</td>
                            <td>{customer.department}</td>
                            {
                                user.role !== 'user' &&
                                <td>
                                    <button onClick={() => handleEdit(customer)}>Edit</button>
                                    <button onClick={() => handleDelete(customer._id)}>Delete</button>
                                </td>
                            }
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
            {isEditModalOpen && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    onClose={() => setIsEditModalOpen(false)}
                    onUpdate={fetchCustomers}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteCustomerModal
                    customerId={selectedCustomer}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onDelete={fetchCustomers}
                />
            )}
        </div>
    );
};

export default CustomerDashboard;
