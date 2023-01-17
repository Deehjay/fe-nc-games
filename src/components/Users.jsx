import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api";
import { UserContext } from "../contexts/users";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "react-hook-form";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const navigateHome = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [err, setErr] = useState(null);
  let subtitle;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    console.log(data);
    const foundUser = users.find((user) => user.username === data.user);
    setUser(foundUser);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(foundUser));
    navigateHome("/");
  };

  if (err) {
    return <ErrorPage message={err.message} />;
  }

  return isLoading ? (
    <Loading />
  ) : (
    <main className="login">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label htmlFor="users">Select a user:</label>
          <select name="users" {...register("user", { required: true })}>
            <option value="" selected disabled hidden>
              Select...
            </option>
            {users.map((user) => {
              return <option value={user.username}>{user.username}</option>;
            })}
          </select>
        </Form.Field>
        {errors.user && <p className="form-error">Please select a user</p>}
        <Button type="submit">Log In</Button>
      </Form>
    </main>
  );
};

export default Users;
