import React from "react";
import LoginForm from "../components/LoginForm";
import { CommonInterface } from "../Interface/Interface";
const LoginPage = ({ setToken }: CommonInterface): JSX.Element => {
  return (
    <div className="flex flex-col items-center m-20">
      <img src="TeachSpaceLogo.png" alt="TeachSpace Logo" className="w-1/2" />
      <LoginForm setToken={setToken} />
    </div>
  );
};

export default LoginPage;

//Plan
// title
// login form - login component
// link to sign up
