import React, { useState } from 'react';
import { BsPeopleFill, BsBagCheck, BsCalendar2Check, BsBookHalf } from 'react-icons/bs';
import Calendar from 'react-calendar';

function Home() {
    const [value, setValue] = useState(new Date());
    const [plans, setPlans] = useState([]);
    const onDateClick = (date) => {
        const plan = prompt("Enter your plan for " + date.toDateString());
        if (plan) {
            setPlans([...plans, { date: date.toDateString(), plan }]);
        }
        setValue(date);
    };

    return (
        <main className='main-container'>
            <div className="left-container">
                <div className='main-cards'>
                    <div className='card'>
                        <a href="">
                            <div className='card-inner'>
                                <BsPeopleFill className='card_icon' />
                                <h3>Total Employees</h3>
                            </div>
                            <h1>300</h1>
                        </a>
                    </div>
                    <div className='card'>
                        <a href=''>
                            <div className='card-inner'>
                                <BsBagCheck className='card_icon' />
                                <h3>Total Applicants</h3>
                            </div>
                            <h1>12</h1>
                        </a>
                    </div>
                </div>
                <div className='main-cards'>
                    <div className='card'>
                        <a href="">
                            <div className='card-inner'>
                                <BsCalendar2Check className='card_icon' />
                                <h3>Today Attendance</h3>
                            </div>
                            <h1>33</h1>
                        </a>
                    </div>
                    <div className='card'>
                        <a href="">
                            <div className='card-inner'>
                                <BsBookHalf className='card_icon' />
                                <h3>Total leave request</h3>
                            </div>
                            <h1>42</h1>
                        </a>
                    </div>
                </div>
            </div>
            <div className="right-container">
                <div className='card-right'>
                    <div className="header-calendar">
                        <h1>My Schedule</h1>
                        <BsCalendar2Check className='icon-calendar' />
                    </div>
                    <div className="callendar">
                        <Calendar onClickDay={onDateClick} value={value} />
                        <div className="calendar-prompt">
                            <p>{value.toDateString()}</p>
                            <div className="plans-list">
                                {plans.filter(plan => plan.date === value.toDateString()).map((plan, index) => (
                                    <p key={index}>{plan.plan}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
