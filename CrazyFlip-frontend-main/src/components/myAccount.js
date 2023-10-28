import React, { useState, useEffect } from "react";
import { Row, Col, Popover } from "react-bootstrap";
import discord from '../assets/discord.png';
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
import MyVerticallyCenteredModal from "./Modal";




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
      throw new Error('Connection modal closed by user');
    }

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return [signer, contract];
  } catch (error) {
    if (error.message === 'Connection modal closed by user') {
      toast.error('Connection modal closed by user', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Handle other types of errors here
      toast.error('Something went wrong while connecting with the contract', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    console.error('Error in connectingWithSmartContract:', error);
    throw error;
  }
};

const MyAccount = ({ logindata }) => {
  const [state, setState] = useState();
  const [menuStatus, setMenuStatus] = useState("open");
  const [style, setStyle] = useState("menu");
  const [newpassword, setnewPassword] = useState({})
  const [signer, setSigner] = useState('');
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [link, setLink] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  // const [link, setLink]= useState("");


  const [showPopover, setShowPopover] = useState(true);

  // const togglePopover = () => {
  //   setShowPopover(!showPopover);
  // };



  const checkIfWalletConnected = async () => {
    try {
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


  const navigate = useNavigate();

  // code to delete account 
  const deleteAccount = () => {
    axios.post('http://185.193.126.26:8080/account/delete', logindata, { withCredentials: true, })
      .then(response => {
        // Handle the response data
        toast.success('Account deleted successfully!', {
          position: 'top-right',
          autoClose: 3000, // Time in milliseconds before the toast auto-closes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/register");
        }, 500);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        console.log(error, "err");
      });
  }

  // code to change password 

  const changePassword = (e) => {
    e.preventDefault();
    axios.post('http://185.193.126.26:8080/account/password', newpassword, { withCredentials: true, })

      .then(response => {
        // Handle the response data
        toast.success('Password changed successfully!', {
          position: 'top-right',
          autoClose: 3000, // Time in milliseconds before the toast auto-closes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/login");
        }, 500);

      })
      .catch(error => {
        console.log(error, "error");
        // Handle any error that occurred during the request
        // if (error.response.data.err.length > 0) {
        //   for(let i=0; i<error.response.data.err.length; i++){
        // console.log(error.response.data.err[i].msg, "errrorrr");


        //     toast.error(error.response.data.err[i].msg , {
        //       position: 'top-right',
        //       autoClose: 3000, // Time in milliseconds before the toast auto-closes
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //     });
        //   }
        // } else{
        //   console.log(error.response.data.message, "error.response.data.message");

        //   toast.error(error.response.data.message, {

        //     position: 'top-right',
        //     autoClose: 3000, // Time in milliseconds before the toast auto-closes
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,

        //   });
        // }

      });
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setnewPassword((preVal) => {
      let tempVal = { ...preVal }
      tempVal[name] = value;
      return tempVal;
    })
  }
  // console.log(currentAccount, "currentAccountttttt");

  // const queryParams = new URLSearchParams(`?walletAddress=${currentAccount}`);

  // Access query parameters using the get method
  // const walletAddress = queryParams.get('walletAddress');

  const generateLink = () => {
    //   setShowPopover(!showPopover);
    setModalShow(true)
    // setLink(link)
    setLink(`http://185.193.126.26:3000/SignUp?walletAddress=${currentAccount}`)

  }
   useEffect(()=>{
     setLink(`http://185.193.126.26:3000/SignUp?walletAddress=${currentAccount}`)
   }, [currentAccount])
  return (
    <div className="pb-5 my_account_main_div" style={{ minHeight: "100vh" }}>

      <div className="ps-0 ps-md-1 mb-5">
        <h1 className="text-center mt-4 mb-5 myAccount border-0" style={{ letterSpacing: "1px" }}>My ACCOUNT</h1>
        <Row className="m-0 g-0">
          <Col xs={12} lg={8} className="order-1 order-md-2">
            <div style={{ letterSpacing: "1px" }}>
              <h3 style={{ color: "orange", fontWeight: "600", fontSize: "22px", marginBottom: "20px", letterSpacing: "1px" }}>Profile Information</h3>
              <div style={{ gap: "180px" }} className="gaps d-flex">
                <p>Email</p>
                <p>{logindata.email}</p>
              </div>
              <div style={{ gap: "142px" }} className="gaps d-flex">
                <p>Unverified</p>
                <p>Send Verification Email</p>
              </div>

              <div style={{ gap: "65px" }} className="gaps d-flex">
                <p>BSC Wallet Address</p>
                <p className="">{currentAccount}</p>
              </div>
              <div style={{ gap: "120px" }} className="gaps d-flex align-items-center mb-3">
                <p className="mb-0">Afilliate Link</p>
                {/* <button onClick={generateLink}>affiliate</button> */}
                <div className="position-relative">
                  <button
                    onClick={generateLink}
                    // onClick={() => setModalShow(true)}
                    id="myPopover"
                    type="button"
                    style={{ color: "orange", fontWeight: "600", width: "110px", height: "25px" }}
                    className="bg-white btn btn-primary p-0 mt-0"
                    data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Bottom popover"
                  >
                    Generate
                  </button>
                  {/* <Popover target="myPopover" show={showPopover} placement="bottom" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1 }}>
                  <Popover.Body>
                    <a target="_" href="">{link}</a>
                  </Popover.Body>
                </Popover> */}
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    link={link}
                  />

                </div>

              </div>

            </div>
          </Col>
          <Col xs={12} lg={4} className="order-md-2">
            {/* <div className="text-start">
            <div>
              <p className="mb-0" style={{ fontSize: "20px", letterSpacing:"1px" }}>
                Profile Picture
              </p>
            </div>
            <div className="bg-white mb-4" style={{ width: "160px", border:"2px solid orange" }}>
              <img style={{ width: "100%" }} src={kid} alt="" />
            </div>
          </div> */}
          </Col>
        </Row>
      </div>
      <div className="m-auto m-md-0" style={{ borderBottom: "1px solid yellow", width: "70%", }}></div>

      <div style={{ width: "300px" }} className="mt-4 mb-4 ps-4 ps-md-1">
        <h3 style={{ letterSpacing: "1px" }}>Change Password</h3>
        <div class="mb-2" style={{ color: "orange" }}>
          <label for="exampleFormControlInput1" className="form-label mb-0">
            New Password
          </label>
          <input
            className="form-control password_input"
            onChange={(e) => handleOnChange(e)} type="password" name="password" id="psw"
          />
        </div>
        <div className="mb-2" style={{ color: "orange" }}>
          <label for="exampleFormControlInput1" className="form-label mb-0">
            Confirm Password
          </label>
          <input
            className="form-control password_input"
            onChange={(e) => handleOnChange(e)} type="password" name="confirmPassword" id="psw-repeat"

          />
        </div>
        <div class="">
          <button
            onClick={changePassword}
            type="button"
            style={{ color: "orange", fontWeight: "600" }}
            className="bg-white btn btn-primary p-1 pt-0 pb-0"
          >
            Change Password
          </button>
        </div>
      </div>

      <div className="ps-4 ps-md-1">
        <h4>Delete Account</h4>
        <p>
          {" "}
          If you want to delete your account - Chat with us on the discord by clicking below.
        </p>
        <h3 id='chat-Btn'>
	  <span style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'inline-block', padding: '5px', borderRadius: '5px' }}>
	    <img src={discord} alt='metamask-logo' className='metamask-logo' style={{ marginRight: '10px' }}/>
	    <a href='https://discord.gg/RjAvVnDMAS' target='_blank' rel='noreferrer'>
      	       Chat with us on discord
	    </a>
	  </span>
	</h3>

      </div>
    </div>
  )
}

export default MyAccount
