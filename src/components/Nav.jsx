import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/users";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const Nav = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return width < breakpoint ? (
    <MobileNav isLoggedIn={isLoggedIn} user={user} />
  ) : (
    <DesktopNav isLoggedIn={isLoggedIn} user={user} />
  );
};

export default Nav;
