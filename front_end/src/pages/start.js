import React, { useEffect, useState } from 'react';
import Popup from './popup';
import axios from 'axios';
import api from './api';
import Seconds from './seconds';
import veri from "../image/verify.gif"

const Start = () => {
  const [data, setData] = useState("");
  const [verify, setVerify] = useState(false)
  const [alert, setAlert] = useState(false);
  const [QData, setQData] = useState([]);
  const user = localStorage.getItem("user");
  const [secstop, setSecstop] = useState(false);


  //seconds


  // const [time, setTime] = useState(new Date());
  // const [selSecond, setSelSecond] = useState(0);
  // const [rlSec, setRlSec] = useState(0);


  // const secon = parseInt(QData.seconds)


  // // Update the current time every second
  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setTime(new Date());
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }, []);

  //   const seconds = time.getSeconds();

  //   // Initialize countdown and target seconds from localStorage
  //   useEffect(() => {
  //     const storedRlSec = parseInt(localStorage.getItem('remainingSeconds'), 10);
  //     const storedSelSecond = parseInt(localStorage.getItem('targetSecond'), 10);

  //     if (storedRlSec > 0) {
  //       // Load stored countdown values if valid
  //       setRlSec(storedRlSec);
  //       setSelSecond(storedSelSecond);
  //     } else {
  //       // Initialize countdown if no valid stored values
  //       const targetSeconds = (seconds + secon) % 60;
  //       setSelSecond(targetSeconds);
  //       setRlSec(secon);
  //       localStorage.setItem('targetSecond', targetSeconds);
  //       localStorage.setItem('remainingSeconds', secon);
  //     }
  //   }, [secon, seconds]);

  //   // Update remaining seconds logic
  //   useEffect(() => {
  //     const dt1 = localStorage.getItem('remainingSeconds')
  //     const dt2 = localStorage.getItem('targetSecond')
  //     const e_time = selSecond.toString().padStart(2, '0')
  //     if(dt1 >1){
  //       if (rlSec > 1) {
  //         const remaining = selSecond > seconds ? selSecond - seconds : 60 - (seconds - selSecond);
  //         setRlSec(remaining);
  //         localStorage.setItem('remainingSeconds', remaining);
  //       } 
  //     }else{
  //       if (rlSec <= 1){
  //         localStorage.removeItem('remainingSeconds')
  //         localStorage.removeItem('targetSecond')
  //         // window.location.href='/play'
  //         // window.location.reload()
  //         // const newTargetSeconds = (seconds + secon) % 60;
  //         // setSelSecond(newTargetSeconds);
  //         // setRlSec(secon);
  //         // localStorage.setItem('targetSecond', newTargetSeconds);
  //         // localStorage.setItem('remainingSeconds', secon);
  //       }
  //     }

  //   }, [rlSec, seconds, selSecond, secon]);



  //seconds end






  useEffect(() => {
    GetQuestion();
  }, []);

  const GetQuestion = async () => {
    try {
      const response = await api.get(`https://stawro.xyz/get/question/no/by/user/name/${user}`);
      const resData = response.data;
      if (resData.data) {
        setSecstop(true)
        setVerify(false)
        setQData(resData.data);
      } else if (resData.Status === "BAD") {
        setVerify(false)
        console.error("Bad status from server.");
      } else if (resData.Logout === "OUT") {
        setVerify(false)
        localStorage.removeItem("ssid");
        window.location.reload();
      }
    } catch (error) {
      setVerify(false)
      console.error("Error fetching question:", error.message);
    }
  };






  const QuitGame = async (e) => {
    e.preventDefault();
    setAlert(false);
    try {
      const response = await axios.delete(`https://stawro.xyz/delete/by/user/id/for/valid/data/${user}`);
      const resData = response.data;
      if (resData.Status === "OK") {
        localStorage.removeItem('remainingSeconds');
        localStorage.removeItem('targetSecond');
        setData("You are quitting the game.");
        setAlert(true);
        window.location.href = '/';
      } else {
        setData("Something went wrong.");
        setAlert(true);
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error quitting game:", error.message);
    }
  };

  const VerifyAnswer = async (answer) => {
    setSecstop(false)
    setVerify(true)
    setAlert(false);
    try {
      const response = await api.post(`https://stawro.xyz/verify/answer/question/number`, {
        answer,
        user,
        id: QData._id,
      });
      const resData = response.data;

      if (resData.Status === "OK") {
        localStorage.removeItem('remainingSeconds');
        localStorage.removeItem('targetSecond');
        GetQuestion();
      } else if (resData.Status === "OKK") {
        localStorage.removeItem('remainingSeconds');
        localStorage.removeItem('targetSecond');
        const { id, rank } = resData;
        setVerify(false)
        window.location.href = `/claim/cupon?id=${id}`;
      } else if (resData.Status === "STARS") {
        localStorage.removeItem('remainingSeconds');
        localStorage.removeItem('targetSecond');
        setVerify(false)
        setData(`You won the game, and you got ${resData.stars} stars`);
        setAlert(true);
        window.location.href = '/cart';
      } else {
        localStorage.removeItem('remainingSeconds');
        localStorage.removeItem('targetSecond');
        setData("Wrong Answer");
        setAlert(true);
        setVerify(false)
        window.location.href = '/play';
      }
    } catch (error) {
      setVerify(false)
      console.error("Error verifying answer:", error.message);
    }
  };



  return (
    <div>
      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>sta<span>W</span>ro</strong>
          <hr />
        </div>
        
        {secstop &&
          <Seconds secon={parseInt(QData.seconds)} />
        }

        {/* <h1>Remaining Seconds: {rlSec}</h1> */}
        <br />
        {QData.Question && (
          <div className="game_start-main-cnt-01">
            <span className="game_start-main-cnt-01-span-01">
              <span className="game_start-main-cnt-01-span-01-span-01">{QData.Qno}</span>: {QData.Question}.
            </span>
            <br />
            {QData.img && (
              <div className="game_start-main-cnt-01-img-cnt-01">
                <img src={QData.img} alt="Question related" />
              </div>
            )}
            <br />
            <div className="game_start-main-cnt-01-sub-cnt-01">
              <button onClick={() => VerifyAnswer("a")}>{QData.a}</button>
              <button onClick={() => VerifyAnswer("b")}>{QData.b}</button>
            </div>
            <div className="game_start-main-cnt-01-sub-cnt-01">
              <button onClick={() => VerifyAnswer("c")}>{QData.c}</button>
              <button onClick={() => VerifyAnswer("d")}>{QData.d}</button>
            </div>
            <div className="game_start-main-cnt-01-sub-cnt-02">
              <button onClick={QuitGame}>Quit</button>
            </div>
          </div>
        )}
      </center>

      {verify &&

        <div className="verify_pop_up-cnt-01">
          <img src={veri} />
        </div>}


      {alert && <Popup data={data} val={alert} />}
      <div style={{ height: "50px" }}></div>

    </div>
  );
};

export default Start;
