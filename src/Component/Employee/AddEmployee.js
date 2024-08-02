import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add_employee.css'; // Make sure to style according to your requirements
import { BsPeopleFill } from 'react-icons/bs'
function AddEmployee({ onAddEmployee }) {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    //const [gender, setGender] = useState('');
    const [fingerprint, setFingerprint] = useState(null); // To store fingerprint image
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newEmployee = { id, name, email, department, fingerprint };
        onAddEmployee(newEmployee);
        navigate('/Component/Employee/Employee'); // Navigate to the Employee list page
    };
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setFingerprint(file);
        }
    };
    return (
        <div className="add-employee">
            <div className="add-header">
                <BsPeopleFill className='icons' /><h1>Personal information</h1>
            </div>
            <div className="form-container">
                <div className="info-container">
                    <form onSubmit={handleSubmit} className="add-employee-form">
                        <label>ID:</label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                            className="input"
                        />
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input"
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                        />
                        <label>Department:</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="input"
                        />
                        <label>Hire Date:</label>
                        <input
                            type="date"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                            required
                            className="input"
                        />
                        <label> Date fo Birth:</label>
                        <input
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            required
                            className="input"
                        />

                        <button type="submit">Add Employee</button>
                    </form>
                </div>
                <div className="fingerprint-container">
                    <h2>Fingerprint</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input"
                    />
                    {fingerprint && (
                        <img src={fingerprint} alt="Fingerprint Preview" className="fingerprint-preview" />
                    )}
                </div>
            </div>
        </div>
    );
}
export default AddEmployee;
