import { faArrowAltCircleLeft, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

const Naviba = () => {

    const token = localStorage.getItem('token')

    const [show, setShow] = useState(false)
    
  return (
    <div>
        {!show && <FontAwesomeIcon icon={faArrowRight} className='admin-navi-icon-01' onClick={()=>{setShow(true)}} /> }


        
        {show &&
            <center>
                <div className='admin-navibar-cnt-01'>
                    {token && <span onClick={()=>{window.location.href='/admin/home'}}>Home</span>}{token && <br/>}
                    {token && <span onClick={()=>{window.location.href='/admin/coins'}}>Coin Add</span>}{token && <br/>}
                    {token && <span onClick={()=>{window.location.href='/admin/request'}}>Claim Coin</span>} {token && <br />}
                    {token && <span onClick={()=>{window.location.href='/admin/prize'}}>Prize</span>} {token && <br />}
                    {token && <span onClick={()=>{window.location.href="/admin/addquestion"}} >Qno Add</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/cupon"}} >Cupon</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/chart"}} >Chart</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/questions"}} >Questions V</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/balance"}} >Balance</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/select"}} >Select Questions</span>} {token && <br/>}
                    {token && <span onClick={()=>{window.location.href="/admin/add/users"}} >Add Users</span>} {token && <br/>}



                    {token && <span onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem('username'); window.location.reload()}} >Logout</span>}{token && <br/>}
                    {!token && <span onClick={()=>{window.location.href='/admin/login'}}>Login</span>}{!token && <br/>}
                    {!token && <span onClick={()=>{window.location.href='/admin/signup'}}>Sign-Up</span>}{!token && <br/>}
                    <button className='admin-navi-btn-01' onClick={()=>{setShow(false)}} >Close</button>
                </div>
            </center>
        }
    </div>
  )
}

export default Naviba
