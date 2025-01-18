import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthUser } from "../slice/todosSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import profileLottie from "../assets/profile.lottie";
import crownLottie from "../assets/crown.lottie";

function Navbar2() {
    const [username, setUsername] = useState("");
  const [point, setPoint] = useState();
  const currentToken = useSelector((state) => state.todos.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userAuth = async () => {

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
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-full flex justify-between items-center">
          <div className="sm:my-4 flex justify-center items-center font-semibold tracking-wider">
            <div>
              <DotLottieReact
                src={profileLottie}
                loop
                autoplay
                style={{ width: 70, height: 70 }}
              />
            </div>
            <span className="text-xl font-bold">
              {capitalizeString(username)}
            </span>
          </div>
        </div>
        <div className="flex mx-1 px-2 justify-between items-center">
          <div className="flex justify-center items-center">
            <DotLottieReact
              src={crownLottie}
              loop
              autoplay
              style={{ width: 50, height: 50 }}
            />
            <span className="text-xl font-bold">{point}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
