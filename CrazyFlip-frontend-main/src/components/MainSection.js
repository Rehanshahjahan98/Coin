import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./Transactions";
import Coin from "./Coin";
import Toss from "./Toss";
import "./MainSection.css";
import "./SelectButton.css";
import ConnectPopup from "./ConnectPopup";
import { CoinFlipContext } from "../Context/conflipContext";
import { ElectricalServicesSharp } from "@mui/icons-material";
import { ethers } from "ethers";

const MainSection = (props) => {
	const [result, setResult] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [winningResult, setWinningResult] = useState("");
	const [flippingInProgress, setFlippingInProgress] = useState(false);
	const [isCoinSelected, setIsCoinSelected] = useState(false);
	const [isTossSelected, setIsTossSelected] = useState(false);
	const [selectedTossValue, setSelectedTossValue] = useState("");
	const [coinButtonSize, setCoinButtonSize] = useState(null);
	const [betAmount, setBetAmount] = useState("");
	const [contract, setContract] = useState("");
	const [filter, setFilter] = useState("");

	const { runBet } = useContext(CoinFlipContext);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	const onCoinButtonSizeChange = (size) => {
		setCoinButtonSize(size);
	};

	const onBetAmountChange = (amount) => {
		setBetAmount(amount);
	};

	const handleTossSelect = (value) => {
		setSelectedTossValue(value);
	};

	const token_object = {
		CHMB: {
			address: "0x05c4D0258Cd83453e8d6a86f7B61249E36eCd531",
			isTrue: false,
		},
		ERTHA: {
			address: "0x05c4D0258Cd83453e8d6a86f7B61249E36eCd531",
			isTrue: false,
		},
		BVC: {
			address: "0x05c4D0258Cd83453e8d6a86f7B61249E36eCd531",
			isTrue: false,
		},
		TLM: {
			address: "0x05c4D0258Cd83453e8d6a86f7B61249E36eCd531",
			isTrue: false,
		},
		BSC: {
			address: "0x05c4D0258Cd83453e8d6a86f7B61249E36eCd531",
			isTrue: false,
		},
	};

	useEffect(() => {
		if (contract != "") {
			contract.on(
				filter,
				(
					player,
					victory,
					amount,
					requestId,
					randomWords,
					gasPaidVRP,
					event
				) => {
					console.log(victory); //win loss true false
					if (!victory) {
						if (selectedTossValue === "astroman") StopCoin("alien");
						else StopCoin("astroman");
						showWinningToast("lost", amount);
					} else {
						StopCoin(selectedTossValue);
						showWinningToast("win", amount);
					}
				}
			);
		}
	}, [contract]);

	const FlipCoin = async () => {
		if (flippingInProgress) {
			toast.warn("Flipping is in progress. Please wait!", {
				position: "top-center",
				autoClose: 30000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
			return;
		}

		if (!isCoinSelected || selectedTossValue === null) {
			toast.warn("Please select options from Coin and Toss.", {
				position: "top-center",
				autoClose: 30000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
			return;
		}

		console.log("Coin Flipping...");
		setFlippingInProgress(true);
		setResult("flipping");

		let userSelection;
		if (selectedTossValue === "AstroMan") {
			userSelection = 0;
		} else if (selectedTossValue === "Alien") {
			userSelection = 1;
		}

		const selectedCoin = props.option;
		const coinInfo = token_object[selectedCoin];
		const { address, isTrue } = coinInfo || {};
		console.log("User Selection:", userSelection);
		console.log("Token Address:", address);

		// call api to get the affiliate address

		console.log("Is True:", isTrue);
		console.log("Bet Amount:", betAmount);

		const filterAndContract = await runBet(
			userSelection,
			address,
			betAmount,
			isTrue
		);
		setFilter(filterAndContract[0]);
		setContract(filterAndContract[1]);
	};

	const StopCoin = (result) => {
		if (flippingInProgress) {
			setResult("");
			setWinningResult(result);
			setFlippingInProgress(false);
			console.log("Coin Flipping Stopped.");
		}
	};

	const showWinningToast = (result, amount) => {
		// const message = result === 'Lost' ? 'You Lost!' : 'You Won!';
		const selectedCoin = props.option;
		let completeMessage;
		if (result === "win") {
			completeMessage = `You ${result} ${ethers.utils.formatEther(
				amount
			)} ${selectedCoin}`;
		} else {
			completeMessage = `You ${result} ${betAmount} ${selectedCoin}`;
		}

		toast.success(completeMessage, {
			autoClose: 30000,
			toastStyle: {
				top: "50%",
				transform: "translateY(-50%)",
			},
			bodyClassName: "center-toast-body",
			onClose: resetFlippingState,
		});
	};

	const resetFlippingState = () => {
		setResult("");
		setWinningResult("");
		setFlippingInProgress(false);
		setIsCoinSelected(false);
		setIsTossSelected(null);
		setCoinButtonSize(null);
		setBetAmount("");
	};

	return (
		<>
			<div className="bg-img">
				<div id="buttons-div">
					<div className="button-container">
						<Coin
							option={props.option}
							isCoinSelected={isCoinSelected}
							setIsCoinSelected={setIsCoinSelected}
							onSizeChange={onCoinButtonSizeChange}
							onBetAmountChange={onBetAmountChange}
						/>
					</div>
					<div className="button-container" style={{ width: coinButtonSize }}>
						<Toss
							isTossSelected={isTossSelected}
							setIsTossSelected={setIsTossSelected}
							onTossSelect={handleTossSelect}
						/>
					</div>
				</div>

				<div className="center-content">
					<div className="hello">
						<button
							onClick={FlipCoin}
							className="flip-btn"
							disabled={!isCoinSelected || !isTossSelected}
						>
							FLIP
						</button>

						<div id="coin" className={result} key={+new Date()}>
							{result === "" && winningResult === "" && (
								<div className="side-a"></div>
							)}
							{result === "flipping" && <div className="side-c"></div>}
							{winningResult === "astroman" && <div className="side-b"></div>}
							{winningResult === "alien" && <div className="side-a"></div>}
						</div>
					</div>

					{isOpen && <ConnectPopup onClose={togglePopup} />}

					<ToastContainer
						position="top-center"
						autoClose={3000}
						closeOnClick
						pauseOnHover
					/>
				</div>
				<Transactions />
			</div>
		</>
	);
};

export default MainSection;
