import React from "react";
import { Outlet } from "react-router-dom";
import { NavBarInterface } from "../Interface/Interface";
import NavBar from "./NavBar";

const Layout = ({ setToken }: NavBarInterface) => {
  return (
    <div>
      <NavBar setToken={setToken} />
      <Outlet />
    </div>
  );
};

export default Layout;
