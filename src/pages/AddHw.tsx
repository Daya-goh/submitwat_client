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

  console.log(statusArray);

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
    <div>
      <div>
        <button onClick={handleSave} className="btn btn-primary btn-square">
          Save
        </button>
        <button onClick={handleAll} className="btn btn-primary ">
          submit ? to all
        </button>
      </div>

      <table className="table w-96">
        <thead>
          <tr>
            <th>Name</th>
            <th>{columnName}</th>
          </tr>
        </thead>
        <tbody>
          {statusArray.map((each, index) => (
            <tr key={index}>
              <th className="text-center">
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
