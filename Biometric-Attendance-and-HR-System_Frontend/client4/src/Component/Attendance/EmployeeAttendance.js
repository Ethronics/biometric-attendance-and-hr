import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './EmployeeAttendance.css';

// Register the required elements for the chart
ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeAttendance({ email }) {
  const [attendance, setAttendance] = useState([]);
  const [employee, setEmployee] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const response = await fetch(`http://localhost:8000/attendance/${email}`);
        const data = await response.json();
        setAttendance(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    }

    async function fetchEmployee() {
      try {
        const response = await fetch(`http://localhost:8000/employee/${email}`);
        const data = await response.json();
        setEmployee(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }

    fetchAttendance();
    fetchEmployee();
  }, [email, id]);

  if (!employee) return <div>Loading employee data...</div>;

  // Function to calculate working hours from the attendance record
  const calculateWorkingHours = (record) => {
    if (record.clockIn && record.clockOut && record.lunchOut && record.lunchIn) {
      const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours !== 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return new Date().setHours(hours, minutes, 0, 0);
      };
  
      const clockInTime = parseTime(record.clockIn);
      const lunchOutTime = parseTime(record.lunchOut);
      const lunchInTime = parseTime(record.lunchIn);
      const clockOutTime = parseTime(record.clockOut);
  
      const morningWorkHours = (lunchOutTime - clockInTime) / 3600000;
      const afternoonWorkHours = (clockOutTime - lunchInTime) / 3600000;
      const breakDuration = (lunchInTime - lunchOutTime) / 3600000;
      const totalWorkingHoursDecimal = morningWorkHours + afternoonWorkHours - breakDuration;
  
      const hours = Math.floor(totalWorkingHoursDecimal);
      const minutes = Math.round((totalWorkingHoursDecimal - hours) * 60);
  
      return `${hours}:${minutes.toString().padStart(2, '0')} `;
    } else {
      return 'N/A';
    }
  };

  // Function to calculate the status of an employee's attendance
  const calculateStatus = (clockIn, averageClockIn, workingHours, isOnLeave, workingDays, recordDate) => {
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      return new Date().setHours(hours, minutes, 0, 0);
    };
  
    const date = new Date(recordDate);
    const dayOfWeek = date.getDay();
  
    if (workingDays === 5 && (dayOfWeek === 0 || dayOfWeek === 6)) {
      return 'Weekend';
    }
    if (workingDays === 6 && (dayOfWeek === 0)) {
      return 'Weekend';
    }
  
    if (isOnLeave) return 'On leave';
    if (!clockIn || clockIn === 'N/A') return 'Absent';
  
    const clockInTime = parseTime(clockIn);
    const averageClockInTime = parseTime(averageClockIn);
  
    if (!clockInTime || !averageClockInTime) return 'Absent';
  
    const diffMinutes = (clockInTime - averageClockInTime) / (1000 * 60);
  
    if (diffMinutes > 15) return 'Late';
  
    return 'On Time';
  };

  // Calculate the counts of each status
  const statusCounts = attendance.reduce(
    (counts, record) => {
      const workingHours = calculateWorkingHours(record);
      const status = calculateStatus(
        record.clockIn,
        employee.averageInTime,
        workingHours,
        record.isOnLeave,
        employee.workingDays,
        record.date
      );
  
      counts[status] = (counts[status] || 0) + 1;
  
      return counts;
    },
    { "Late": 0, "On Time": 0, "Absent": 0, "On leave": 0 }
  );

  // Data for the chart
  const data = {
    labels: ["Late", "On-Time", "Absent", "On leave"],
    datasets: [
      {
        data: [
          statusCounts["Late"],
          statusCounts["On Time"],
          statusCounts["Absent"],
          statusCounts["On leave"]
        ],
        backgroundColor: ["#fad508", "#9f3dae", "#dc143c", "#36a2eb"],
        hoverBackgroundColor: ["#fff", "#fff", "#fff", "#fff"],
      },
    ],
  };

  return (
    <div>
      <h3>{employee.name}'s Attendance Overview</h3>
      <Pie data={data} className="pie-chart-attendance"/>
      <div className='car-all'>
        <div className='carddd'>
          <div className='card-innerr'>
            <h3 className="all-font">08:00</h3>
          </div>
          <h1 className="all-fon">Average Working Hours</h1>
        </div>
        <div className='carddd'>
          <div className='card-innerr'>
            <h3 className="all-font">08:00 AM</h3>
          </div>
          <h1 className="all-fon">Average In Time</h1>
        </div>
        <div className='carddd'>
          <div className='card-innerr'>
            <h3 className="all-font">06:00 PM</h3>
          </div>
          <h1 className="all-fon">Average Out Time</h1>
        </div>
        <div className='carddd'>
          <div className='card-innerr'>
            <h3 className="all-font">01:00</h3>
          </div>
          <h1 className="all-fon">Average Break Time</h1>
        </div>
      </div>
      <div className="border-attend">
        <table className='employee-tables'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Clock In Time</th>
              <th>Clock Out Time</th>
              <th>Working Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((record, index) => {
              const workingHours = calculateWorkingHours(record);
              const status = calculateStatus(
                record.clockIn,
                employee.averageInTime,
                workingHours,
                record.isOnLeave,
                employee.workingDays,
                record.date
              );

              return (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.clockIn || 'N/A'}</td>
                  <td>{record.clockOut || 'N/A'}</td>
                  <td>{workingHours}</td>
                  <td>
                    <button className={`status-${status.toLowerCase().replace(' ', '-')}`}>
                      {status}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeAttendance;
