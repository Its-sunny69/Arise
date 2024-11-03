import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/Socket";
const RoomCard = ({ showRooms, setShowRooms }) => {
  const navigate = useNavigate();
  const socket = useSocket();
  const handleRoomClick = () => {
    navigate("/join-room");
  };

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

  const handleRoomJoin = (roomId) => {
    navigate(`/chat/${roomId}`);
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
      setShowRooms(showRooms.filter((room) => room.roomId !== roomId));
      socket.emit("delete-room", roomId);
      console.log("id:", data.roomId);
    } catch (error) {
      console.log(error, "Error deleting room");
    }
  };

  return (
    <>
      <div className=" border-2 border-black m-2 p-2">
        <div className="my-4">
          <button
            className="px-4 py-2 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 text-sm font-medium text-white hover:scale-105 hover:opacity-70 transition-all duration-200 "
            onClick={handleRoomClick}
          >
            Create or Join Room
          </button>
        </div>

        {showRooms?.length ? "Rooms:" : "No Rooms Created or Joined Yet..!"}
        <div className="flex justify-start flex-wrap">
          {showRooms.map((room) => (
            <div className="shadow-lg m-5 rounded-md">
              <p className="bg-slate-300 px-4 py-2 rounded-t-md">Joined: {room.users.length}</p>
              <p className="px-4 py-5 rounded-md">Created: {timeAgo(room.createdAt)}</p>
              <div className=" flex justify-between rounded-b-md">
                <button className="w-1/2 text-black border-r bg-slate-300 hover:bg-blue-400 focus:ring-1 focus:ring-blue-300 font-medium rounded-bl-md text-sm px-4 py-2 focus:outline-none"  onClick={() => handleRoomJoin(room.roomId)}>
                  Join
                </button>
                <button className="w-1/2 focus:outline-none text-black border-l bg-slate-300 hover:bg-red-400 focus:ring-1 focus:ring-red-300 font-medium rounded-br-md text-sm px-4 py-2" onClick={() => handleRoomDelete(room.roomId)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RoomCard;
