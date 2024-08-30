import axios from "axios";
import './EmployeeHome.css';
import { useEffect, useState } from "react";

function EmployeeHome({ email }) {
  const [employeedata, setEmployeedata] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/employee/${email}/`)
      .then(response => {
        setEmployeedata(response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, [email]);

  return (
    <div className="employee-home">
      <div>
        <img src={employeedata.profile_picture} alt="Employee Profile" className="first-employee-profile" />
      </div>
      <div className="first-employee-right">
        <div className="right-em">
          <h3>First Name: <span className="purple-text">{employeedata.full_name}</span></h3>
        </div>
        <div className="right-em">
          <h3>Employee Id: <span className="purple-text">{employeedata.id}</span></h3>
        </div>
        <div className="right-em">
          <h3>Position: <span className="purple-text">{employeedata.position}</span></h3>
        </div>
        <div className="right-em">
          <h3>Email: <span className="purple-text">{employeedata.email}</span></h3>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;
