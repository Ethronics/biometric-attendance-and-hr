import React, { useState, useEffect } from 'react';
import { BsBagCheck, BsCalendar2Check, BsBookHalf, BsPerson } from 'react-icons/bs';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import './Home.css';
import { useLanguage } from '../../LanguageContext';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import axios from 'axios';
import '../../All.css';

// Registering Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Home() {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/employee/dashboard/')
            .then(response => {
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    const { t } = useLanguage();

    if (!dashboardData) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: dashboardData.attendance_overview.labels,
        datasets: [
            {
                label: 'Late',
                data: dashboardData.attendance_overview.late,
                backgroundColor: 'rgba(255,215, 0, 0.5)',
                borderColor: 'rgba(255,215, 0, 1)',
                borderWidth: 1,
                barThickness: 20,
            },
            {
                label: 'On-Time',
                data: dashboardData.attendance_overview.on_time,
                backgroundColor: 'rgba(159, 61, 174,0.5)',
                borderColor: 'rgba(159, 61, 174,1)',
                borderWidth: 1,
                barThickness: 20,
            },
            {
                label: 'Absent',
                data: dashboardData.attendance_overview.absent,
                backgroundColor: 'rgba(220, 20, 60, 0.5)',
                borderColor: 'rgba(220, 20, 60, 0.8)',
                borderWidth: 1,
                barThickness: 20,
            },
            {
                label: 'On Leave',
                data: dashboardData.attendance_overview.leave,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Employee Attendance Overview',
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                max: 100, // because the data is in percentages
            },
        },
    };

    return (
        <main className='main-container'>
            <div className='main-content-card'>
                <div className="left-container">
                    <div className='main-cards'>
                        <div className='card'>
                            <Link to="/employees" className='none'>
                                <div className='card-inner'>
                                    <BsPerson className='icon-all' />
                                    <h3 className="all-font">{t('Total_employees')}</h3>
                                </div>
                                <h1 className="all-font">{dashboardData.total_employees}</h1>
                            </Link>
                        </div>
                        <div className='card'>
                            <Link to="/training" className='none'>
                                <div className='card-inner'>
                                    <BsBagCheck className='icon-all' />
                                    <h3 className="all-font">{t('total_training')}</h3>
                                </div>
                                <h1 className="all-font">{dashboardData.total_training}</h1>
                            </Link>
                        </div>
                    </div>
                    <div className='main-cards'>
                        <div className='card'>
                            <Link to="/attendance" className='none'>
                                <div className='card-inner'>
                                    <BsCalendar2Check className='icon-all' />
                                    <h3>{t('total_attendance')}</h3>
                                </div>
                                <h1 className="all-font">{dashboardData.total_attendance}</h1>
                            </Link >
                        </div>
                        <div className='card'>
                            <Link to="/leaves" className='none'>
                                <div className='card-inner'>
                                    <BsBookHalf className='icon-all' />
                                    <h3 className="all-font">{t('total_leave')}</h3>
                                </div>
                                <h1 className="all-font">{dashboardData.total_leaves}</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='main-chart'>
                <Bar data={data} options={options} />
            </div>
        </main>
    );
}

export default Home;
