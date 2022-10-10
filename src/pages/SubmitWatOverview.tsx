import React, { useEffect, useState } from "react";
import AddClass from "../components/AddClass";
import ClassList from "../components/ClassList";
const SERVER = import.meta.env.VITE_SERVER;

const SubmitwatOverview = ({ token, setClassParam }): JSX.Element => {
  const [classList, setClassList] = useState([]);

  //! teachers' classes not uploaded when new class is added
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

  return (
    <div className="flex flex-col items-center gap-7">
      <h1 className="text-3xl">Submit Wat</h1>

      <div className="flex flex-row gap-4 items-center">
        <h3 className="text-2xl">Class</h3>
        <AddClass token={token} />
      </div>
      <ClassList classList={classList} setClassParam={setClassParam} />
    </div>
  );
};

export default SubmitwatOverview;

// add class component
// see list of existing class component
