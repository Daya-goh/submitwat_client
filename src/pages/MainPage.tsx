import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonInterface } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const MainPage = ({ token }: CommonInterface): JSX.Element => {
  const navigate = useNavigate();
  const handleSubmitwat = () => {
    navigate("/main/submitwat");
  };

  useEffect(() => {
    const url = `${SERVER}main`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json);
  }, []);

  return (
    <div className="flex flex-col items-center content-center gap-8 m-10">
      <h1 className="text-3xl font-thin text-blue-900">Pick an app to start</h1>

      <div className="flex flex-row gap-5">
        <a
          className="group relative inline-block focus:outline-none focus:ring"
          onClick={handleSubmitwat}
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0 items-center"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 w-36 text-center">
            <span>&#10000;</span> <br />
            SubmitWat
          </span>
        </a>

        <a className="group relative inline-block focus:outline-none focus:ring">
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-blue-400 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 w-36 text-center">
            Kanban
            <div className="badge badge-accent">!</div>
          </span>
        </a>
      </div>
    </div>
  );
};

export default MainPage;
