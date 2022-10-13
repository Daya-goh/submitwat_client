import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  ClassDetail,
  CommonInterface,
  YourClassHeader,
} from "../Interface/Interface";
import SubmitWatBanner from "../SubmitWatBanner";

const ClassOverview = ({
  classParam,
  token,
  setColumnName,
}: CommonInterface): JSX.Element => {
  const [yourClassHeader, setYourClassHeader] = useState<ClassDetail[]>([]);
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
      // alert(JSON.stringify(values, null, 2));
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
          setColumnName && setColumnName(data.hwColumnName);
          navigate(`/main/submitwat/${classParam}/addhw/${data.hwColumnName}`);
        });
    },
  });

  /* ------------------- homework header button ------------------- */
  const handleHeader = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("click");
    console.log(e?.currentTarget.id);
    setColumnName && setColumnName(e.currentTarget.id);
    navigate(`/main/submitwat/${classParam}/${e.currentTarget.id}`);
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
  /* -------------------------------------------------------------------------------------------- */
  return (
    <div className="flex flex-col gap-2 items-center">
      <SubmitWatBanner />

      <div className="flex flex-row ">
        {/* new homework modal */}
        <div>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative">
              <h3 className="text-lg font-bold">Homework details</h3>

              <div>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col items-center gap-3"
                >
                  {/* <input type="date" /> */}
                  <h1>Assignment Name</h1>
                  <input
                    type="text"
                    name="assignmentName"
                    onChange={formik.handleChange}
                    value={formik.values.assignmentName}
                    className="input input-bordered w-full max-w-xs"
                  />
                  <p className="text-xs">
                    Please do not have spaces in assignment name
                  </p>
                  {formik.touched.assignmentName &&
                  formik.errors.assignmentName ? (
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

                  <button
                    type="submit"
                    className="btn bg-blue-400 border-blue-400 hover:bg-blue-300 hover:border-blue-300"
                  >
                    Add
                  </button>
                </form>
              </div>
            </label>
          </label>
        </div>

        {/* delete homework modal container*/}
        <div>
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

              {/* delete class modal */}
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

        {/* buttons container on the screen */}
        <div className="flex flex-row justify-between w-screen m-4 px-4">
          {/* class avatar */}
          <div className="avatar online placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
              <span className="text-xl">{classParam}</span>
            </div>
          </div>

          {/* button to add a homework */}
          <div className="flex flex-row gap-5">
            <a
              className="btn bg-orange-500 border-orange-500 modal-button hover:bg-orange-600 hover:border-orange-600"
              onClick={handleAddHw}
            >
              <label
                htmlFor="my-modal-4"
                className="modal-button relative text-sm font-medium text-black "
                onClick={handleAddHw}
              >
                New Homework
              </label>
            </a>

            {/* button to delete class */}
            <div>
              <label htmlFor="my-modal-3" className="btn btn-error text-black">
                Delete Class
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* table container of students with homework */}
      <div className="overflow-hidden overflow-x-auto rounded-sm border border-gray-20 w-3/5 h-full">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr className="h-8">
              {yourClassHeader.map((header: YourClassHeader, index) => (
                <th key={index} id={String(index)}>
                  <button
                    onClick={(e) => handleHeader(e)}
                    id={String(header.name)}
                  >
                    {header.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classList.map((student, index) => (
              <tr key={index} className="h-10">
                {yourClassHeader.map((header, index) => (
                  <td
                    key={index}
                    id={String(student.student_id)}
                    className={`text-center ${
                      student[header.name] === `late`
                        ? `bg-red-100`
                        : "" || student[header.name] === `not submitted`
                        ? `bg-red-100`
                        : ""
                    } ${
                      student[header.name] === `absent` ? `bg-blue-100` : ""
                    }`}
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
