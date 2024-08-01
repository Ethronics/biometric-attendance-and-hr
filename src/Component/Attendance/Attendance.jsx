import { React, useState } from 'react'
import { BsSearch, BsDownload, BsCalendar2Date, BsPrinter, BsPrinterFill } from 'react-icons/bs'
import './Attendance.css'
function Attendance() {
  return (
    <div className="attendance-container">
      <div className="headar-attendance">
        <div className="atten">
          <BsCalendar2Date className='icons' />
          <h1>Attendance</h1>
        </div>
        <div className="attendance-icon">
          <div className="right-atten">

            <BsSearch className='icon'/>
            <input type="Search" placeholder='Search' className='search-container' />
          </div>
          <div className="left-atten">
            <label>FROM:</label>
            <input
              type="date"
              className="inputs"
            />
            <label>TO:</label>
            <input
              type="date"
              className="inputs"
            />
            <button type='submit' className='buttons'><BsPrinterFill className='icon' />
              REPORT</button>
          </div>
        </div>
      </div>
      <div className="attendance-info">
        <table className='employee-table'>
          <thead>
            <tr>
              <th>employee name</th>
              <th>Designation</th>
              <th>Type</th>
              <th>Clock in</th>
              <th>Clock Out</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
      </div>

    </div>
  )
}

export default Attendance
