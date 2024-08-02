import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaPlus, FaTrash } from 'react-icons/fa';
import './employe.css';

function Employee({ employees = [] }) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleDeleteEmployee = (index) => {
  };

  return (
    <div className="employee">
      <div className="employee-header">
        <div className="search-containerss">
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="employee-search"
          />
        </div>
        <div className="employee-buttons">
          <Link to="/add_employee" className="employee-button">
            <FaPlus className="icon" /> Add Employee
          </Link>
          <button className="employee-button">
            <FaFilter className="icon" /> Filter
          </button>
        </div>
      </div>
      <div className="employee-list">
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((employee) =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((employee, index) => (
                <tr key={index} className="employee-item">
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.department}</td>
                  <td>
                    <button className="employee-delete-button" onClick={() => handleDeleteEmployee(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
