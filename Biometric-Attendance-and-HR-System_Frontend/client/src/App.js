import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Password from './pages/Password';
import OTPInput from './pages/OTPInput';
import Recovered from './pages/Recovered';

export const RecoveryContext = createContext();

function App() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  return (
    <Router>
      <div className="App">
        <RecoveryContext.Provider value={{ email, setEmail, otp, setOTP }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pass" element={<Password />} />
            <Route path="/otp" element={<OTPInput />} />
            <Route path="/recovered" element={<Recovered />} />
          </Routes>
        </RecoveryContext.Provider>
      </div>
    </Router>
  );
}

export default App;