import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineVisibility, MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import './employe.css';
import '../../All.css';
// import EditEmployee from './EditEmployee';

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employees from the Django backend
    axios.get('http://localhost:8000/employee/employees/')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the employees!', error);
      });
  }, []);

  const handleDeleteEmployee = (id) => {
    // Delete employee
    axios.delete(`http://localhost:8000/employee/employees/${id}/`)
      .then((response) => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch((error) => {
        console.error('There was an error deleting the employee!', error);
      });
  };

  const viewProfile = (id) => {
    navigate(`/employees/${id}`);
  };

  const editProfile = (id) => {
  navigate(`/employees/edit/${id}`);
};


  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toString().includes(searchTerm.toLowerCase()) ||
    // employee.department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div className="employee">
      <div className="employee-header">
        <div className="search-containerss">
          <BsSearch className="search-icon" />
          <input
            type="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="employee-search"
          />
        </div>
        <div className="employee-buttons">
          <Link to="/employees/AddEmployee" className="none">
            <button className="employee-button bt-color">
              <span className="span">+ Add Employee</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="employee-list">
        <table className="employee-tables">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee.id}>
                <td className="employee-name-cell ">
                  <img src={employee.profile_picture} alt="Profile" className="profile-picc" />
                  <span className="employee-name all-font">{employee.full_name}</span>
                </td>
                <td className="all-font">{employee.id}</td>
                <td className="all-font">{employee.department}</td>
                <td className="all-font">{employee.position}</td>
                <td className="all-font">{employee.employee_type}</td>
                <td>
                  <button className="visibility-btn" onClick={() => viewProfile(employee.id)}>
                    <MdOutlineVisibility fontSize="large" />
                  </button>
                  {/* <Link to={`/employees/${employee.id}/edit`} > */}
                    <button className="edit-btn" onClick={()=>editProfile(employee.id)}>
                      <FiEdit3 fontSize="large" />
                    </button>
                  {/* </Link> */}
                  <button className="delete-btn" onClick={() => handleDeleteEmployee(employee.id)}>
                    <MdDeleteOutline fontSize="large" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
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
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Employee;
