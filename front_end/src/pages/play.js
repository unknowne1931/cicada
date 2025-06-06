import React, { useEffect, useState } from 'react'
import img1 from "../image/img3.jpg"
import api from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee, faIndianRupeeSign, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Popup from './popup';
import Loading from '../loading';
import veri from "../image/verify.gif"

const Play = () => {

  const [balance, setBalance] = useState([]);
  const [verify, setVerify] = useState(false)
  const [start, setStart] = useState(''); // should be "on" or "off"
  const [btn1, setBtn1] = useState([]);
  const [get_rupe, setGet_Rupee] = useState([]);
  const user = localStorage.getItem("user");
  const [alert, setAlert] = useState(false)
  const [data, setData] = useState([]);
  const [selLanguages, setSelLanguages] = useState([]);
  const [getlang, setLang] = useState([]);
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [ALLLData, setALLLDAta] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    GetAllDAta()
  }, [])
  useEffect(() => {
    GetBalance()
    GetRupeeVal()
    GetLanguages()
    start_check()
  }, [])

  const start_check = () => {
    fetch("https://stawro.xyz/start/or/no/check")
      .then(res => res.json())
      .then(data => {
        if (data.status) {
          setStart(data.status);
        } else {
          console.warn("Unexpected data:", data);
        }
      })
      .catch(err => {
        console.error("Check error:", err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (start === "off") {
        start_check();
      } else {
        clearInterval(interval); // Stop when start is "on"
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [start]);






  const GetAllDAta = () => {
    try {
      api.get("https://stawro.xyz/get/all/admin/new/languages/data/user")
        .then(res => {
          if (res.data.Data) {
            setALLLDAta(res.data.Data)
          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("token");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const Delete_Lang = () => {
    try {
      api.delete(`https://stawro.xyz/get/language/datas/all/get/and/delete/${user}`)
        .then(res => {
          if (res.data.Status === "OK") {
            GetLanguages()
          } else if (res.data.Status === "BAD") {

          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("ssid");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const GetRupeeVal = () => {
    try {
      fetch(`${"https://stawro.xyz"}/get/rupee/data/play`)
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            setGet_Rupee(data.data)
          } else {
            console.warn("Unexpected response structure:", data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  const PostLang = () => {
    try {
      setAlert(false)
      api.post(`${"https://stawro.xyz"}/get/language/datas/all`, { lang: selLanguages, user })
        .then(res => {
          if (res.data.Status === "OK") {
            GetLanguages()
          } else {
            setData("Amoun not Credited")
            setAlert(true)
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const GetBalance = () => {
    try {
      api.get(`${"https://stawro.xyz"}/get/acount/balence/${user}`)
        .then(res => {
          if (res.data.data) {
            setBtn1(true)
            setBalance(res.data.data);
          } else if (res.data.Status === "NO") {
            setBtn1(false);
          } else if (res.data.Logout === "OUT") {
            localStorage.removeItem("ssid");
            window.location.reload()
          } else {
            console.warn("Unexpected response structure:", res.data);
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }

  const New = () => {
    try {
      setAlert(false)
      api.post(`${"https://stawro.xyz"}/get/balance/new/data`, { user })
        .then(res => {
          if (res.data.Status === "OK") {
            GetBalance();
          } else {
            setData("Amoun not Credited")
            setAlert(true)
          }
        }).catch(error => {
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      console.log(error)
    }

  }


  const StartGame = (e) => {
    setVerify(true)
    try {
      setAlert(false)
      e.preventDefault()
      axios.post(`${"https://stawro.xyz"}/start/playing/by/debit/amount`, { user })
        .then(res => {
          if (res.data.Status === "OK") {
            localStorage.setItem("valid", "yes")
            GetBalance()
            setVerify(false)
            window.location.href = '/start'
          } else if (res.data.Status === "Low-Bal") {
            setVerify(false)
            setData("You not Have Enough Balance")
            setAlert(true)

          } else if (res.data.Status === "BAD") {
            setVerify(false)
            setData("Your turn has ended.")
            setAlert(true)
          }
          else if (res.data.Status === "Time") {
            setVerify(false)
            setData(res.data.message)
            setAlert(true)
          }

          else {
            setVerify(false)
            setData("Something Went Wrong Try Again")
            setAlert(true)
          }
        }).catch(error => {
          setVerify(false)
          if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
          } else if (error.request) {
            console.error("No response from server. Please check your connection.");
          } else {
            console.error("Error occurred:", error.message);
          }
        })
    } catch (error) {
      setVerify(false)
      console.log(error)
    }


  }



  const SelHandel = (data) => {
    setSelLanguages(data);
  }

  const GetLanguages = () => {
    try {
      setTimeout(() => {
        api.get(`${"https://stawro.xyz"}/get/language/datas/all/get/${user}`)
          .then(res => {
            if (res.data.Users) {
              setShow1(false);
              setShow2(true);
              setLang(res.data.Users.lang)
              setLoad(false)
            } else if (res.data.Status === "IN") {
              setShow1(true);
              setShow2(false);
              setLoad(false)
            } else if (res.data.Logout === "OUT") {
              setLoad(false)
              localStorage.removeItem("ssid");
              window.location.reload()
            } else {
              setLoad(false)
              console.warn("Unexpected response structure:", res.data);
            }
          }).catch(error => {
            setLoad(false)
            if (error.response) {
              console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
              console.error("No response from server. Please check your connection.");
            } else {
              console.error("Error occurred:", error.message);
            }
          })
      }, 1000)

    } catch (error) {
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
            <hr />
          </div>
          <h1 className='play-h1-01'>Start <span>Game</span></h1>
          <div className='play-main-cnt-02'>
            {btn1 &&
              <div>
                <h3>Account Balance</h3>
                <FontAwesomeIcon icon={faIndianRupeeSign} className='play-main-cnt-02-icon-01' />
                <span>{balance.balance}.00</span>
              </div>
            }
            {!btn1 &&
              <button onClick={New} className='btnoon-01'>Get ₹15 Free</button>
            }

          </div>
          <br />


          {show1 &&

            <div>
              <h1 className='play-h1-may-be-01'>Select any 01</h1>
              <div className='play-main-cnt-03'>

                {ALLLData.map((data, i) => {
                  return (
                    <div key={i} onClick={() => { SelHandel(data) }}
                      className={selLanguages.includes(data) ? "play-main-cnt-03-sub-div-02" : "play-main-cnt-03-sub-div-01"}>
                      <h1>{data}</h1>
                    </div>
                  )
                })}
              </div>

              <br />

              {selLanguages.length > 0 &&
                <div className='play-main-btn-01'>
                  <button onClick={PostLang} >Submit</button>
                </div>
              }
            </div>
          }

          {show2 &&
            <div className='play-main-slected-topics-sho-01'>
              <h2>Selected Topics</h2>

              <div className='play-main-slected-topics-sho-01-sub-01'>
                {getlang.map((data, i) => {
                  return (
                    <div key={i} className='play-main-slected-topics-sho-01-sub-cnt-01'>
                      <span>{data}</span>
                    </div>
                  )
                })}

                <div onClick={Delete_Lang} className='play-main-slected-topics-sho-01-sub-cnt-02'>
                  <span><FontAwesomeIcon icon={faPencil} /></span>
                </div>

              </div>

            </div>
          }
          <br />


          {start.Status === "on" &&

            <div>
              {show1 || show2 &&

                <div className='play-main-cnt-01' onClick={StartGame}>
                  <img src={img1} alt='image' />
                  <span>₹ {get_rupe.rupee}.00</span>
                </div>}
            </div>

          }

          {start.Status !== "on" &&
            <div className='stop_play_cnt-01'>

              <strong>
                {start.text}
              </strong>
              <p>to Start the Game</p>
            </div>

          }





        </center>}
      {alert &&
        <Popup data={data} val={alert} />
      }


      {verify &&

        <div className='start_play_main_load-cnt-01'>

          <div className="verify_pop_up-cnt-01">
            <img src={veri} />
          </div>

        </div>

      }

      <div style={{ height: "50px" }}></div>
    </div>
  )
}

export default Play
