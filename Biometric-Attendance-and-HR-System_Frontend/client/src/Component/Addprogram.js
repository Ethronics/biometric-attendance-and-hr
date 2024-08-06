import React from 'react';
import './AddProgram.css';


const AddProgram = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Training Program</h2>
        <div className="form-container">
          <div className="form-group">
            <input type="text" placeholder="Enter Training Program" />
            <input type="text" placeholder="Enter Trainer" />
            <select>
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            <textarea placeholder="Description"></textarea>
          </div>
          <div className="calendar-container">
            <label>Select Training Schedule</label>
            <input type="date" />
          </div>
        </div>
        <div className="button-group">
          <button onClick={onClose}>Cancel</button>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddProgram;