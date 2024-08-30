import React, { useState, useEffect, useRef } from 'react';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import { BsBell, BsPerson, BsChevronDown } from 'react-icons/bs';
import { HiOutlineLogout } from "react-icons/hi";
import './Header.css';
import '../../App.css';
import image from '../../assets/image.png';
import '../../All.css';
import Notification from '../Notification/Notification';

function Header({ notificationCount }){
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);

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
    navigate('/profile');
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
          <h3 className='all-font'>{path === '/dashboard' ? 'Hello 👋' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/dashboard' ? 'HR Manager' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/employees' ? 'All Employees' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/employees' ? 'All Employees Details information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/department' ? 'All Department' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/department' ? 'All Departments information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/attendance' ? 'Attendance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/attendance' ? 'All Attendances information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/payroll' ? 'Payroll' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/payroll' ? 'All Payrolls information' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/performance' ? 'Performance' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/performance' ? 'All Performance information' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/Overtime' ? 'Overtime' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/Overtime' ? 'All Overtime information' : ''}</span>
          </h6>
          <h3 className='all-font'>{path === '/Training' ? 'Training and Dev' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/Training' ? 'All Training Employee information' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/leaves' ? 'All Leave ' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/leaves' ? 'Leave Requests' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/setting' ? 'Setting ' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">
              {path === '/setting' ? 'All Settings' : ''}
            </span>
          </h6>
          <h3 className='all-font'>{path === '/report' ? 'Report ' : ''}</h3>
          <h6 className='all-font'>
            <span className="header-span">{path === '/report' ? 'Report' : ''}</span>
          </h6>
         
        </div>
      </div>
      <div className="navbar-right">
        <div className='not'>
        <span className="notification-count">{notificationCount}</span>
        <div className="notifcation-icon">
        <Link to='/notification'>
        
              <BsBell className='icon' onClick={handleOpenModal} />
              
            </Link>
        </div></div>
        <div className="user-info">
          <img src={image} alt="Profile" />
          <div className="user-details">
            <span className='all-font'>Kebede Chala</span>
            <h3 className="h3 all-font" >HR Manager</h3>
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

export default Header;
