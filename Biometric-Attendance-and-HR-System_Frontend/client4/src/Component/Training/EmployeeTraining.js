import React, { useState, useEffect } from 'react';
import './Training.css';

function EmployeeTraining() {
    const today = new Date();
    const employeeId = 'EM000003'; // Example logged-in employee ID, adjust this accordingly

    // Mock data for training programs
    const mockTrainingPrograms = [
        {
            id: '1',
            title: 'Leadership Training',
            description: 'Develop leadership skills',
            trainer: 'Kebede Chala',
            startDate: '2024-08-21',
            endDate: '2024-08-25',
            location: 'Training room 1',
            registeredEmployees: [{ name: 'New Employee', employeeId: 'EM000003' }],
        },
        {
            id: '2',
            title: 'Advanced Management Skills',
            description: 'Enhance management capabilities',
            trainer: 'Martha Kassa',
            startDate: '2024-08-26',
            endDate: '2024-08-30',
            location: 'Training room 2',
            registeredEmployees: [],
        },
        {
            id: '3',
            title: 'Project Management Fundamentals',
            description: 'Learn project management basics',
            trainer: 'Amanuel Tesfaye',
            startDate: '2024-09-01',
            endDate: '2024-09-03',
            location: 'Training room 3',
            registeredEmployees: [{ name: 'New Employee', employeeId: 'EM000003' }],
        },
    ];

    const [uploadedCertificates, setUploadedCertificates] = useState({});

    // Categorize training programs
    const [upcomingPrograms, setUpcomingPrograms] = useState(mockTrainingPrograms.filter(program => new Date(program.startDate) > today));
    const [ongoingPrograms, setOngoingPrograms] = useState(mockTrainingPrograms.filter(program => new Date(program.startDate) <= today && new Date(program.endDate) >= today));
    const [completedPrograms, setCompletedPrograms] = useState([]);

    useEffect(() => {
        // Move programs from Upcoming to Ongoing when their start date arrives
        const updatedUpcomingPrograms = upcomingPrograms.filter(program => new Date(program.startDate) > today);
        const newOngoingPrograms = upcomingPrograms.filter(program => new Date(program.startDate) <= today && new Date(program.endDate) >= today);
        setUpcomingPrograms(updatedUpcomingPrograms);
        setOngoingPrograms([...ongoingPrograms, ...newOngoingPrograms]);
    }, [today, upcomingPrograms, ongoingPrograms]);

    const handleUploadCertificate = (programId) => {
        // Handle certificate upload and move to history
        setUploadedCertificates({
            ...uploadedCertificates,
            [programId]: 'Certificate.pdf',
        });

        // Move to completed programs
        const programToComplete = ongoingPrograms.find(program => program.id === programId);
        setCompletedPrograms([...completedPrograms, programToComplete]);
        setOngoingPrograms(ongoingPrograms.filter(program => program.id !== programId));
    };

    const isEmployeeRegistered = (program) => {
        return program.registeredEmployees.some(emp => emp.employeeId === employeeId);
    };

    return (
        <div className="app-container">
            <div className="content">
                {/* Upcoming Training Programs */}
                <section className="program-section">
                    <h1>Upcoming Training Programs</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingPrograms.map(program => (
                                isEmployeeRegistered(program) && (
                                    <tr key={program.id}>
                                        <td>{program.title}</td>
                                        <td>{program.description}</td>
                                        <td>{program.trainer}</td>
                                        <td>{`${program.startDate} - ${program.endDate}`}</td>
                                        <td>{program.location}</td>
                                        <td>Registered</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Ongoing Training Programs */}
                <section className="program-section">
                    <h1>Ongoing Training Programs</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ongoingPrograms.map(program => (
                                isEmployeeRegistered(program) && (
                                    <tr key={program.id}>
                                        <td>{program.title}</td>
                                        <td>{program.description}</td>
                                        <td>{program.trainer}</td>
                                        <td>{`${program.startDate} - ${program.endDate}`}</td>
                                        <td>
                                            <button onClick={() => handleUploadCertificate(program.id)}>
                                                {uploadedCertificates[program.id] ? 'View Certificate' : 'Upload Certificate'}
                                            </button>
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Completed Training Programs */}
                <section className="program-section">
                    <h1>Completed Training Programs</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                                <th>Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedPrograms.map(program => (
                                isEmployeeRegistered(program) && (
                                    <tr key={program.id}>
                                        <td>{program.title}</td>
                                        <td>{program.description}</td>
                                        <td>{program.trainer}</td>
                                        <td>{`${program.startDate} - ${program.endDate}`}</td>
                                        <td>
                                            {uploadedCertificates[program.id] && (
                                                <a href={`/certificates/${uploadedCertificates[program.id]}`} target="_blank" rel="noopener noreferrer">
                                                    View Certificate
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default EmployeeTraining;
