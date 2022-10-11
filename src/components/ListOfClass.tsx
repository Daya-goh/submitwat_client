import React from "react";
import { useNavigate } from "react-router-dom";
import { ClassInterface } from "../Interface/Interface";
// const SERVER = import.meta.env.VITE_SERVER;

const ListOfClass = ({
  classList,
  setClassParam,
}: ClassInterface): JSX.Element => {
  const navigate = useNavigate();

  const handleClass = (e: React.MouseEvent): void => {
    setClassParam((e.target as HTMLButtonElement).id);
    navigate(`/main/submitwat/${(e.target as HTMLButtonElement).id}`);
  };

  console.log(classList);

  return (
    <div>
      <table className="table table-zebra w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th></th>
            <th>Class Name</th>
          </tr>
        </thead>
        {classList.map((each, index) => (
          <tbody key={index}>
            <tr>
              <th className="text-center">{index + 1}</th>
              <td className="text-center">
                <button onClick={(e) => handleClass(e)} id={each.class_name}>
                  {each.class_name}{" "}
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default ListOfClass;
