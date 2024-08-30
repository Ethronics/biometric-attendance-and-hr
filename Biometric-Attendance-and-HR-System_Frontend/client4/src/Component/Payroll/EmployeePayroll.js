import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Payroll.css'; // Your CSS file for styling

function EmployeePayroll({ email }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [payrollData, setPayrollData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/payroll/all/?employee.email=${email}`);
                const data = await response.json();
                setPayrollData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
                setLoading(false);
            }
        };

        fetchPayrollData();
    }, [email]);

    const calculateNetPay = (bonus, deduction) => bonus - deduction;

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(payrollData);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Payroll Data');
        writeFile(wb, 'payroll_data.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Pay Period', 'Total Working Hours', 'Absences', 'Overtime Hours', 'Deductions', 'Bonus', 'Net Salary']],
            body: payrollData.map(pd => [
                `${pd.pay_period_start_date} - ${pd.pay_period_end_date}`,
                pd.totalWorkingHours || 'N/A',
                pd.absences_in_month || 0,
                pd.overtime_hours || 0,
                pd.deductions || 0,
                pd.bonus || 0,
                pd.net_salary
            ])
        });
        doc.save('payroll_data.pdf');
    };

    const filterPayrollData = payrollData.filter(payroll => {
        const payPeriod = `${payroll.pay_period_start_date} - ${payroll.pay_period_end_date}`;
        return payPeriod.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='payroll'>
            <div className='payroll-header'>
                <div className="search-container">
                    <BsSearch className="search-icon" />
                    <input
                        type="search"
                        placeholder="Search by pay period"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="payroll-search"
                    />
                </div>
                <button onClick={exportToExcel} className="export-button">Export to Excel</button>
                <button onClick={exportToPDF} className="export-button">Export to PDF</button>
            </div>
            <div className="payroll-list">
                <table className="payroll-table">
                    <thead>
                        <tr>
                            <th>Pay Period</th>
                            <th>Total Working Hours</th>
                            <th>Absences</th>
                            <th>Overtime Hours</th>
                            <th>Deductions</th>
                            <th>Bonus</th>
                            <th>Net Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterPayrollData.map((payroll, index) => (
                            <tr key={index}>
                                <td>{`${payroll.pay_period_start_date} - ${payroll.pay_period_end_date}`}</td>
                                <td>{payroll.totalWorkingHours || 'N/A'}</td>
                                <td>{payroll.absences_in_month || 0}</td>
                                <td>{payroll.overtime_hours || 0}</td>
                                <td>{payroll.deductions || 0}</td>
                                <td>{payroll.bonus || 0}</td>
                                <td>{payroll.net_salary}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EmployeePayroll;
