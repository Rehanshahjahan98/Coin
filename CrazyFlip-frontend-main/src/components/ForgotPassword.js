import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from 'axios';
import './FaqPopup.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://185.193.126.26:8080/forgot', { email });
      alert(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
    <div className="navbar">
        <Navbar />
    </div>
    <div className="main-container1">
      <form>
        <h2>Forgot Password</h2>
        <div className="input-container">
          <i className="fa fa-envelope icon"></i>
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit" className="btn">
          Reset Password
        </button>
        <div className="line-container">
          <div className="link-container">
            <a href="/login">Back to Login</a>
          </div>
        </div>
      </form>
    </div>
   </>
  );
};

export default ForgotPassword;
