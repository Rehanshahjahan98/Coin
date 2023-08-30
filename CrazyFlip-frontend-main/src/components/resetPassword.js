
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

 

  return (
    <div className='text-white'>
      <h2>Forgot Password</h2>
      <form>
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

export default ResetPassword;
