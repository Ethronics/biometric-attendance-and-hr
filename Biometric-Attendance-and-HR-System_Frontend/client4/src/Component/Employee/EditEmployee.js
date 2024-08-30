import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditEmployee.css';
import { MdOutlineBusinessCenter, MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { setActiveTab, setActiveSubTab } from '../../tabSlice';
import p2 from '../../assets/e1.png';

function EditEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const activeSubTab = useSelector((state) => state.tab.activeSubTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee data
    axios.get(`http://localhost:8000/employee/employees/${id}/`)
      .then((response) => {
        setEmployee(response.data);
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the employee data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/employee/employees/${id}/`, formData)
      .then((response) => {
        navigate(`/employees/${id}`);
      })
      .catch((error) => {
        console.error('There was an error updating the employee data!', error);
      });
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <div className="boxx">
      <div className="header2">
        <div className="box3">
          <img src={employee.profile_picture || p2} alt="profile" className="employee-pic" />
          <div style={{ fontFamily: 'Lexend', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px' }}>
            {employee.full_name}
            <div style={{ display: 'flex', fontFamily: 'Lexend' }} className="h">
              <MdOutlineBusinessCenter /> {employee.position}
            </div>
            <div style={{ display: 'flex', fontFamily: 'Lexend' }} className="h">
              <MdOutlineEmail /> {employee.email}
            </div>
          </div>
        </div>
      </div>
      <div className="edit-tabs">
        <div className="sub-tabs">
          <button className={`sub-tab ${activeSubTab === 'Personal Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Personal Information'))}><IoMdPerson className='icon' /> Personal Information</button>
          <button className={`sub-tab ${activeSubTab === 'Professional Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Professional Information'))}><MdOutlineBusinessCenter className='icon' /> Professional Information</button>
          <button className={`sub-tab ${activeSubTab === 'Documents' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Documents'))}><IoDocumentTextOutline className='icon' /> Documents</button>
          <button className={`sub-tab ${activeSubTab === 'Account Access' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Account Access'))}><MdLockOutline className='icon' /> Account Access</button>
        </div>
        <div className="sub-tab-content">
          {activeSubTab === 'Personal Information' && (
            <form onSubmit={handleSubmit} className="info-grid all-font">
              <div className="info-item all-font">
                <strong>First Name:</strong>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Last Name:</strong>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Phone Number:</strong>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Email Address:</strong>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Date of Birth:</strong>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Gender:</strong>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Address:</strong>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Marital Status:</strong>
                <input
                  type="text"
                  name="marital_status"
                  value={formData.marital_status || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Emergency Contact:</strong>
                <input
                  type="text"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name || ''}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="emergency_contact_number"
                  value={formData.emergency_contact_number || ''}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          )}
          {activeSubTab === 'Professional Information' && (
            <div className="info-grid">
              <div className="info-item">
                <strong>Employee ID:</strong>
                <input
                  type="text"
                  name="id"
                  value={formData.id || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Department:</strong>
                <input
                  type="text"
                  name="department"
                  value={formData.department || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Joining Date:</strong>
                <input
                  type="date"
                  name="joining_date"
                  value={formData.joining_date || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Position:</strong>
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Basic Salary:</strong>
                <input
                  type="number"
                  name="basic_salary"
                  value={formData.basic_salary || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Role:</strong>
                <input
                  type="text"
                  name="role"
                  value={formData.role || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {activeSubTab === 'Documents' && (
            <div className="info-grid">
              <div className="info-item">
                <strong>CV:</strong>
                <input
                  type="file"
                  name="cv"
                  onChange={(e) => setFormData({ ...formData, cv: e.target.files[0] })}
                />
              </div>
              <div className="info-item">
                <strong>Educational Document:</strong>
                <input
                  type="file"
                  name="educational_document"
                  onChange={(e) => setFormData({ ...formData, educational_document: e.target.files[0] })}
                />
              </div>
              <div className="info-item">
                <strong>Experience Letter:</strong>
                <input
                  type="file"
                  name="experience_letter"
                  onChange={(e) => setFormData({ ...formData, experience_letter: e.target.files[0] })}
                />
              </div>
            </div>
          )}
          {activeSubTab === 'Account Access' && (
            <div className="info-grid">
              <div className="info-item">
                <strong>Username:</strong>
                <input
                  type="text"
                  name="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="info-item">
                <strong>Password:</strong>
                <input
                  type="password"
                  name="password"
                  value={formData.password || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
