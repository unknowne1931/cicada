import React, { useEffect, useState } from 'react'
import Loading from '../loading';

const Cupons = () => {

    const [cupon_data, setCupon_Data] = useState([]);
    const [userData, setUserData] = useState([]);
    const [load, setLoad] = useState(true)


    

    useEffect(() => {
      try{
        cupon_data.forEach((data, index) => {
          fetch(`${"https://stawro.xyz"}/get/singel/user/won/data/${index+1}`)
            .then(res => res.json())
            .then(data => {
              if (data.data) {
                setUserData(prevState => [...prevState, { id: index, ...data.data }]);
              }else{
                console.warn("Unexpected response structure:", data);
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
        });
      }catch(error){
        console.log(error)
      }
        
      }, [cupon_data]);
      
      useEffect(()=>{
        GetCupon()
      },[])

    const GetCupon = () =>{

      try{
        setTimeout(()=>{
          fetch(`${"https://stawro.xyz"}/get/cupon/get/all/datas`)
          .then(res => res.json())
          .then(data =>{
              if(data.data){
                  setCupon_Data(data.data)
                  setLoad(false)
              }else{
                setLoad(false)
                console.warn("Unexpected response structure:", data.data);
              }
          }).catch(error=>{
            setLoad(false)
            if (error.response) {
                console.error("API Error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("No response from server. Please check your connection.");
            } else {
                console.error("Error occurred:", error.message);
            }
        })
        },5000)
        
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

            <div className='cupons_h1-01'>
              <h1>Cupons</h1>
            </div>

            <div className="cart-page-main-cnt-02-sub-cnt-01">
            {cupon_data.map((data, index) => {
                const fetchedData = userData.find(user => user.id === index);

                return(
                  <div key={index} className='cart_new_sub_cnt-01'>
                    <strong>{data.title}</strong>
                    <div className='cart_page_rank_cnt-01'>
                      <span>Rank : {index+1}</span>
                    </div>
                    <div className='cart_new_sub_cnt-01-img-cnt-01'>
                      <img src={data.img} />
                    </div>
                    <span className='cart_new_sub_cnt-01-span-01'>{data.body}</span>
                    
                    

                    {fetchedData && 

                    <div className='cart_new_sub_cnt-01-span-01-span-02'>
                      <div className='cart_new_sub_cnt-01-span-01-span-02-top'>
                        <strong>claimed</strong>
                      </div>
                      <span>{fetchedData.username}</span>
                    </div>}
                    
                  </div>
                )



                })}
            </div>

            <div className="">

            </div>


        </center>}
    </div>
  )
}

export default Cupons
