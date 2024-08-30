import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import pic from '../../assets/ethronicss.png';
import { TbLayoutDashboard, TbCalendarEvent } from 'react-icons/tb';
import { PiUsersThree } from 'react-icons/pi';
import { MdOutlineBusinessCenter, MdOutlineEventAvailable } from 'react-icons/md';
import { CiViewList, CiDollar, CiSettings } from 'react-icons/ci';
import { IoPeopleCircleOutline } from "react-icons/io5";
import { useLanguage } from '../../LanguageContext';
import { CgPerformance } from "react-icons/cg";
import './EmpSidebar.css'
import '../../All.css';
import '@fontsource/lexend';
import { IoMdTime } from "react-icons/io";
function EmpSidebar() {
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
            <div className={`SideMenu-employee-container  ${isSidebarOpen ? 'open' : ''}`}>
                <img className="SideMenu-employee-image" src={pic} alt="Ethronicss" />
                <ul className="SideMenu-employee-list">
                    <li onClick={closeSidebar}>
                        <NavLink to="/Dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <TbLayoutDashboard className="SideMenu-employee-icon" /><span className="all-font"> {t('dashboard')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <PiUsersThree className="SideMenu-employee-icon" /> <span className="all-font">{t('Profile')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar} className="all-font">
                        <NavLink to="/yourattendance" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <IoPeopleCircleOutline className="SideMenu-employee-icon" /> <span className="all-font">{t('Attendance')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/EMLeaves" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <MdOutlineEventAvailable className="SideMenu-employee-icon" /><span className="all-font">{t('Leave')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/EMPayroll" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <CiDollar className="SideMenu-employee-icon" /> <span className="all-font">{t('payroll')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/EMtraining" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <MdOutlineBusinessCenter className="SideMenu-employee-icon" /> <span className="all-font">{t('training_and_dev')}</span>
                        </NavLink>
                    </li>

                    <li onClick={closeSidebar}>
                        <NavLink to="/EMPerformance" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <CgPerformance className="SideMenu-employee-icon" /> <span className="all-font">{t('performance')}</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
            <NavLink to="/EMOvertime" className={({ isActive }) => (isActive ? 'active' : '')}>
            <IoMdTime   className="SideMenu-icon" /> <span className="all-font">Overtime</span>
            </NavLink>
          </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/EMFeedback" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <CgPerformance className="SideMenu-employee-icon" /> <span className="all-font">Feedback</span>
                        </NavLink>
                    </li>
                    <li onClick={closeSidebar}>
                        <NavLink to="/setting" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <CiSettings className="SideMenu-employee-icon" /> <span className="all-font">{t('settings')}</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="hamburger-menu" onClick={toggleSidebar}>
                &#9776;
            </div>
        </div>
    );
};

export default EmpSidebar;
