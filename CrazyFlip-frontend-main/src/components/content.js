import React, { useState, useEffect } from "react";
import { Row, Col, Popover } from "react-bootstrap";
import kid from "../images/kid.png";
import { Icon } from '@iconify/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import LogoutButton from "./LogoutButton";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { coinFlipContractAddress, NFTMarketplaceABI, erc20ABI } from "../Context/constant";
// import { Popover } from "bootstrap";
import Menu from "./Menu";
import MyAccount from "./myAccount";
import Affilliates from "./affilliates";
import TransactionsDetail from "./transactionsDetail";


const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    coinFlipContractAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    if (!connection) {
      throw new Error("Connection modal closed by user");
    }
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return [signer, contract];
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
    throw error;
  }
};

const Content = ({ logindata }) => {
  const [color, setColor] = useState("");
  const [state, setState] = useState(1);
  const [menuStatus, setMenuStatus] = useState("open");
  const [style, setStyle] = useState("menu");
  const [newpassword, setnewPassword] = useState({})
  const [signer, setSigner] = useState('');
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [link, setLink] = useState(`http://localhost:3000/SignUp?walletAddress=${currentAccount}`);
  // const [link, setLink]= useState("");


  const [showPopover, setShowPopover] = useState(true);

  const checkIfWalletConnected = async () => {
    try {
      console.log("In Check");
      if (!window.ethereum) return setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0].toLowerCase());
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const getBalance = await provider.getBalance(accounts[0]);

        const bal = ethers.utils.formatEther(getBalance);
        setAccountBalance(bal);
        const signerAndContract = await connectingWithSmartContract();
        setSigner(signerAndContract[0]);
      } else {
        setError("No Account Found");
      }
    } catch (error) {
      setError("Something wrong while connecting to wallet");
    }
  };


  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  const handleClick = () => {
    switch (menuStatus) {
      case "open":
        setMenuStatus("close");
        setStyle("menu active");
        break;
      case "close":
        setMenuStatus("open");
        setStyle("menu");
        break;
    }
  };

  const navigate = useNavigate();

  // code to delete account 
  // const deleteAccount = () => {
  //   axios.post('http://localhost:8080/account/delete', logindata, { withCredentials: true, })
  //     .then(response => {
  //       // Handle the response data
  //       console.log(response.data, "deleted dataata");
  //       toast.success('Account deleted successfully!', {
  //         position: 'top-right',
  //         autoClose: 3000, // Time in milliseconds before the toast auto-closes
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //       setTimeout(() => {
  //         navigate("/register");
  //       }, 500);
  //     })
  //     .catch(error => {
  //       // Handle any error that occurred during the request
  //       console.log(error, "err");
  //     });
  // }

  // code to change password 

  // const changePassword = (e) => {
  //   e.preventDefault();
  //   console.log(newpassword, "newpassword");
  //   axios.post('http://localhost:8080/account/password', newpassword, { withCredentials: true, })

  //     .then(response => {
  //       // Handle the response data
  //       console.log(response, "dataata");
  //       toast.success('Password changed successfully!', {
  //         position: 'top-right',
  //         autoClose: 3000, // Time in milliseconds before the toast auto-closes
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //       });
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 500);

  //     })
  //     .catch(error => {
  //       console.log(error, "errorrrrrrrrrr");
  //       // Handle any error that occurred during the request
  //       // if (error.response.data.err.length > 0) {
  //       //   for(let i=0; i<error.response.data.err.length; i++){
  //       // console.log(error.response.data.err[i].msg, "errrorrr");


  //       //     toast.error(error.response.data.err[i].msg , {
  //       //       position: 'top-right',
  //       //       autoClose: 3000, // Time in milliseconds before the toast auto-closes
  //       //       hideProgressBar: false,
  //       //       closeOnClick: true,
  //       //       pauseOnHover: true,
  //       //       draggable: true,
  //       //     });
  //       //   }
  //       // } else{
  //       //   console.log(error.response.data.message, "error.response.data.message");

  //       //   toast.error(error.response.data.message, {

  //       //     position: 'top-right',
  //       //     autoClose: 3000, // Time in milliseconds before the toast auto-closes
  //       //     hideProgressBar: false,
  //       //     closeOnClick: true,
  //       //     pauseOnHover: true,
  //       //     draggable: true,

  //       //   });
  //       // }

  //     });
  // }
  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setnewPassword((preVal) => {
  //     let tempVal = { ...preVal }
  //     tempVal[name] = value;
  //     return tempVal;
  //   })
  // }
  // console.log(currentAccount, "currentAccountttttt");

  // const queryParams = new URLSearchParams(window.location.search);

  // Access query parameters using the get method
  // const walletAddress = queryParams.get('walletAddress');

  let params = (new URL(window.location)).searchParams;
  let walletAddress = params.get("walletAddress");

 
  useEffect(() => {
    setLink(`http://localhost:3000/SignUp?walletAddress=${currentAccount}`)
  }, [currentAccount])


  return (
    <>

      <div
        style={{ height: "100vh", width: "50%", }}
        className={`menu-div-small-screen menu_div2 ${style}`}
      >
        <button className="menu-btn2" onClick={handleClick}><Icon fontSize={30} color="orange" icon="mdi:cancel-bold" /></button>

        <ul className="ps-5" style={{ listStyleType: "none", color: "white" }}>
          <li style={{ color: state === 1 ? "orange" : "white" }} className="mb-4 fw-bold" onClick={() => { setState(1); setMenuStatus("open"); setStyle("menu"); }}>MY ACCOUNT</li>
          <li style={{ color: state === 2 ? "orange" : "white" }} className="mb-4 fw-bold" onClick={() => { setState(2); setMenuStatus("open"); setStyle("menu"); }}>AFFILLIATES</li>
          <li style={{ color: state === 3 ? "orange" : "white" }} className="mb-3 fw-bold" onClick={() => { setState(3); setMenuStatus("open"); setStyle("menu"); }}>TRANSACTIONS</li>
        </ul>

        <div className="menu-bottom">
          <div className="logout_btn_div w-80 m-auto">
            <div className="">
              <LogoutButton />
            </div>
            <div>
              <NavLink to="/casino">
                <button type="button" style={{ borderColor: "transparent" }} className="bg-transparent mt-0 ps-0 text-white fs-5 btn btn-primary logout_btn">
                  BACK TO CASINO
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* =================        */}
      <div className='d-flex gap-1' style={{ width: "100%" }}>
        <div className='position-relative pt-5 menu_div' style={{ width: "20%", background: "#553b6e" }}>
          <ul className="ps-5" style={{ listStyleType: "none", color: "white" }}>
            <li style={{ color: state === 1 ? "orange" : "white" }} className="mb-4 fw-bold" onClick={() => { setState(1); setColor("yellow") }}>MY ACCOUNT</li>
            <li style={{ color: state === 2 ? "orange" : "white" }} className="mb-4 fw-bold" onClick={() => setState(2)}>AFFILLIATES</li>
            <li style={{ color: state === 3 ? "orange" : "white" }} className="mb-3 fw-bold" onClick={() => setState(3)}>TRANSACTIONS</li>
          </ul>
          <div className='menu-bottom'>
            <div className='w-80 m-auto'>
              <div className=''>

                <LogoutButton />
              </div>
              <div>
                <NavLink to="/casino">
                  <button type="button" style={{ borderColor: "transparent" }} className="bg-transparent mt-0 text-white fs-5 btn btn-primary logout_btn">
                    BACK TO CASINO
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* ======================== */}
        <div className='text-white content-div' style={{ width: "80%", paddingLeft: "80px" }}>
          <button className="d-md-none menu-btn" onClick={handleClick}><Icon fontSize={30} color="orange" icon="pepicons-pop:menu" /></button>

          {state === 1 ? <MyAccount logindata={logindata} /> : state === 2 ? <Affilliates logindata={logindata} /> : state === 3 ? <TransactionsDetail logindata={logindata} /> : "coming soon...s"}
        </div>
      </div>
    </>
  );
};

export default Content;
