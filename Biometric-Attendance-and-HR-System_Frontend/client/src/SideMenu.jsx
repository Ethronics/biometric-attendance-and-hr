
import React  from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SideMenu.css';
import pic from './assets/ethronicss.png';
import {
    TbLayoutDashboard,
    TbCalendarEvent,
    FiUsers,
    PiUsersThree,
    MdOutlineBusinessCenter,
    MdOutlineEventAvailable,
    CiViewList,
    CiDollar,
    CiSettings,
} from './icons';

function SideMenu() {
    const location= useLocation();
 
  }
    return (
        <div className="side-menu">
                <img className="side-menu-image" src={pic} alt="Ethronicss" />
           
            <ul className="side-menu-list">
            
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        <TbLayoutDashboard className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/employees" className={location.pathname === '/employees' ? 'active' : ''}>
                        <PiUsersThree className="icon" /> All Employees
                    </Link>
                </li>
                <li>
                    <Link to="/attendance" className={location.pathname === '/attendance' ? 'active' : ''}>
                        <MdOutlineEventAvailable className="icon" /> Attendance
                    </Link>
                </li>
                <li>
                    <Link to="/payroll" className={location.pathname === '/payroll' ? 'active' : ''}>
                        <CiDollar className="icon" /> Payroll
                    </Link>
                </li>
                <li>
                    <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
                        <MdOutlineBusinessCenter className="icon" /> Jobs
                    </Link>
                </li>
                <li>
                    <Link to="/candidates" className={location.pathname === '/candidates' ? 'active' : ''}>
                        <FiUsers className="icon" /> Candidates
                    </Link>
                </li>
                <li>
                    <Link to="/leaves" className={location.pathname === '/leaves' ? 'active' : ''}>
                        <CiViewList className="icon" /> Leaves
                    </Link>
                </li>
                <li>
                    <Link to="/holidays" className={location.pathname === '/holidays' ? 'active':''}><TbCalendarEvent className="icon" style={{ marginRight: '8px' }} /> Holidays</Link></li>
                <li><Link to="/settings" className={location.pathname === '/settings' ? 'active':''}><CiSettings className="icon" style={{ marginRight: '8px' }} /> Settings</Link></li>
            </ul>
        </div>
    );


export default SideMenu;
