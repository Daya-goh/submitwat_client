import React from "react";

const UpdateStatus = ({
  columnName,
  body,
  statusArray,
  setStatusArray,
  setEvent,
}): JSX.Element => {
  // function to update the change in submission status
  const handleChange = (e) => {
    console.log(e.target);
    setEvent(e.target);
    // statusArray.splice(e.target.id - 1, 1, e.target.value);
    // console.log(statusArray);
    // setStatusArray(statusArray);
  };
  console.log("reloaded");
  console.log(statusArray);

  return (
    <div>
      <h1>table</h1>
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
              <th className="text-center">{index + 1}</th>

              <td className="text-center">
                <>{each}</>
                <form>
                  <select
                    key={index + 1}
                    defaultValue={each}
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

export default UpdateStatus;
