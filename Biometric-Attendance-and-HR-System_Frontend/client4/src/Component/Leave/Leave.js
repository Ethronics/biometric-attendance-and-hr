import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Leave.css';
import image from '../../assets/image.png';

function Leave() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [leaveFrom, setLeaveFrom] = useState('');
    const [leaveTo, setLeaveTo] = useState('');
    const [leaveType, setLeaveType] = useState('');
    const [leaveDescription, setLeaveDescription] = useState('');
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [view, setView] = useState('employeeRequests');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const response = await axios.get('http://localhost:8000/leave/leaves');
                setLeaveHistory(response.data);
            } catch (error) {
                console.error('Error fetching leaves:', error);
            }
        };
        fetchLeaves();
    }, []);

    const handleButtonClick = (leave) => {
        setSelectedEntry(leave);
        setIsModalOpen(1);
    };

    const handleRejectClick = () => {
        setIsModalOpen(2);
    };

    const handleRequestForLeaveClick = () => {
        setIsModalOpen(3);
    };

    const handleCloseModal = () => {
        setIsModalOpen(null);
        setSelectedEntry(null);
        setRejectionReason('');
        setLeaveFrom('');
        setLeaveTo('');
        setLeaveType('');
        setLeaveDescription('');
    };

    const handleRejectionReasonChange = (e) => {
        setRejectionReason(e.target.value);
    };

    const handleSubmitRejection = async () => {
        if (rejectionReason.trim() !== '') {
            try {
                await axios.post(`/api/leaves/${selectedEntry.id}/reject/`, {
                    rejection_reason: rejectionReason
                });
                alert('Rejection reason submitted.');
                handleCloseModal();
            } catch (error) {
                console.error('Error submitting rejection:', error);
            }
        } else {
            alert('Please enter a rejection reason.');
        }
    };

    const handleRowClick = (leave) => {
        navigate(`/leave/${leave.id}`);
    };

    // Filter leaveHistory to only include accepted leave requests
    const acceptedLeaves = leaveHistory.filter(leave => leave.status === 'Approved');

    const totalPages = Math.ceil(acceptedLeaves.length / itemsPerPage);
    const currentItems = acceptedLeaves.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={`leave-container ${isModalOpen ? 'blurred' : ''}`}>
            <div className="leave-top-table">
                <h3>Leave Requests</h3>
            </div>
            <div>
                <table className="leave-tables">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Appi Date</th>
                            <th>Leave From</th>
                            <th>Leave To</th>
                            <th>Leave Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((leave, index) => (
                            <tr key={index} className="leave-t" onClick={() => handleRowClick(leave)}>
                                <td className="employee-name-cell">
                                    <img src={image} alt="Profile" className="profile-picc" />
                                    <span className="employee-name">{leave.employee.full_name}</span>
                                </td>
                                <td>{leave.created_at}</td>
                                <td>{leave.leave_from}</td>
                                <td>{leave.leave_to}</td>
                                <td>
                                    <button onClick={(e) => { e.stopPropagation(); handleButtonClick(leave); }} className="type-button">
                                        {leave.leave_type}
                                    </button>
                                </td>
                                <td className="status-lleave">
                                    <button className="status-accept" onClick={(e) => { e.stopPropagation(); handleRequestForLeaveClick(); }}>Accept</button>
                                    <button className="status-rejected" onClick={(e) => { e.stopPropagation(); handleRejectClick(); }}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isModalOpen === 1 && (
                    <div className="leave-type">
                        <div className='cause'>
                            <h3>Problem Description from {selectedEntry.employee.full_name}</h3>
                            <textarea
                                value={selectedEntry.reason}
                                readOnly
                                rows="4"
                                cols="50"
                                className='text-capt'
                            />
                            <button className="handle-back" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                )}

                {isModalOpen === 2 && (
                    <div className='leave-type'>
                        <div className='cause'>
                            <h3>RESPONSE</h3>
                            <textarea
                                placeholder="Enter rejection reason..."
                                value={rejectionReason}
                                onChange={handleRejectionReasonChange}
                                rows="4"
                                cols="50"
                            />
                            <div className='b-su'>
                                <button onClick={handleSubmitRejection} className='handle-back'>Submit</button>
                                <button onClick={handleCloseModal} className='handle-back'>Back</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="pagination-atten">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    ‹
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    ›
                </button>
            </div>
        </div>
    );
}

export default Leave;
