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
      <Link to="/" id="logo">
        HOUSE OF GAMES
      </Link>
      {isLoggedIn ? (
        <div className="logged-in">
          <img src={user.avatar_url} alt={user.username} />
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Nav;
