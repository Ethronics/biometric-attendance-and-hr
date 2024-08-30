import React, { useState } from 'react';
import './AddProgram.css';

const AddProgram = ({ isOpen, onClose }) => {
  const [program, setProgram] = useState('');
  const [trainer, setTrainer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleAddProgram = async () => {
    const data = {
      program,
      trainer,
      start_date: startDate,
      end_date: endDate,
      location,
      description,
      status: endDate < new Date().toISOString().split('T')[0] ? 'completed' : 'inprogress',
    };

    try {
      const response = await fetch('http://localhost:8000/training/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Training Program Added');
        onClose(); 
      } else {
        alert('Error adding program');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding program');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Training Program</h2>
        <div className="form-container">
          <div className="form-group-train">
            <input
              type="text"
              placeholder="Enter Training Program"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className='train-input'
            />
            <input
              type="text"
              placeholder="Enter Trainer"
              value={trainer}
              onChange={(e) => setTrainer(e.target.value)}
              className='train-input'
            />
            <label>Enter Starting Date:
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='train-input'
              />
            </label>
            <label>Enter Ending Date
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='train-input'
              />
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className='train-input'
            >
              <option value="">Select Location</option>
              <option value="room1">Location 1</option>
              <option value="room2">Location 2</option>
              <option value="room3">Location 3</option>
            </select>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="button-group">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAddProgram}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;
