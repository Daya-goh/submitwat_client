import React, { useEffect, useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;

const HomeworkOverview = ({ columnName, token, classParam }) => {
  const [yourClassHeader, setYourClassHeader] = useState([]);
  const [classList, setClassList] = useState([]);
  const [submitted, setSubmitted] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    const url = `${SERVER}submitwat/${classParam}/${columnName}`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setYourClassHeader(data.homework.fields);
        setClassList(data.homework.rows);
        setSubmitted(data.submittedNum.rows[0].submittedtotal);
        setList(data.notSubmittedList.rows);
      });
  }, []);
  console.log(submitted);
  console.log(list);
  return (
    <div>
      <h1>
        {columnName} {classParam}
      </h1>
      <div
        className="radial-progress"
        style={{ "--value": (submitted / 4) * 100 }}
      >
        {submitted}
      </div>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-20 w-2/3">
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
      <div className="card w-72 bg-base-100 shadow-xl">
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">Not Submitted</h2>
          {list.map((name, index) => (
            <p key={index}>{name.student_name}</p>
          ))}
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary">Buy Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeworkOverview;
