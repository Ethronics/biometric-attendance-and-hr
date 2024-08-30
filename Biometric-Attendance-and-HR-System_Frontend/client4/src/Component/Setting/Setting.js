import React, { useState, useEffect } from 'react';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import './Setting.css';
import { useLanguage } from '../../LanguageContext';
import '../../All.css';
import Payroll from '../Payroll/Payroll';

const Setting = () => {
    const { t, language, setLanguage } = useLanguage();
    const [appearance, setAppearance] = useState('light');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }

        const savedAppearance = localStorage.getItem('appearance');
        if (savedAppearance) {
            setAppearance(savedAppearance);
            document.body.className = savedAppearance;
            const header = document.querySelector('.header');
            const payroll=document.querySelector('.payroll');
            const sidebar = document.querySelector('.SideMenu-container');
            if (header) {
                header.className = `header ${savedAppearance}`;
            }
            if (sidebar) {sidebar.className = `SideMenu-container ${savedAppearance}`};
            if(payroll){
                payroll.className=`payroll ${savedAppearance}`;
            }
            
    
        }
    }, [setLanguage]);

    const handleAppearanceChange = (e) => {
        const newAppearance = e.target.value;
        setAppearance(newAppearance);
        document.body.className = newAppearance;
        localStorage.setItem('appearance', newAppearance);
    };

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <div className={`settings all-font ${appearance}`}>
            <div className={`setting-item ${appearance}`}>
                <div className="set">
                    <h1 className="all-font">{t('appearance_title')}:</h1>
                    <p className="all-font">{t('appearance_description')}</p>
                </div>
                <div className="all-font ">
                    <select id="appearance" value={appearance} onChange={handleAppearanceChange}>
                        <option value="light">{t('light')}</option>
                        <option value="dark">{t('dark')}</option>
                    </select>
                </div>
            </div>
            <div className={`setting-item ${appearance}`}>
                <div className="set">
                    <h1 className="all-font">{t('language_title')}:</h1>
                    <p className="all-font">{t('language_description')}</p>
                </div>
                <div className="all-font ">
                    <select id="language" value={language} onChange={handleLanguageChange}>
                        <option value="en">English</option>
                        <option value="am">አማርኛ</option>
                    </select>
                </div>
            </div>
            <div className={`setting-item ${appearance}`}>
                <div className="set">
                    <h1 className="all-font">{t('2fa_title')}:</h1>
                    <p className="all-font">{t('2fa_description')}</p>
                </div>
                <div>
                    <BsToggleOn className="toggle" />
                   
                </div>
            </div>
            <div className={`setting-item ${appearance}`}>
                <div className="set">
                    <h1 className="all-font">{t('notifications_title')}:</h1>
                    <p className="all-font">{t('notifications_description')}</p>
                </div>
                <div>
                    <BsToggleOn className="toggle" />
                    
                </div>
            </div>
        </div>
    );
};

export default Setting;
