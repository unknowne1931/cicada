import React, { useEffect, useState } from 'react'
import api from '../api'
import Loading from '../../loading';

const History = () => {

  const user = localStorage.getItem("user");

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(()=>{
    Hist()
  },[])

  const Hist = () =>{
    try{
      setTimeout(()=>{
        api.get(`${"https://stawro.xyz"}/update/data/${user}`)
        .then(res =>{
          if(res.data.data){
            setData(res.data.data);
            setLoad(false)
          }else if(res.data.Logout === "OUT"){
            localStorage.removeItem("ssid");
            setLoad(false)
            window.location.reload()
          }else{
            setLoad(false)
            console.warn("Unexpected response structure:", res.data);
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
        <div className='account-subb-part-01'>
          <h1>History</h1>
        </div>
        <div className='account_histor-page-main-cnt-01'>
          {data.map((user, i)=>{
            return(
              <div key={i} className='account_histor-page-main-cnt-01-sub-cnt-01'>
                {user.type === "Credited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01-span-01'>{user.type} "<strong> {user.tp === "Rupee" && <span>₹</span>} {user.rupee} {user.tp === "Stars" && <span>Stars</span>} </strong>" to your Account</span> }
                {user.type === "Debited" && <span className='account_histor-page-main-cnt-01-sub-cnt-01-span-01'>{user.type} "<strong style={{color : "red"}}>{user.tp === "Rupee" && <span>₹</span>} {user.rupee} {user.tp === "Stars" && <span>Stars</span>}</strong>" from your Account</span>}<br/>
                {/* <span className='account_histor-page-main-cnt-01-sub-cnt-01-span-02'>Time : {user.Time}</span> */}
              </div>
            )
          })}
        </div>
        <div style={{height : "50px"}}></div>
      </center>}
    </div>
  )
}

export default History
