import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a POST request to the backend logout endpoint
      const response = await axios.get('http://185.193.126.26:8080/logout');
      console.log(response, "response");

      // Check the response status and handle accordingly
      if (response.status === 200) {
        console.log();
        toast.success('Logout successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Redirect the user to the login page or any other desired location after successful logout
        navigate('/login'); 
      } else {
        toast.error('Failed to logout. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error, 'Error during logout:');
      toast.error('An error occurred during logout. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <button onClick={handleLogout} style={{
    margin: "0",
    padding: "0",
    paddingTop: "0",
    marginTop: "0"
  }} type="button"  className="bg-transparent text-white fs-15 btn pb-0 p-0 btn-primary logout_btn">
         AFFILIATE LOG OUT
     </button> 
  );
};

export default LogoutButton;



// ==========
