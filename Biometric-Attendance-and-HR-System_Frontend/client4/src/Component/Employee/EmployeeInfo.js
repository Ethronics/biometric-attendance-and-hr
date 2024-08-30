import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import './EmployeeInfo.css';
import { MdOutlineBusinessCenter, MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { setActiveTab, setActiveSubTab } from '../../tabSlice';

const EmployeeInfo = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeTab = useSelector((state) => state.tab.activeTab);
  const activeSubTab = useSelector((state) => state.tab.activeSubTab);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8000/employee/employees/${id}/`);
        if (!response.ok) throw new Error('Employee not found');
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch(`http://localhost:8000/attendance/?employee=${id}`);
        if (!response.ok) throw new Error('Attendance records not found');
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchData = async () => {
      try {
        await fetchEmployee();
        await fetchAttendanceRecords();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSubTabChange = (subTab) => {
    dispatch(setActiveSubTab(subTab));
  };

  const calculateWorkingHours = (record) => {
    if (record.clock_in_time && record.clock_out_time) {
      const clockIn = new Date(`1970-01-01T${record.clock_in_time}Z`);
      const clockOut = new Date(`1970-01-01T${record.clock_out_time}Z`);
      const diff = clockOut - clockIn;
      return `${(diff / (1000 * 60 * 60)).toFixed(2)} hours`;
    }
    return 'N/A';
  };

  const calculateStatus = (clockIn, clockOut) => {
    if (!employee) return 'N/A';

    const clockInTime = new Date(`1970-01-01T${clockIn}Z`);
    const defaultClockInTime = new Date(`1970-01-01T${employee.average_in_time}Z`);
    if (clockInTime > defaultClockInTime) return 'Late';
    return 'On Time';
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!employee) return <div>No employee data available</div>;

  return (
    <div>
      <div className='boxx'>
        <div className='header2'>
          <div className='box3'>
            <img src={employee.profile_picture} alt='profile' className='employee-pic' />
            <div style={{ fontFamily: 'Lexend', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px' }}>
              {employee.full_name}
              <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
                <MdOutlineBusinessCenter /> {employee.position}
              </div>
              <div style={{ display: 'flex', fontFamily: 'Lexend' }} className='h'>
                <MdOutlineEmail /> {employee.email}
              </div>
            </div>
          </div>
          <div className="edit-container">
            <Link to={`/employees/${employee.id}/edit`}>
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
        <div className='details'>
          <div className="profile-detail">
            <div className="tabs">
              <button className={`tab ${activeTab === 'Profile' ? 'active' : ''}`} onClick={() => handleTabChange('Profile')}>Profile</button>
              <button className={`tab ${activeTab === 'Attendance' ? 'aactive' : ''}`} onClick={() => handleTabChange('Attendance')}>Attendance</button>
              <button className={`tab ${activeTab === 'Leave' ? 'aactive' : ''}`} onClick={() => handleTabChange('Leave')}>Leave</button>
            </div>
            <div>
              {activeTab === 'Profile' && (
                <>
                  <div className="sub-tabs">
                    <button className={`sub-tab ${activeSubTab === 'Personal Information' ? 'subactive' : ''}`} onClick={() => handleSubTabChange('Personal Information')}><IoMdPerson className='icon' />Personal Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Professional Information' ? 'subactive' : ''}`} onClick={() => handleSubTabChange('Professional Information')}><MdOutlineBusinessCenter className='icon' />Professional Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Documents' ? 'subactive' : ''}`} onClick={() => handleSubTabChange('Documents')}><IoDocumentTextOutline className='icon' />Documents</button>
                    <button className={`sub-tab ${activeSubTab === 'Account Access' ? 'subactive' : ''}`} onClick={() => handleSubTabChange('Account Access')}><MdLockOutline className='icon' />Account Access</button>
                  </div>
                  <div className="sub-tab-content">
                    {activeSubTab === 'Personal Information' && (
                      <div className="info-grid all-font">
                        <div className="info-item all-font">
                          <strong>First Name:</strong> {employee.full_name.split(' ')[0]}
                        </div>
                        <div className="info-item">
                          <strong>Last Name:</strong> {employee.full_name.split(' ')[1]}
                        </div>
                        <div className="info-item">
                          <strong>Phone Number:</strong> {employee.phone_number}
                        </div>
                        <div className="info-item">
                          <strong>Email Address:</strong> {employee.email}
                        </div>
                        <div className="info-item">
                          <strong>Date of Birth:</strong> {employee.date_of_birth}
                        </div>
                        <div className="info-item">
                          <strong>Gender:</strong> {employee.gender}
                        </div>
                        <div className="info-item">
                          <strong>Address:</strong> {employee.address}
                        </div>
                        <div className="info-item">
                          <strong>Marital Status:</strong> {employee.marital_status}
                        </div>
                        <div className="info-item">
                          <strong>Emergency Contact:</strong> {employee.emergency_person_name} | {employee.emergency_phone_number}
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Professional Information' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Employee ID:</strong> {employee.id}
                        </div>
                        <div className="info-item">
                          <strong>Employee Type:</strong> {employee.employee_type}
                        </div>
                        <div className="info-item">
                          <strong>Department:</strong> {employee.department ? employee.department.name : 'N/A'}
                        </div>
                        <div className="info-item">
                          <strong>Designation:</strong> {employee.position}
                        </div>
                        <div className="info-item">
                          <strong>Working Days:</strong> 5 Days
                        </div>
                        <div className="info-item">
                          <strong>Salary:</strong> {employee.basic_salary}
                        </div>
                        <div className="info-item">
                          <strong>Working Hours Per Day:</strong> {employee.average_working_hours.hours}
                        </div>
                        <div className="info-item">
                          <strong>Joining Date:</strong> {employee.joining_date}
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Documents' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>CV:</strong> <a href={employee.cv} download>Download</a>
                        </div>
                        <div className="info-item">
                          <strong>Educational Document:</strong> <a href={employee.educational_document} download>Download</a>
                        </div>
                        <div className="info-item">
                          <strong>Experience Document:</strong> <a href={employee.experience_document} download>Download</a>
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Account Access' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Username:</strong> {employee.username}
                        </div>
                        <div className="info-item">
                          <strong>Password:</strong> {employee.password}
                        </div>
                        <div className="info-item">
                          <strong>Role:</strong> {employee.role}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeTab === 'Attendance' && (
                <div className="attendance-details">
                  {attendanceRecords.length > 0 ? (
                    attendanceRecords.map((record, index) => (
                      <div key={index} className="attendance-record">
                        <div><strong>Date:</strong> {record.date}</div>
                        <div><strong>Clock In:</strong> {record.clock_in_time}</div>
                        <div><strong>Clock Out:</strong> {record.clock_out_time || 'N/A'}</div>
                        <div><strong>Hours Worked:</strong> {calculateWorkingHours(record)}</div>
                        <div><strong>Status:</strong> {calculateStatus(record.clock_in_time, record.clock_out_time)}</div>
                      </div>
                    ))
                  ) : (
                    <div>No attendance records found.</div>
                  )}
                </div>
              )}
              {activeTab === 'Leave' && (
                <div className="leave-details">
                  {/* Display leave details here */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
