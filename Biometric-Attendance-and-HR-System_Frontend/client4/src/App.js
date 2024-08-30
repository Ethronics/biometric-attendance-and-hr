import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Component/Sidebar/Sidebar';
import EmployeeSidebar from './Component/Sidebar/EmployeeSidebar';
import EmployeeProfile from './Component/Profile/EmployeeProfile';
import Header from './Component/Header/Header';
import EmployeeHeader from './Component/Header/EmployeeHeader';
import Home from './Component/Home/Home';
import EmployeeHome from './Component/Home/EmployeeHome';
import Employee from './Component/Employee/Employee';
import Login from './pages/Login';
import AddEmployee from './Component/Employee/AddEmployee';
import EditEmployee from './Component/Employee/EditEmployee';
import Department from './Component/Department/Department';
import Attendance from './Component/Attendance/Attendance';
import EmployeeAttendance from './Component/Attendance/EmployeeAttendance';
import EmployeeInfo from './Component/Employee/EmployeeInfo';
import Payroll from './Component/Payroll/Payroll';
import EmployeePayroll from './Component/Payroll/EmployeePayroll';
import Training from './Component/Training/Training';
import ManagerTraining from './Component/Training/ManagerTraining';
import Performance from './Component/Performance/Performance';
import Leave from './Component/Leave/Leave';
import Setting from './Component/Setting/Setting';
import AddProgram from './Component/Training/Addprogram';
import Profile from './Component/Profile/Profile';
import DirectorDepartment from './Component/Department/DirectorDepartment';
import DirectorLeave from './Component/Leave/DirectorLeave';
import '@fontsource/lexend';
import './App.css';
import './All.css';
import { LanguageProvider } from './LanguageContext';
import AddDepartment from './Component/Department/AddDepartment';
import Notification , {notify} from './Component/Notification/Notification';
import Report from './Component/Report/Report';
import DirectorPerformance from './Component/Performance/DirectorPerformance';
import EmpHome from './EmployeeComponent/EmpHome/EmpHome';
import EmpAttendance from './EmployeeComponent/Attendance/EmpAttendance';
import EmpHeader from './EmployeeComponent/EmpHeader/EmpHeader';
import EmpProfile from './EmployeeComponent/EmployeProfile/EmpProfile';
import EditEmployeeSelf from './EmployeeComponent/EmployeProfile/EditEmployeSelf';
import EmpSidebar from './EmployeeComponent/EmpSidebar/EmpSidebar';
import Feedback from './EmployeeComponent/Feedback/Feedback';
import EMProfile from './Component/Profile/EMProfile';
import EmpLeave from './EmployeeComponent/Leave/EmpLeave';
import EmpPayroll from './EmployeeComponent/Payroll/EmpPayroll';
import EmpTraining from './EmployeeComponent/Training/EmpTraining';
import EMovertime from './Component/Overtime/EMovertime';
import Overtime from './Component/Overtime/Overtime';
import EditEM from './Component/Profile/EditEM';
import EMMovertime from './Component/Overtime/EMMovertime';
import EMPerformance from './Component/Performance/EMPerformance';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [email, setEmail] = useState(null);
  const [notificationCount, setNotificationCount] = useState(notify.length);

  console.log('setNotificationCount in App:', typeof setNotificationCount);

  const handleLogin = (role,email) => {
    setIsAuthenticated(true);
    setUserRole(role); // role can be 'manager' or 'employee'
    setEmail(email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null); 
    setEmail(null);
  };

  return (
    <LanguageProvider>
      
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={!isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to={userRole === 'manager' ? '/dashboard' : '/Dashboard'} />
              )}
            />
            {isAuthenticated && (
              
              <Route
                path="*"
                element={
                 
                  <div className="authenticated-layout">
                    {userRole === 'manager' ? <Sidebar /> : userRole === 'employee' ?<EmpSidebar/>: <EmployeeSidebar />}
                    <div className="main-content">
                      {userRole === 'manager' ? <Header notificationCount={notificationCount} /> : (userRole === 'employee' ? <EmpHeader email={email}/>:  <EmployeeHeader email={email}/>)}
                      <Routes>
                          {/* Manager Routes */}
                          {userRole === 'manager' && (
                          <>
                        <Route path="/dashboard" element={<Home />} />
                        <Route path="/employees" element={<Employee />} />
                        <Route path="/employees/AddEmployee" element={<AddEmployee />} />
                        <Route path="/attendance" element={<Attendance />} />
                        <Route path="/department" element={<Department />} />
                        <Route path="/employees/:id" element={<EmployeeInfo />} />
                        <Route path="/payroll" element={<Payroll />} />
                        <Route path="/Training" element={<ManagerTraining />} />
                        <Route path="/performance" element={<Performance />} />
                        <Route path="/leaves" element={<Leave />} />
                        <Route path="/setting" element={<Setting/>}/>
                        <Route path="/Overtime" element={<Overtime/>} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/department/AddDepartment" element={<AddDepartment/>} />
                        <Route path="/employees/:id/edit" element={<EditEmployee/>}/>
                        <Route path="/notification" element={ <Notification
                         notifications={notify}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                notificationCount={notificationCount}
                setNotificationCount={setNotificationCount}
            />}></Route>
                        <Route path="/report" element={<Report/>}></Route>
        
                        </>
                        )}
                        {/* Employee Routes */}
                        {userRole === 'director' && (
                          <>
                            <Route path="/Dashboard" element={<EmployeeHome  email={email} />} />
                            <Route path="/profile" element={<EmployeeProfile email={email}/>}/>
                            <Route path="/yourattendance" element={<EmployeeAttendance email={email}/>}/>
                            <Route path="/Edit" element={<EditEM email={email}/>} />
                            <Route path="/training" element={<Training />} />
                            <Route path="/training/AddTraining" element={<AddProgram/>}/>
                            <Route path="/Department" element={<DirectorDepartment  directorEmail={email} />} />
                            <Route path="/Leaves" element={<DirectorLeave email={email}/>} />
                            <Route path="/EMprofile" element={<EMProfile email={email}/>} />
                            <Route path="/Performance" element={<DirectorPerformance  directorEmail={email} />} />
                            <Route path="/Payroll" element={<EmployeePayroll email={email} />} />
                            <Route path="/Overtime" element={<EMovertime />} />
                            <Route path='/EMFeedback' element={<Feedback email={email}/>}/>
                            <Route path="/setting" element={<Setting/>}/>
                            {/* Add more employee-specific routes here */}
                          </>
                        )}
                         {userRole === 'employee' && (
                          <>
                            <Route path="/Dashboard" element={<EmployeeHome email={email} />} />
                            <Route path="/profile" element={<EmployeeProfile email={email}/>}/>
                            <Route path="/yourattendance" element={<EmployeeAttendance email={email}/>}/>
                            <Route path="/employees/:id/edit" element={<EditEmployeeSelf/>}/>
                            <Route path="/EMtraining" element={<EmpTraining />} />
                            <Route path="/Edit" element={<EditEM email={email}/>} />
                            <Route path="/EMprofile" element={<EMProfile email={email}/>} />
                            <Route path="/EMOvertime" element={<EMMovertime />} />
                            <Route path="/EMLeaves" element={<EmpLeave email={email}/>} />
                            <Route path="/EMPerformance" element={<EMPerformance  email={email}/>} />
                            <Route path="/EMPayroll" element={<EmployeePayroll email={email} />} />
                            <Route path='/EMFeedback' element={<Feedback email={email}/>}/>
                            <Route path="/setting" element={<Setting/>}/>
                            {/* Add more employee-specific routes here */}
                          </>
                        )}
                      </Routes>
                    </div>
                  </div>
                }
              />
            )}
            <Route
              path="/logout"
              element={<Logout onLogout={handleLogout} />}
            />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

const Logout = ({ onLogout }) => {
  onLogout();
  return <Navigate to="/" />;
};

export default App;
