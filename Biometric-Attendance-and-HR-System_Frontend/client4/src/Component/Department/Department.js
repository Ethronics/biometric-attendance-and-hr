import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Department.css';
import image from '../../assets/image.png';

function Department() {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSubDepartment, setSelectedSubDepartment] = useState(null);
    const [newSubDepartment, setNewSubDepartment] = useState('');
    const [showAddSubDepartmentInput, setShowAddSubDepartmentInput] = useState(false);
    const [subDepartmentToDelete, setSubDepartmentToDelete] = useState('');
    const [showDeleteSubDepartmentDropdown, setShowDeleteSubDepartmentDropdown] = useState(false);
    const [newEmployee, setNewEmployee] = useState('');
    const [showAddEmployeeInput, setShowAddEmployeeInput] = useState(false);
    const [showAddDepartmentInput, setShowAddDepartmentInput] = useState(false);
    const [newDepartment, setNewDepartment] = useState('');
    const [showDeleteDropdown, setShowDeleteDropdown] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/departments/departments');
            console.log('response is',response.data)
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleCardClick = (department) => {
        setSelectedDepartment(department);
        setSelectedSubDepartment(null); // Reset selected sub-department
    };

    const handleAddSubDepartment = async () => {
        if (newSubDepartment.trim() === '') return;

        try {
            await axios.post('http://localhost:8000/departments/subdepartments/', {
                department: selectedDepartment.id,
                sub_department_name: newSubDepartment
            });
            fetchDepartments();
            setNewSubDepartment('');
            setShowAddSubDepartmentInput(false);
        } catch (error) {
            console.error('Error adding sub-department:', error);
        }
    };

    const handleDeleteSubDepartment = async () => {
        if (!subDepartmentToDelete) return;

        const confirmation = window.confirm(`Are you sure you want to delete the ${subDepartmentToDelete} sub-department?`);
        if (confirmation) {
            try {
                await axios.delete(`http://localhost:8000/departments/subdepartments/${subDepartmentToDelete}/`);
                fetchDepartments();
                setSubDepartmentToDelete('');
                setShowDeleteSubDepartmentDropdown(false);
            } catch (error) {
                console.error('Error deleting sub-department:', error);
            }
        }
    };

    const handleSubDepartmentClick = (subDepartment) => {
        setSelectedSubDepartment(subDepartment);
    };

    const handleAddEmployee = async () => {
        if (newEmployee.trim() === '') return;

        try {
            await axios.post('http://localhost:8000/departments/employee/', {
                department: selectedSubDepartment.id,
                name: newEmployee,
                profile_picture: image // You might need to handle file uploads differently
            });
            fetchDepartments();
            setNewEmployee('');
            setShowAddEmployeeInput(false);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleAddDepartment = async () => {
        if (newDepartment.trim() === '') return;

        try {
            await axios.post('http://localhost:8000/departments/departments/', {
                department_name: newDepartment
            });
            fetchDepartments();
            setNewDepartment('');
            setShowAddDepartmentInput(false);
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    const handleDeleteDepartment = async () => {
        if (!departmentToDelete) return;

        const [mainDept, subDept] = departmentToDelete.split(' - ');

        const confirmation = window.confirm(`Are you sure you want to delete ${subDept ? `the ${subDept} sub-department from the ${mainDept} department` : `the ${mainDept} department`} ?`);

        if (confirmation) {
            try {
                if (subDept) {
                    await axios.delete(`http://localhost:8000/departments/subdepartments/${subDept}/`);
                } else {
                    await axios.delete(`http://localhost:8000/departments/departments/${mainDept}/`);
                }
                fetchDepartments();
                setDepartmentToDelete('');
                setShowDeleteDropdown(false);
            } catch (error) {
                console.error('Error deleting department:', error);
            }
        }
    };

const renderDepartmentContent = (department) => (
    <div className="department-content">
        <div className="department-header">
            <h2>{department.department_name} Department</h2>
        </div>
        <button onClick={() => setShowAddEmployeeInput(!showAddEmployeeInput)} className='add-employee-button'>
            Add Sub-Department
        </button>
        {showAddEmployeeInput && (
            <div className='dropdown-add-employee'>
                <input type='text' placeholder='Enter department name' value={newEmployee} onChange={(e) => setNewEmployee(e.target.value)} className='dept-input' />
                <button className="department-button" onClick={handleAddEmployee}>
                    Add
                </button>
            </div>
        )}
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
                {department.employees && department.employees.length > 0 ? (
                    department.employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>
                                <div className="employee-profile">
                                    <img src={employee.profile_picture} alt="Profile" className="profile-dep" />
                                    {employee.full_name}
                                </div>
                            </td>
                            <td>{employee.id}</td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>{employee.employee_type}</td>
                            <td>
                                <button className="dept-but">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No employees found.</td>
                    </tr>
                )}
            </tbody>
        </table>
        <button onClick={() => setSelectedDepartment(null)} className='add-employee-button'>Back</button>
    </div>
);

const renderSubDepartmentContent = (subDepartment) => (
    <div className='sub-department-content'>
        <h3>{subDepartment.sub_department_name} Sub-Department</h3>
        <table className="employee-tables">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {subDepartment.employees && subDepartment.employees.length > 0 ? (
                    subDepartment.employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>
                                <div className="employee-profile">
                                    <img src={employee.profile_picture} alt="Profile" className="profile-dep" />
                                    {employee.full_name}
                                </div>
                            </td>
                            <td>{employee.department}</td>
                            <td>{employee.position}</td>
                            <td>{employee.employee_type}</td>
                            <td>
                                <button className="dept-but">
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No employees found.</td>
                    </tr>
                )}
            </tbody>
        </table>
        <button onClick={() => setSelectedSubDepartment(null)} className='add-employee-button'>Back</button>
    </div>
);

    return (
        <div className='Dept-info'>
            {!selectedDepartment ? (
                <div className='dept-container'>
                    <div className='d-h'>
                        <div className='Dept-button'>
                            <div className='delete-select'>
                                <div className='con-button'>
                                    <div>
                                        <button className="department-button" onClick={() => setShowAddDepartmentInput(!showAddDepartmentInput)}>
                                            + Add Department
                                        </button>
                                    </div>
                                    <div>
                                        <button className="department-button" onClick={() => setShowDeleteDropdown(!showDeleteDropdown)}>
                                            Delete Department
                                        </button>
                                    </div>
                                </div>
                                {showAddDepartmentInput && (
                                    <div className='dropdown'>
                                        <input type='text' placeholder='Enter new department name' value={newDepartment} onChange={(e) => setNewDepartment(e.target.value)} className='dept-input' />
                                        <button className="department-button" onClick={handleAddDepartment}>
                                            Add
                                        </button>
                                    </div>
                                )}
                                {showDeleteDropdown && (
                                    <div className='dropdown'>
                                        <select className='dept-sel' value={departmentToDelete} onChange={(e) => setDepartmentToDelete(e.target.value)}>
                                            <option value="">Select Department or Sub-Department to Delete</option>
                                            {departments.map((dept) => (
                                                <React.Fragment key={dept.id}>
                                                    <option value={dept.id}>{dept.department_name}</option>
                                                    {dept.sub_departments.map((subDept) => (
                                                        <option key={subDept.id} value={subDept.id}>
                                                            {`Sub-Department: ${subDept.sub_department_name} (${dept.department_name})`}
                                                        </option>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </select>
                                        <button className="department-button" onClick={handleDeleteDepartment}>
                                            Confirm Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='department-card'>
                        <div className='top-dept-card'>
                            {departments.map((department) => (
                                <div key={department.id} className='Dept-info' onClick={() => handleCardClick(department)}>
                                    <h3>{department.department_name} Department</h3>
                                    <div className='sub-department-list'>
                                        {department.sub_departments.map((sub) => (
                                            <div key={sub.id} className='sub-department-card' onClick={() => handleSubDepartmentClick(sub)}>
                                                <h4>{sub.sub_department_name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : selectedSubDepartment ? (
                renderSubDepartmentContent(selectedSubDepartment)
            ) : (
                renderDepartmentContent(selectedDepartment)
            )}
        </div>
    );
}

export default Department;
