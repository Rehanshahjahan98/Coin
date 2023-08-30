import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AffNetwork.css";
import SideLogo from "../assets/side-logo.png";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { coinFlipContractAddress, coinFlipABI} from "../Context/constant";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { red } from "@mui/material/colors";

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

export default function AffNetwork() {
  
  const [data, setData]= useState({});
const [signer, setSigner] = useState('');
const [error, setError] = useState("");
const [currentAccount, setCurrentAccount] = useState("");
const [accountBalance, setAccountBalance] = useState("");



  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };


  const loginAccount = (e)=>{
    e.preventDefault();
    
    data.walletAddress = currentAccount;

    
    axios.post('http://localhost:8080/login', data, { withCredentials: true, })
      .then(response => {
        // Handle the response data
        // console.log(response.data, "dataata");
        toast.success('Login successful!', {
          position: 'top-right',
          autoClose: 3000, // Time in milliseconds before the toast auto-closes
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      })
      .catch(error => {
        // Handle any error that occurred during the request
        if (error.response.data.err.length > 0) {
          for(let i=0; i<error.response.data.err.length; i++){
        // console.log(error.response.data.err[i].msg, "errrrrrrrrr");
    
            toast.error(error.response.data.err[i].msg , {
              position: 'top-right',
              autoClose: 3000, // Time in milliseconds before the toast auto-closes
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
        } else{
          toast.error(error.response.data.message || error.response.data.err.msg , {
            position: 'top-right',
            autoClose: 3000, // Time in milliseconds before the toast auto-closes
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
           
          });
        }
      });
      }


const handleOnChange = (e)=>{
  const {name,value}=e.target;
  setData((preVal)=>{
    let tempVal = {...preVal}
    tempVal[name]=value;
    return tempVal;
    })
}
// console.log(data, "datatata string");

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
    <div className="form-container">
      <img
        src={SideLogo}
        alt="HopiumBetLogo"
        style={{ height: "70px", margin: "0 auto", display: "block" }}
      />
      <form style={{ maxWidth: "500px", margin: "auto" }}>
        <h2 id="aff-network-h2">
          <em> Affiliate Network </em>
        </h2>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            onChange={(e)=>handleOnChange(e)}
            className="input-field"
            type="text"
            placeholder="wallet address"
            name="walletAddress"
            value={currentAccount} disabled
          />
        </div>
        <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input
            onChange={(e)=>handleOnChange(e)}
            className="input-field"
            type="text"
            placeholder="email"
            name="email"
          />
        </div>
        <div className="input-container">
          <i className="fa fa-lock icon"></i>
          <input
            onChange={(e)=>handleOnChange(e)}
            className="input-field"
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="line-container">
          <div className="radio-container">
            <input type="radio" id="remMe" name="remMe" value="remMe" />
            <label htmlFor="remMe">Remember me</label>
          </div>
          <div className="link-container">
            <Link to="/forgotpassword">Forgot Password</Link>
          </div>
        </div>
        <button onClick={loginAccount} type="submit" className="btn">
          Sign In
        </button>
        <div className="line-container">
          <div className="radio-container">
            <h2 style={{ fontWeight: "600", color: "#fff", }}>
              Don’t have an account?
            </h2>
          </div>
          <button onClick={handleSignUp} type="button" className="signUpBtn">
            Sign Up
          </button>
        </div>
      </form>

      <ToastContainer/>
    </div>
  );
}
