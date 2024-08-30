import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
import './Payroll.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Payroll = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [payrolls, setPayrolls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const payrollsPerPage = 10;

    // Fetch payroll data from API
    useEffect(() => {
        const fetchPayrollData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:8000/payroll/all/?page=${currentPage}&search=${searchTerm}`);
                if (response.data) {
                    setPayrolls(response.data || []);
                    setTotalPages(response.data.total_pages || 1);
                } else {
                    setPayrolls([]); // Default to empty array if data is not as expected
                }
            } catch (error) {
                setError("Error fetching payroll data");
                console.error("Error fetching payroll data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPayrollData();
    }, [currentPage, searchTerm]);

    // Download as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(payrolls.map(payroll => ({
            'Employee Name': payroll.employee.full_name || payroll.employee,
            'Basic Salary': payroll.basic_salary || 0,
            'Allowance': payroll.allowance || 0,
            'Deductions': payroll.deductions || 0,
            'Gross Salary': payroll.gross_salary || 0,
            'Net Salary': payroll.net_salary || 0,
            'Working Days in Month': payroll.working_days_in_month || 0,
            'Present Days': payroll.present_days || 0,
            'Absences in Month': payroll.absences_in_month || 0,
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll");
        XLSX.writeFile(workbook, `Payroll_${new Date().toLocaleDateString()}.xlsx`);
    };

    // Download as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Payroll Report', 14, 16);
        doc.autoTable({
            head: [['Employee Name', 'Basic Salary', 'Allowance', 'Deductions', 'Gross Salary', 'Net Salary', 'Working Days in Month', 'Present Days', 'Absences in Month']],
            body: payrolls.map(payroll => [
                payroll.employee.full_name || payroll.employee,
                (payroll.basic_salary || 0),
                (payroll.allowance || 0),
                (payroll.deductions || 0),
                (payroll.gross_salary || 0),
                (payroll.net_salary || 0),
                (payroll.working_days_in_month || 0),
                (payroll.present_days || 0),
                (payroll.absences_in_month || 0),
            ]),
        });
        doc.save(`Payroll_${new Date().toLocaleDateString()}.pdf`);
    };

    // Pagination
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='payroll'>
            <div className='payroll-header'>
                <div className="search-container">
                    <BsSearch className="search-icon" />
                    <input
                        type="search"
                        placeholder="Search by name or status"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="employee-search"
                    />
                </div>
                <div className="download-buttons">
                    <button onClick={downloadExcel} className="download-excel">Download Excel</button>
                    <button onClick={downloadPDF} className="download-pdf">Download PDF</button>
                </div>
            </div>
            <div className="employee-list">
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Basic Salary</th>
                            <th>Allowance</th>
                            <th>Deductions</th>
                            <th>Gross Salary</th>
                            <th>Net Salary</th>
                            <th>Working Days in Month</th>
                            <th>Present Days</th>
                            <th>Absences in Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payrolls.length > 0 ? (
                            payrolls.map((payroll) => (
                                <tr key={payroll.id}>
                                    <td>{payroll.employee.full_name || payroll.employee}</td>
                                    <td>{(payroll.basic_salary || 0)}</td>
                                    <td>{(payroll.allowance || 0)}</td>
                                    <td>{(payroll.deductions || 0)}</td>
                                    <td>{(payroll.gross_salary || 0)}</td>
                                    <td>{(payroll.net_salary || 0)}</td>
                                    <td>{(payroll.working_days_in_month || 0)}</td>
                                    <td>{(payroll.present_days || 0)}</td>
                                    <td>{(payroll.absences_in_month || 0)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No payroll data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="pagination">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payroll;
