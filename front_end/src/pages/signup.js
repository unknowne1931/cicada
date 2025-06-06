import React, { useState } from 'react'
import { faBars, faEye, faEyeSlash, faHome, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios"
import Popup from './popup'

const Signup = () => {

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [pass, setPass] = useState([]);
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [user_name, setUser_name] = useState([]);

  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false);
  const [OTP, setOTP] = useState([]);

  const Post = (e) =>{
    e.preventDefault();
    try{
      setLoad(true);
      setAlert(false);
      axios.post(`${"https://stawro.xyz"}/post/new/user/data`,{pass, email, name, username : user_name})
      .then(res=>{
        if(res.data.Status === "OK"){
          setLoad(false)
          setData("Account Created, Verify Email");
          setAlert(true);
          setShow1(true);
        }else if(res.data.Status === "IN"){
          setLoad(false)
          setData("This Email Existed");
          setAlert(true);
        }else if(res.data.Status === "UIN"){
          setLoad(false)
          setData("This username already exists.");
          setAlert(true);
        }else if(res.data.Status === "BAD_EML"){
          setLoad(false)
          setData("These types of emails are not valid.");
          setAlert(true);
        }
        else if(res.data.Status === "OK-EML-VERI"){
          setLoad(false)
          setData("Account Created, Verify Email");
          setAlert(true);
          setShow1(true);
        }
        else{
          console.log(res.data)
          setLoad(false)
          setData("Something went wrong");
          setAlert(true);
        }
      }).catch(error=>{
        setAlert(false)
        if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response from server. Please check your connection.");
        } else {
            console.error("Error occurred:", error.message);
        }
    })
    }catch(error){
      setAlert(false)
      console.log(error)
    }
    
  }

  const OTP_Veri = (e) =>{
    e.preventDefault();
    try{
      setAlert(false)
      axios.post("https://stawro.xyz/get/all/users/data/otp/to/verify", {OTP, username : user_name})
      .then(res=>{
        if(res.data.Status === "OK"){
          window.location.href='/login'
        }else{
          setAlert(true)
          setData("OTP wrong");
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
      {load ?
      <div>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        <center className='sign-up-load-cnt-01'>
          
          <div>
            <h1>Loading...</h1>
          </div>
        </center> 
      </div>

      :
      
      <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        <div className='signup-form-cnt-01'>
          <div className='signup-h2-main-cnt-01'>
            <h2><span>Sign</span>-Up</h2>
          </div>

            {show1 ? 
            
            <div>
              <form onSubmit={OTP_Veri}>
                <input type='text' className='signup-input-01' placeholder='OTP' onChange={e=>{setOTP(e.target.value)}} autoComplete='off' required /><br/>
                <button type='submit' className='signup-submit-btn-01'>Verify</button>
              </form>
            </div> :

            <form onSubmit={Post}>
                <input className='signup-input-01' onChange={e=>{setUser_name(e.target.value)}} type='text' placeholder='Username' required /><br/>
                <input className='signup-input-01' onChange={e=>{setName(e.target.value)}} type='text' placeholder='Name' required /><br/>
                {/* {alert && <span className='signup-input-01-span-01'>This Email Existed</span>} */}
                <input className='signup-input-01' onChange={e=>{setEmail(e.target.value)}} type='email' placeholder='E-Mail' required /><br/>
                <div className='signup-form-cnt-01-sub-cnt-01'>
                  <input className='signup-input-02' onChange={e=>{setPass(e.target.value)}} type={show ? "text" : "password"} placeholder='Password' required /> {pass.length >= 1 && <div>{show ?  <FontAwesomeIcon icon={faEyeSlash} onClick={()=>{setShow(false)}} style={{cursor : "pointer", fontSize : "20px"}} /> : <FontAwesomeIcon icon={faEye} onClick={()=>{setShow(true)}} style={{cursor : "pointer", fontSize : "20px"}} /> }</div>} <br/>
                </div>
                <button type='submit' className='signup-submit-btn-01'>create</button>
            </form>}

            <div className='signup-h2-main-cnt-02'>
              <span className='signup-login-text-01' onClick={()=>{window.location.href = "/login"}} >Login</span>
            </div>

        </div>
      </center>}

      {/* Popup */}
      {alert &&
        <Popup data={data} val={alert}/>
      }

    </div>
  )
}

export default Signup
