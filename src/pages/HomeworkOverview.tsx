import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteTodo from "../components/NoteTodo";
import SubmitWatBanner from "../SubmitWatBanner";
import {
  classHeaderInterface,
  // classTotal,
  CommonInterface,
  Details,
  Note,
} from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const HomeworkOverview = ({
  columnName,
  token,
  classParam,
}: CommonInterface) => {
  const [yourClassHeader, setYourClassHeader] = useState<
    classHeaderInterface[]
  >([]);
  const [classList, setClassList] = useState<Details[]>([]);
  const [submitted, setSubmitted] = useState<number>(0);
  const [list, setList] = useState<Details[]>([]);
  const [noteContent, setNoteContent] = useState<Note[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  // const [num, setNum] = useState<classTotal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const urlClassList = `${SERVER}submitwat/${classParam}/${columnName}`;
    fetch(urlClassList, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const array: Details[] = [];
        for (const each of data.homework.rows) {
          const detail: Details = {
            student_id: each.student_id,
            student_name: each.student_name,
            status: each[`${columnName}`],
          };
          array.push(detail);
        }
        // setNum(data.totalNum.rows);
        setYourClassHeader(data.homework.fields);
        setClassList(array);
        setSubmitted(data.submittedNum.rows[0]);
        setList(data.notSubmittedList.rows);
      });
    // console.log(num);
    const notesArray: Note[] = [];
    const urlNotes = `${SERVER}submitwat/${classParam}/${columnName}/note`;
    fetch(urlNotes, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        for (const each of data.rows) {
          const noteObj = {
            id: each.note_id - 1,
            note: each.notes,
            checkedStatus: each.status,
          };
          notesArray.push(noteObj);
        }
        console.log(notesArray);
        setNoteContent(notesArray);
      });
  }, [refresh]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = classList.map((item, index) => {
      if (index === Number(e.target.id) - 1) {
        item.status = e.target.value;
        console.log(index);
        console.log(item);
        return item;
      } else {
        return item;
      }
    });
    setClassList(array);
  };

  const handleSave = (): void => {
    console.log("save");
    console.log(classList);
    const url = `${SERVER}submitwat/${classParam}/${columnName}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(classList),
    }).then((response) => response.json().then((data) => console.log(data)));
    setRefresh(refresh + 1);
  };

  const handleDelete = (): void => {
    const url = `${SERVER}submitwat/${classParam}/${columnName}`;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json().then((data) => console.log(data)));
    navigate(`/main/submitwat/${classParam}`);
  };
  /* ---------------------------------------------------------------------------------------------------------------- */
  return (
    <div className="flex flex-col items-center gap-5">
      <SubmitWatBanner />
      {/* assignment name */}
      <div className="flex flex-row justify-center w-screen px-8">
        <h1 className="text-3xl">
          {columnName} ({classParam})
        </h1>
      </div>

      <div className="flex flex-row w-screen px-32 py-10">
        <div className="flex flex-col w-2/3 gap-3 items-center">
          <div className="flex flex-row gap-10 items-center">
            <div
              className="radial-progress bg-blue-800 text-primary-content border-4 border-blue-800"
              style={{
                ["--value" as string]: (submitted / 40) * 100,
              }}
            >
              {submitted}
            </div>
            <button
              onClick={handleSave}
              className="btn bg-sky-800 border-sky-800 btn-square "
            >
              Save
            </button>
            <div>
              <label htmlFor="my-modal-3" className="btn btn-error">
                Delete homework
              </label>
            </div>

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
                  Do you really want to delete the homework? All data will be
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
          <div className="overflow-hidden overflow-x-auto rounded-sm border border-gray-20 w-5/6">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr className="h-8">
                  {yourClassHeader.map((header, index) => (
                    <th key={index} id={String(index)}>
                      <h3 id={header.name}>{header.name}</h3>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {classList.map((student, index) => (
                  <tr key={index} className="h-8">
                    <td className="text-center">{student.student_id}</td>
                    <td className="text-center">{student.student_name}</td>
                    <td key={index} className="text-center">
                      <form>
                        <select
                          key={index + 1}
                          value={student.status}
                          name="status"
                          onChange={(e) => handleChange(e)}
                          id={String(index + 1)}
                          className="text-center h-10"
                        >
                          <option id={String(index + 1)} value="null">
                            nil
                          </option>
                          <option id={String(index + 1)} value="not submitted">
                            Not Submitted
                          </option>
                          <option id={String(index + 1)} value="absent">
                            Absent
                          </option>
                          <option id={String(index + 1)} value="submitted">
                            Submitted
                          </option>
                          <option id={String(index + 1)} value="late">
                            Late
                          </option>
                        </select>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-5 my-20">
          <div className="card w-72 bg-base-100 shadow-xl">
            <div className="card-body flex flex-col items-left">
              <h2 className="card-title">Not Submitted</h2>
              <ul>
                {list.map((name, index) => (
                  <li key={index} className="list-none">
                    {name.student_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <NoteTodo
            token={token}
            classParam={classParam}
            columnName={columnName}
            setRefresh={setRefresh}
            refresh={refresh}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
          />
        </div>
      </div>
    </div>
  );
};
export default HomeworkOverview;
