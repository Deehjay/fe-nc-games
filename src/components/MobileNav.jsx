import React, { useContext } from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/users";

const MobileNav = ({ isLoggedIn, user }) => {
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/my-profile");

    setTimeout(() => {
      setUser({ username: "Guest" });
      setIsLoggedIn(false);
      localStorage.clear();
    }, 1000);
  };

  return (
    <nav class="top-nav">
      <div>Logo Here</div>
      <input id="menu-toggle" type="checkbox" />
      <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button"></div>
      </label>
      <ul class="menu">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
        <li>Four</li>
        <li>Five</li>
      </ul>
    </nav>
    // <nav className="nav">
    //   <Link to="/" id="logo">
    //     HOUSE OF GAMES
    //   </Link>
    //   <Menu right width={"100vw"} height={"100vw"}>
    //     {isLoggedIn ? (
    //       <a className="menu-item" onClick={handleLogout} href="/">
    //         Logout
    //       </a>
    //     ) : (
    //       <a className="menu-item" href="/login">
    //         Login
    //       </a>
    //     )}
    //   </Menu>
    // </nav>
  );
};

export default MobileNav;
