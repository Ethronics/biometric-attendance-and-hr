import React, { useState } from 'react';
import axios from 'axios';
import './addemployee.css';
import {
    BsPerson, BsBag, BsFileEarmarkText, BsLockFill, BsCamera
} from 'react-icons/bs';
import { GrUploadOption } from "react-icons/gr";
import { TiCameraOutline } from "react-icons/ti";



const AddEmployee = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        full_name: '',
        
        phone_number: '',
        date_of_birth: '',
        marital_status: '',
        gender: '',
        address: '',
        // username: '',
        employee_type: '',
        department: '',
        joining_date: '',
        cv: null,
        educational_document: null,
        experience_letter: null,
        email: '',
        password: '',
        profile_picture: null,
        position: '',
        emergency_phone_number:'',
        emergency_person_name:'',
        basic_salary:'',
         role: '',

    });
    const numbers = Array.from({ length: 7}, (_, i) => i + 1);
    const number2 = Array.from({ length: 10}, (_, i) => i + 1);

    const [fileData, setFileData] = useState({
        CV: null,
        educational_document: null,
        experience_letter: null,
        profile_picture: null
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setFileData(prevFileData => ({
                ...prevFileData,
                [name]: file
            }));
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: file ? file.name : '',
                profilePicturePreview: name === 'profilePicture' ? URL.createObjectURL(file) : prevFormData.profilePicturePreview
            }));
        } else {
            setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        }
    };

const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all form data
    for (const key in formData) {
        if (formData[key] !== '') {
            data.append(key, formData[key]);
        }
    }

    // Append file data separately
    for (const key in fileData) {
        if (fileData[key]) {
            data.append(key.toLowerCase(), fileData[key]); // Match server expectations
        }
    }

    axios.post('http://localhost:8000/employee/create/', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error.response.data);
    });
};



    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const renderProgressIndicator = () => {
        return (
            <div className="progress-container">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}><BsPerson />Personal Information</div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}><BsBag />Professional Info</div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}><BsFileEarmarkText />Documents</div>
                <div className={`progress-step ${step >= 4 ? 'active' : ''}`}><BsLockFill />Account Access</div>
            </div>
        );
    };

    const generatePassword = () => {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
        let password = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        return password;
    };

    return (
        <div className="container">
            {renderProgressIndicator()}
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="form-group">
                        <div className="personal-info">
                            <div className="image-upload">
                                <label htmlFor="profilePicture">
                                    {formData.profilePicturePreview ? (
                                        <img src={formData.profilePicturePreview} alt="Profile" className="preview" />
                                    ) : (
                                        <TiCameraOutline className='camera-icon' />
                                    )}
                                </label>
                                <input type="file" id="profilePicture" name="profilePicture" accept="image/*" onChange={handleChange} />
                            </div>
                            <div className='employee-input'>
                                <div className='inpu-emplo-left'>
                                    <label htmlFor='full_name'>Full Name
                                    <input type="text" name="full_name"  className="input" onChange={handleChange} value={formData.full_name} /></label>
                                    
                                    <label htmlFor='phone_number'>Phone Number
                                    <input type="tel" name="phone_number"  className="input" onChange={handleChange} value={formData.phone_number} /></label>
                                    <label htmlFor='date_of_birth'>Date Of Birth
                                    <input type="date" name="date_of_birth" className="input" onChange={handleChange} value={formData.date_of_birth} /></label>
                                </div>
                                <div className='inpu-emplo-right'>
                                    <label htmlFor='martial_status'>Martial Status
                                    <select name="marital_status" className="select" onChange={handleChange} value={formData.marital_status}>
                                        <option value=""disabled></option>
                                        <option value="married">Married</option>
                                        <option value="unmarried">Unmarried</option>
                                        <option value="divorced">Divorced</option>
                                    </select></label>
                                    <label htmlFor='gender'>Gender
                                    <select name="gender" className="select" onChange={handleChange} value={formData.gender}>
                                        <option value="" disabled></option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select></label>
                                    <label>Address
                                    <input name="address"  className="input" onChange={handleChange} value={formData.address}/></label>
                                    <label>Emergency Contact<div className='emergency-in'>
                                    <input type="text" name="emergency_person_name" placeholder="Emergency Person Name" className="in" onChange={handleChange} value={formData.emergency_person_name} />
                                    <input type="text" name="emergency_phone_number" placeholder="Emergency Person Phone Number" className="in" onChange={handleChange} value={formData.emergency_phone_number} /></div></label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="form-group">
                        <div className="perofessional-info">
                            <div className='inpu-emplo-left'>
                            
                                <label>Employee Type
                                <select name="employee_type" className="select" onChange={handleChange} value={formData.employee_type}>
                                    <option value="" disabled></option>
                                    <option value="full-time">Full-Time</option>
                                    <option value="part-time">Part-Time</option>
                                    <option value="contract">Contract</option>
                                </select></label>
                                <label>Department
                                <select name="department" className="select" onChange={handleChange} value={formData.department}>
                                    <option value="" disabled></option>
                                    <option value="software">Software</option>
                                    <option value="hardware">Hardware</option>
                                    <option value="robotics">Robotics</option>
                                </select></label>
                                
                            </div>
                            <div className='inpu-emplo-right'>
                            <label>Joining Date
                                <input type="date" name="joining_date" className="input" onChange={handleChange} value={formData.joining_date} /></label>
                                <label>Position
                                <select name="position" className="select" onChange={handleChange} value={formData.position}>
                                    <option value="" disabled></option>
                                    <option value="project_manager">Project Manager</option> {/* Corrected value */}
                                    <option value="ui_ux_designer">UI/UX Designer</option> {/* Corrected value */}
                                    <option value="front_end_developer">Front-end Developer</option> {/* Corrected value */}
                                </select></label>
                                <label>Base Salary
                                <input type="number" name="basic_salary" className="input" onChange={handleChange} value={formData.basic_salary} /></label>
                                <label>Role
                                    <select name="role" className="select" onChange={handleChange} value={formData.role}>
                                        <option value="" disabled>Select Role</option>
                                        <option value="director">Director</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
               {step === 3 && (
  <div className="form-group">
    <div className="doc-area">
        <div className="all-font">Upload CV
      <div className="upload-box">
        <label htmlFor="CV" className="custom-file-upload">
          <GrUploadOption className="upload-icon" /> 
        </label>
        <input 
          type="file" 
          id="CV" 
          name="CV" 
          onChange={handleChange} 
          className="file-input" 
          accept=".jpg,.jpeg,.pdf"
        />
        {fileData.CV && <p>Selected: {fileData.CV.name}</p>}
        <span className="all-font">Choose file to upload</span>
        <span className='supported-file'>Supported formats: JPG, JPEG, PDF</span>
              </div></div>
              <div className="all-font">Upload Educational Document
      <div className="upload-box">
        <label htmlFor="Educational_Document" className="custom-file-upload">
          <GrUploadOption className="upload-icon" /> 
        </label>
        <input 
          type="file" 
          id="Educational_Document" 
          name="Educational_Document" 
          onChange={handleChange} 
          className="file-input" 
          accept=".jpg,.jpeg,.pdf"
        />
        {fileData.educational_eocument && <p>Selected: {fileData.educational_document.name}</p>}
        <span className="all-font">Choose file to upload</span> 
        <span className='supported-file'>Supported formats: JPG, JPEG, PDF</span>
              </div></div>
              <div className="all-font">Upload Experience Letter
      <div className="upload-box">
        <label htmlFor="Experience_Letter" className="custom-file-upload">
          <GrUploadOption className="upload-icon" /> 
        </label>
        <input 
          type="file" 
          id="Experience_Letter" 
          name="Experience_Letter" 
          onChange={handleChange} 
          className="file-input" 
          accept=".jpg,.jpeg,.pdf"
        />
        {fileData.experience_letter && <p>Selected: {fileData.experience_letter.name}</p>}
              <span className="all-font">Choose file to upload</span>
        <span className='supported-file'>Supported formats: JPG, JPEG, PDF</span>
              </div></div>
    </div>
  </div>
)}

                {step === 4 && (
                        <div className="personal-info-account">
                            <div>
                            
                                <input type="email" name="email" placeholder="Enter Email Address" className="in2" onChange={handleChange} value={formData.email} />
                            </div>
                            <div className="pass-div">
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} />
                                <button type="button" className="bt-color " onClick={() => setFormData(prev => ({ ...prev, password: generatePassword() }))}>Generate</button>
                            </div>
                        </div>
                )}
                <div className="form-navigation">
                    <div> {step > 1 && <button type="button" className="but all-font" id='cancel' onClick={prevStep}>Back</button>}</div>
                    <div>
                        {step < 4 && <button type="button" className="button all-font" onClick={nextStep}>Next</button>}
                    </div>
                    <div>
                        {step === 4 && <button type="submit" className="button all-font">Submit</button>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
