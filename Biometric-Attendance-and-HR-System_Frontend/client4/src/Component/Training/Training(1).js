import React, { useState, useEffect } from 'react';
import './Training.css';
import AddProgram from './Addprogram';

function Training() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [registeredEmployees, setRegisteredEmployees] = useState({});
    const [uploadedCertificates, setUploadedCertificates] = useState({});

    const today = new Date();

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
            registeredEmployees: [],
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
            registeredEmployees: [],
        },
    ];

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

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadCertificate = (programId, employeeId) => {
        // Handle certificate upload and move to history
        setUploadedCertificates({
            ...uploadedCertificates,
            [programId]: { ...uploadedCertificates[programId], [employeeId]: 'Certificate.pdf' },
        });

        // Move to completed programs
        const programToComplete = ongoingPrograms.find(program => program.id === programId);
        setCompletedPrograms([...completedPrograms, programToComplete]);
        setOngoingPrograms(ongoingPrograms.filter(program => program.id !== programId));
    };

    const handleRegisterEmployee = (programId, employee) => {
        setRegisteredEmployees({
            ...registeredEmployees,
            [programId]: [...(registeredEmployees[programId] || []), employee],
        });

        // Update the program's registered employees list
        const updatedPrograms = upcomingPrograms.map(program =>
            program.id === programId
                ? { ...program, registeredEmployees: [...program.registeredEmployees, employee] }
                : program
        );
        setUpcomingPrograms(updatedPrograms);
    };

    const isDirectorRegistered = (program) => {
        return program.registeredEmployees.some(emp => emp.isDirector);
    };

    return (
        <div className={`app-container ${isModalOpen ? 'blurred' : ''}`}>
            <div className="content">
                <div className="header-actions">
                    <button className="add-new-program" onClick={handleOpenModal}>Add New Program</button>
                </div>

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingPrograms.map(program => (
                                <tr key={program.id}>
                                    <td>{program.title}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.startDate} - ${program.endDate}`}</td>
                                    <td>{program.location}</td>
                                    <td>
                                        {registeredEmployees[program.id]?.length > 0 ? (
                                            <button disabled>Registered</button>
                                        ) : (
                                            <button className="add-new-program" onClick={() => handleRegisterEmployee(program.id, { name: 'New Employee', employeeId: 'EM000003' })}>
                                                Register
                                            </button>
                                        )}
                                    </td>
                                </tr>
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
                                <th>Registered Employees</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ongoingPrograms.map(program => (
                                <tr key={program.id}>
                                    <td>{program.title}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.startDate} - ${program.endDate}`}</td>
                                    <td>{program.registeredEmployees.map(emp => `${emp.name}/${emp.employeeId}`).join(', ')}</td>
                                    <td>
                                        {isDirectorRegistered(program) && (
                                            <button  className="add-new-program" onClick={() => handleUploadCertificate(program.id, 'EM000002')}>
                                                {uploadedCertificates[program.id]?.['EM000002'] ? 'View Certificate' : 'Upload Certificate'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
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
                                
                                <th>Certificates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedPrograms.map(program => (
                                <tr key={program.id}>
                                    <td>{program.title}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.startDate} - ${program.endDate}`}</td>
                                    
                                    <td>
                                        {uploadedCertificates[program.id]?.['EM000002'] && (
                                            <a href={`/certificates/${uploadedCertificates[program.id]['EM000002']}`} target="_blank" rel="noopener noreferrer">
                                                View Certificate
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
            <AddProgram isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Training;
