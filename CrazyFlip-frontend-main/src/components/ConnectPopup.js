import React, { useContext } from "react";
import "./ConnectPopup.css";
import metaMask from "../assets/MetaMaskLogo.png";
import discord from "../assets/discord.png";
import { CoinFlipContext } from "../Context/conflipContext";
import Sidelogo from "../assets/side-logo.png";

const ConnectPopup = (props) => {
  const { connectWallet, currentAccount } = useContext(CoinFlipContext);

  const handleClose = () => {
    props.onClose();
  };

  const connect = async () => {
    await connectWallet();
    console.log(currentAccount, "...");
    handleClose();
  };

  return (
    <div className="popup-container">
      {/* <div className='topDiv'></div> */}
      <div className="d-flex justify-content-center mb-0">
        <img
          className="hopiumbet-logo"
          style={{ height: "90px" }}
          src={Sidelogo}
          alt="side-logo"
        />
      </div>
      <h2
        className="support-wallet"
        style={{ textAlign: "center", marginTop: "0px" }}
      >
        Connect Supported Wallet
      </h2>
      <div>
        <div
          className="d-flex justify-content-between px-4 metamask-main-div"
          style={{ marginTop: "70px" }}
        >
          <div className="tableRow">
            <img src={metaMask} alt="metamask-logo" className="metamask-logo" />
            <h2 className="mb-0 meta-mask">METAMASK</h2>
          </div>
          {/* </td> */}
          {/* <td> */}
          <button className="connectBtn" onClick={connect}>
            Connect
          </button>
        </div>

        <h3 id="chatBtn">
          <img src={discord} alt="metamask-logo" className="metamask-logo" />
          <a
            href="https://discord.gg/RjAvVnDMAS"
            target="_blank"
            rel="noreferrer"
          >
            Need Help Connecting?
          </a>
        </h3>

        <div className="d-flex justify-content-center">
          <button
            className="connectBtn close-btn"
            onClick={handleClose}
            style={{ marginTop: "70px" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectPopup;
