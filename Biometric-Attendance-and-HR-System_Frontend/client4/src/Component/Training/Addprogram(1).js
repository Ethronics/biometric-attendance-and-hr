import React, { useState } from 'react';
import './AddProgram.css';
import Select from 'react-select';
import { initialDepartments } from '../Department/Department';
import '../../All.css'

const AddProgram = ({ isOpen, onClose }) => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);


  const handleDepartmentChange = (selectedOptions) => {
    setSelectedDepartments(selectedOptions || []);
  };



  // Transform data for react-select
  const departmentOptions = initialDepartments.flatMap(department => 
    department.subDepartments.map(subDept => ({
      value: subDept.name,
      label: subDept.name
    }))
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Training Program</h2>
        <div className="form-container">
          <div className="form-group-train">
            <input type="text" placeholder="Enter Training Program" className="train-input" />
            <input type="text" placeholder="Enter Trainer" className="train-input" />
            <label>Enter Starting Date:
              <input
                type="date"
                name="startDate"
                className="train-input"
              />
            </label>
            <label>Enter Ending Date:
              <input
                type="date"
                name="endDate"
                className="train-input"
              />
            </label>

            <label>Select Departments:</label>
            <Select
              isMulti
              options={departmentOptions}
              value={selectedDepartments}
              className="train-input"
              onChange={handleDepartmentChange}
            />

            <select  className="train-input">
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              <option value="location3">Location 3</option>
            </select>
            <textarea placeholder="Description" className="train-input"></textarea>
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
