import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";

function Home() {
  const [username, setUsername] = useState("");
  const [point, setPoint] = useState();
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        setPoint(response.payload.points);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  const capitalizeString = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);

    const finalStr = firstLetter + remainingLetters;

    return finalStr;
  };

  console.log("point", point);

  return (
    <>
      <div className="w-full bg-red-200 border-2 flex border-black p-2">
        <div className="w-full">
          <div className="flex justify-center">
            <div className="w-[80%] flex justify-between items-center mb-5 bg-slate-100 rounded-md shadow-sm">
              <div className="mx-4 font-semibold tracking-wider">
                {capitalizeString(username)}
              </div>
              {}
            </div>
            <div className="flex mx-1 px-2 justify-between items-center mb-5 bg-slate-100 rounded-md shadow-sm">
              <PaidRoundedIcon className="text-yellow-400" /> {point}
            </div>
          </div>
          <div>
            hello world

            fn1
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
