import React,{useState, useEffect} from 'react'
import api from '../pages/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Popup from '../pages/popup'
import apiAdmin from '../pages/adminapi'
import Naviba from './naviba'
import Loading from '../loading'

const Claimdreques = () => {

    const [pending_data, setPending_data] = useState([])
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);

    const user = localStorage.getItem("user")
  
    useEffect(()=>{
      GetPending()
    },[])
  
    const GetPending = () =>{
      try{
        setTimeout(()=>{
          apiAdmin.get(`${"https://stawro.xyz"}/get/requested/coins/admin`)
          .then(res =>{
            if(res.data.data){
              setPending_data(res.data.data);
              setLoad(false)
            }else if(res.data.Logout === "OUT"){
              localStorage.removeItem("ssid");
              setLoad(false)
              window.location.reload()
            }else{
              setLoad(false)
              console.warn("Unexpected Error", res.data)
            }
          })
          .catch(error=>{
            setLoad(false)
            if (error.response) {
                console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("No response from server. Please check your connection.");
            } else {
                console.error("Error occurred:", error.message);
            }
        })
        },1000)
        
      }catch(error){
        setLoad(false)
        console.log(error)
      }
      
    }

  return (
    <div>
      {load ? <Loading /> :
      <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        <br/>

        <div className='claimdreq-page-h1-01'>
            <h1>Cons Request <FontAwesomeIcon icon={faBell} className='claimdreq-page-h1-01-icon-01' /> <span>{pending_data.length}</span></h1>
        </div>

        <div className='carthist-cnt-01-sub-cnt-01'>
            {pending_data.map((user, i)=>{

                const delT = (e) =>{
                    try{
                      setAlert(false)
                      e.preventDefault();
                      axios.delete(`${"https://stawro.xyz"}/find/by/id/and/delete/req/coins/${user._id}`)
                      .then(res =>{
                          if(res.data.Status === "OK"){
                              GetPending()
                              setData("Paid")
                              setAlert(true)
                          }else{
                              setData("Something went Wrong Try again")
                              setAlert(true)
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

                return(
                    <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                        <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{user.title}</strong>
                        <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                            <img src={user.img} alt='img' />
                        </div><br/>
                        <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{user.valid}</strong></span><br/>
                        <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02'>Stars : <strong>{user.stars}</strong></span><br/>
                        <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                            {/* <strong style={{color : "white"}}>Pending.!</strong> */}
                            <button className='admin-btn-01' onClick={delT} >Paid</button>
                        </div>
                    </div>
                )
            })}
        </div>
        <div style={{height : "50px"}}>

        </div>
        {alert &&
            <Popup data={data} val={alert} />
        }

      </center>}
      <Naviba />
    </div>
  )
}

export default Claimdreques
