import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Employee from './Component/Employee/Employee';
import AddEmployee from './Component/Employee/AddEmployee';
import Attendance from './Component/Attendance/Attendance';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  /* for Addemployee */
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  return (
    <Router>
      <div className={`grid-container ${openSidebarToggle ? 'sidebar-open' : ''}`}>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Component/Employee/Employee" element={<Employee />} />
            <Route
              path="/add_employee"
              element={<AddEmployee onAddEmployee={handleAddEmployee} />}
            />
            <Route path='/Componenet/Attendance/Attendance' element={<Attendance/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
