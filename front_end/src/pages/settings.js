import { faLock, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Settings = () => {
  return (
    <div>
      <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>

        <h1 className='setting-page-h1-01'>Settings</h1>
        <div className='setting-cnt-01'>
            
            <div className='setting-cnt-01-sub-01' onClick={()=>{window.location.href = "/data"}}>
                <FontAwesomeIcon icon={faUser} className='setting-cnt-01-sub-01-icon-01' /><br/>
                <span className='setting-cnt-01-sub-01-span-01'>My Data</span>
            </div>

            <div className='setting-cnt-01-sub-01' onClick={()=>{window.location.href = "/update/password"}}>
                <FontAwesomeIcon icon={faLock} className='setting-cnt-01-sub-01-icon-01' /><br/>
                <span className='setting-cnt-01-sub-01-span-01'>Change Password</span>
            </div>

            <div className='setting-cnt-01-sub-01' onClick={()=>{localStorage.removeItem("ssid"); window.location.reload()}}>
                <FontAwesomeIcon icon={faSignOut} className='setting-cnt-01-sub-01-icon-01' /><br/>
                <span className='setting-cnt-01-sub-01-span-01'>Logout</span>
            </div>
            
        </div>
      </center>
    </div>
  )
}

export default Settings
