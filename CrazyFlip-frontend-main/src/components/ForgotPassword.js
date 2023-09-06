
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("before request");
      const response = await axios.post('http://185.193.126.26:8080/forgot', {email}
      );
    //   setMessage(response.data.message);
    alert(response.data.message);
    } catch (error) {
      console.log(error, "err message");
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='text-white'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Reset Password</button>
      </form>

      {/* Link to go back to the Login page */}
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default ForgotPassword;
