import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteTodo from "../components/NoteTodo";
import {
  classHeaderInterface,
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
  const [submitted, setSubmitted] = useState(null);
  const [list, setList] = useState<Details[]>([]);
  const [noteContent, setNoteContent] = useState<Note[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const navigate = useNavigate();

  console.log(yourClassHeader);

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

        setYourClassHeader(data.homework.fields);
        setClassList(array);
        setSubmitted(data.submittedNum.rows[0].submittedtotal);
        setList(data.notSubmittedList.rows);
      });

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
        console.log(data.rows);
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

      <button onClick={handleSave} className="btn btn-primary btn-square">
        Save
      </button>
      <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-20 w-2/5">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {yourClassHeader.map((header, index) => (
                <th key={index} id={String(index)}>
                  <h3 id={header.name}>{header.name}</h3>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {classList.map((student, index) => (
              <tr key={index}>
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

      <div>
        <label htmlFor="my-modal-3" className="btn btn-error">
          Delete homework
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
              Do you really want to delete the homework? All data will be lost!
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
  );
};
export default HomeworkOverview;
