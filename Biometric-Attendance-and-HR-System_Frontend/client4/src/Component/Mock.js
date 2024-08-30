import image2 from '../../assets/image2.png'
import image from '../../assets/image.png'
const Mock = [
    {
        id: 1, name: 'Abela', department: 'Design',
        designation: 'Designer', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 5, name: 'Meiraf', department: 'Design',
        designation: 'Designer', type: 'Full-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Manager', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T08:45:00Z',
        status: 'On Time',
        profilePicture: image2
    },
    {
        id: 6, name: 'Abraham', department: 'Design',
        designation: 'Designer', type: 'Full-time',
        appiDate: '2024-06-20', leaveFrom: '2024-06-25',
        leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected',
        description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved",
        position: 'Designer', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T09:15:00Z', status: 'Late',
        profilePicture: image
    },
    {
        id: 7, name: 'Ajmel', department: 'Design',
        designation: 'Designer', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 2, name: 'Caala', department: 'Sales',
        designation: 'Sales Manager', type: 'Full-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 8, name: 'Kebada', department: 'Sales',
        designation: 'Sales Manager', type: 'Full-time',
        appiDate: '2024-06-20', leaveFrom: '2024-06-25',
        leaveTo: '2024-06-30', leaveType: 'Casual Leave', status: 'Rejected',
        description: "The employee has requested casual leave to address an urgent personal matter that requires immediate attention. This short-term absence is critical to resolving the issue without impacting work responsibilities. The employee will ensure a smooth transition back to work after the matter is resolved",
        position: 'Manager', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T08:45:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 9, name: 'Shawit', department: 'Sales',
        designation: 'Sales Manager', type: 'Full-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Designer', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T09:15:00Z', status: 'Late',
        profilePicture: image
    },
    {
        id: 10, name: 'Estif', department: 'Sales',
        designation: 'Sales Manager', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 3, name: 'John', department: 'Project Management',
        designation: 'Project Manager', type: 'Part-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 11, name: 'Yared', department: 'Project Management',
        designation: 'Project Manager', type: 'Part-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Manager', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T08:45:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 12, name: 'Veronic', department: 'Project Management',
        designation: 'Project Manager', type: 'Part-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Designer', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T09:15:00Z', status: 'Late',
        profilePicture: image
    },
    {
        id: 13, name: 'Lencho', department: 'Project Management',
        designation: 'Project Manager', type: 'Part-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 4, name: 'kadir', department: 'Marketing',
        designation: 'Marketer', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        profilePicture: image
    },
    {
        id: 14, name: 'Tomas', department: 'Marketing',
        designation: 'Marketer', type: 'Full-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 15, name: 'Andinet', department: 'Marketing',
        designation: 'Marketer', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Manager', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T08:45:00Z',
        status: 'On Time',
        profilePicture: image
    },
    {
        id: 17, name: 'abdu', department: 'Marketing',
        designation: 'Marketer', type: 'Full-time',
        appiDate: '2024-08-01', leaveFrom: '2024-08-10',
        leaveTo: '2024-08-15', leaveType: 'Sick', status: 'Accept',
        description: "The employee is experiencing severe flu symptoms, including high fever and fatigue, and has been advised by a healthcare professional to take five days of rest to recover fully and prevent any risk of contagion to colleagues. The situation will be monitored closely, with regular updates provided on their condition",
        position: 'Designer', clock_out_time: '2024-08-09T08:30:00Z',
        clock_in_time: '2024-08-09T09:15:00Z', status: 'Late',
        profilePicture: image
    },
    {
        id: 16, name: 'abdu', department: 'Marketing',
        designation: 'Marketer', type: 'Full-time',
        appiDate: '2024-07-15', leaveFrom: '2024-07-20',
        leaveTo: '2024-07-25', leaveType: 'Vacation', status: 'Accept',
        description: "The employee has requested a vacation period to rejuvenate and spend time with family. This time off is intended to enhance their well-being and productivity upon return. The vacation will involve travel and leisure activities, ensuring that the employee returns to work refreshed and with renewed focus",
        position: 'Developer', clock_out_time: '2024-08-09T08:30:00Z ',
        clock_in_time: '2024-08-09T08:30:00Z',
        status: 'On Time',
        profilePicture: image
    },

];
export default Mock;
