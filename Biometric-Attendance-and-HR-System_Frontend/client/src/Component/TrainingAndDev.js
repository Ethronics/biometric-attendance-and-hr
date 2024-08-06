import React, { useState } from 'react';
import './TrainingAndDev.css';
import AddProgram from './Addprogram';

function TrainingAndDev() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`app-container ${isModalOpen ? 'blurred' : ''}`}>
      <div className="sidebar-placeholder">
        <ul>
          <li>Dashboard</li>
          <li>All Employees</li>
          <li>All Departments</li>
          <li>Attendance</li>
          <li>Payroll</li>
          <li>Training and Dev't</li>
          <li>Leaves</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="content">
        <header>
          <h1>Training and Dev't</h1>
        </header>
        <div className="header-actions">
            <button className="add-new-program" onClick={handleOpenModal}>Add New Program</button>
          </div>
        <section className="program-section">
          <h2>Upcoming Training Program</h2>
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
              <tr>
                <td>Leadership Training</td>
                <td>Develop leadership skills</td>
                <td>Kebede Chala</td>
                <td>Aug 6 - Aug 8</td>
                <td>Training room 1</td>
                <td>Shewit Chala/EM000001</td>
              </tr>
              <tr>
                <td>Leadership Training 2</td>
                <td>Develop leadership skills</td>
                <td>Kebede Chala</td>
                <td>Aug 13 - Aug 15</td>
                <td>Training room 1</td>
                <td>Shewit Chala/EM000001</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="program-section">
          <h2>Training History</h2>
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
              <tr>
                <td>Leadership Training</td>
                <td>Develop leadership skills</td>
                <td>Kebede Chala</td>
                <td>Aug 6 - Aug 8</td>
                <td>Training room 1</td>
                <td>Shewit Chala/EM000001</td>
              </tr>
              <tr>
                <td>Leadership Training 2</td>
                <td>Develop leadership skills</td>
                <td>Kebede Chala</td>
                <td>Aug 13 - Aug 15</td>
                <td>Training room 1</td>
                <td>Shewit Chala/EM000001</td>
              </tr>
            </tbody>
          </table>
        </section>
        <div className="view-more-container">
          <button className="view-more-button">View more</button>
        </div>
      </div>
      <AddProgram isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default TrainingAndDev;