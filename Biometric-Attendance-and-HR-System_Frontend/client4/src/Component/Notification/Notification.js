import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/image.png';
import './notification.css';

export const notify = [
    {
        id: 1, // Added unique id for each notification
        name: 'ABRAHAM',
        email: 'ABRISH@example.com',
        department: 'Development',
        status: 'leave request',
        profilePicture: image,
        path: '/employee/abraham',
        details: 'ABRAHAM has applied for leave due to personal reasons and needs approval.',
    },
    {
        id: 2, // Added unique id for each notification
        name: 'ABRAHAM',
        email: 'ABRISH@example.com',
        department: 'Development',
        status: 'check in issue',
        profilePicture: image,
        path: '/employee/abraham',
        details: 'ABRAHAM has reported an issue with the check-in system, requesting immediate attention.',
    },
    {
        id: 3, // Added unique id for each notification
        name: 'ABRAHAM',
        email: 'ABRISH@example.com',
        department: 'Development',
        status: 'feedback',
        profilePicture: image,
        path: '/employee/abraham',
        details: 'ABRAHAM provided feedback on the recent project and expressed his satisfaction with the process.',
    },
    {
        id: 4, // Added unique id for each notification
        name: 'ABRAHAM',
        email: 'ABRISH@example.com',
        department: 'Development',
        status: 'Password Update Successfully',
        profilePicture: image,
        path: '/employee/abraham',
        details: 'ABRAHAM successfully updated his password on the system without issues.',
    },
];

function Notification({ isOpen, onClose, notifications = notify, notificationCount, setNotificationCount }) {
    const navigate = useNavigate();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [readNotifications, setReadNotifications] = useState(new Set()); // Track read notifications

    if (typeof setNotificationCount !== 'function') {
        console.error('setNotificationCount is not a function');
        return null;
    }

    const handleNotificationClick = (notification) => {
        if (!readNotifications.has(notification.id)) {
            setSelectedNotification(notification);
            setNotificationCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease count, not below 0
            setReadNotifications(new Set(readNotifications.add(notification.id))); // Mark as read
        } else {
            setSelectedNotification(notification);
        }
    };

    const handleBackClick = () => {
        setSelectedNotification(null);
    };

    const handleCloseAll = () => {
        setSelectedNotification(null);
        onClose();
        navigate(-2); // Navigate to the previous page
    };

    return (
        <div className='notification-popup'>
            <div className='notification-content'>
                {selectedNotification ? (
                    <div className='notification-popup'>
                        <div className='notification-popup-content'>
                            <img src={selectedNotification.profilePicture} alt="Profile" className="profile-picc" />
                            <h2>{selectedNotification.status}</h2>
                            <p>{selectedNotification.name} - {selectedNotification.department}</p>
                            <p>{selectedNotification.details}</p>
                            <div className='go-fl'>
                                <button className='close-buttons' onClick={handleBackClick}>Back</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='notification'>
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notify ${readNotifications.has(notification.id) ? 'clicked' : ''}`} // Apply background color if clicked
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <img src={notification.profilePicture} alt="Profile" className="profile-picc" />
                                <div className='notify-row'>
                                    <div className='notify-h'>
                                        <h2>{notification.status}</h2>
                                        <h5>{notification.name} - {notification.department}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className='close-button' onClick={handleCloseAll}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Notification;
