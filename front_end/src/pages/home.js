import React, { useEffect } from 'react';
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img1.jpg";
import img4 from "../image/img2.jpg";
import img5 from "../image/img3.png";
import Navi from '../navi';
import founder from "../image/founder.png"
import insta from "../image/insta.png"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';
import Bottom from './bottom';
import Contact_bar from '../contact_bar';

const Home = () => {
  
  useEffect(() => {
    const blocks = document.querySelectorAll('.Home-cnt-02-sub-01');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          entry.target.classList.remove('hide');
        } else {
          entry.target.classList.remove('show');
          entry.target.classList.add('hide');
        }
      });
    }, { threshold: 0.5 });

    blocks.forEach((block) => {
      observer.observe(block);
    });

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <center>                
        <div className='Home-cnt-01'>
          <div className='Home-cnt-01-sub-01'>
            <strong>sta<span>W</span>ro</strong>
            <hr/>
          </div>
          <div className='Home-cnt-01-sub-02'>
            <div className='Home-cnt-01-sub-02-sub-01'>                    
              <h2 className='Home-cnt-01-sub-02-sub-01-h2-01'>
                The <span className='Home-cnt-01-sub-02-sub-01-h2-01-span-01'>knowledge</span> Competition. 
              </h2>
              <div className='Home-cnt-01-sub-02-sub-01-sub-cnt-01'>
                <button onClick={() => { window.location.href = "/play"; }}>
                  Play for Free
                </button>
              </div>
              {/* <div className='Home-cnt-01-sub-02-sub-01-sub-cnt-02'>
                <strong>Play and Get Reward$</strong>
              </div> */}
            </div>

            <div className='Home-cnt-01-sub-02-sub-02'>
              <img src={img2} alt='img' />
            </div>
          </div>
        </div>

        <div className='Home-cnt-02'>
          {[
            { img: img5, text: 'Think it. Prove it. Win it.' },
            { img: img3, text: 'Knowledge pays off, Literally. win rewards now! ' },
            // { img: img4, text: 'We will credit the amount using UPI payments within 24 hours.' },
            
          ].map((item, index) => (
            <div key={index} className='Home-cnt-02-sub-01'>
              <div className='Home-cnt-02-sub-01-sub-01'>
                <img src={item.img} alt='img' />
              </div>
              <div className='Home-cnt-02-sub-01-sub-02'>
                <strong>{item.text}</strong>
              </div>
            </div>
          ))}

          <div className='Home-cnt-02-sub-01'>
            <h3 className='Home-cnt-02-sub-01-h3-01' >View sample Questions</h3>
            <div className='Home-cnt-02-sub-01-sub-01-01-01-1-00'>
              <FontAwesomeIcon icon={faArrowRight} className='Home-cnt-02-sub-01-sub-01-01-01-1-00-icon' />
            </div><br/>
            <button onClick={()=>{window.location.href='/sample'}} className='Home-cnt-02-sub-01-sub-btn-01' >
              View
            </button>
          </div>


        </div>

        <div className='Home_page_about-cnt-01'>
          <h1 className='Home_page_about-cnt-01-h1-01'><span>About</span> Founder</h1><br/>

          <div className='Home_page_about-cnt-01-sub-cnt-01'>
            <div className='Home_page_about-cnt-01-sub-cnt-01-sub-01'>
              <img src={founder} alt='founder' />
            </div>
            <br/>
            <div className='home_page_hide-01'>

            </div>
            <div className='Home_page_about-cnt-01-sub-cnt-01-sub-02'>

              <h1>Founder of stawro <strong>Krishnaki<span>1931</span>ck</strong> </h1><br/>

              <div>
              <p className='Abou-page-main-cnt-01-paragraph-cnt-01'>
                    "I'm <strong>Krishnaki1931ck</strong>, the founder and developer of sta<span>W</span>ro.
                     Building this venture has been a fulfilling journey, blending my 
                     passion for innovation with hands-on development. I take pride in 
                     creating solutions that drive progress and bring ideas to life. My 
                     role allows me to explore new possibilities every day, and I'm excited 
                     about the impact we're making"
                    </p>
                    <br/>
                    
                    <div className='Abou-page-main-cnt-01-text-cnt-01-sub-div-insta-01' onClick={()=>{window.location.href='https://www.instagram.com/kick_1931'}} >
                        <img src={insta} alt='instagram' />
                    </div>
              </div>
            </div>

            <div style={{height : "10px"}}>

            </div>
            
          </div>

          
        </div>

        <div style={{height: "150px"}}>
        </div>

        <Contact_bar />

      <Bottom />
      </center>
      
    </div>
  );
}

export default Home;
