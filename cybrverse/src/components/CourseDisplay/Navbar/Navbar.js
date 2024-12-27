// frontend\src\components\Navbar.js

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ handleSelectCategory }) {
  return (
    <div className="nav-container">
      <div className="nav-item">
        <NavLink
          to="/courses/basic"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => handleSelectCategory("basic")}
        >
          Basic
        </NavLink>
      </div>

      <div className="nav-item">
        <NavLink
          to="/courses/intermediate"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => handleSelectCategory("intermediate")}
        >
          Intermediate
        </NavLink>
      </div>

      <div className="nav-item">
        <NavLink
          to="/courses/advanced"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={() => handleSelectCategory("advanced")}
        >
          Advanced
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
