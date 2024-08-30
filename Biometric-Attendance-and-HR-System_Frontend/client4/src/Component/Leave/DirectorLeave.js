import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Leave.css';
import './DirectorLeave.css';
import image from '../../assets/image.png';
import { CiViewList } from 'react-icons/ci';
import { BsBookHalf } from 'react-icons/bs';
import axios from 'axios'; // Make sure to install axios

function DirectorLeave({email}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveDescription, setLeaveDescription] = useState('');
  const [view, setView] = useState('employeeRequests');
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [directorLeaveHistory, setDirectorLeaveHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch leave history
    axios.get('http://localhost:8000/leave/leaves/')
      .then(response => {
        setLeaveHistory(response.data);
      })
      .catch(error => console.error('Error fetching leave history:', error));

    // Fetch director leave history
    axios.get(`http://localhost:8000/leave/leaves/${email}/`)
      .then(response => {
        setDirectorLeaveHistory(response.data);
      })
      .catch(error => console.error('Error fetching director leave history:', error));
  }, []);

  const handleButtonClick = (leave) => {
    setSelectedEntry(leave);
    setIsModalOpen(1);
  };

  const handleRejectClick = () => {
    setIsModalOpen(2);
  };

  const handleRejectHistory = (leave) => {
    setSelectedEntry(leave);
    setIsModalOpen(5);
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

const handleSubmitRejection = () => {
  if (selectedEntry && rejectionReason.trim() !== '') {
    axios.post(`http://localhost:8000/leave/leaves/${selectedEntry.id}/reject/`, { rejectionReason })
      .then(() => {
        handleCloseModal();
        // Refresh data if needed
      })
      .catch(error => console.error('Error submitting rejection:', error));
  } else {
    alert('Please enter a rejection reason or select an entry.');
  }
};

  const handleSubmitLeaveRequest = () => {
    if (leaveFrom && leaveTo && leaveType && leaveDescription) {
      axios.post('/api/leaves/', {
        leaveFrom,
        leaveTo,
        leaveType,
        leaveDescription
      })
        .then(() => {
          handleCloseModal();
          // Refresh data if needed
        })
        .catch(error => console.error('Error submitting leave request:', error));
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleRowClick = (leave) => {
    navigate(`/leave/${leave.name.toLowerCase()}`);
  };

  const totalPages = Math.ceil(leaveHistory.length / itemsPerPage);
  const currentItems = leaveHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`leave-container ${isModalOpen ? 'blurred' : ''}`}>
      <div className="view-buttons">
        <button onClick={() => setView('directorLeaveHistory')} className={`btn-leave ${view === 'directorLeaveHistory' ? 'btn-lactive' : ''}`}>
          My Leave Request & History
        </button>
      </div>

      {view === 'employeeRequests' && (
        <>
          <div className="leave-top-table">
            <h3>Leave Request</h3>
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
                  <tr key={index} className="leave-t">
                    <td className="employee-name-cell">
                      <img src={leave.employee.profile_picture} alt="Profile" className="profile-picc" />
                      <span className="employee-name">{leave.employee}</span>
                    </td>
                    <td>{leave.appiDate}</td>
                    <td>{leave.leave_from}</td>
                    <td>{leave.leave_to}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleButtonClick(leave); }} className="type-button">
                        {leave.leave_type}
                      </button>
                    </td>
                    <td className="status-lleave">
                      <button className="status-accept">Accept</button>
                      <button className="status-rejected" onClick={(e) => { e.stopPropagation(); handleRejectClick(); }}>Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'directorLeaveHistory' && (
        <>
          <button onClick={() => setView('employeeRequests')} className='btn-back'>
            Back
          </button>
          <div className="car-all">
            <div className="cardd">
              <div className="card-innerr">
                <BsBookHalf className="icon-all" />
                <h3 className="all-fon">Total Leave Balance</h3>
              </div>
              <h1 className="all-font">m</h1>
            </div>
            <div className="cardd">
              <div className="card-innerr">
                <BsBookHalf className="icon-all" />
                <h3 className="all-fon">Used Leave Balance</h3>
              </div>
              <h1 className="all-font">m</h1>
            </div>
            <div className="cardd">
              <div className="card-innerr">
                <BsBookHalf className="icon-all" />
                <h3 className="all-fon">Remaining Leave Balance</h3>
              </div>
              <h1 className="all-font">m</h1>
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
                {directorLeaveHistory.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.leave_from}</td>
                    <td>{leave.leave_to}</td>
                    <td>{leave.leave_type}</td>
                    <td>
                      {leave.status === 'Rejected' ? (
                        <button onClick={(e) => { e.stopPropagation(); handleRejectHistory(leave); }} className="type-button">
                          {leave.status}
                        </button>
                      ) : (
                        <button className='bt-status'>{leave.status}</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modals */}
      {isModalOpen === 1 && (
        <div className="leave-type">
          <div className='cause'>
            <h3>Problem Description from {selectedEntry.name}</h3>
            <textarea
              value={selectedEntry.description}
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

      {isModalOpen === 3 && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Request Leave </h2>
            <div className="form-container">
              <div className="form-group-train">
                <label>Enter Leave From:
                  <input
                    type="date"
                    name="startDate"
                    className="train-input"
                    value={leaveFrom}
                    onChange={(e) => setLeaveFrom(e.target.value)}
                  />
                </label>
                <label>Enter Leave To:
                  <input
                    type="date"
                    name="endDate"
                    className="train-input"
                    value={leaveTo}
                    onChange={(e) => setLeaveTo(e.target.value)}
                  />
                </label>
                <select
                  className="train-input"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
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
                  className="train-input"
                  value={leaveDescription}
                  onChange={(e) => setLeaveDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='b-su'>
              <button onClick={handleSubmitLeaveRequest} className='handle-back'>Submit</button>
              <button onClick={handleCloseModal} className='handle-back'>Back</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen === 5 && (
        <div className="leave-type">
          <div className='cause'>
            <h3>Reason</h3>
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
    </div>
  );
}

export default DirectorLeave;
