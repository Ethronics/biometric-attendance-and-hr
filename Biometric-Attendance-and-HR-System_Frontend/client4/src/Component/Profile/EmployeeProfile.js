import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';  // For fetching data from the backend
import './EmployeeProfile.css';
import { MdOutlineBusinessCenter, MdOutlineEmail, MdLockOutline } from 'react-icons/md';
import { IoMdPerson } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { setActiveTab, setActiveSubTab } from '../../tabSlice';
import p2 from '../../assets/e1.png';  // Default profile picture if needed

const EmployeeProfile = ({email}) => {
  const { id } = useParams();
  const activeTab = useSelector((state) => state.tab.activeTab);
  const activeSubTab = useSelector((state) => state.tab.activeSubTab);
  const dispatch = useDispatch();

  const [employee, setEmployee] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/employee/${email}/`);
        setEmployee(data);
        const attendanceResponse = await axios.get(`http://localhost:8000/attendance/?employee.email=${email}`);
        setAttendanceRecords(attendanceResponse.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!employee) return <div>Employee not found</div>;

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSubTabChange = (subTab) => {
    dispatch(setActiveSubTab(subTab));
  };

  const calculateWorkingHours = (record) => {
    if (record.clock_in_time && record.clock_out_time && record.lunch_out_time && record.lunch_in_time) {
      const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return new Date().setHours(hours, minutes, 0, 0);
      };

      const clockInTime = parseTime(record.clock_in_time);
      const lunchOutTime = parseTime(record.lunch_out_time);
      const lunchInTime = parseTime(record.lunch_in_time);
      const clockOutTime = parseTime(record.clock_out_time);

      const morningWorkHours = (lunchOutTime - clockInTime) / 3600000;
      const afternoonWorkHours = (clockOutTime - lunchInTime) / 3600000;
      const lunchBreakDuration = (lunchInTime - lunchOutTime) / 3600000;

      const totalWorkingHoursDecimal = morningWorkHours + afternoonWorkHours - lunchBreakDuration;
      const hours = Math.floor(totalWorkingHoursDecimal);
      const minutes = Math.round((totalWorkingHoursDecimal - hours) * 60);

      return `${hours}:${minutes.toString().padStart(2, '0')}`;
    } else {
      return 'N/A';
    }
  };

  const calculateStatus = (clockIn, averageClockIn, isOnLeave) => {
    if (isOnLeave) return <button className='status-leave'>On leave</button>;
    if (!clockIn || clockIn === 'N/A') return <button className='status-absent'>Absent</button>;

    const clockInTime = new Date(`1970-01-01T${clockIn}`);
    const averageClockInTime = new Date(`1970-01-01T${averageClockIn}`);
    const diffMinutes = (clockInTime - averageClockInTime) / (1000 * 60);

    return diffMinutes > 15 ? <button className='status-late'>Late</button> : <button className='status-on-time'>On Time</button>;
  };

  return (
    <div>
      <div className='boxx'>
        <div className='header2'>
          <div className='box3'>
            <img src={employee.profile_picture || p2} alt='profile' className='employee-pic' />
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
                          <strong>Department:</strong> {employee.department}
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
                          <strong>Joining Date:</strong> {employee.joining_date}
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Documents' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>CV:</strong> <a href={employee.cv} target="_blank" rel="noopener noreferrer">Download</a>
                        </div>
                        <div className="info-item">
                          <strong>Educational Document:</strong> <a href={employee.educational_document} target="_blank" rel="noopener noreferrer">Download</a>
                        </div>
                        <div className="info-item">
                          <strong>Experience Letter:</strong> <a href={employee.experience_letter} target="_blank" rel="noopener noreferrer">Download</a>
                        </div>
                      </div>
                    )}
                    {activeSubTab === 'Account Access' && (
                      <div className="info-grid">
                        <div className="info-item">
                          <strong>Email Address:</strong> {employee.email}
                        </div>
                        <div className="info-item">
                          <strong>Password:</strong> ********
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {activeTab === 'Attendance' && (
                <div className="attendance-details">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Clock In</th>
                        <th>Clock Out</th>
                        <th>Lunch Out</th>
                        <th>Lunch In</th>
                        <th>Status</th>
                        <th>Working Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.map((record) => (
                        <tr key={record.date}>
                          <td>{record.date}</td>
                          <td>{record.clock_in_time || 'N/A'}</td>
                          <td>{record.clock_out_time || 'N/A'}</td>
                          <td>{record.lunch_out_time || 'N/A'}</td>
                          <td>{record.lunch_in_time || 'N/A'}</td>
                          <td>{calculateStatus(record.clock_in_time, employee.average_in_time, record.is_on_leave)}</td>
                          <td>{calculateWorkingHours(record)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === 'Leave' && (
                <div className="leave-details">
                  {/* Replace this with leave records if you have them */}
                  <p>No leave records available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
