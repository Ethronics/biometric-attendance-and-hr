import React, { useState, useEffect } from 'react';
import './Performance.css';
import p2 from '../../assets/e2.png';

const EMPerformance = ({ email }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentMonth, setCurrentMonth] = useState('');
  const [previousMonth, setPreviousMonth] = useState('');

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        // Fetch performance data
        const performanceResponse = await fetch(`http://localhost:8000/performances/${email}/`);
        const employeeResponse = await fetch(`http://localhost:8000/employee/${email}/`);

        if (performanceResponse.ok && employeeResponse.ok) {
          const performanceData = await performanceResponse.json();
          const employeeData = await employeeResponse.json();

          setSelectedEmployee({
            employee: {
              name: employeeData.full_name,
              position: employeeData.position,
              profilePicture: employeeData.profile_picture || p2, // Default to placeholder if not available
            },
            currentRating: performanceData[0]?.performance_rating || 0,
            currentFeedback: performanceData[0]?.feedback || '',
            history: performanceData,
          });
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      // Set the current and previous month
      const now = new Date();
      setCurrentMonth(`${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`);
      const previousMonthDate = new Date(now.setMonth(now.getMonth() - 1));
      setPreviousMonth(`${previousMonthDate.toLocaleString('default', { month: 'long' })} ${previousMonthDate.getFullYear()}`);
    };

    fetchPerformanceData();
  }, [email]);

  if (!selectedEmployee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container2">
      <div className="employee-detai">
        <img src={selectedEmployee.employee.profilePicture} alt="Profile" className="profile-pi2" />
        <div className="profile-name">
          <h2>{selectedEmployee.employee.name}</h2>
          <p>{selectedEmployee.employee.position}</p>
        </div>
      </div>
      <table className="employee-tables">
        <thead>
          <tr>
            <th>Month</th>
            <th>Performance Rating</th>
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
    </div>
  );
};

export default EMPerformance;
