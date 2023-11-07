import "./App.css";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import FaqPage from "./components/FaqPopup";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Flippage from "./pages/Flippage";
import Lottery from "./pages/Lottery";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoinFlipProvider } from "../src/Context/conflipContext";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const yourOnChangeFunction = (selectedValue) => {
    console.log(selectedValue);
  };
  

  return (
    <CoinFlipProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route
            path="/flipcoin"
            element={<Flippage onChange={yourOnChangeFunction} />}
          />
          <Route path="/lottery" element={<Lottery />} />
          <Route path="/casino" element={<Lottery />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
	  <Route path="/faq" element={<FaqPage />}/>
        </Routes>
      </BrowserRouter>
    </CoinFlipProvider>
  );
}

export default App;
