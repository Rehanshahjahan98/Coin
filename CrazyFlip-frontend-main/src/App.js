import "./App.css";
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Flippage from "./pages/Flippage";
import Lottery from "./pages/Lottery";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CoinFlipProvider } from "../src/Context/conflipContext";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./components/ForgotPassword";
import FaqPage from "./components/FaqPopup";
import Terms from "./components/terms";
import Private from "./components/privacy";

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
          <Route path="/Forgot" element={<ForgotPassword/>}/>
          <Route path="/faq" element={<FaqPage/>}/>
          <Route path="/terms" element={<Terms />}/>
          <Route path="/privacy" element={<Private />}/>

        </Routes>
      </BrowserRouter>
    </CoinFlipProvider>
  );
}

export default App;
