import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Signup.css";
import Sidelogo from "../assets/side-logo.png";
import axios from 'axios';
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import {coinFlipContractAddress, coinFlipABI } from "../Context/constant";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from "react-router-dom";

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    coinFlipContractAddress,
    coinFlipABI,
    signerOrProvider
  );
const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    if (!connection) {
      throw new Error('Modal closed by user');
    }

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return [signer, contract];
  } catch (error) {
    if (error.message === 'Modal closed by user') {
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

export default function Signup() {
  const [data, setData] = useState({});
  const [signer, setSigner] = useState('');
  const [error, setError] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [referredAddress, setReferredAddress] = useState(null);
  const [accountBalance, setAccountBalance] = useState("");
  const navigate = useNavigate();



  const createAccount = (e) => {
    e.preventDefault();
    const loader = document.getElementById('loader');
  console.log(referredAddress, "hello");
      if (referredAddress) {
	console.log(referredAddress, "reffered added");
        data.walletAddress = currentAccount;
        axios.post('http://185.193.126.26:8080/SignUp', data)
  
          .then(response => {
            toast.success('Registered successfully!', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
	   
          })
          .catch(error => {
            console.log(error.response.data.err, "error msg");
            toast.error(error.response.data.message || error.response.data.err[0].msg, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
	    
          });
         
          
    	  axios.post('http://185.193.126.26:8080/contract/add-affliate', { referredAddress: currentAccount, affiliateAddress: referredAddress })
      	    .then(response => {
              console.log('Success:', referredAddress,referredAddress?.toLowerCase(),currentAccount, currentAccount?.toLocaleLowerCase());
       	      toast.success('affliate added successfully!', {

		position: 'top-right',
      		autoClose: 3000,
      		hideProgressBar: false,
      		closeOnClick: true,
       		pauseOnHover: true,
       		draggable: true,
       	  });
           setTimeout(() => {
            navigate("/login");
          }, 500);

       })
      }
      else
      {
	console.log(referredAddress, "no reffered added");

        data.walletAddress = currentAccount;
        axios.post('http://185.193.126.26:8080/SignUp', data)
  
          .then(response => {
            toast.success('Registered successfully!', {
              position: 'top-right',
              autoClose: 3000,
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
            console.log(error.response.data.err, "error msg");
            toast.error(error.response.data.message || error.response.data.err[0].msg, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
      }
    }
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preVal) => {
      let tempVal = { ...preVal }
      tempVal[name] = value;
      return tempVal;
    })
  }

  useEffect(() => {
    const isReferredAccount = () => {
      let params = (new URL(window.location)).searchParams;
      let walletAddress = params.get("walletAddress");
      if (walletAddress) {
        setReferredAddress(walletAddress)
      } else {
        setReferredAddress(null)
      }
      console.log(walletAddress, "window location");
    }
    isReferredAccount()
  }, [window.location]);

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

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div style={{ marginBottom: "50px" }}></div>
      <div className="signup-page">
        <img src={Sidelogo} alt="Hopiumbet-logo" id="side-logo" />
        <div className="signup-form-container">
	<h2 id="aff-network-h2">
          <em> Affiliate Network </em>
        </h2>
          <h3 className="dotH3">
            Create an account to view your Affiliate activity
          </h3>

          <form>
            <div class="form-container">
              <h1 style={{ textAlign: "center" }}>Register</h1>

              <label for="email">
                <b>Email</b>
              </label>
              <input onChange={(e) => handleOnChange(e)} type="text" name="email" id="email" />

              <label for="Wallet Address">
                <b>Wallet Address</b>
              </label>
              <input value={currentAccount} disabled type="text" name="walletAddress" id="uname" />

              <label for="psw">
                <b>Password</b>
              </label>
              <input onChange={(e) => handleOnChange(e)} type="password" name="password" id="psw" />

              <label for="psw-repeat">
                <b>Repeat Password</b>
              </label>
              <input onChange={(e) => handleOnChange(e)} type="password" name="confirmPassword" id="psw-repeat" />

              <button onClick={createAccount} type="submit" class="registerbtn">
                Create Your Account
              </button>
              <p style={{ textAlign: "center" }}>Already have an account <NavLink to="/login" style={{ color: "black" }}>login here</NavLink> </p>
              <p style={{ textAlign: "center" }}>
                By creating an account you agree in our
                <a href="/terms"> Terms of Services </a>
                and <a href="/privacy">Privacy Policy</a>.
              </p>
            </div>
          </form>
        </div>

      </div>
      <ToastContainer />
    </>
  );
}
