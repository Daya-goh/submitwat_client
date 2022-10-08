import React, { useEffect, useState } from "react";
const SERVER = import.meta.env.VITE_SERVER;

const ClassOverview = ({ classParam, token }): JSX.Element => {
  const [yourClassHeader, setYourClassHeader] = useState([]);
  const [classList, setClassList] = useState([]);

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
      });
  }, []);
  console.log(yourClassHeader);
  console.log(classList);

  return (
    <div>
      <h1>Overview of class</h1>

      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-20 w-96">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {yourClassHeader.map((header, index) => (
                <th key={index}>{header.name}</th>
              ))}
            </tr>
          </thead>
          {classList.map((student, index) => (
            <tbody className="divide-y divide-gray-200" key={index}>
              <th className="text-center">{student.student_id}</th>
              <td className="text-center">{student.student_name}</td>
              <td className="text-center">{student.class_name}</td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ClassOverview;
