import {
  faArrowUpAZ,
  faBank,
  faPlusCircle,
  faArrowDownUpAcrossLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import api from "../pages/api";
import Loading from "../loading";

const Account = () => {
  const [balance, setBalance] = useState([]);
  const [btn1, setBtn1] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = localStorage.getItem("user");

  useEffect(() => {
    GetBalance();
  }, []);

  const New = async () => {
    try {
      const res = await api.post(
        "https://stawro.xyz",
        { user }
      );
      if (res.data.Status === "OK") {
        GetBalance();
      } else {
        alert("Amount not credited");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetBalance = async () => {
    try {
      setTimeout(async() =>{
        const res = await api.get(
          `https://stawro.xyz/get/acount/balence/${user}`
        );
        if (res.data.data) {
          setBtn1(true);
          setBalance(res.data.data);
          setLoading(false)
        } else if (res.data.Status === "NO") {
          setBtn1(false);
          setLoading(false)
        } else if (res.data.Logout === "OUT") {
          localStorage.removeItem("ssid");
          window.location.reload();
        }else{
          setLoading(false)
          console.warn("Unexpected response structure:", res.data);
        }
      }, 1000)
      
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
  
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      // Create an order by calling your backend
      const response = await fetch("https://stawro.xyz/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1 }), // Amount in INR (₹1 = 100 paise)
      });
  
      const data = await response.json();
  
      if (!data.success) {
        throw new Error("Order creation failed");
      }
  
      const { order } = data;
  
      const options = {
        key: "rzp_live_V4tRMNPowzPDU5", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "staWro",
        description: "The knowledge competition",
        handler: async function (response) {
          // Send payment response to the server for verification
          const verifyResponse = await fetch(
            "https://stawro.xyz/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                user : user
              }),
            }
          );
  
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            GetBalance();
          } else {
            alert("Payment verification failed!");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      // Initialize Razorpay
      const rzp = new window.Razorpay(options); // Access `Razorpay` from `window` object
      rzp.open();
    } catch (error) {
      console.error(error.message);
      alert("Payment initiation failed.");
    }
  };
  

  return (
    <div>
      {loading ? <Loading /> 
      :

      <center>
        <div className="Home-cnt-01-sub-01">
          <strong>
            sta<span>W</span>ro
          </strong>
          <hr />
        </div>
        <div className="account-main-cnt-01">
          <span className="account-main-cnt-01-span-01" onClick={New}>
            Wallet
          </span>

          <div className="account-main-cnt-01-sub-01">
            {btn1 === false && <button onClick={New}>Get Free ₹15</button>}
            {btn1 === true && (
              <div>
                {balance.balance &&
                  <span className="account-main-cnt-01-sub-01-sub-span-01">
                    Account Balance ₹<span>{balance.balance}.00</span>
                  </span>
                }
              </div>              
            )}

            <h2>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className="account-main-cnt-01-sub-01-sub-h2-icon-01"
                onClick={initiatePayment}
              />
            </h2>
          </div>
        </div>
        <br />

        <div className="account-main-cnt-02">
          {/* AC/UPI */}
          <div
            className="account-main-cnt-02-sub-cnt-01"
            onClick={() => {
              window.location.href = "/account/upi";
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faBank}
                className="account-main-cnt-02-sub-cnt-01-sub-icon-01"
              />
            </span>
            <br />
            <br />
            <span className="account-main-cnt-02-sub-cnt-01-span-01">
              AC/UPI
            </span>
          </div>

          {/* History */}
          <div
            className="account-main-cnt-02-sub-cnt-01"
            onClick={() => {
              window.location.href = "/account/history";
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faArrowUpAZ}
                className="account-main-cnt-02-sub-cnt-01-sub-icon-01"
              />
            </span>
            <br />
            <br />
            <span className="account-main-cnt-02-sub-cnt-01-span-01">
              History
            </span>
          </div>

          {/* Pending */}
          <div
            className="account-main-cnt-02-sub-cnt-01"
            onClick={() => {
              window.location.href = "/account/pending";
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faArrowDownUpAcrossLine}
                className="account-main-cnt-02-sub-cnt-01-sub-icon-01"
              />
            </span>
            <br />
            <br />
            <span className="account-main-cnt-02-sub-cnt-01-span-01">
              Pending
            </span>
          </div>
        </div>
      </center>
      }
    </div>
  );
};

export default Account;
