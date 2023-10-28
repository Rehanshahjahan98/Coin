import React from "react";
import Navbar from "../components/Navbar";
import AffNetwork from "../components/AffNetwork";
import "./LoginPage.css";



export default function LoginPage() {
  
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="login-page">
        <AffNetwork />
      </div>
    </>
  );
}
