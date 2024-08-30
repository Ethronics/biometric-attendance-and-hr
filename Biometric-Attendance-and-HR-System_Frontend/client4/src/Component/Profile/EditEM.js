import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams , Link} from 'react-router-dom';
import '../Employee/EmployeeInfo.css';
import { MdOutlineBusinessCenter, MdOutlineEmail ,MdLockOutline} from 'react-icons/md';
import p2 from'../../assets/e1.png';
import { setActiveTab, setActiveSubTab } from '../../tabSlice';
import { IoMdPerson } from "react-icons/io";
import{IoDocumentTextOutline} from "react-icons/io5";
import '../Employee/EditEmployee.css'
import { employees } from '../another';




function EditEM( {email} ){
  
  const employee = employees.find(emp => emp.email === email);

  const activeTab = useSelector((state) => state.tab.activeTab);
  const activeSubTab = useSelector((state) => state.tab.activeSubTab);
  const dispatch = useDispatch();
return(
  <div className='boxx'>
        <div className='header2'>
          <div className='box3'>
            <img src={employee.profile} alt='profile' className='employee-pic' />
            <div style={{ fontFamily:'Lexend', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', fontSize: '30px' }}>
              {employee.name}
              <div style={{display:'flex', fontFamily:'Lexend'} } className='h'>
                <MdOutlineBusinessCenter />  {employee.designation}
              </div>
              <div style={{display:'flex',fontFamily:'Lexend'} } className='h'>
                <MdOutlineEmail /> {employee.email}
              </div>
            </div>
            <div className="edit-container">
            
              <button className="edit-btn">Update</button>
        </div>
          </div>
         
        </div>
        <div className="edit-tabs">
        <div className="sub-tabs">
                    <button className={`sub-tab ${activeSubTab === 'Personal Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Personal Information'))}><IoMdPerson  className='icon'/>Personal Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Professional Information' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Professional Information'))}><MdOutlineBusinessCenter  className='icon'/>Professional Information</button>
                    <button className={`sub-tab ${activeSubTab === 'Documents' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Documents'))}><IoDocumentTextOutline  className='icon' />Documents</button>
                    <button className={`sub-tab ${activeSubTab === 'Account Access' ? 'subactive' : ''}`} onClick={() => dispatch(setActiveSubTab('Account Access'))}><MdLockOutline className='icon'/>Account Access</button>
                  </div>
                  <div className="sub-tab-content">
                  {activeSubTab === 'Personal Information' && (
  <div className="info-grid all-font">
    <div className="info-item all-font">
      <strong>First Name:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.firstName}
        defaultValue={employee.personalInfo.firstName}
      />
    </div>
    <div className="info-item">
      <strong>Last Name:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.lastName}
        defaultValue={employee.personalInfo.lastName}
      />
    </div>
    <div className="info-item">
      <strong>Phone Number:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.mobileNumber}
        defaultValue={employee.personalInfo.mobileNumber}
      />
    </div>
    <div className="info-item">
      <strong>Email Address:</strong>
      <input
        type="email"
        placeholder={employee.email}
        defaultValue={employee.email}
      />
    </div>
    <div className="info-item">
      <strong>Date of Birth:</strong>
      <input
      
        placeholder={employee.personalInfo.dateOfBirth}
        defaultValue={employee.personalInfo.dateOfBirth}
      />
    </div>
    <div className="info-item">
      <strong>Gender:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.gender}
        defaultValue={employee.personalInfo.gender}
      />
    </div>
    <div className="info-item">
      <strong>Address:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.address}
        defaultValue={employee.personalInfo.address}
      />
    </div>
    <div className="info-item">
      <strong>Marital Status:</strong>
      <input
        type="text"
        placeholder={employee.personalInfo.maritalStatus}
        defaultValue={employee.personalInfo.maritalStatus}
      />
    </div>
    <div className="info-item">
      <strong>Emergency Contact:</strong>
      <input
        type="text"
        placeholder={employee.emergencyContactName}
        defaultValue={employee.emergencyContactName}
      />
      <input
        type="text"
        placeholder={employee.emergencyContactNumber}
        defaultValue={employee.emergencyContactNumber}
      />
    </div>
  </div>
)}

{activeSubTab === 'Professional Information' && (
  <div className="info-grid">
    <div className="info-item">
      <strong>Employee ID:</strong>
      <input
        type="text"
        placeholder={employee.id}
        defaultValue={employee.id}
      />
    </div>
    <div className="info-item">
      <strong>Employee Type:</strong>
      <input
        type="text"
        placeholder={employee.type}
        defaultValue={employee.type}
      />
    </div>
    <div className="info-item">
      <strong>Department:</strong>
      <input
        type="text"
        placeholder={employee.department}
        defaultValue={employee.department}
      />
    </div>
    <div className="info-item">
      <strong>Designation:</strong>
      <input
        type="text"
        placeholder={employee.designation}
        defaultValue={employee.designation}
      />
    </div>
    <div className="info-item">
      <strong>Working Days:</strong>
      <input
        type="text"
        placeholder="5 Days"
        defaultValue="5 Days"
      />
    </div>
    <div className="info-item">
      <strong>Salary:</strong>
      <input
        type="text"
        placeholder={employee.salary}
        defaultValue={employee.salary}
      />
    </div>
    <div className="info-item">
      <strong>Working Hours Per Day:</strong>
      <input
        type="text"
        placeholder={employee.averageWorkingHours} 
        defaultValue={employee.averageWorkingHours} 
      />
    </div>
    <div className="info-item">
      <strong>Joining Date:</strong>
      <input
        type="date"
        placeholder={employee.joiningDate} 
        defaultValue={employee.joiningDate} 
      />
    </div>
    <div className="info-item">
      <strong>Eduaction Level</strong>
    <select name="education" className='se'>
                                        <option value="" disabled>{employee.educationLevel}</option>
                                        <option value="deploma" disabled>Certificate/Deploma</option>
                                        <option value="Bachelor">Bachelor's Degree</option>
                                        <option value="Master">Master's Degree</option>
                                        <option value="PH.D.">PH.D.</option>
                                    </select>
    </div>
    <div className="info-item">
      <strong>Average In Time:</strong>
      <input
        type="text"
        placeholder={employee.averageInTime} 
        defaultValue={employee.averageInTime} 
      />
    </div>
    <div className="info-item">
      <strong>Average Out Time:</strong>
      <input
        type="text"
        placeholder={employee.averageOutTime} 
        defaultValue={employee.averageOutTime} 
      />
    </div>
    <div className="info-item">
      <strong>Average Brake Time:</strong>
      <input
        type="text"
        placeholder={employee.averageBreakTime} 
        defaultValue={employee.averageBreakTime} 
      />
    </div>
    
  </div>
)}

{activeSubTab === 'Documents' && (
  <div>
    {/* Add input fields for documents if necessary */}
  </div>
)}

{activeSubTab === 'Account Access' && (
  <div className="info-grid">
    <div className="info-item">
      <strong>Email Address:</strong>
      <input
        type="email"
        placeholder={employee.email}
        defaultValue={employee.email}
      />
    </div>
  </div>
)}
</div>
</div>
<div className="edit-container">
            <Link to={`/profile`}>
              <button className="edit-btnn">Back</button>
            </Link>
          </div>
        </div>
)
}
export default EditEM;