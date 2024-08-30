import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsBell, BsPerson, BsChevronDown } from 'react-icons/bs';
import { HiOutlineLogout } from "react-icons/hi";
import '../../Component/Header/Header.css';
import '../../App.css';
import '../../All.css';

import { employees } from '../../Component/another';

function EmpHeader({ OpenSidebar, email }) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  // Find employee by email, default to an empty object if not found
  const employee = employees.find(emp => emp.email === email) || {};

  const handleOpenModal = () => {
    setPreviousPath(path); // Store the current path before opening the notification
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (previousPath) {
      navigate(previousPath); // Navigate back to the previous path
    }
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    navigate('/EMprofile');
  };

  const handleLogoutClick = () => {
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="left-nav">
        <div className="header-left">
          <h3 className='all-font'>{path === '/Dashboard' ? `${employee.name || 'Employee'} 👋` : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/Dashboard' ? 'Welcome' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/profile' ? 'Your Profile' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/profile' ? 'Profile Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/yourattendance' ? 'Attendance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/yourattendance' ? 'Attendance Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/EMPayroll' ? 'Payroll' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/EMPayroll' ? 'Payroll Information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/EMtraining' ? 'Training And Development' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/EMtraining' ? 'Training And Development Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/EMLeaves' ? 'Leave' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/EMLeaves' ? 'Leave Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/EMPerformance' ? 'Performance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/EMPerformance' ? 'Performance Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/EMOvertime' ? 'Overtime' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/EMOvertime' ? 'Overtime Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/setting' ? 'Setting' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/setting' ? 'All Settings' : ''}
            </span>
          </h6>
        </div>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <img src={employee.profile || 'default-profile.png'} alt="Profile" /> {/* Fallback to a default image */}
          <div className="user-details">
            <span className='all-font'>{employee.name || 'Employee Name'}</span>
            <h3 className="h3 all-font">{employee.designation || 'Designation'}</h3>
          </div>
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <BsChevronDown />
            </button>
            {isDropdownVisible && (
              <div className="dropdown-menu">
                <button className="header-button all-font" onClick={handleProfileClick}>
                  <BsPerson /> My Profile
                </button>
                <button className="header-button all-font" style={{ color: 'red' }} onClick={handleLogoutClick}>
                  <HiOutlineLogout /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default EmpHeader;
