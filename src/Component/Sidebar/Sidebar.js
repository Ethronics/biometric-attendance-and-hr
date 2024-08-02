import React from 'react';
import { Link } from 'react-router-dom';
import ethronicss from "../../assets/ethronicss.png"
import { 
  BsGrid1X2Fill, BsPeopleFill, 
  BsFillGearFill, BsPaypal, BsCalendar2Check, 
  BsBagCheckFill, 
  BsCalendar2Day, BsCalendar2CheckFill} from 'react-icons/bs';
  import './Sidebar.css'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={ethronicss} alt="logo" className='icon_header' />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/" >
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/Component/Employee/Employee" >
            <BsPeopleFill className='icon' /> All Employees
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/Componenet/Attendance/Attendance" >
            <BsCalendar2Check className='icon' /> Attendance
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/payroll" >
            <BsPaypal className='icon' /> Payroll
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/jobs" >
            <BsBagCheckFill className='icon' /> Jobs
          </Link>
        </li>
       
        <li className='sidebar-list-item'>
          <Link to="/leave" >
            <BsCalendar2CheckFill className='icon' /> Leave
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/holiday" >
            <BsCalendar2Day className='icon' /> Holiday
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings" >
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
