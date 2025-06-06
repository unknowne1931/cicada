import React,{useState, useEffect} from 'react'
import api from './api'
import Loading from '../loading';

const Carthist = () => {

    const [pending_data, setPending_data] = useState([]);
    const [claimed_data, setClaimed_data] = useState([]);
    const [load, setLoad] = useState(true);

  const user = localStorage.getItem("user")

  useEffect(()=>{
    GetPending()
    GetClaimed()
  },[])

  const GetClaimed = () =>{
    try{
      setTimeout(()=>{
        api.get(`${"https://stawro.xyz"}/get/claimed/from/pending/coins/${user}`)
        .then(res =>{
          if(res.data.data){
            setClaimed_data(res.data.data);
            setLoad(false);
          }else if(res.data.Logout === "OUT"){
            setLoad(false);
            localStorage.removeItem("ssid");
            window.location.reload()
          }else{
            setLoad(false);
            console.warn("Unexpected response structure:", res.data);
          }
        })
        .catch(error=>{
          setLoad(false);
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
      console.log(error)
    }
    
  }

  const GetPending = () =>{
    try{
      api.get(`${"https://stawro.xyz"}/get/requested/coins/by/${user}`)
      .then(res =>{
        if(res.data.data){
          setPending_data(res.data.data);
        }else if(res.data.Logout === "OUT"){
          localStorage.removeItem("ssid");
          window.location.reload()
        }else{
          console.warn("Unexpected response structure:", res.data);
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
      {load ? <Loading /> : 
      <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        <h1 className='cart-page-main-h1-01'>Cart History</h1>

        <div className='carthist-cnt-01'>
            <h2>Pending</h2>
                {pending_data.length < 1 && 
                  <h2 className='cart-page-main-cnt-01-sub-cnt-01-h2-01' style={{color : "black", fontSize : "15px"}}>Coins Claimed.</h2>
                }
            <div className='carthist-cnt-01-sub-cnt-01'>
                

                {pending_data.map((user, i)=>{
                    return(
                        <div key={i} className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{user.title}</strong>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                <img src={user.img} alt='img' />
                            </div><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{user.valid}</strong></span><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02'>Stars : <strong>{user.stars}</strong></span><br/>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                                <strong style={{color : "white"}}>Pending.!</strong>
                            </div>
                        </div>
                    )
                })}
                
                

            </div>

        </div>
        <br/>
        <hr style={{width : "70%"}}/>
        <div className='carthist-cnt-01'>
            <h2 style={{color : "green"}}>Claimed</h2>

            {claimed_data.length < 1 && 
              <h2 className='cart-page-main-cnt-01-sub-cnt-01-h2-01' style={{color : "black",fontSize : "15px"}}>Coins Claimed.</h2>
            }

            <div className='carthist-cnt-01-sub-cnt-01'>

                {claimed_data.map((user, i) =>{
                    return(
                        <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01'>
                            <strong className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-strong-01'>{user.title}</strong>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-01'>
                                <img src={user.img} alt='img' />
                            </div><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-01'>Valid : <strong>{user.valid}</strong></span><br/>
                            <span className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-span-02'>Stars : <strong>{user.stars}</strong></span><br/>
                            <div className='cart-page-main-cnt-01-sub-cnt-01-sub-cnt-01-sub-02'>
                                <strong style={{color : "white"}}>Claimed</strong>
                            </div>
                        </div>        
                    )
                })}
              

            </div>

        </div>

      </center>}
    </div>
  )
}

export default Carthist
