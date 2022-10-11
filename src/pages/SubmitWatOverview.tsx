import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListOfClass from "../components/ListOfClass";
import { ClassInterface } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const SubmitwatOverview = ({
  token,
  setClassParam,
}: ClassInterface): JSX.Element => {
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${SERVER}submitwat`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setClassList(data.rows);
      });
  }, []);

  // open popup form
  const handleAdd = (): void => {
    // console.log("add");
    navigate("/main/submitwat/addclass");
  };

  return (
    <div className="flex flex-col items-center gap-7">
      <h1 className="text-3xl">Submit Wat</h1>

      <div className="flex flex-row gap-4 items-center">
        <h3 className="text-2xl">Class</h3>
        <a
          className="inline-block rounded-2xl border border-current px-2 py-2 text-sm font-medium text-slate-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"
          onClick={handleAdd}
        >
          Add +
        </a>
        {/* <AddClass token={token} /> */}
      </div>
      <ListOfClass classList={classList} setClassParam={setClassParam} />
    </div>
  );
};

export default SubmitwatOverview;

// add class component
// see list of existing class component
