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

  // open popup form
  const handleAdd = (): void => {
    // console.log("add");
    navigate("/main/submitwat/addclass");
  };

  const picArray = [
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Frog-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Pumpkin-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Robot-512.png",
    "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Rabbit-512.png",
  ];

  return (
    <div className="flex flex-col items-center">
      <a
        className="inline-block rounded-xl border border-current px-2 py-2 text-sm font-medium text-slate-600 transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500"
        onClick={handleAdd}
      >
        + class
      </a>
      <div className="flex flex-row flex-wrap justify-center gap-5">
        {classList &&
          classList.map((each, index) => (
            <div className="card w-80 bg-white-50 shadow-xl" key={index}>
              <figure className="px-10 pt-10"></figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{each.class_name}</h2>
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={picArray[Math.floor(Math.random() * 8)]} />
                  </div>
                </div>
                {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                <div className="card-actions">
                  <button
                    className="btn bg-blue-400 border-blue-400 hover:bg-blue-300 hover:border-blue-300"
                    onClick={(e) => handleClass(e)}
                    id={each.class_name}
                  >
                    <span id={each.class_name} className="font-thin">
                      Enter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListOfClass;
