import React, { useState } from 'react'
import { faBars, faEye, faEyeSlash, faHome, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import Popup from './popup';

const Login = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [pass, setPass] = useState([]);
    const [user_name, setUser_name] = useState([]);
    const [OTP, setOTP] = useState('')

    const [data, setData] = useState([])
    const [alert, setAlert] = useState(false);

    const url = "https://stawro.xyz"


    const OTP_Verify = () =>{
      try{
        axios.post('https://stawro.xyz/get/new/otp/to/verify', {data : user_name})
        .then(res =>{
          if(res.data.Status === "OK"){
             setShow1(true);
          }else{
            console.error("Error occurred:", res.error);
          }
        })
        .catch(error=>{
          if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
              console.error("No response from server. Please check your connection.");
          } else {
              console.error("Error occurred:", error.message);
          }
      })

      }catch(error){
        console.log(error)
      }
    }




    const Verify_OTP = (e) =>{
      e.preventDefault();
      setAlert(false)
      try{
        axios.post('https://stawro.xyz/get/all/users/data/otp/to/verify/02', {OTP, data : user_name})
        .then(res =>{
          if(res.data.Status === "OK"){
            localStorage.setItem("ssid", res.data.token);
            localStorage.setItem("user", res.data.user);
            localStorage.setItem("username", res.data.username);
            window.location.reload();
          }else if(res.data.Status === "BAD"){
            setData('Wrong OTP')
            setAlert(true)
          }
          else{
            console.error("Error occurred:", res.error);
          }
        }).catch(error=>{
          if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
              console.error("No response from server. Please check your connection.");
          } else {
              console.error("Error occurred:", error.message);
          }
      })
      }catch(error){
        console.log(error)
      }
    }

    const Login= (e) =>{
      e.preventDefault();
      try{
        setAlert(false);
        axios.post(`${url}/login/data`, {pass, data : user_name})
        .then(res=>{
          if(res.data.Status === "OK"){
            localStorage.setItem("ssid", res.data.token);
            localStorage.setItem("user", res.data.user);
            localStorage.setItem("username", res.data.username);
            window.location.reload();
          }else if(res.data.Status === "NO-YES"){
            OTP_Verify()
            setData("Email Verification Failed");
            setAlert(true);
          }
          else{
            setData("Password or username is incorrect.");
            setAlert(true);
          }
        })
        .catch(error=>{
          if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
              console.error("No response from server. Please check your connection.");
          } else {
              console.error("Error occurred:", error.message);
          }
      })
      }catch(error){
        console.log(error)
      }
      
    }

  return (
    <div>
      <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        <div>
            <div className='signup-form-cnt-01'>
                <div className='signup-h2-main-cnt-01'>
                    <h2><span>Log</span>-In</h2>
                </div>

                {show1 ? 
                
                <form onSubmit={Verify_OTP}>
                  <input className='signup-input-01' autoComplete='off' onChange={e=>{setOTP(e.target.value)}} type='text' placeholder='OTP' required /><br/>
                  <button type='submit' className='signup-submit-btn-01'>Verify</button>
                </form>

                :

                <form onSubmit={Login}>
                    <input className='signup-input-01' onChange={e=>{setUser_name(e.target.value)}} type='text' placeholder='Username / email' required /><br/>
                    <div className='signup-form-cnt-01-sub-cnt-01'>
                    <input className='signup-input-02' onChange={e=>{setPass(e.target.value)}} type={show ? "text" : "password"} placeholder='Password' required /> {pass.length >= 1 && <div>{show ?  <FontAwesomeIcon icon={faEyeSlash} onClick={()=>{setShow(false)}} style={{cursor : "pointer", fontSize : "20px"}} /> : <FontAwesomeIcon icon={faEye} onClick={()=>{setShow(true)}} style={{cursor : "pointer", fontSize : "20px"}} /> }</div>} <br/>
                    </div>
                    <button type='submit' className='signup-submit-btn-01'>Login</button>
                </form>
                }

                <div className='signup-h2-main-cnt-02'>
                    <span className='signup-login-text-01' onClick={()=>{window.location.href = "/signup"}} >Sign-Up</span>
                </div>
                <div className='signup-h2-main-cnt-02'>
                    <span className='signup-login-text-01' onClick={()=>{window.location.href = '/forgotpass'}} >Forgot-Password?</span>
                </div>
                
            </div>
        </div>
      </center>
      {alert &&
        <Popup data={data} val={alert} />
      }
    </div>
  )
}

export default Login
