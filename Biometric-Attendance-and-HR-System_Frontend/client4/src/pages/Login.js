import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import pic from '../assets/ethronicss.png';
import "./Logincss.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/employee/login/', {  // Adjust the URL based on your Django setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Invalid email or password.');
        return;
      }

      const { role } = await response.json();
      console.log('your role is',role)
      onLogin(role, email);
      

      if (role === 'manager') {
        navigate('/dashboard');
      } else if (role === 'director') {
        navigate('/Dashboard');
      } else if (role === 'Employee') {
        navigate('/Dashboard');
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="Login-container">
      <form onSubmit={handleSubmit}>
        <img src={pic} alt="Ethronicss" className="login-image" />
        <h1>Welcome 👋</h1> <br />
        <p>Please login here</p>
        <div className="input-box">
          <MdEmail className="icon" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className="input-box">
          <FaLock className="icon" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <Link to="/pass">Forgot password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
