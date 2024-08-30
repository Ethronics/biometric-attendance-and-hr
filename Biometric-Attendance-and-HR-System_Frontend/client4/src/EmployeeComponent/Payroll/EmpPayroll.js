import React from 'react'
import { employees, attendance, leave, Payrol } from '../aanother'
import './EmpPayroll.css'
function EmpPayroll() {
    const employee = employees[0];

    const employeePayroll = Payrol.find(pay => pay.employeeId === employee.id);
    return (
        <div className='emp-pay'>
            <div>
                <h1>salary per month</h1>
                <h4>{employeePayroll.PayrollRecords.baseSalary}</h4>
            </div>
            <div className='sa-pay-ta'>
                <h2 style={{ margin: '10px 10px' }}>payroll overview</h2>
                <table border="1" className='self-pay-tables'>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>base salary</th>
                            <th>Allowance</th>
                            <th>Deduction</th>
                            <th>Net Salary</th>
                            <th>pay Staatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeePayroll.PayrollRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.baseSalary || 'N/A'}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.Allownace || 'N/A'}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.Deduction || 'N/A'}</td>
                                <td style={{ color: '#9F3DAE' }}>{record.NetSalary || 'N/A'}</td>

                                <td >
                                    <button className='self-pay-but' >
                                        {record.Paystatus}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EmpPayroll
