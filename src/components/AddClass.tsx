import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonInterface, CSVObject } from "../Interface/Interface";
import SubmitWatBanner from "../SubmitWatBanner";
const SERVER = import.meta.env.VITE_SERVER;

const AddClass = ({ token }: CommonInterface): JSX.Element => {
  const [file, setFile] = useState<File>();
  const [array, setArray] = useState<CSVObject[]>([]);
  const [classname, setClassname] = useState<string>("");
  const [statusMsg, setStatusMsg] = useState<string>(" ");
  const navigate = useNavigate();

  const fileReader = new FileReader();

  // handle onChange for uploading form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  //modifying text file
  const csvFileToArray = (string: string) => {
    // console.log(string);
    const csvHeader: string[] = string
      .slice(0, string.indexOf("\r"))
      .split(",");
    const csvRows: string[] = string
      .slice(string.indexOf("\n") + 1)
      .split("\n");
    const newCsvRows = [];
    for (const word of csvRows) {
      const newWord = word.replace("\r", "");
      newCsvRows.push(newWord);
    }
    // console.log(newCsvRows);
    // console.log(string.slice(string.indexOf("\n") + 1).split("\r"));
    const array = newCsvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object: CSVObject, header, index) => {
        console.log(object);
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
    console.log(array);
    setArray(array);
    return array;
    ``;
  };

  //submit class list
  const handleOnSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (classname === "" || classname === " ") {
      setStatusMsg("Class name cannot be empty");
    } else {
      const newClass = {
        keyword: classname,
      };

      if (file) {
        fileReader.onload = function (event) {
          const text = event.target?.result as string;
          const array = csvFileToArray(text);
          const url = `${SERVER}submitwat/addclasslist`;
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ array, newClass }),
          }).then((response) =>
            response.json().then((data) => {
              if (data.msg === "error") {
                setStatusMsg("error: class name exist");
              } else {
                setStatusMsg("success: class added");
              }
            })
          );
        };

        fileReader.readAsText(file);
      }
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setClassname(String(e.target.value));
  };

  const handleClassSubmit = (): void => {
    // console.log(classname);
    const newClass = {
      keyword: classname,
    };

    // add record to teacher_class table
    const urlAddClass = `${SERVER}submitwat/addclass`;
    fetch(urlAddClass, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClass),
    }).then((data) => console.log(data));
    navigate("/main/submitwat");
  };

  return (
    <div className="flex flex-col items-center">
      <SubmitWatBanner />
      <div className="flex flex-col items-center gap-5 m-5">
        <form
          encType="multipart/form-data"
          className="flex flex-col items-center gap-5"
        >
          <div className="flex flex-col  items-center">
            <h2 className="text-2xl font-thin">Add A Class</h2>
            <a href="#my-modal-2" className="">
              <div className="badge badge-secondary">!</div>
              Click <span className="text-bold text-red-600">Me</span> before
              uploading class list!
            </a>
            <div className="modal" id="my-modal-2">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Please Take Note</h3>
                <ul>
                  <li>Class List file must be in csv format</li>
                  <li>
                    Rename register number header as{" "}
                    <span className="text-red-600">id</span>
                  </li>
                  <li>
                    Rename students name column as{" "}
                    <span className="text-red-600">name</span>
                  </li>
                </ul>
                <div className="modal-action">
                  <a href="#" className="btn">
                    OK!
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <label>Class</label>
            <input
              type="text"
              name="className"
              className="border-2 input input-bordered"
              onChange={(e) => handleClassChange(e)}
            ></input>
          </div>
          <h4>{statusMsg}</h4>

          <div className="flex flex-row ">
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={handleOnChange}
            />

            <button
              onClick={(e) => {
                handleOnSubmit(e);
              }}
              className="btn bg-blue-600 border-blue-600"
            >
              IMPORT CSV
            </button>
          </div>
        </form>

        {/* show content of uploaded file */}
        <table className="table">
          <thead>
            <tr key={"header"}>
              {headerKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {array.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val, index) => (
                  <td key={index}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => handleClassSubmit()}
          className="btn bg-blue-600 border-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddClass;
