import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" exact className="nav-link" activeClassName="active">
        Player Comparison
      </NavLink>
      <NavLink to="/about" className="nav-link" activeClassName="active">
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;
