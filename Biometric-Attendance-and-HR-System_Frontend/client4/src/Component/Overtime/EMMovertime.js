import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Leave/Leave.css';
import '../Leave/DirectorLeave.css';
import '../Training/Training.css'
import image from '../../assets/image.png';
import { CiViewList } from 'react-icons/ci';
import { BsBookHalf } from 'react-icons/bs';
import { MdEmojiEvents } from 'react-icons/md';

function EMMovertime() {
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



 
  const directorOvertime = [
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish...', status: 'Pending' },
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Rejected', reason: 'B/c......' },
    { overtimeDate: '2024-06-15', overtimeHours: '2', overtimeReason: 'To finish.....', status: 'Approved' },
    // More director overtime history entries...
  ];

 

  return (
    <div className={`overtime-container ${isModalOpen ? 'blurred' : ''}`}>
     
      <div className="view-buttons">
        
       
      
         
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
        
    

      {/* Modals */}
      

      

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
      </div>
      </div>
  )
      }
      {/* Pagination */}
      

export default EMMovertime;
