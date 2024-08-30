import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import image from '../../assets/image.png';
import './Performance.css';

const Performance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [performanceData, setPerformanceData] = useState({});
  const [performanceHistory, setPerformanceHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/employee/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const fetchPerformanceHistory = (employeeId) => {
    axios.get(`http://localhost:8000/performances/?employee=${employeeId}`)
      .then(response => {
        setPerformanceHistory(response.data);
      })
      .catch(error => console.error('Error fetching performance history:', error));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingChange = (employeeId, value) => {
    setPerformanceData(prevData => ({
      ...prevData,
      [employeeId]: {
        ...prevData[employeeId],
        rating: value
      }
    }));
  };

  const handleFeedbackChange = (employeeId, value) => {
    setPerformanceData(prevData => ({
      ...prevData,
      [employeeId]: {
        ...prevData[employeeId],
        feedback: value
      }
    }));
  };

  const handleSubmitPerformance = (employee) => {
    const { rating, feedback } = performanceData[employee.id] || {};

    if (rating && feedback) {
      axios.post('http://localhost:8000/performances/', {
        employee:{ 
          id:employee.id,
          full_name:employee.full_name ,
            position: employee.position,
            profile_picture: employee.profile_picture
          },
        performance_rating: rating,
        feedback: feedback,
        date: new Date().toISOString().split('T')[0], // Format date as YYYY-MM-DD
      })
        .then(response => {
          console.log('Performance submitted:', response.data);
          setPerformanceData(prevData => ({
            ...prevData,
            [employee.id]: { rating: '', feedback: '' }
          }));
        })
        .catch(error => console.error('Error submitting performance:', error));
    } else {
      console.error('Please provide both a rating and feedback.');
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentItems = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container2">
      {!selectedEmployee ? (
        <>
          <div className="select-container">
            <div className="search-atten">
              <BsSearch className='search-icon' />
              <input
                type="search"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                className="atten-search"
              />
            </div>
          </div>
          <table className='employee-tables'>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Performance</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee, index) => (
                <tr key={index}>
                  <td
                    onClick={() => {
                      setSelectedEmployee(employee);
                      fetchPerformanceHistory(employee.id);
                    }}
                    className="employee-name2"
                  >
                    <div className="employee-name-cell">
                      <img src={employee.profile_picture || image} alt="Profile" className="profile-picc" />
                      <div className='click-dis'>
                        <span className="employee-name all-font">{employee.full_name}</span>
                        <span className='click'>Click to see history</span>
                      </div>
                    </div>
                  </td>
                  <td className="all-font">{employee.position}</td>
                  <td className="all-font">
                    <select
                      value={performanceData[employee.id]?.rating || ''}
                      onChange={(e) => handleRatingChange(employee.id, e.target.value)}
                    >
                      <option value="" disabled>Select Rating</option>
                      {[...Array(10).keys()].map(n => (
                        <option key={n} value={n + 1}>{n + 1}</option>
                      ))}
                    </select>
                  </td>
                  <td className="all-font">
                    <textarea
                      value={performanceData[employee.id]?.feedback || ''}
                      onChange={(e) => handleFeedbackChange(employee.id, e.target.value)}
                      className='text-capt'
                      placeholder="Enter feedback"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleSubmitPerformance(employee)}
                      className="submit-all-button"
                    >
                      Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </>
      ) : (
        <div>
          <div className="employee-detai">
            <img src={selectedEmployee.profile_picture || image} alt="Profile" className="profile-pi2" />
            <div className="profile-name">
              <h2>{selectedEmployee.full_name}</h2>
              <p>{selectedEmployee.position}</p>
            </div>
          </div>
          <table className="employee-tables">
            <thead>
              <tr>
                <th>Date</th>
                <th>Performance Rating</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {performanceHistory.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td>{record.performance_rating}</td>
                  <td>{record.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setSelectedEmployee(null)} className="back-button">
            Back to Employee List
          </button>
        </div>
      )}
    </div>
  );
};

export default Performance;
