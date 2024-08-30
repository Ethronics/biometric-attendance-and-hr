import React, { useState, useEffect } from 'react';
import './Training.css';
import AddProgram from './Addprogram';

function Training() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchTrainingPrograms = async () => {
            try {
                const response = await fetch('http://localhost:8000/training/');
                if (response.ok) {
                    const data = await response.json();
                    setTrainingPrograms(data);
                } else {
                    console.error('Error fetching training programs');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchTrainingPrograms();
    }, []);

    return (
        <div className={`app-container ${isModalOpen ? 'blurred' : ''}`}>
            <div className="content">
                <div className="header-actions">
                    <button className="add-new-program" onClick={handleOpenModal}>Add New Program</button>
                </div>
                <section className="program-section">
                    <h1>Upcoming Training Program</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                                <th>Location</th>
                                <th>Registered Employees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingPrograms.filter(program => program.status === 'inprogress').map(program => (
                                <tr key={program.id}>
                                    <td>{program.program}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.start_date} - ${program.end_date}`}</td>
                                    <td>{program.location}</td>
                                    <td>Placeholder for registered employees</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                <section className="program-section">
                    <h1>Training History</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                                <th>Location</th>
                                <th>Completed Employees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainingPrograms.filter(program => program.status === 'completed').map(program => (
                                <tr key={program.id}>
                                    <td>{program.program}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.start_date} - ${program.end_date}`}</td>
                                    <td>{program.location}</td>
                                    <td>Placeholder for completed employees</td>
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
