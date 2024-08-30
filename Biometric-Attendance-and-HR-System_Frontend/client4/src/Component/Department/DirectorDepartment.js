import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DirectorDepartment.css';

function DirectorDepartment({ directorEmail }) {
  const [director, setDirector] = useState(null);
  const [departmentEmployees, setDepartmentEmployees] = useState([]);
  const [departmentName, setDepartmentName] = useState('');

  useEffect(() => {
    // Fetch the director details
    axios.get(`http://localhost:8000/employee/${directorEmail}`)
      .then(response => {
        const directorData = response.data[0]; // Assuming email is unique
        setDirector(directorData);
        setDepartmentName(directorData.department.department_name);
      })
      .catch(error => console.error('Error fetching director data:', error));

    // Fetch department employees
    axios.get(`http://localhost:8000/employee/employees/?department=${departmentName}`)
      .then(response => {
        setDepartmentEmployees(response.data);
      })
      .catch(error => console.error('Error fetching department employees:', error));
  }, [directorEmail, departmentName]);

  if (director) {
    return <p>Director not found</p>;
  }

  return (
    <div className='department-director'>
      <h2 className='all-font'>{departmentName}</h2>
      <table className="employee-tables">
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody className='table-tbody'>
          {departmentEmployees.length > 0 ? (
            departmentEmployees.map(employee => (
              <tr key={employee.id}>
                <td>
                  <div className="employee-profile all-font">
                    <img src={employee.profile_picture} alt="Profile" className="profile-dep" />
                    {employee.full_name}
                  </div>
                </td>
                <td>{employee.id}</td>
                <td>{employee.department.department_name}</td>
                <td>{employee.position}</td>
                <td>{employee.employee_type}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found in this department</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DirectorDepartment;
