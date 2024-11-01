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
      <div className="my-4">
        <button
          className="px-4 py-2 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 text-sm font-medium text-white hover:scale-105 hover:opacity-70 transition-all duration-200 "
          onClick={handleRoomClick}
        >
          Create Room
        </button>
      </div>
      Created Rooms:
      <div className="flex flex-wrap">
        {showRooms.map((room) => (
          <div className="w-40 h-28 shadow-lg m-5 rounded-md">
            <p className="p-4">Joined:{room.users.length}</p>
            <p>Created:{timeAgo(room.createdAt)}</p>
            <div className=" flex justify-around">
              <button onClick={() => handleRoomJoin(room.roomId)}>Join</button>
              <button onClick={() => handleRoomDelete(room.roomId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomCard;
