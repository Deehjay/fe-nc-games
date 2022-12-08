import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api";
import { UserContext } from "../contexts/users";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigateHome = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

  const handleSignIn = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    navigateHome("/");
  };

  return isLoading ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <main className="users-main">
      <h2>Users List</h2>
      <ul className="users-list">
        {users.map((user) => {
          return (
            <li className="user-card" key={user.username}>
              <img src={user.avatar_url} alt={user.username} />
              <h3>{user.username}</h3>
              <button
                onClick={() => {
                  handleSignIn(user);
                }}>
                Select user
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Users;
