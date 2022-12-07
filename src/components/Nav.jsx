import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/users";

const Nav = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const handleLogout = () => {
    setUser({ username: "Guest" });
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav">
      <Link to="/">
        <a href="#">HOME</a>
      </Link>
      {isLoggedIn ? (
        <div className="logged-in">
          <img src={user.avatar_url} alt={user.username} />
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </div>
      ) : (
        <Link to="/login">
          <a href="#">Login</a>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
