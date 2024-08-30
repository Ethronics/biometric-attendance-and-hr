import React from 'react';
import { employees, attendance } from '../aanother';
import './empAttendance.css'

function EmpAttendance() {
    const employee = employees[0];

    const employeeAttendance = attendance.find(att => att.employeeId === employee.id);

    if (!employee || !employeeAttendance) {
        return <p>Employee or attendance data not found.</p>;
    }
    const getButtonStyle = (status) => {
        switch (status) {
            case 'On Time':
                return { backgroundColor: '#9F3DAE', color: '#fff' }; // Green
            case 'Late':
                return { backgroundColor: '#ffc107', color: '#000' }; // Yellow
            case 'Absent':
                return { backgroundColor: '#dc3545', color: '#fff' }; // Red
            default:
                return { backgroundColor: '#6c757d', color: '#fff' }; // Grey for unknown statuses
        }
    };

    return (
        <div className='emp-atten'>
            <div className='self-top'>
                <div className='im-p'>
                    <img src={employee.profile} className='atten-self-pro' />
                    <div style={{ marginTop: '35px' }}>
                        <h5>{employee.name}</h5>
                        <h5>{employee.designation}</h5>
                    </div>
                </div>
                <div>
                    <div style={{ marginTop: '35px' }}>
                        <h4> <strong>Employee ID</strong></h4>
                        <h5>{employee.id}</h5>
                    </div>
                </div>
                <div>
                    <div style={{ marginTop: '35px' }}>
                        <h4> <strong>joiningDate</strong></h4>
                        <h5>{employee.joiningDate}</h5>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>Average working hour </h3>
                <h3>Average In time </h3>
                <h3>Average Out time</h3>
                <h3>Average Break time</h3>
            </div>
            <div className='sa-ta'>
                <h2 style={{ margin: '10px 10px' }}>Attendance overview</h2>
                <table border="1" className='self-tables'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Clock In</th>
                            <th>Clock Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeAttendance.records.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.clockIn || 'N/A'}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.clockOut || 'N/A'}</td>
                                <td >
                                    <button className='self-but' style={getButtonStyle(record.status)}>
                                        {record.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default EmpAttendance;
