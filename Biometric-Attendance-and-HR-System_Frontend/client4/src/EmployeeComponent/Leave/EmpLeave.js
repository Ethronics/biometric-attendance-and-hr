import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import '../../Component/Leave/DirectorLeave.css';
import '../../Component/Leave/Leave.css';
import '../../Component/Training/Training.css';
import { BsBookHalf } from 'react-icons/bs';

function EmpLeave({ email }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveDescription, setLeaveDescription] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaveHistory();
    fetchLeaveBalances();
  }, []);

  const fetchLeaveHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/leave/leaves/${email}`);
      setLeaveHistory(response.data);
    } catch (error) {
      console.error('Error fetching leave history:', error);
    }
  };

  const fetchLeaveBalances = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/leave/employee/${email}/leave-balance`);
      setLeaveBalances(response.data);
    } catch (error) {
      console.error('Error fetching leave balances:', error);
    }
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

  const handleSubmitLeaveRequest = async () => {
    if (leaveFrom && leaveTo && leaveType && leaveDescription) {
      try {
        await axios.post(`http://localhost:8000/leave/leaves/${email}/`, {
          email,
          leave_from: leaveFrom,
          leave_to: leaveTo,
          leave_type: leaveType,
          reason: leaveDescription,
        });
        fetchLeaveHistory(); // Refresh leave history after submission
        handleCloseModal();
      } catch (error) {
        console.error('Error submitting leave request:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className={`overtime-container ${isModalOpen ? 'blurred' : ''}`}>
      <div className="view-buttons">
        <div className="car-all">
          <div className="cardd">
            <div className="card-innerr">
              <BsBookHalf className="icon-all" />
              <h3 className="all-fon">Total Leave Balance</h3>
            </div>
            <h1 className="all-font">{leaveBalances.annual_leave_balance}</h1>
          </div>
          <div className="cardd">
            <div className="card-innerr">
              <BsBookHalf className="icon-all" />
              <h3 className="all-fon">Used Leave Balance</h3>
            </div>
            <h1 className="all-font">{/* Add logic to display used leave */}</h1>
          </div>
          <div className="cardd">
            <div className="card-innerr">
              <BsBookHalf className="icon-all" />
              <h3 className="all-fon">Remaining Leave Balance</h3>
            </div>
            <h1 className="all-font">{/* Add logic to display remaining leave */}</h1>
          </div>
        </div>

        <div className="edit-but">
          <button className="edit-cont" onClick={handleRequestForLeaveClick}>
            Request For Leave
          </button>
        </div>

        <div>
          <h3>My Leave History</h3>
          <table className="leave-tables">
            <thead>
              <tr>
                <th>Leave From</th>
                <th>Leave To</th>
                <th>Leave Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveHistory.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.leave_from}</td>
                  <td>{leave.leave_to}</td>
                  <td>{leave.leave_type}</td>
                  <td>
                    {leave.status === 'Rejected' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEntry(leave);
                          setIsModalOpen(5);
                        }}
                        className="type-button"
                      >
                        {leave.status}
                      </button>
                    ) : (
                      <button className="bt-status">{leave.status}</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen === 3 && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Request Leave</h2>
              <div className="form-container">
                <div className="form-group-train">
                  <label>
                    Enter Leave From:
                    <input
                      type="date"
                      value={leaveFrom}
                      onChange={(e) => setLeaveFrom(e.target.value)}
                      className="train-input"
                    />
                  </label>
                  <label>
                    Enter Leave To:
                    <input
                      type="date"
                      value={leaveTo}
                      onChange={(e) => setLeaveTo(e.target.value)}
                      className="train-input"
                    />
                  </label>

                  <select
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    className="train-input"
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Annual">Annual</option>
                    <option value="Sick">Sick</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Paternity">Paternity</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  <textarea
                    placeholder="Description"
                    value={leaveDescription}
                    onChange={(e) => setLeaveDescription(e.target.value)}
                    className="train-input"
                  ></textarea>
                </div>
              </div>
              <div className="b-su">
                <button onClick={handleSubmitLeaveRequest} className="handle-back">
                  Submit
                </button>
                <button onClick={handleCloseModal} className="handle-back">
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalOpen === 5 && (
          <div className="leave-type">
            <div className="cause">
              <h3>Reason</h3>
              <textarea
                value={selectedEntry?.rejection_reason || ''}
                readOnly
                rows="4"
                cols="50"
                className="text-capt"
              />
              <button className="handle-back" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmpLeave;
