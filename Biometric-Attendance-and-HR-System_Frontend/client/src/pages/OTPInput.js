import {React , useContext , useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./OTPInput.css"
import { RecoveryContext } from "../App";

export default function () {
  useEffect(()=>{
    document.title = "OTPInput"
  }, []);
  const { email, otp } = useContext(RecoveryContext);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const navigate = useNavigate();
  
  function verfiyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      navigate("/recovered");
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }
  return (
    <div className="OTPInput Continer">
      <div className="OTP2 Container">
      <div className="back-link">
         <Link to="/pass" > 
          <IoIosArrowBack /> Back
        </Link>
      </div>
        <div className="OTP3 Container">
          <div className="OTP4 Container">
            <div className="OTP5 Container">
              <p>Enter OTP</p>
            </div>
            <div className="OTPInner Container">
              <p>We have sent a code to your email {email} </p>
            </div>
          </div>
          <div>
            <form>
              <div className="OTPInner2 Container">
                <div className="OTPInner3 Container">
                  <div className="OTPInner4 Container">
                    <input
                      maxLength="1"
                      className="OTPInput Containner"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          e.target.value,
                          OTPinput[1],
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="OTPInput2 Containner ">
                    <input
                      maxLength="1"
                      className="OTPInput3 Containner"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          e.target.value,
                          OTPinput[2],
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="OTPInput Containner2 ">
                    <input
                      maxLength="1"
                      className="OTPInput4 Containner"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          e.target.value,
                          OTPinput[3],
                        ])
                      }
                    ></input>
                  </div>
                  <div className="OTPInput Containner3 ">
                    <input
                      maxLength="1"
                      className="InputOTP"
                      type="text"
                      name=""
                      id=""
                      onChange={(e) =>
                        setOTPinput([
                          OTPinput[0],
                          OTPinput[1],
                          OTPinput[2],
                          e.target.value,
                        ])
                      }
                    ></input>
                  </div>
                </div>
                <div className="VerfiyOTP">
                  <div>
                    <button
                      onClick={() => verfiyOTP()}
                      className="VerifyOTP-button"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}