import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER = import.meta.env.VITE_SERVER;

interface Details {
  student_id: null;
  student_name: string;
  status: string;
}
export interface HomeworkDetails {
  columnName: string;
  token: string;
  classParam: string;
}

const HomeworkOverview = ({
  columnName,
  token,
  classParam,
}: HomeworkDetails) => {
  const [yourClassHeader, setYourClassHeader] = useState([]);
  const [classList, setClassList] = useState<Details[]>([]);
  const [submitted, setSubmitted] = useState(null);
  const [list, setList] = useState([]);
  const [note, setNote] = useState("");
  const [noteContent, setNoteContent] = useState([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
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

        setYourClassHeader(data.homework.fields);
        setClassList(array);
        setSubmitted(data.submittedNum.rows[0].submittedtotal);
        setList(data.notSubmittedList.rows);
      });

    interface Note {
      id: number;
      note: string;
      checkedStatus: boolean;
    }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  /* -------------------------- notes todo -------------------------- */
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setNote(e.target.value);
  };

  const handleNoteAdd = () => {
    console.log("add");
    if (note === "null" || note === "") {
      setStatus("Please type something in the input box");
    } else {
      const newNote = {
        content: note,
      };

      const url = `${SERVER}submitwat/${classParam}/${columnName}`;
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      setStatus("");
      setRefresh(refresh + 1);
    }
  };

  /* ----------------------- toggle checkbox ---------------------- */
  const handleNoteCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(noteContent);
    const array = noteContent.map((eachNote) => {
      console.log(Number(e.target.id), eachNote.id);
      if (Number(e.target.id) === eachNote.id) {
        console.log("bye");
        console.log(e.target.checked);
        eachNote.checkedStatus = !eachNote.checkedStatus;
        console.log(eachNote.checkedStatus);
        return eachNote;
      } else {
        return eachNote;
      }
    });
    console.log("hi");
    setNoteContent(array);

    const noteStatusObj = {
      id: Number(e.target.id) + 1,
      status: e.target.checked,
    };

    const notesStatusURL = `${SERVER}submitwat/${classParam}/${columnName}/note`;
    fetch(notesStatusURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noteStatusObj),
    }).then((response) => response.json().then((data) => console.log(data)));
    // setRefresh(true);
  };

  const handleNoteDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const notesDelete = {
      id: Number(e.target.id) + 1,
    };

    const notesStatusURL = `${SERVER}submitwat/${classParam}/${columnName}/note`;
    fetch(notesStatusURL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notesDelete),
    }).then((response) => response.json().then((data) => console.log(data)));
    setRefresh(refresh + 1);
  };

  return (
    <div>
      {console.log(refresh)}
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
                <th key={index} id={index}>
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
                      id={index + 1}
                    >
                      <option id={index + 1} value="null">
                        nil
                      </option>
                      <option id={index + 1} value="not submitted">
                        Not Submitted
                      </option>
                      <option id={index + 1} value="absent">
                        Absent
                      </option>
                      <option id={index + 1} value="submitted">
                        Submitted
                      </option>
                      <option id={index + 1} value="late">
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

      <div>
        <div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-sm w-full max-w-xs"
            onChange={(e) => handleNoteChange(e)}
          />
          <p>{status}</p>
          <button className="btn btn-primary" onClick={() => handleNoteAdd()}>
            add
          </button>
        </div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Notes</h2>
          </div>
          <div>
            {noteContent.map((each, index) => (
              <div className="form-control" key={index}>
                <label className="label cursor-pointer">
                  <span className="label-text">{each.note}</span>
                  <input
                    type="checkbox"
                    checked={each.checkedStatus}
                    className="checkbox"
                    key={index}
                    id={each.id}
                    onChange={(e) => handleNoteCheck(e)}
                  />
                </label>
                <label className="label cursor-pointer">
                  <button
                    className="w-6 h-6 border-2 rounded-md"
                    id={each.id}
                    onClick={(e) => handleNoteDelete(e)}
                  >
                    ✖
                  </button>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeworkOverview;
