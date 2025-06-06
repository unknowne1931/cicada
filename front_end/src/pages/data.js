import React, { useEffect, useState } from 'react'
import Ac_upi from './Account/ac_upi'
import api from './api';
import Loading from '../loading';


const Data = () => {

    const user = localStorage.getItem("user")
    const [info, setInfo] = useState([]);
    const [isdata, setIsData] = useState([]);
    const [data, setData] = useState([]);
    const [isBank, setIsBank] = useState(false);
    const [load, setLoad] = useState(true);


    useEffect(()=>{
        GetData()
        Data()  
    },[])



    

    const Data = () =>{
        try{
            api.get(`https://stawro.xyz/users/name/and/more/get/${user}`)
            .then(res=>{
                if(res.data){
                    setData(res.data.data)
                }else{
                    setLoad(false)
                    console.warn("Unexpected response structure:", res.data);
                }
            }).catch(error =>{
                console.log(error)
            })
        }catch(error){
            console.log(error)
        }
    }

    const GetData = () =>{
        try{
            setTimeout(()=>{
                api.get(`${"https://stawro.xyz"}/get/bank/account/data/${user}`)
                .then(res =>{
                    if(res.data.data){
                        setIsData(true)
                        setInfo(res.data.data)
                        const dat = res.data.data
                        if(dat.type === "UPI"){
                            setIsBank(false)
                            setLoad(false)
                        }else{
                            setIsBank(true)
                            setLoad(false)
                        }
                    }else if(res.data.Status === "No"){
                        setIsData(false);
                        setLoad(false)
                    }else if(res.data.Logout === "OUT"){
                        setLoad(false)
                        localStorage.removeItem("ssid");
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

        <h2 className='data_page-h2-01'><span>User</span> Data</h2>
        <br/>

        <div className='data_page-profile-cnt-01'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJa_CcFSwA2X0Y-kYFsSxHaiPE5Z2EOd50FA&s' alt='image' />
        </div>
        

        

        <h2 className='data_page-h2-02'>Hello <span>{data.name}</span>.</h2>

        <div style={{height : "20px"}}></div>

        <div className='data-page-main-cnt-01'>
            <span>Username : <strong>{data.username}</strong></span>.<br/><br/>
            <span>Name : <strong>{data.name}</strong></span><br/><br/>
            <span>Email : <strong>{data.email}</strong></span><br/>
        </div>
        <br/>
        {/* <hr style={{width : "80%"}}/> */}
        <div className='data-page-main-cnt-02'>
            {isdata ? 
            <div>
                {isBank ?
                    <div className='data-apge-main-cnt-02-sub-01'>
                        <h3>Bank</h3>
                        {info.type === "BANK" &&
                            <div>
                                <span>Account Holder Name : <strong>{info.ac_h_nme}</strong>.</span><br/>
                                <span>Account Number : <strong>{info.Acc_no}</strong>.</span><br/>
                                <span>Bank Name : <strong>{info.bank_nme}</strong>.</span><br/>
                                <span>IFSC : <strong>{info.ifsc}</strong>.</span><br/>
                            </div>
                        }
                    </div>
                    :
                    <div className='data-apge-main-cnt-02-sub-01'>
                        <h3>UPI</h3>
                        {info.type === "UPI" && 
                        <div>
                            <span>Account Holder Name : <strong>{info.ac_h_nme}</strong></span><br/>
                            <span>UPI ID : <strong>{info.Acc_no}</strong></span><br/>
                            <span>App : <strong>{info.app}</strong></span><br/>
                        </div>}
                    </div>
                }
            </div>
            :
            <div>
                <h2>No Bank / UPI Account Linked</h2>
            </div>
            }
        </div>
        <div style={{height : "50px"}}>

        </div>
        </center> }  
    </div>
  )
}

export default Data
