import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BsBell, BsJustify, BsSearch }
  from 'react-icons/bs'
import './Header.css'
import '../../App.css'
import image from '../../assets/image.png'
import Notification from '../Notification/Notification';
function Header({ OpenSidebar }) {
  const location = useLocation();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className='header'>
      <div className="left-nav">
        <div className='menu-icon'>
          <BsJustify className='icon' onClick={OpenSidebar} />
        </div>
        <div className='header-left'>
          <h3>{path === '/Component/Home/Home' ? 'Hello 👋' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Home/Home' ? 'HR Manager' : ''}</span></h6>
          <h3>{path === '/Component/Employee/Employee' ? 'All Employees' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Employee/Employee' ? 'All Employees Details information' : ''}</span></h6>
          <h3>{path === '/Component/Department/Department' ? 'All Department' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Department/Department' ? 'All Departments Details information' : ''}</span></h6>
          <h3>{path === '/Component/Attendance/Attendance' ? 'Attendance' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Attendance/Attendance' ? 'All Attendances information' : ''}</span></h6>
          <h3>{path === '/Component/Payrol/Payrol' ? 'Payrol' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Payrol/Payrol' ? 'All Payrols information' : ''}</span></h6>
          <h3>{path === '/Component/Training/TrainingAndDev' ? 'Training and Dev' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Training/TrainingAndDev' ? 'All Training Employee information' : ''}</span></h6>
          <h3>{path === '/Component/Leave/Leave' ? 'All Leave ' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Leave/Leave' ? ' Leave Employee information' : ''}</span></h6>
          <h3>{path === '/Component/Setting/Setting' ? 'Setting ' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Setting/Setting' ? ' Setting Project Manager' : ''}</span></h6>
          <h3>{path === '/Component/Holiday/Holiday' ? 'Holiday ' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Holiday/Holiday' ? ' Holiday Day' : ''}</span></h6>
          <h3>{path === '/AddEmployee' ? 'Add Employee ' : ''}</h3>
          <h6> <span className='header-span'>{path === '/AddEmployee' ? ' Employee information>Add Employee' : ''}</span></h6>
          <h3>{path === '/Component/Notification/Notification' ? 'Notification ' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Notification/Notification' ? 'Notification detail' : ''}</span></h6>
          <h3>{path === '/Component/Department/AddDepartment' ? 'Department' : ''}</h3>
          <h6> <span className='header-span'>{path === '/Component/Department/AddDepartment' ? 'Add Department' : ''}</span></h6>
        </div>
      </div>
      <div className="navbar-right">
        <div className="user-info">
          <button className='head-but'>
            <Link to='/Component/Notification/Notification'>
              <BsBell className='icon' onClick={handleOpenModal} />
            </Link>
          </button>
          <div className='pro-board'>
            <img src={image} alt="Profile" />
            <select className='header-option'>
              <option>
                profile
              </option>
              <option>
                logout
              </option>
            </select>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Notification isOpen={isModalOpen} onClose={handleCloseModal} />
      )}

    </header>
  )
}

export default Header