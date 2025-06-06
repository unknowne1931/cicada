import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faArrowDownAZ, faBaby, faBank, faBell, faCartShopping, faCoins, faGear, faHome, faI, faICursor, faIgloo, faImage, faInfo, faLocationArrow, faLocationDot, faPerson, faPersonCirclePlus, faPersonPraying, faPersonRays, faPlay, faPlus, faSchool, faSign, faSignIn, faSignOut, faUserPlus, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import feather from 'feather-icons';
import "./navi.css"
import img1 from "./image/logo.png"
import img2 from "./image/user.png"
import { useNavigate } from 'react-router-dom';

const Navi = ({data}) => {

    useEffect(() => {
        feather.replace();
      }, []);

    const token = localStorage.getItem("ssid")


      

  return (
    <div>
        <center>
        <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
        </div>
        </center>
        <center className='navi-body'>
                <div className="orbital-menu">
                    <ul className="orbital-menu__list">

                        {/* home */}
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/'}} >
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faHome} />
                                </span>
                                <span className="orbital-menu__link-text">Home</span>
                            </div>
                        </div>
                        
                        {token ?
                            
                            // Logout
                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{localStorage.removeItem("ssid");window.location.reload()}} >
                                    <span className="orbital-menu__link-icon">
                                        <FontAwesomeIcon icon={faSignOut} />
                                    </span>
                                    <span className="orbital-menu__link-text">Logout</span>
                                </div>
                            </div>

                            :

                            // Login
                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{window.location.href = '/login'}}>
                                    <span className="orbital-menu__link-icon">
                                        <FontAwesomeIcon icon={faSignIn} />
                                    </span>
                                    <span className="orbital-menu__link-text">Login</span>
                                </div>
                            </div>
                        }

                        {/* Sign-Up */}
                        


                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/cupon'}}>
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faCoins} />
                                </span>
                                <span className="orbital-menu__link-text">Coins</span>
                            </div>
                        </div>


                        {/* Account */}
                        {token ?

                            <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/account'}}>
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faBank} />
                                </span>
                                <span className="orbital-menu__link-text">Account</span>
                            </div>
                            </div>

                            :

                            <div className="orbital-menu__item">
                                <div className="orbital-menu__link" onClick={()=>{window.location.href='/about'}}>
                                    <span className="orbital-menu__link-icon">
                                        <FontAwesomeIcon icon={faInfo} />
                                    </span>
                                    <span className="orbital-menu__link-text">About</span>
                                </div>
                            </div>
                        }
                        
                        
                        {/* Settings */}
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/cart'}}>
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </span>
                                <span className="orbital-menu__link-text">Cart</span>
                            </div>
                        </div>
                        

                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href ="/settings"}}>
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faGear} />
                                </span>
                                <span className="orbital-menu__link-text">Settings</span>
                            </div>
                        </div>


                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href='/play'}} >
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faPlay} />
                                </span>
                                <span className="orbital-menu__link-text">Play</span>
                            </div>
                        </div>
                        
                        <div className="orbital-menu__item">
                            <div className="orbital-menu__link" onClick={()=>{window.location.href="/account/history"}}>
                                <span className="orbital-menu__link-icon">
                                    <FontAwesomeIcon icon={faArrowDownAZ} />
                                </span>
                                <span className="orbital-menu__link-text">History</span>
                            </div>
                        </div>
                    </ul>
            <div className="orbital-menu__center-pic">
                <img src={img2} alt="Center Pic 1" />
                <img src={img1} alt="Center Pic 2" />
            </div>
            </div><br/>
        </center> 
    </div>
  )
}

export default Navi
