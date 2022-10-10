import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

const ClassOverview = ({ classParam, token, setColumnName }): JSX.Element => {
  const [yourClassHeader, setYourClassHeader] = useState([]);
  const [classList, setClassList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const classHwUrl = `${SERVER}submitwat/${classParam}`;
    fetch(classHwUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setYourClassHeader(data.fields);
        setClassList(data.rows);
        console.log(data.fields);
        console.log(data.rows);
      });
  }, []);

  const handleAddHw = (): void => {
    console.log("add");
  };

  /* ------------------------- popup form ------------------------- */
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [statusMsg, setStatusMsg] = useState<string>(" ");

  const handleAddHW = (e) => {
    e.preventDefault();
    console.log("go");
    if (input === null || input === "" || date === null || date === "") {
      setStatusMsg("*Required");
    } else {
      setStatusMsg("");
      const keyword = {
        keyword: input,
        date: date,
      };
      console.log(keyword);
      // console.log("click");
      //create column
      const url = `${SERVER}submitwat/${classParam}/addhw`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(keyword),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.hwColumnName);
          setColumnName(data.hwColumnName);
          navigate(`/main/submitwat/${classParam}/addhw/${data.hwColumnName}`);
        });
    }
  };

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const handleDate = (e) => {
    // console.log(e.target.value);
    setDate(e.target.value);
  };

  const handleHeader = (e) => {
    console.log("click");
    console.log(e?.target.id);
    setColumnName(e.target.id);
    navigate(`/main/submitwat/${classParam}/${e.target.id}`);
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className="text-lg font-bold">Homework details</h3>
          <div>
            <h1>Name of assignment</h1>
            <form onSubmit={(e) => handleAddHW(e)}>
              {/* <input type="date" /> */}
              <input
                type="text"
                name="homework"
                onChange={handleChange}
                value={input}
                className="input input-bordered w-full max-w-xs"
              />
              <p>{statusMsg}</p>
              <input
                type="Date"
                name="date"
                onChange={handleDate}
                className="input input-bordered w-full max-w-xs"
              />
              <p>{statusMsg}</p>

              {/* <button type="submit">Add</button> */}
              <a
                className="inline-block rounded-full border border-indigo-600 p-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                onClick={(e) => {
                  handleAddHW(e);
                }}
              >
                <span className="sr-only"> Add </span>

                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </form>
          </div>
          {/* <p className="py-4">Test</p> */}
        </label>
      </label>

      <h1>Overview of class</h1>

      {/* button to add a homework */}
      <a
        className="group relative inline-block overflow-hidden border border-orange-600 px-6 py-2 focus:outline-none focus:ring"
        onClick={handleAddHw}
      >
        <span className="absolute inset-y-0 left-0 w-[2px] bg-orange-600 transition-all group-hover:w-full group-active:bg-orange-500"></span>
        <label
          htmlFor="my-modal-4"
          className="modal-button relative text-sm font-medium text-orange-600 transition-colors group-hover:text-white"
        >
          Track a new homework
        </label>
      </a>

      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-20 w-4/5">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {yourClassHeader.map((header, index) => (
                <th key={index} id={index}>
                  <button onClick={(e) => handleHeader(e)} id={header.name}>
                    {header.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classList.map((student, index) => (
              <tr key={index}>
                {yourClassHeader.map((header, index) => (
                  <td key={index} className="text-center">
                    {student[header.name]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassOverview;
