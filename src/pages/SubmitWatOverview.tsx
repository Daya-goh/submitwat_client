import React, { useEffect, useState } from "react";
import ListOfClass from "../components/ListOfClass";
import SubmitWatBanner from "../SubmitWatBanner";
import { ClassInterface } from "../Interface/Interface";
const SERVER = import.meta.env.VITE_SERVER;

const SubmitwatOverview = ({
  token,
  setClassParam,
}: ClassInterface): JSX.Element => {
  const [classList, setClassList] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const url = `${SERVER}submitwat`;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClassList(data.rows);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-7 w-screen h-screen object-contain md:object-scale-down">
      <SubmitWatBanner />

      <div className="flex flex-row gap-4 items-center"></div>
      <ListOfClass classList={classList} setClassParam={setClassParam} />
    </div>
  );
};

export default SubmitwatOverview;
