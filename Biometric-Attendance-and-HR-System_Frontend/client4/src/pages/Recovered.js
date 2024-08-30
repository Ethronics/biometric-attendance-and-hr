import  {React , useEffect} from 'react';
import './Recovere.css'
import { useNavigate } from 'react-router-dom';
import pic from '../assets/congrats.png';

const Recovered = () => {
  useEffect(()=>{
    document.title = "Recovered"
  }, []);
const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate('/login'); 
  };
  return (
    <div className="card">
      <div className="icon-container">
        <img src={pic} alt="Success Icon" className="icon"/>
      </div>
      <h2>Password Update Successfully</h2>
      <p>Your password has been updated successfully</p>
      <button className="back-to-login-btn" onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};
export default Recovered;
