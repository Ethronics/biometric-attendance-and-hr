import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { MdOutlineBusinessCenter, MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { setActiveTab, setActiveSubTab } from '../../tabSlice';
import { employees } from '../aanother'; // Adjust path as necessary
import p2 from '../../assets/e1.png';
import './EmployeSelfInfo.css';
function EmpProfile({ email }) {
  const employee = employees[0];
  const activeTab = useSelector((state) => state.tab.activeTab);
  const activeSubTab = useSelector((state) => state.tab.activeSubTab);
  const dispatch = useDispatch();
  return (
    <div>
      <div className='boxx'>
        <div className='header2'>
          <div className='box3'>
            <img src={employee?.profile || p2} alt='profile' className='employee-pic' />
            <div style={{ fontFamily: 'Lexend', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px' }}>
              {employee?.name || 'N/A'}
              <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
                <MdOutlineBusinessCenter />  Project Manager
              </div>
              <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
                <MdOutlineEmail /> {employee?.email || 'N/A'}
              </div>
            </div>
          </div>
          <div className="edit-container">
            <Link to={`/employees/${employee?.id}/EditEmployeSelf`}>
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
        <div className='details'>
          <div className="profile-detail">
            {/* <div className="tabs">
                            <button className={`tab ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => dispatch(setActiveTab('Profile'))}>Profile</button>
                            <button className={`tab ${activeTab === 'Attendance' ? 'active' : ''}`} onClick={() => dispatch(setActiveTab('Attendance'))}>Attendance</button>
                            <button className={`tab ${activeTab === 'Leave' ? 'active' : ''}`} onClick={() => dispatch(setActiveTab('Leave'))}>Leave</button>
                        </div>*/}
            <div className='emp-personal-info'>
              {activeTab === 'Profile' && (
                <>
                  <div className="sub-tabs">
                    <button className={`sub-tab ${activeSubTab === 'Personal Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Personal Information'))}><IoMdPerson className='icon' />Personal Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Professional Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Professional Information'))}><MdOutlineBusinessCenter className='icon' />Professional Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Documents' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Documents'))}><IoDocumentTextOutline className='icon' />Documents</button>
                    <button className={`sub-tab ${activeSubTab === 'Account Access' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Account Access'))}><MdLockOutline className='icon' />Account Access</button>
                  </div>
                  <div className="sub-tab-content">
                    {activeSubTab === 'Personal Information' && (
                      <div className="info-grid all-font">
                        <div className="info-item all-font">
                          <strong>First Name:</strong> {employee.personalInfo.firstName}
                        </div>
                        <div className="info-item">
                          <strong>Last Name:</strong> {employee.personalInfo.lastName}
                        </div>
                        <div className="info-item ">
                          <strong>Phone Number:</strong> {employee.personalInfo.mobileNumber}
                        </div>
                        <div className="info-item">
                          <strong>Email Address:</strong> {employee.email}
                        </div>
                        <div className="info-item">
                          <strong>Date of Birth:</strong> {employee.personalInfo.dateOfBirth}
                        </div>
                        <div className="info-item">
                          <strong>Gender:</strong> {employee.personalInfo.gender}
                        </div>
                        <div className="info-item">
                          <strong>Address:</strong> {employee.personalInfo.address}
                        </div>
                        <div className="info-item">
                          <strong>Marital Status:</strong> {employee.personalInfo.maritalStatus}
                        </div>
                        <div className="info-item">
                          <strong>Emergency Contact:</strong> {employee.emergencyContactName} | {employee.emergencyContactNumber}
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Professional Information' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Employee ID:</strong> {employee.id}
                        </div>
                        <div className="info-item">
                          <strong>Employee Type:</strong> {employee.type}
                        </div>
                        <div className="info-item">
                          <strong>Department:</strong> {employee.department}
                        </div>
                        <div className="info-item">
                          <strong>Designation:</strong> {employee.designation}
                        </div>
                        <div className="info-item">
                          <strong>Working Days:</strong> 5 Days
                        </div>
                        <div className="info-item">
                          <strong>Salary:</strong> {employee.salary}
                        </div>
                        <div className="info-item">
                          <strong>Working Hours Per Day :</strong> 8 Hours
                        </div>
                        <div className="info-item">
                          <strong>Joining Date:</strong> 5-10-2020
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Documents' && (
                      <div>
                        {/* Documents content here */}
                      </div>
                    )}
                    {activeSubTab === 'Account Access' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Email Address:</strong> {employee.email}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpProfile;
