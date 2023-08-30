import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Lottery.css";
import SideLogo from "../assets/side-logo.png";
import ComingSoon from "../assets/coming soon logo.png";

export default function Lottery() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="bg-poster">
        <div className="logo-container">
          <img src={SideLogo} alt="ALT-S" id="hopium-logo" />
          <img src={ComingSoon} alt="comingSoon" id="coming-soon-logo" />
        </div>
      </div>
    </>
  );
}
