import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import {
	coinFlipContractAddress,
	coinFlipABI,
	erc20ABI,
	affiliateABI,
	affiliateContractAddress,
} from "./constant";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastify from 'react-toastify';

export const CoinFlipContext = React.createContext();

//toast.configure();
const fetchContract = (signerOrProvider) =>
	new ethers.Contract(coinFlipContractAddress, coinFlipABI, signerOrProvider);


//---CONNECTING WITH SMART CONTRACT
const handleError = (error) => {
  if (error.message === 'Modal closed by user') {
    toast.error('Connection error. !!!');
    toast.error(' Please connect your metamask wallet and try again later.');
  } else {
    console.error('Unhandled error haha:', error);
    toast.error('An error occurred.');
    toast.error('Please connect your metamask wallet and try again later.');
  }
};



export const CoinFlipProvider = ({ children }) => {
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState("");
	const [currentAccount, setCurrentAccount] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [accountBalance, setAccountBalance] = useState("");
	const [signer, setSigner] = useState("");
	const [walletErrorShown, setWalletErrorShown] = useState(false);
	const [trxHistory, settrxHistory] = useState([]);
	useEffect(() => {
	
		if (checkIfWalletConnected()) {
			setWalletErrorShown(true);
		}
	}, []); 

	const showToastError = () => {

	    if (!walletErrorShown) {
	      toast.error('Connection error. Please connect your MetaMask wallet and try again later.', {
	        position: toast.POSITION.MIDDLE_CENTER,
	        autoClose: 10000,
	      });
	      setWalletErrorShown(true);
	    }
		
	  };
	
	const connectingWithSmartContract = async () => {
	        try {
	                const web3Modal = new Web3Modal();
	                const connection = await web3Modal.connect();
	                console.log("check");
	                if (!connection) {
	                        
	                        throw new Error("Connection modal closed by user");
	                    
	                }
	                const provider = new ethers.providers.Web3Provider(connection);
	                const signer = provider.getSigner();
	                const contract = fetchContract(signer);
	                return [signer, contract];
	        } catch (error) {
	                console.log("Something went wrong while connecting with contract", error);
	                
	                //showToastError();
	                //return null;
	        }
	};
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
				return true;
			} else {
				setError("No Account Found");
				return false;
			}
		} catch (error) {
			setError("Something wrong while connecting to wallet");
		}
	};
	useEffect(() => {
		checkIfWalletConnected();
	}, []);

	useEffect(() => {
	  const fetchData = async () => {
	    if (await checkIfWalletConnected()) {
	      getLastPlays();
	    } else if(await !checkIfWalletConnected()){
	      showToastError();
	      console.log("Wallet is not connected");
	    }
		else{
			console.log("Try again");
		}
	  };

	 fetchData();
	}, []);

	const disconnectWallet = () => {
	  setCurrentAccount("");
	};

	//---CONNECT WALLET FUNCTION
	const connectWallet = async () => {
		try {
			if (!window.ethereum) return setError("Install MetaMask");
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0].toLowerCase());
		} catch (error) {
			setError("Error while connecting to wallet");
		}
	};

	const runBet = async (choice, tokenAddress, amount, mainNet) => {
		try {
			console.log("In bet");

			const signerAndContract = await connectingWithSmartContract();
			setSigner(signerAndContract[0]);
			const contract = signerAndContract[1];

			const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
			const affiliateContract = new ethers.Contract(
				affiliateContractAddress,
				affiliateABI,
				signer
			);
			const amountInWei = ethers.utils.parseEther(amount);
			if (!mainNet) {
				const approve = await tokenContract.approve(
					coinFlipContractAddress,
					amountInWei
				);
				await approve.wait();
				const affiliate = await affiliateContract.getWhoReferred(
					currentAccount
				);
				console.log(affiliate);
				const receipt = await contract.bet(
					choice,
					tokenAddress,
					affiliate,
					amountInWei,
					mainNet,
					{
						gasLimit: 10000000,
					}
				);
			} else {
				const affiliate = await affiliateContract.getWhoReferred(
					currentAccount
				);
				const receipt = await contract.bet(
					choice,
					tokenAddress,
					affiliate,
					amountInWei,
					mainNet,
					{
						gasLimit: 10000000,
						value: amountInWei,
					}
				);
			}

			const filter = contract.filters.RequestFulfilled(currentAccount);

			return [filter, contract];
		} catch (error) {
			console.log("Error while running bet", error);
		}
	};
	function timeAgo(timestamp) {
		// Convert the timestamp to milliseconds (since it's in seconds)
		const date = new Date(Number(timestamp) * 1000);

		// Get the current date
		const now = new Date();

		// Calculate the difference in milliseconds
		const diff = now - date;

		// Time durations in milliseconds
		const second = 1000,
			minute = second * 60,
			hour = minute * 60,
			day = hour * 24,
			week = day * 7;

		// Check for various time intervals
		if (diff < minute) {
			const seconds = Math.floor(diff / second);
			return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
		} else if (diff < hour) {
			const minutes = Math.floor(diff / minute);
			return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
		} else if (diff < day) {
			const hours = Math.floor(diff / hour);
			return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
		} else if (diff < week) {
			const days = Math.floor(diff / day);
			return `${days} day${days !== 1 ? "s" : ""} ago`;
		} else {
			// If the difference is more than a week, return the full date
			return date.toLocaleString();
		}
	}
	
	const getLastPlays = async () => {
		const signerAndContract = await connectingWithSmartContract();
		const contract = signerAndContract[1];
		let eventFilter = contract.filters.RequestFulfilled();
		await contract
			.queryFilter(eventFilter)
			.then((res) => {
				const data = [];

				res.reverse().map((item, index) => {
					if (index >= 5) return;
					data.push({
						id: index,
						wallet: item.args.player,
						price: Number(ethers.utils.formatEther(item.args.betAmount)),
						res: item.args.victory ? "WIN" : "LOSE",
						dur: timeAgo(Number(item.args.timestamp)),
					});
				});
				settrxHistory(data);
			})
			.catch((error) => {
				handleError(error);
    				throw error;
				console.log("check",error);
			});
	};


	return (
    <>
      <CoinFlipContext.Provider
        value={{
          checkIfWalletConnected,
          connectWallet,
          disconnectWallet,
          currentAccount,
          runBet,
          trxHistory,
        }}
      >
        {children}
      </CoinFlipContext.Provider>
      <ToastContainer />
    </>
  );
};
