import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Sidelogo from "../assets/side-logo.png";
import "./Homepage.css";

function NavbarContainer(props) {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>

      <div className="container-div">
        <div className="content-container">
          <img src={Sidelogo} alt="side-logo" id="side-logo" />
          <p id="text-content">
            Play with your Favorite IN-GAME Tokens <br />
            Just Connect your wallet, no need to register
          </p>
        </div>
      </div>
    </>
  );
}

export default function Homepage() {
  return (
    <>
      <Sidebar />
      <NavbarContainer />
    </>
  );
}
