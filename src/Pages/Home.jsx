import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../features/todosSlice";
import RoomCard from "../components/RoomCard";
import Todo from "../components/Todo";

const Home = () => {
  const [username, setUsername] = useState("");
  const [showRooms, setShowRooms] = useState([]);
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        roomCreatedData(response.payload.username);
        // setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  const roomCreatedData = async (username) => {
    try {
      const url = `http://localhost:3002/api/rooms/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("fetch", data);
      setShowRooms(data);
    } catch (error) {
      console.log(error, "Error while fetching all created rooms");
    }
  };

  const capitalizeString = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);

    const finalStr = firstLetter + remainingLetters;

    return finalStr;
  };

  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <div className="flex justify-center">
          <div className="w-[80%] flex justify-between items-center mb-5 bg-slate-100 rounded-md shadow-sm">
            <div className="mx-4 font-semibold tracking-wider">
              Username: {capitalizeString(username)}
            </div>
            {<Navbar />}
          </div>
        </div>
        <div>
          <Todo />
        </div>
        <div>
          <RoomCard showRooms={showRooms} setShowRooms={setShowRooms} />
        </div>
      </div>
    </>
  );
};

export default Home;
