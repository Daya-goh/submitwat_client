import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

interface TokenProp {
  token: string;
}

const MainPage = ({ token }: TokenProp): JSX.Element => {
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
    <div className="flex flex-col items-center content-center gap-8">
      <h1 className="text-5xl">Welcome</h1>

      <div className="flex flex-row gap-5">
        <a
          className="group relative inline-block focus:outline-none focus:ring"
          onClick={handleSubmitwat}
        >
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
            SubmitWat
          </span>
        </a>

        <a className="group relative inline-block focus:outline-none focus:ring">
          <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75 ">
            To Do List
            <div className="badge badge-accent">!</div>
          </span>
        </a>
      </div>
    </div>
  );
};

export default MainPage;
