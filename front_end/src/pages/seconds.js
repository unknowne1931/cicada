import React, { useEffect, useState } from 'react';

const Seconds = ({ secon}) => {
  const [time, setTime] = useState(new Date());
  const [selSecond, setSelSecond] = useState(0);
  const [rlSec, setRlSec] = useState(0);

  // Update the current time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const seconds = time.getSeconds();

  // Initialize countdown and target seconds from localStorage
  useEffect(() => {
    const storedRlSec = parseInt(localStorage.getItem('remainingSeconds'), 10);
    const storedSelSecond = parseInt(localStorage.getItem('targetSecond'), 10);

    if (storedRlSec > 0) {
      // Load stored countdown values if valid
      setRlSec(storedRlSec);
      setSelSecond(storedSelSecond);
    } else {
      // Initialize countdown if no valid stored values
      const targetSeconds = (seconds + secon) % 60;
      setSelSecond(targetSeconds);
      setRlSec(secon);
      localStorage.setItem('targetSecond', targetSeconds);
      localStorage.setItem('remainingSeconds', secon);
    }
  }, [secon, seconds]);

  // Update remaining seconds logic
  useEffect(() => {
    const dt1 = localStorage.getItem('remainingSeconds')
    const dt2 = localStorage.getItem('targetSecond')
    const e_time = selSecond.toString().padStart(2, '0')
    if(dt1 >1){
      if (rlSec > 1) {
        const remaining = selSecond > seconds ? selSecond - seconds : 60 - (seconds - selSecond);
        setRlSec(remaining);
        localStorage.setItem('remainingSeconds', remaining);
      } 
    }else{
      if (dt1 <= 1) {
        
        localStorage.removeItem('remainingSeconds')
        localStorage.removeItem('targetSecond')
        
        //make check this to navigate after seconds to new page
        // window.location.href='/play'

        console.log("Time over")
          window.location.href='/play'

        // if(dt1 <= 0){
        //   console.log("Time over")
        //   window.location.href='/play'
        // }



        // const newTargetSeconds = (seconds + secon) % 60;
        // setSelSecond(newTargetSeconds);
        // setRlSec(secon);
        // localStorage.setItem('targetSecond', newTargetSeconds);
        // localStorage.setItem('remainingSeconds', secon);
      }
    }
      
  }, [rlSec, seconds, selSecond, secon]);

  return (
    <div>
      <h2>Remaining Seconds: {rlSec}</h2>
      {/* <p>
        {time.getHours().toString().padStart(2, '0')}:
        {time.getMinutes().toString().padStart(2, '0')}:
        {time.getSeconds().toString().padStart(2, '0')}
        <br />
        Target Second: {selSecond.toString().padStart(2, '0')}
      </p> */}
    </div>
  );
};

export default Seconds;
