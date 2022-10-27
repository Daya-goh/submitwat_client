import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonInterface, Details } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const AddHw = ({
  columnName,
  classParam,
  token,
}: CommonInterface): JSX.Element => {
  const navigate = useNavigate();
  /* ---------------------- manipulating array ---------------------- */
  // a state to store the statusArray so it can update the table component
  const [statusArray, setStatusArray] = useState<Details[]>([]);

  /* ---------------------------------------------------------------- */

  // to fetch db's homework column
  useEffect(() => {
    const hwURL = `${SERVER}submitwat/${classParam}/addhw/${columnName}`;
    fetch(hwURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.rows);
        const array: Details[] = [];
        for (const each of data.rows) {
          const detail: Details = {
            student_id: each.student_id,
            student_name: each.student_name,
            status: "null",
          };
          array.push(detail);
        }
        setStatusArray(array);
      });
  }, []);

  // function to update the change in submission status
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const array = statusArray.map((item, index) => {
      if (index === Number(e.target.id) - 1) {
        item.status = e.target.value;
        console.log(index);
        console.log(item);
        return item;
      } else {
        return item;
      }
    });
    setStatusArray(array);
  };

  const handleAll = () => {
    const array = statusArray.map((item, index) => {
      if (item.status === "null") {
        item.status = "submitted";
        console.log(index);
        console.log(item);
        return item;
      } else {
        return item;
      }
    });
    console.log(array);
    setStatusArray(array);
  };

  /* ------------------ saving updated data into db ----------------- */

  const handleSave = (): void => {
    console.log("save");
    console.log(statusArray);
    const url = `${SERVER}submitwat/${classParam}/addhw/${columnName}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statusArray),
    }).then((response) => response.json().then((data) => console.log(data)));
    navigate(`/main/submitwat/${classParam}`);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-row justify-end gap-3 w-80">
        <button
          onClick={handleSave}
          className="btn bg-blue-800 border-blue-800 hover:bg-blue-700 hover:border-blue-700 btn-square"
        >
          Save
        </button>
        <button
          onClick={handleAll}
          className="btn  bg-blue-800 border-blue-800 hover:bg-blue-700 hover:border-blue-700 "
        >
          submit ? to all
        </button>
      </div>

      <table className="table w-80">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">{columnName}</th>
          </tr>
        </thead>
        <tbody>
          {statusArray.map((each, index) => (
            <tr key={index}>
              <th className="text-left tracking-wide">
                {each.student_id} {each.student_name}
              </th>

              <td className="text-center">
                <form>
                  <select
                    key={index + 1}
                    value={each.status}
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
  );
};

export default AddHw;
