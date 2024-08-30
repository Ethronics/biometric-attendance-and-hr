import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import './Attendance.css';
import '../Employee/employe.css';

const Attendance = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [allEmployees, setAllEmployees] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get('http://localhost:8000/employee/employees/');
        const attendanceResponse = await axios.get('http://localhost:8000/attendance/');
        setAllEmployees(employeeResponse.data);
        setAllAttendance(attendanceResponse.data || []); // Ensure allAttendance is an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (allEmployees.length && Array.isArray(allAttendance)) {
      const combinedData = allEmployees.map(employee => {
        const attendanceRecord = allAttendance.find(att => att.employee === employee.id);
        const records = attendanceRecord ? attendanceRecord.records || [] : []; // Ensure records is an array
        const recordDate = selectedDate || today;
        const todayRecord = records.find(record => record.date === recordDate);

        const clockInTime = todayRecord ? todayRecord.clock_in_time : 'N/A';
        const clockOutTime = todayRecord ? todayRecord.clock_out_time : 'N/A';
        const lunchOutTime = todayRecord ? todayRecord.lunch_out_time : 'N/A';
        const lunchInTime = todayRecord ? todayRecord.lunch_in_time : 'N/A';
        const isOnLeave = todayRecord ? todayRecord.status === 'On Leave' : false;

        const averageClockIn = '08:00 AM'; // Example default
        const averageBreakTime = employee.average_break_time;
        const averageWorkingHours = employee.average_working_hours;

        const workingHours = calculateWorkingHours(clockInTime, lunchOutTime, lunchInTime, clockOutTime, averageBreakTime);
        const breakTime = calculateBreakTime(lunchOutTime, lunchInTime);

        const parseBreakTime = (breakTime) => {
          if (!breakTime || breakTime === 'N/A') return 0;
          const [hours, minutes] = breakTime.split(':').map(Number);
          return (hours * 60) + minutes;
        };

        const breakTimeInMinutes = parseBreakTime(employee.break_time);

        const tolerance = 1;

        const status = calculateStatus(clockInTime, averageClockIn, workingHours, isOnLeave);

        return {
          employee: {
            name: employee.full_name,
            position: employee.position,
            profilePicture: employee.profile_picture,
          },
          clockInTime,
          clockOutTime,
          workingHours,
          breakTime,
          status,
          averageWorkingHours,
          averageBreakTime,
          breakTimeInMinutes,
          tolerance
        };
      });

      const filtered = combinedData.filter(employee =>
        employee.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.status.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredEmployees(filtered);
    }
  }, [selectedDate, searchTerm, allEmployees, allAttendance]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const currentItems = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Extract all unique dates from attendance records
  const allDates = allAttendance && Array.isArray(allAttendance)
    ? Array.from(new Set(allAttendance.flatMap(att => att.records ? att.records.map(record => record.date) : []))).sort().reverse()
    : [];

  const calculateBreakTime = (lunchOutTime, lunchInTime) => {
    const lunchOutDate = parseTime(lunchOutTime);
    const lunchInDate = parseTime(lunchInTime);

    if (!lunchOutDate || !lunchInDate) return 'N/A';

    const totalBreakTime = lunchInDate - lunchOutDate; // Break time in milliseconds
    const totalMinutes = totalBreakTime / (1000 * 60); // Convert to minutes

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const calculateWorkingHours = (clockIn, lunchOut, lunchIn, clockOut, breakTime) => {
    if (!clockIn || !clockOut || clockIn === 'N/A' || clockOut === 'N/A') return 'N/A';

    const clockInDate = parseTime(clockIn);
    const lunchOutDate = parseTime(lunchOut);
    const lunchInDate = parseTime(lunchIn);
    const clockOutDate = parseTime(clockOut);

    if (!clockInDate || !clockOutDate) return 'N/A';

    const timeBeforeLunch = lunchOutDate - clockInDate;
    const timeAfterLunch = clockOutDate - lunchInDate;
    const totalWorkingTime = timeBeforeLunch + timeAfterLunch;

    const totalMinutes = totalWorkingTime / (1000 * 60);
    const adjustedMinutes = totalMinutes - breakTime;

    const adjustedHours = Math.floor(adjustedMinutes / 60);
    const adjustedMinutesFinal = Math.round(adjustedMinutes % 60);

    return adjustedMinutes >= 0 ? `${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutesFinal).padStart(2, '0')}` : 'N/A';
  };

  const parseTime = (time) => {
    if (!time) return null;

    const [timeString, modifier] = time.split(' ');
    if (!timeString || !modifier) return null;

    let [hours, minutes] = timeString.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }

    if (modifier === 'AM' && hours === '12') {
      hours = 0;
    }

    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));

    return date;
  };

  const calculateStatus = (clockIn, averageClockIn, workingHours, isOnLeave) => {
    if (isOnLeave) return (<button className='status-leave'>On leave</button>);
    if (!clockIn || clockIn === 'N/A') return (<button className='status-absent'>Absent</button>);

    const clockInTime = parseTime(clockIn);
    const averageClockInTime = parseTime(averageClockIn);

    if (!clockInTime || !averageClockInTime) return (<button className='status-absent'>Absent</button>);

    const diffMinutes = (clockInTime - averageClockInTime) / (1000 * 60);

    if (diffMinutes > 15) return (<button className='status-late'>Late</button>);

    const [hours, minutes] = workingHours.split(':').map(Number);
    const totalWorkingHours = hours + (minutes || 0) / 60;

    return (<button className='status-on-time'>On Time</button>);
  };

  return (
    <div className="container2">
      <div className="select-container">
        <div className="search-atten">
          <BsSearch className='search-icon' />
          <input
            type="search"
            placeholder="Search by name or status"
            value={searchTerm}
            onChange={handleSearch}
            className="atten-search"
          />
        </div>
        <select value={selectedDate} onChange={handleDateChange}>
          <option value={today}>Today</option>
          {allDates.map(date => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>
      <table className='employee-tables'>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Position</th>
            <th>Clock In Time</th>
            <th>Clock Out Time</th>
            <th>Working Hours</th>
            <th>Break Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee, index) => (
            <tr key={index}>
              <td className='name'><img className='profile-pic' src={employee.employee.profilePicture} alt="Profile" /> {employee.employee.name}</td>
              <td>{employee.employee.position}</td>
              <td>{employee.clockInTime}</td>
              <td>{employee.clockOutTime}</td>
              <td>{employee.workingHours}</td>
              <td>{employee.breakTime}</td>
              <td>{employee.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
