import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className="nav-link" activeclassname="active">
          Player Comparison
        </NavLink>
        <NavLink to="/about" className="nav-link" activeclassname="active">
          About
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
