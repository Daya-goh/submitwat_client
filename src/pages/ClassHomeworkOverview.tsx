import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

import { Formik, useFormik } from "formik";
import * as Yup from "yup";

export interface ClassDetail {
  id: number;
  name: string;
  teacher: number;
  class_name?: string;
}

const ClassOverview = ({ classParam, token, setColumnName }): JSX.Element => {
  const [yourClassHeader, setYourClassHeader] = useState([]);
  const [classList, setClassList] = useState<ClassDetail[]>([]);
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

  const formik = useFormik({
    initialValues: {
      assignmentName: "",
      date: new Date().toLocaleDateString("en-CA"),
    },
    validationSchema: Yup.object({
      assignmentName: Yup.string()
        .trim("Assignment name cannot include spaces")
        .strict(true)
        .required("*Required"),
      date: Yup.date()
        .max(new Date(), "Cannot log future submissions")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      const url = `${SERVER}submitwat/${classParam}/addhw`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.hwColumnName);
          setColumnName(data.hwColumnName);
          navigate(`/main/submitwat/${classParam}/addhw/${data.hwColumnName}`);
        });
    },
  });

  /* ------------------- homework header button ------------------- */
  const handleHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("click");
    console.log(e?.target.id);
    setColumnName(e.target.id);
    navigate(`/main/submitwat/${classParam}/${e.target.id}`);
  };

  /* --------------------- delete class button -------------------- */
  const handleDelete = (): void => {
    const url = `${SERVER}submitwat/${classParam}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json().then((data) => console.log(data)));
    navigate(`/main/submitwat`);
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative">
          <h3 className="text-lg font-bold">Homework details</h3>

          <div>
            <h1>Assignment Name</h1>

            <form onSubmit={formik.handleSubmit}>
              {/* <input type="date" /> */}
              <input
                type="text"
                name="assignmentName"
                onChange={formik.handleChange}
                value={formik.values.assignmentName}
                className="input input-bordered w-full max-w-xs"
              />
              {formik.touched.assignmentName && formik.errors.assignmentName ? (
                <div className="text-sm text-red-500 italic">
                  {formik.errors.assignmentName}
                </div>
              ) : null}
              <input
                type="Date"
                name="date"
                onChange={formik.handleChange}
                value={formik.values.date}
                className="input input-bordered w-full max-w-xs"
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-sm text-rose-500 italic">
                  {formik.errors.date}
                </div>
              ) : null}

              {/* <button type="submit">Add</button> */}
              <button type="submit">Add</button>
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

      <div>
        <label htmlFor="my-modal-3" className="btn btn-error">
          Delete Class
        </label>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-error btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold">Confirm deletion?</h3>
            <p className="py-4">
              Do you really want to delete this Class Info? All data will be
              lost!
            </p>
            <label
              htmlFor="my-modal-3"
              className="btn btn-error"
              onClick={() => handleDelete()}
            >
              Confirm
            </label>
          </div>
        </div>
      </div>

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
                  <td
                    key={index}
                    className={`text-center ${
                      student[header.name] === `not submitted` ||
                      student[header.name] === `late`
                        ? `bg-red-50`
                        : ""
                    } ${student[header.name] === `absent` ? `bg-blue-50` : ""}`}
                  >
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
