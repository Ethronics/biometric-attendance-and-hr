import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BsGrid1X2Fill, BsPeopleFill, 
  BsFillGearFill, BsPaypal, BsCalendar2Check, 
  BsBagCheckFill, 
  BsFillPersonBadgeFill, 
  BsCalendar2Day, BsCalendar2CheckFill, 
  BsBadge3D 
} from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsBadge3D className='icon_header' /> Code Pioneers
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
          <Link to="/department" onClick={OpenSidebar}>
            <BsFillPersonBadgeFill className='icon' /> Department
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/Componenet/Attendance/Attendance" onClick={OpenSidebar}>
            <BsCalendar2Check className='icon' /> Attendance
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/payroll" onClick={OpenSidebar}>
            <BsPaypal className='icon' /> Payroll
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/jobs" onClick={OpenSidebar}>
            <BsBagCheckFill className='icon' /> Jobs
          </Link>
        </li>
       
        <li className='sidebar-list-item'>
          <Link to="/leave" onClick={OpenSidebar}>
            <BsCalendar2CheckFill className='icon' /> Leave
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/holiday" onClick={OpenSidebar}>
            <BsCalendar2Day className='icon' /> Holiday
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/settings" onClick={OpenSidebar}>
            <BsFillGearFill className='icon' /> Setting
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
