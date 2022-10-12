import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { CommonInterface } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const LoginForm = ({ setToken }: CommonInterface): JSX.Element => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("*Required"),
      password: Yup.string().required("*Required"),
    }),
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));

      const res = await fetch(`${SERVER}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.msg === "No such user found.") {
        alert("No such user found. Please create an account.");
        navigate("/login");
      } else if (data.msg === "Wrong username or password.") {
        alert("Wrong username or password. Please try again.");
        navigate("/login");
      } else {
        //   setUsername(data.userid);
        setToken(data.token);
        navigate("/main");
      }
    },
  });

  return (
    <div className="flex m-6">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 items-center bg-opacity-70 p-5 mx-14 rounded-md"
      >
        <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
            <div className="flex self-center text-black-800 font-light mr-3">
              Username
            </div>
            <input
              name="username"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="input input-bordered"
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <div className="text-sm text-red-500 italic">
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row w-72 justify-between">
            <div className="flex self-center text-black-800 font-light mr-3">
              Password
            </div>
            <input
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="input input-bordered"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-rose-500 italic">
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="block w-full px-12 py-3 text-sm font-medium text-white border bg-blue-900 border-blue-900 rounded md:w-auto active:text-opacity-75 hover:bg-blue-800 hover:border-blue-800 hover:text-white focus:outline-none focus:ring drop-shadow-xl"
        >
          Login
        </button>

        <Link
          to="/signup"
          className="text-xs text-blue-900 hover:text-blue-800"
        >
          Create a new account
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
