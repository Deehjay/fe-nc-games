import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/users";

const MobileNav = ({ isLoggedIn }) => {
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
    <nav className="top-nav">
      <div>
        <Link id="logo" to="/">
          HOUSE OF GAMES
        </Link>
      </div>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      {isLoggedIn ? (
        <ul className="menu">
          <li>
            <Link className="nav-link" to="/my-profile">
              My Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/post-review">
              New Review
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="menu">
          <li>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default MobileNav;
