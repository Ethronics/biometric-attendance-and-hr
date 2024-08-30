import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsBell, BsPerson, BsChevronDown } from 'react-icons/bs';
import { HiOutlineLogout } from "react-icons/hi";
import './Header.css';
import '../../App.css';
import '../../All.css';
import Notification from '../Notification/Notification';
import { employees } from '../another';

function EmployeeHeader({ email }) { // Receiving email as a prop
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

  // Find employee by email
  const employee = employees.find(emp => emp.email === email);

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
          {/* Display dynamic header text based on the current path */}
          <h3 className='all-font'>{path === '/Dashboard' ? `${employee?.name || 'Employee'} 👋` : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/Dashboard' ? 'Welcome' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/profile' ? 'Your Profile' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/profile' ? 'profile Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/yourattendance' ? ' Attendance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/yourattendance' ? 'Attendance Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/Department' ? 'Department' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Department' ? 'All Employees' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/Payroll' ? ' Payroll' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Payroll' ? 'Payroll Information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/training' ? 'Training And Development' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/training' ? 'Training And Development Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/Leaves' ? 'Leave' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Leaves' ? 'Leave Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/Performance' ? 'Performance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Performance' ? 'Performance Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/Overtime' ? 'Overtime' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Overtime' ? 'Overtime Details' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/setting' ? 'Setting ' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/setting' ? 'All Settings' : ''}
            </span>
          </h6>
          {/* Other path-specific headings here */}
        </div>
      </div>
      <div className="navbar-right">
        <div className="notifcation-icon">
          <Link to='/notification'>
            <BsBell className='icon' onClick={handleOpenModal} />
          </Link>
        </div>
        <div className="user-info">
          <img src={employee?.profile || '/placeholder-image.png'} alt="Profile" /> {/* Use employee image or a placeholder */}
          <div className="user-details">
            <span className='all-font'>{employee?.name || 'Employee Name'}</span> {/* Display employee name */}
            <h3 className="h3 all-font">{employee?.designation || 'Designation'}</h3> {/* Display employee designation */}
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
      {isModalOpen && (
        <Notification isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </header>
  );
}

export default EmployeeHeader;
