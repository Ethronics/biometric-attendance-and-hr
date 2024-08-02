import React, {useState , useEffect} from "react";
import { FaLock  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import pic from '../assets/ethronicss.png';
import "./Logincss.css"

const Login = () => {

  useEffect(()=>{
    document.title = "Login"
  }, []);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  }
  return(
    <div className="wrapper">
      <form  onSubmit={handleSubmit} >
        <img src={pic} alt="Ethronicss" className="login-image" />
        <h1>Welcome 👋</h1> <br />
        <p>Please Login here</p>
        <div className="input-box">
          <input value = {email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" required />
          <MdEmail  className="icon" />
        </div>
        <div className="input-box">
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" required />
          <FaLock  className="icon" />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Remember me</label>
          <Link to="/pass">Forgot password? </Link>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login