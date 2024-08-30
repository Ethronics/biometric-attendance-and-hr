import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import image from '../../assets/image.png';
import './Performance.css';
import p1 from '../../assets/e4.png';
import p2 from'../../assets/e1.png';
import p3 from'../../assets/e2.png';
import p4 from'../../assets/e5.png';
import p5 from'../../assets/e6.png';
import p6 from'../../assets/e7.png';
import axios from 'axios';

const Performance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [previousMonth, setPreviousMonth] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    // Fetch performance data from the API
    const fetchPerformanceData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/performances/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      }
    };

    fetchPerformanceData();

    // Set the current and previous month
    const now = new Date();
    setCurrentMonth(`${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`);
    const previousMonthDate = new Date(now.setMonth(now.getMonth() - 1));
    setPreviousMonth(`${previousMonthDate.toLocaleString('default', { month: 'long' })} ${previousMonthDate.getFullYear()}`);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRatingChange = (index, rating) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].currentRating = rating;
    setEmployees(updatedEmployees);
  };

  const handleFeedbackChange = (index, feedback) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index].currentFeedback = feedback;
    setEmployees(updatedEmployees);
  };

  const handleSubmitAll = async () => {
    const updatedEmployees = employees.map(employee => {
      if (employee.currentRating !== null) {
        const newHistoryEntry = {
          month: currentMonth, // Current month
          rating: employee.currentRating,
          feedback: employee.currentFeedback,
        };
        employee.history.push(newHistoryEntry);
        employee.currentRating = null;
        employee.currentFeedback = '';
      }
      return employee;
    });

    setEmployees(updatedEmployees);

    // Submit the updated performance data to the API
    try {
      await axios.post('http://localhost:8000/performances/', updatedEmployees);
    } catch (error) {
      console.error('Error submitting performance data:', error);
    }
  };

  // Ensure `employee.history` is an array before calling `.some()`
  const filteredEmployees = employees.filter(employee =>
    employee.employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    Array.isArray(employee.history) && employee.history.some(entry => entry.month === previousMonth)
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentItems = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
  };

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
                <th>Evaluator</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((employee, index) => (
                <tr key={index}>
                  <td onClick={() => handleEmployeeClick(employee)} className="employee-name2">
                    <div className="employee-name-cell">
                      <img src={employee.employee.profilePicture} alt="Profile" className="profile-picc" />
                      <div className='click-dis'>
                        <span className="employee-name all-font">{employee.employee.full_name}</span>
                        <span className='click'>Click to see history</span>
                      </div>
                    </div>
                  </td>
                  <td className="all-font">{employee.employee.position}</td>
                  <td className="all-font">{employee.currentRating}</td>
                  <td className="all-font">{employee.currentFeedback}</td>
                  <td className="all-font">{employee.evaluator.full_name}</td>
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
            <img src={selectedEmployee.employee.profile_picture} alt="Profile" className="profile-pi2" />
            <div className="profile-name">
              <h2>{selectedEmployee.employee.full_name}</h2>
              <p>{selectedEmployee.employee.position}</p>
            </div>
          </div>
          <table className="employee-tables">
            <thead>
              <tr>
                <th>Month</th>
                <th>Performance Rate</th>
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {selectedEmployee.history.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.performance_rating}</td>
                  <td>{entry.feedback}</td>
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
