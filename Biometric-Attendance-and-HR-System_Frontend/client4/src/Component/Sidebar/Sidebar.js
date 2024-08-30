import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import pic from '../../assets/ethronicss.png';
import { TbLayoutDashboard, TbCalendarEvent } from 'react-icons/tb';
import { PiUsersThree } from 'react-icons/pi';
import { MdOutlineBusinessCenter, MdOutlineEventAvailable } from 'react-icons/md';
import { CiViewList, CiDollar, CiSettings } from 'react-icons/ci';
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useLanguage } from '../../LanguageContext';
import { CgPerformance } from "react-icons/cg";
import { IoMdTime } from "react-icons/io";

import '../../All.css';
import '@fontsource/lexend';

function Sidebar() {
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div >
      <div className={`SideMenu-container  ${isSidebarOpen ? 'open' : ''}`}>
        <img className="SideMenu-image" src={pic} alt="Ethronicss" />
        <ul className="SideMenu-list">
          <li onClick={closeSidebar}>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              <TbLayoutDashboard className="SideMenu-icon" /><span className="all-font"> {t('dashboard')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/employees" className={({ isActive }) => (isActive ? 'active' : '')}>
              <PiUsersThree className="SideMenu-icon" /> <span className="all-font">{t('all_employees')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar} className="all-font">
            <NavLink to="/department" className={({ isActive }) => (isActive ? 'active' : '')}>
              <IoPeopleCircleOutline className="SideMenu-icon" /> <span className="all-font">{t('all_departments')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/attendance" className={({ isActive }) => (isActive ? 'active' : '')}>
              <MdOutlineEventAvailable className="SideMenu-icon" /><span className="all-font">{t('attendance')}</span> 
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/payroll" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CiDollar className="SideMenu-icon" /> <span className="all-font">{t('payroll')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/Training" className={({ isActive }) => (isActive ? 'active' : '')}>
              <MdOutlineBusinessCenter className="SideMenu-icon" /> <span className="all-font">{t('training_and_dev')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/leaves" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CiViewList className="SideMenu-icon" /> <span className="all-font">{t('leaves')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/performance" className={({ isActive }) => (isActive ? 'active' : '')}>
            <CgPerformance  className="SideMenu-icon" /> <span className="all-font">{t('performance')}</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/Overtime" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoMdTime   className="SideMenu-icon" /> <span className="all-font">Overtime</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/report" className={({ isActive }) => (isActive ? 'active' : '')}>
            <CgPerformance  className="SideMenu-icon" /> <span className="all-font">Report</span>
            </NavLink>
          </li>
          <li onClick={closeSidebar}>
            <NavLink to="/setting" className={({ isActive }) => (isActive ? 'active' : '')}>
              <CiSettings className="SideMenu-icon" /> <span className="all-font">{t('settings')}</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </div>
    </div>
  );
}

export default Sidebar;
