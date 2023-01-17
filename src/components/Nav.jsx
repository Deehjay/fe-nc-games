import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/users";

const Nav = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setUser({ username: "Guest" });
    setIsLoggedIn(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="nav">
      <Link to="/" id="logo">
        HOUSE OF GAMES
      </Link>
      {isLoggedIn ? (
        <div className="logged-in">
          <Link to="/my-profile">
            <img src={user.avatar_url} alt={user.username} />
          </Link>
          <Link to="/post-review">+</Link>
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
