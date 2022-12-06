import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <a href="#">HOME</a>
      </Link>
      <a id="nav-login" href="#">
        Log In
      </a>
    </nav>
  );
};

export default Nav;
