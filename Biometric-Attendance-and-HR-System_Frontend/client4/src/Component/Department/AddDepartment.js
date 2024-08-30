import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddDepartment.css';

function AddDepartment() {
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '', // Added employeeId to formData
        workPlace: 'Office',
        departmentType: 'Permanent',
        department: '',
        subDepartment: '',
        description: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            ...(name === 'department' && { subDepartment: '' }) 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
       
        navigate('/department');
    };

    return (
        <div className="add-department">
            <button 
                className='add-employee-button' 
                onClick={() => console.log('Add Employee clicked')}
            >
                Add Employee
            </button>
            <form onSubmit={handleSubmit}>
                <div className='dep-content'>
                    <div className='form-dept'>
                        <div className='add-dept'>
                            <label>
                                <input
                                    type="text"
                                    name="employeeId" // Added employeeId input
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    required
                                    className='add-input'
                                    placeholder='Employee ID'
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className='add-input'
                                    placeholder='Department Name'
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name="DepartmentHead"
                                    onChange={handleInputChange}
                                    required
                                    className='add-input'
                                    placeholder='Department Head'
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    name="workPlace"
                                    value={formData.workPlace}
                                    onChange={handleInputChange}
                                    className='add-input'
                                    placeholder='Work branch (e.g., Main Office, branch)'
                                />
                            </label>
                        </div>
                        <div className='add-dept-left'>
                            <label>
                                <input
                                    type="text"
                                    name="DepartmentType"
                                    onChange={handleInputChange}
                                    className='add-input'
                                    placeholder='Department Type (e.g., Permanent, for specific time)'
                                />
                            </label>
                            {formData.department && (
                                <label>
                                    <input
                                        type="text"
                                        name="subDepartment"
                                        value={formData.subDepartment}
                                        onChange={handleInputChange}
                                        className='add-input'
                                        placeholder='Sub Department (e.g., Graphic Design)'
                                    />
                                </label>
                            )}
                            <label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className='add-input'
                                    placeholder='Description'
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='dept-button'>Add Department</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddDepartment;
