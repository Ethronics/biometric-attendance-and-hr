import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Leave/Leave.css';
import '../Leave/DirectorLeave.css';
import '../Training/Training.css'
import image from '../../assets/image.png';
import { CiViewList } from 'react-icons/ci';
import { BsBookHalf } from 'react-icons/bs';
import { MdEmojiEvents } from 'react-icons/md';

function EMovertime() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [overtimeFrom, setOvertimeFrom] = useState('');
  const [overtimeTo, setOvertimeTo] = useState('');
  const [overtimeType, setOvertimeType] = useState('');
  const [overtimeDescription, setOvertimeDescription] = useState('');
  const [view, setView] = useState('employeeRequests'); // New state for toggling views
  const navigate = useNavigate();

  const handleButtonClick = (overtime) => {
    setSelectedEntry(overtime);
    setIsModalOpen(1);
  };

  const handleRejectClick = () => {
    setIsModalOpen(2);
  };
  const handleRejectHistory = (overtime) => {
    setSelectedEntry(overtime);
    setIsModalOpen(5);
  };
  const handleRequestForOvertimeClick = () => {
    setIsModalOpen(3);
  };

  const handleCloseModal = () => {
    setIsModalOpen(null);
    setSelectedEntry(null);
    setRejectionReason('');
    setOvertimeFrom('');
    setOvertimeTo('');
    setOvertimeType('');
    setOvertimeDescription('');
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleSubmitRejection = () => {
    if (rejectionReason.trim() !== '') {
      console.log(`Rejection Reason for ${selectedEntry.name}: ${rejectionReason}`);
      handleCloseModal();
    } else {
      alert('Please enter a rejection reason.');
    }
  };

  const handleSubmitOvertimeRequest = () => {
    if (overtimeFrom && overtimeTo && overtimeType && overtimeDescription) {
      console.log(`Overtime Request - From: ${overtimeFrom}, To: ${overtimeTo}, Type: ${overtimeType}, Description: ${overtimeDescription}`);
      handleCloseModal();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleRowClick = (overtime) => {
    navigate(`/overtime/${overtime.name.toLowerCase()}`);
  };

  const overtimeHistory = [
    { name: 'abela', appiDate: '2024-08-01', overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Accept', profilePicture: image, description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition" },
    { name: 'abraham', appiDate: '2024-07-15', overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Accept', profilePicture: image, description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus" },
    // More overtime history entries...
  ];

  const directorOvertime = [
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish...', status: 'Pending' },
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Rejected', reason: 'B/c......' },
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Approved' },
    // More director overtime history entries...
  ];

  const totalPages = Math.ceil(overtimeHistory.length / itemsPerPage);
  const currentItems = overtimeHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`overtime-container ${isModalOpen ? 'blurred' : ''}`}>
     
      <div className="view-buttons">
        
        <button onClick={() => setView('directorOvertimeHistory')} className={`btn-leave ${view === 'directorOvertimeHistory' ? 'btn-lactive' : ''}`}>
          My Overtime Request & History
        </button>
      </div>

      {view === 'employeeRequests' && (
        <>
          <div className="leave-top-table">
            <h3>Overtime Request</h3>
          </div>
          
          <div>
            <table className="leave-tables">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Appi Date</th>
                  <th>Overtime Date</th>
                  <th>Overtime Hours</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((overtime, index) => (
                  <tr key={index} className="overtime-t">
                    <td className="employee-name-cell">
                      <img src={overtime.profilePicture} alt="Profile" className="profile-picc" />
                      <span className="employee-name">{overtime.name}</span>
                    </td>
                    <td>{overtime.appiDate}</td>
                    <td>{overtime.overtimeDate}</td>
                    <td>{overtime.overtimeHours}</td>
                    <td>
                      <button onClick={(e) => { e.stopPropagation(); handleButtonClick(overtime); }} className="type-button">
                        {overtime.overtimeReason}
                      </button>
                    </td>
                    <td className="status-overtime">
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

      {view === 'directorOvertimeHistory' && (
        <>
          <button onClick={() => setView('employeeRequests')} className='btn-back'>
            Back
          </button>
          
          <div className="edit-but">
            <button className="edit-cont" onClick={handleRequestForOvertimeClick}>
              Request For Overtime
            </button>
          </div>
          <div>
            <h3>My Overtime History</h3>
            <table className="overtime-tables">
              <thead>
                <tr>
                  <th>Overtime Date</th>
                  <th>Overtime Hours</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {directorOvertime.map((overtime, index) => (
                  <tr key={index}>
                    <td>{overtime.overtimeDate}</td>
                    <td>{overtime.overtimeHours}</td>
                    <td>{overtime.reason}</td>
                    <td>
                      {overtime.status === 'Rejected' ? (
                        <button onClick={(e) => { e.stopPropagation(); handleRejectHistory(overtime); }} className="type-button">
                          {overtime.status}
                        </button>
                      ) : (
                        <button className='bt-status'>{overtime.status}</button>
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
            <h3>Description from {selectedEntry.name}</h3>
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
              className='text-capt'
            />
            <div className='b-su'>
            <button className="handle-back" onClick={handleSubmitRejection}>Submit</button>
            <button className="handle-back" onClick={handleCloseModal}>Cancel</button>
          </div></div>
        </div>
      )}

      {isModalOpen === 3 && (
        <div className="modal-overlay">
        <div className="modal-content">
            <h3>Request for Overtime</h3>
            <div className="form-container">
                     <div className="form-group-train">
                     
                       <label>Enter Overtime Date:
                         <input
                           type="date"
                          
                           className="train-input"
                         />
                       </label>
                       <label>Overtime Hours:
                         <input
                           type="text"
                           
                           className="train-input"
                         />
                       </label>
           
                       <label>Reason:
                         <input
                           type="text"
                           
                           className="train-input"
                         />
                       </label>
          
                       <textarea placeholder="Description" className="train-input"></textarea>
                     </div>
                   </div>
            <div className='b-su'>
            <button className="handle-back" onClick={handleSubmitOvertimeRequest}>Submit</button>
            <button className="handle-back" onClick={handleCloseModal}>Cancel</button>
          </div></div>
        </div>
      )}

      {isModalOpen === 5 && (
        <div className="leave-type">
          <div className='cause'>
            <h3>Overtime Reject reason</h3>
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

      {/* Pagination */}
      
    </div>
  );
}

export default EMovertime;
