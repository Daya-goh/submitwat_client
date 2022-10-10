import React from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
const SERVER = import.meta.env.VITE_SERVER;

//TODO validation for email

YupPassword(Yup);
const SignUpPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .max(15, "Must be at most 15 characters")
        .required("*Required"),
      password: Yup.string()
        .password()
        .minLowercase(1, "Password must contain at least 1 lower-case letter")
        .minUppercase(1, "Password must contain at least 1 upper-case letter")
        .minNumbers(1, "Password must contain at least 1 number")
        .minSymbols(1, "Password must contain at least 1 special character"),
      email: Yup.string().email().required("*Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const url = `${SERVER}signup`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // const data = await res.json();
      navigate("/login");
    },
  });
  return (
    <div>
      <h2>TeachSpace</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 items-center bg-slate-50 bg-opacity-70 p-5 rounded-md"
      >
        <h1 className="text-2xl font-extrabold text-transparent sm:text-3xl bg-clip-text bg-gradient-to-r from-rose-300 via-blue-500 to-purple-600 drop-shadow-xl mb-5">
          Sign up
        </h1>

        <div className="flex flex-row gap-2">
          <div className="flex self-center text-blue-800">Username</div>
          <input
            name="username"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className="input input-bordered"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.username}
            </div>
          ) : null}
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex self-center text-blue-800 m-1">Password</div>
          <input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="input input-bordered"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="flex flex-row gap-2">
          <div className="flex self-center text-blue-800 m-3">Email</div>
          <input
            name="email"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="input input-bordered"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-sm text-red-300 italic">
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="block w-full px-12 py-3 text-sm font-medium text-white bg-rose-500 border border-rose-500 rounded md:w-auto active:text-opacity-75 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring drop-shadow-xl"
        >
          Join
        </button>

        <Link to="/login" className="text-xs hover:text-cyan-700">
          Back to Login
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;

// title
// sign up form
