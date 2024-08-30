import React, { useState, useEffect } from 'react';
import '../../Component/Training/Training.css';

function EmpTraining() {
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const today = new Date();

    useEffect(() => {
        const fetchTrainingPrograms = async () => {
            try {
                const response = await fetch('http://localhost:8000/training/');
                if (response.ok) {
                    const data = await response.json();
                    setTrainingPrograms(data);
                } else {
                    console.error('Failed to fetch training programs');
                }
            } catch (error) {
                console.error('Error fetching training programs:', error);
            }
        };

        fetchTrainingPrograms();
    }, []);

    // Categorize training programs
    const upcomingPrograms = trainingPrograms.filter(program => new Date(program.start_date) > today);
    const ongoingPrograms = trainingPrograms.filter(program => new Date(program.start_date) <= today && new Date(program.end_date) >= today);
    const completedPrograms = trainingPrograms.filter(program => new Date(program.end_date) < today);

    return (
        <div className="app-container">
            <div className="content">
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
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingPrograms.map(program => (
                                <tr key={program.id}>
                                    <td>{program.program}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.start_date} - ${program.end_date}`}</td>
                                    <td>{program.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="program-section">
                    <h1>Ongoing Training Programs</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Training Program</th>
                                <th>Description</th>
                                <th>Trainer</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ongoingPrograms.map(program => (
                                <tr key={program.id}>
                                    <td>{program.program}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.start_date} - ${program.end_date}`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

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
                                <tr key={program.id}>
                                    <td>{program.program}</td>
                                    <td>{program.description}</td>
                                    <td>{program.trainer}</td>
                                    <td>{`${program.start_date} - ${program.end_date}`}</td>
                                    <td>
                                        {program.cirtificate ? (
                                            <a href={program.cirtificate} download>
                                                Download Certificate
                                            </a>
                                        ) : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default EmpTraining;
