import React, { useState } from "react";
import { NoteInterface } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const NoteTodo = ({
  token,
  classParam,
  columnName,
  setRefresh,
  refresh,
  noteContent,
  setNoteContent,
}: NoteInterface) => {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<string>("");

  /* -------------------------- notes todo -------------------------- */
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  /* -------------------------- add note -------------------------- */
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
      }).then((response) => response.json());
    }
    setNote(" ");
    setStatus("");
    setRefresh(refresh + 1);
  };

  /* ----------------------- toggle checkbox ---------------------- */
  const handleNoteCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = noteContent.map((eachNote) => {
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
    }).then((response) => response.json());
  };

  /* ------------------------- delete note ------------------------ */
  const handleNoteDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const notesDelete = {
      id: Number(e.currentTarget.id) + 1,
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
  /* ---------------------------------------------------------------------------------------------------- */
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-full">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-sm w-full max-w-xs"
                onChange={(e) => handleNoteChange(e)}
                value={note}
              />
              <p className="text-xs text-red-500">{status}</p>
            </div>

            <label className="label cursor-pointer">
              <div
                className="bg-blue-500 w-12 h-8 rounded-md flex justify-center items-center"
                onClick={() => handleNoteAdd()}
              >
                <span>&#8594;</span>
              </div>
            </label>
          </div>

          <h2 className="card-title">Notes</h2>

          <div>
            {noteContent.map((each, index) => (
              <div
                className="form-control flex flex-row items-center justify-between my-3 border-b border-slate-100
                "
                key={index}
              >
                <span className="label-text text-lg">{each.note}</span>
                <div className="flex flex-row">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      checked={each.checkedStatus}
                      className="checkbox"
                      key={index}
                      id={String(each.id)}
                      onChange={(e) => handleNoteCheck(e)}
                    />
                  </label>
                  <label className="label cursor-pointer">
                    <button
                      className="w-6 h-6 border-2 rounded-md"
                      id={String(each.id)}
                      onClick={(e) => handleNoteDelete(e)}
                    >
                      ✖
                    </button>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteTodo;
