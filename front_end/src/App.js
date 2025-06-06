import React, { lazy, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios';
import Navi from './navi';
import Signup from './pages/signup';
import Loading from './loading';
import Login from"./pages/login"
import Admin_Users_Home from './pages/users_admin/home';
import View_qstn from './pages/users_admin/view_qstn';
import Post_qstn from './pages/users_admin/post_qstn';
import Wallet from './pages/users_admin/wallet';
import Sel_question from './admin/sel_question';
import Sample_qn from './pages/sample_qn';
import Start_Gm from './admin/start_gm';
import Delete from './pages/deete';


const User_admin = lazy(()=> import('./admin/add_admins'))
const Home = lazy(()=> import('./pages/home'))
// const Login = lazy(()=> import('./pages/login'))
const Forgotpass = lazy(()=> import('./pages/forgotpass'))
const Changepass = lazy(()=> import('./pages/changepass'))
const Error = lazy(()=> import('./error'))
const Ac_upi = lazy(()=> import('./pages/Account/ac_upi'))
const History = lazy(()=> import('./pages/Account/history'))
const Pending = lazy(()=> import('./pages/Account/pending'))
const Payment = lazy(()=> import('./pages/Account/payment'))
const Cart = lazy(()=> import('./pages/cart'))
const Carthist = lazy(()=> import('./pages/carthist'))
const Settings = lazy(()=> import('./pages/settings'))
const Updatepass = lazy(()=>import('./pages/updatepass'))
const Play = lazy(()=> import('./pages/play'))
const Start = lazy(()=> import('./pages/start'))
const Coin = lazy(()=> import('./admin/coin'))
const Data = lazy(()=> import('./pages/data'))
const Claimdreques = lazy(()=> import('./admin/claimdreques'))
const SignUpAdmin = lazy(()=> import('./admin/SignUp'))
const LoginAdmin = lazy(()=> import('./admin/loginAdmin'))
const AdminHome = lazy(()=> import('./admin/home'))
const Prize = lazy(()=> import('./admin/Prize'))
const QuestionAdd = lazy(()=> import('./admin/QuestionAdd'))
const Popup = lazy(()=> import("./pages/popup"))
const Cupon = lazy(()=> import("./admin/cupon"))
const Claimcupom = lazy(()=> import("./pages/claimcupom"))
const PieChartComponent = lazy(()=> import("./admin/chart"))
const Cupons = lazy(()=> import("./pages/cupons"))
const About = lazy(()=> import("./pages/about"))
const Questionview = lazy(()=> import("./admin/questionview"))
const Qstallcheck = lazy(()=> import("./admin/qstallcheck"))
const AddBalance = lazy(()=> import('./admin/addBalance'))
const Terms = lazy(()=> import('./pages/terms'))
const Privacy = lazy(()=> import('./pages/privacy'))
const ShippingAndRefundPolicy = lazy(()=> import("./pages/shippingandrefund"))
const Account = lazy(() => import("./pages/account"))
const User_Login = lazy(()=> import('./pages/users_admin/login'))



const DisplayPath = () => {
  const location = useLocation();

  const user = localStorage.getItem("user");
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(false);

  useEffect(()=>{
    if(location.pathname !== "/start" && user){
      setAlert(false)
      localStorage.removeItem('remainingSeconds')
      localStorage.removeItem('targetSecond')
      try{
        axios.delete(`${"https://stawro.xyz"}/delete/by/user/id/for/valid/data/${user}`)
        .then(res =>{
          if(res.data.Status === "OK"){
            localStorage.removeItem("valid")
            // setData("You are quitting the game.")
            // setAlert(true)
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
  },[])


  if(alert){
    return (
      <div>
        <Popup data={data} val={alert} />
      </div>
    );
  }

  
};

const App = () => {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("ssid");
  const admin = localStorage.getItem("token");
  const valid = localStorage.getItem("valid");
  const admin_user = localStorage.getItem('admin_token')

  

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("user");
      localStorage.removeItem("username");
    }
  }, [token]);

  return (
    <div>
      <center>
        {show ? 
          <div>
            <Navi />
            <div className='app-navi-main-cnt'>
              <span onClick={() => setShow(false)}>
                <FontAwesomeIcon icon={faBars} className='app-navi-main-cnt-span-icon' />
              </span>
            </div> 
          </div> 
          
          :

          <div>
            <BrowserRouter>
              <DisplayPath />
              <Routes>
                <Route path='/cupon' element={<Cupons />} />
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/terms-condition' element={<Terms />} />
                <Route path='/privacy-policy' element={<Privacy />} />
                <Route path='/refund-shipping' element={<ShippingAndRefundPolicy/>}/>
                <Route path='/load' element={<Loading />} />
                <Route path='/sample' element={<Sample_qn />} />


                {/* <Route path='/pay' element={<RazorpayPayment />} /> */}

                <Route path='/signup' element={token ? <Home /> : <Signup />} />
                <Route path='/login' element={token ? <Home /> : <Login />} />
                <Route path='/forgotpass' element={token ? <Home /> : <Forgotpass />} />
                <Route path='/changepass' element={token ? <Home /> : <Changepass />} />
                <Route path='/navi' element={<Navi />} />
                <Route path='/account' element={token ? <Account /> : <Login />} />
                <Route path='/account/upi' element={token ? <Ac_upi /> : <Login />} />
                <Route path='/account/history' element={token ? <History /> : <Login />} />
                <Route path='/account/pending' element={token ? <Pending /> : <Login />} />
                <Route path='/payment' element={token ? <Payment /> : <Login />} />
                <Route path='/cart' element={token ? <Cart /> : <Login />} />
                <Route path='/cart/history' element={token ? <Carthist /> : <Login />} />
                <Route path='/settings' element={token ? <Settings /> : <Login />} />
                <Route path='/update/password' element={token ? <Updatepass /> : <Login />} />
                <Route path='/play' element={token ? <Play /> : <Login />} />
                <Route path='/claim/cupon' element={token ? <Claimcupom /> : <Login /> } />
                <Route path='/delete' element={token? <Delete /> : <Login/>} />
                
                {valid &&
                  <Route path='/start' element={token ? <Start /> : <Login />} />
                }
                <Route path='/data' element={token ? <Data /> : <Login />} />




                <Route path='/admin/user/login' element={admin_user ? <Admin_Users_Home /> : <User_Login />} />
                <Route path='/admin/user/home' element={admin_user ? <Admin_Users_Home /> : <User_Login /> } />
                <Route path='/admin/user/questions' element={admin_user ? <View_qstn /> : <User_Login />  } />
                <Route path='/admin/user/add' element={admin_user ? <Post_qstn /> : <User_Login />} />
                <Route path='/admin/user/wallet' element={admin_user ? <Wallet /> : <User_Login />} />









                
                
                {/* Admin Routes */}
                <Route path='/admin/coins' element={admin ? <Coin /> : <LoginAdmin />} />
                <Route path='/admin/request' element={admin ? <Claimdreques /> : <LoginAdmin />} />
                <Route path='/admin/start' element={admin ?  <Start_Gm />  : <LoginAdmin />} />
                <Route path='/admin/signup' element={admin ? <Coin /> : <SignUpAdmin />} />
                <Route path='/admin/login' element={admin ? <AdminHome /> : <LoginAdmin />} />
                <Route path='/admin/home' element={admin ? <AdminHome /> : <LoginAdmin />} />
                <Route path='/admin/prize' element={admin ? <Prize /> : <LoginAdmin />} />
                <Route path='/admin/addquestion' element={admin ? <QuestionAdd /> : <LoginAdmin />} />
                <Route path='/admin/cupon' element={admin ? <Cupon /> : <LoginAdmin /> } />
                <Route path='/admin/chart' element={admin ? <PieChartComponent /> : <LoginAdmin /> } />
                <Route path='/admin/questions' element={admin ? <Questionview /> : <LoginAdmin /> } />
                <Route path='/admin/check' element={admin ? <Qstallcheck/> : <LoginAdmin/> } />
                <Route path='/admin/balance' element={admin ? <AddBalance /> : <LoginAdmin /> } />
                <Route path='/admin/add/users' element={admin ? <User_admin /> : <LoginAdmin /> } />
                <Route path='/admin/select' element={admin ? <Sel_question /> : <LoginAdmin />} />
                <Route path='*' element={<Error />} />
                 
              </Routes>
            </BrowserRouter>
            <div className='app-navi-main-cnt'>
              <span onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faBars} className='app-navi-main-cnt-span-icon' />
              </span>
            </div>
          </div>
        }
      </center>
    </div>
  );
};

export default App;


