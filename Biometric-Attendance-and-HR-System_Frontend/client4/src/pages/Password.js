import axios from "axios";
import React, { useContext , useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link , useNavigate } from 'react-router-dom';

import "./forgotPassword.css";
const Password = () => {
  useEffect(()=>{
    document.title = "Forgot-Password?"
  }, []);
  const { setEmail, email, setOTP } = useContext();
  const navigate = useNavigate();
  function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);
      axios
        .post("http://localhost:3003/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => {navigate("/otp")})
        .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }
  return (
    <div className="forgot-password-container">
      <div className="back-link">
        <Link to = "/login">
          <IoIosArrowBack /> Back
        </Link>
      </div>
      <h1>Forgot Password</h1>
      <p>Enter your registered email address, we'll send you a code to reset your password.</p>
      <div className="email-input-container">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required />
      </div>
      <button onClick={navigateToOtp} className="send-otp-button">Send OTP</button>
    </div>
  );
};
export default Password;