import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navLinks = [
    { title: "Casino", path: "/casino", pageName: "/casino" },
    { title: "CoinFlip", path: "/flipcoin", pageName: "/flipcoin" },
    { title: "Lottery", path: "/lottery", pageName: "/lottery" },
  ];

  return (
    <>
    <button className="sidebar-toggle" onClick={handleToggleSidebar}>
      {showSidebar ? <FaTimes /> : <FaBars />}
    </button>
      <nav className={`sidebar ${showSidebar ? "show-sidebar" : ""}`}>
        <ul className="sidebar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <a href={link.path}> {link.title} </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
