import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../features/todosSlice";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/Socket";
import RoomCard from "../components/RoomCard";
import JoinCard from "../components/JoinCard";
import { useRef } from "react";
import Todo from "../components/Todo";

const Home = () => {
  const [username, setUsername] = useState("");
  const [showCreatedRooms, setCreatedRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);

  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigate = useNavigate();
  const createdRoomRef = useRef();
  const joinRoomRef = useRef();

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        roomCreatedData(response.payload.username);
        roomJoinData(response.payload.username);
        // setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    socket.on("update-members", (data) => {
      console.log("update-members", data);
      createdRoomRef.current?.updateChild(data);
      joinRoomRef.current?.updateChild(data);
    });

    socket.on("leave-user", (users, user, id) => {
      console.log("user", user, "username", username);

      if (user == username) {
        setJoinedRooms((prev) => prev.filter((room) => room.roomId !== id));
      }
    });

    socket.on("delete", (id) => {
      const data = showCreatedRooms.filter((room) => room.roomId != id);
      const data2 = joinedRooms.filter((room) => room.roomId != id);
      setCreatedRooms(data);
      setJoinedRooms(data2);
      console.log(`Deleted:${id}`);
    });

    return () => {
      socket.off("update-members");
      socket.off("leave-user");
      socket.off("delete");
    };
  }, [socket, username]);

  const timeAgo = (date) => {
    const now = Date.now();

    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? "s" : ""} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? "an hour ago" : `${interval} hours ago`;
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? "a minute ago" : `${interval} minutes ago`;
    }

    return seconds === 1 ? "a second ago" : `${seconds} seconds ago`;
  };

  const roomCreatedData = async (username) => {
    try {
      const url = `http://localhost:3002/api/rooms/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("fetch", data);
      setCreatedRooms(data);
    } catch (error) {
      console.log(error, "Error while fetching all created rooms");
    }
  };

  const roomJoinData = async (username) => {
    try {
      const url = `http://localhost:3002/api/rooms/join/${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("joined", data);
      setJoinedRooms(data);
    } catch (error) {
      console.log(error, "Error while fetching all joined rooms");
    }
  };

  const capitalizeString = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);

    const finalStr = firstLetter + remainingLetters;

    return finalStr;
  };

  const handleRoomDelete = async (roomId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCreatedRooms(
        showCreatedRooms.filter((room) => room.roomId !== roomId)
      );
      socket.emit("delete-room", roomId);
      console.log("delete-data", data);
    } catch (error) {
      console.log(error, "Error deleting room");
    }
  };

  const handleRoomClick = () => {
    navigate("/join-room");
  };

  const handleCreatedRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleLeaveRoom = (roomId) => {
    socket.emit("leave-room", username, roomId);
  };

  console.log("showCreatedRooms", showCreatedRooms);
  console.log("joinedRooms", joinedRooms);

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

        <div className=" border-2 border-black m-2 p-2">
        <div className="my-4">
          <button
            className="px-4 py-2 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 text-sm font-medium text-white hover:scale-105 hover:opacity-70 transition-all duration-200 "
            onClick={handleRoomClick}
          >
            Create or Join Room
          </button>
        </div>

        {/* {showCreatedRooms?.length == 0 && !joinedRooms?.length == 0 ? "" : "No Rooms Created or Joined Yet..!"} */}

        {/* {showCreatedRooms?.length ? " Created Rooms:" : ""} */}
        Created Rooms
        <div className="flex justify-start flex-wrap">
          {showCreatedRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
              timeAgo={timeAgo}
              handleCreatedRoomClick={handleCreatedRoomClick}
              handleRoomDelete={handleRoomDelete}
              ref={createdRoomRef}
            />
          ))}
        </div>  

        {/* {joinedRooms?.length ? "Joined Rooms:" : ""} */}
        Joined Rooms:
        <div>
          {joinedRooms?.map((room) => (
            <JoinCard
              room={room}
              username={username}
              ref={joinRoomRef}
              timeAgo={timeAgo}
              handleJoinRoomClick={handleJoinRoomClick}
              handleLeaveRoom={handleLeaveRoom}
            />
          ))}
        </div>
        </div>
      </div>
    </>
  );
};

export default Home;
