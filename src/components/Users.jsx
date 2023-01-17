import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api";
import { UserContext } from "../contexts/users";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigateHome = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getUsers()
      .then((users) => {
        setUsers(users);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr({ err });
      });
  }, []);

  const handleSignIn = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    navigateHome("/");
  };

  if (err) {
    return <ErrorPage message={err.message} />;
  }

  return isLoading ? (
    <Loading />
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
