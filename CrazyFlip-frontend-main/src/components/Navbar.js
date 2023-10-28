import React, { useState, useContext } from "react";
import SideImage from "../assets/side-logo.png";
import "./Navbar.css";
import FaqPopup from "../components/FaqPopup";
import ConnectPopup from "../components/ConnectPopup";
import { CoinFlipContext } from "../Context/conflipContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [isFaqsOpen, setIsFaqsOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const { currentAccount } = useContext(CoinFlipContext);

  const navigate = useNavigate();

  const toggleFaqsPopup = () => {
    setIsFaqsOpen(!isFaqsOpen);
  };

  const toggleConnectPopup = () => {
    setIsConnectOpen(!isConnectOpen);
  };

  const openAffiliateNetwork = () => {
    navigate("/login");
  };

  const shortenString = currentAccount
    ? currentAccount.substring(0, 6) + "..."
    : "";

  return (
    <>
      <nav>
        <div id="container">
          <a id="main-logo" href="/">
            <img src={SideImage} alt="side-logo" id="main-logo" />
          </a>
          <div id="right-clicks" style={{ zIndex: 9999 }}>
            <div>
              <button className="small-btn" onClick={openAffiliateNetwork}>
                Affiliate Network
              </button>
              <button className="small-btn" onClick={toggleFaqsPopup}>
                FAQ
              </button>
              {currentAccount ? (
                <button className="small-btn shorten-string" onClick={toggleConnectPopup}>
                  {shortenString}
                </button>
              ) : (
                <button className="small-btn" onClick={toggleConnectPopup}>
                  Connect
                </button>
              )}
            </div>
            {isFaqsOpen && (
              <div className="faq-card-container">
                <FaqPopup onClose={toggleFaqsPopup} />
              </div>
            )}
            {isConnectOpen && (
              <div className="connect-popup-container">
                <ConnectPopup onClose={toggleConnectPopup} />
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
