import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSocket } from "./context/Socket";
const ChatRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();

  const [roomData, setRoomData] = useState(null);
  const [message, setMessage] = useState("");
  // const [roomUser, setRoomUser] = useState(null);
  const location = useLocation();

  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const userName = location.state?.userName;
    if (userName) {
      socket.emit("rejoin-room", userName, roomId);
    }

    socket.on("room-update", (updatedRoom) => {
      setRoomData(updatedRoom);
    });

    socket.on("update-users", (updatedUsers) => {
      console.log("Received update-users event with users:", updatedUsers);
      setRoomData((prevRoomData) => ({
        ...prevRoomData,
        users: updatedUsers,
      }));
    });

    socket.on("join-msg", (data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(`${data.userName} joined room: ${data.roomId}`);
      }
    });

    socket.on("message-all", (msg) => {
      setRoomData((prevRoomData) => ({
        ...prevRoomData,
        message: msg,
      }));
    });

    return () => {
      socket.off("update-users");
      socket.off("join-msg");
      socket.off("message-all");
    };
  }, [roomId, socket, location.state]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleMessages = (e) => {
    e.preventDefault();
    socket.emit("message", message, roomId);
    setMessage("");
  };

  console.log(roomData);
  console.log(message);

  return (
    <div className="chat-container">
      <div className="chat-header">Room:{roomData.createdBy}</div>
      <div className="users">
        {roomData.users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>

      <div className="send">
        <input
          type="text"
          name="sendMessage"
          value={message}
          onChange={handleMessage}
        />
        <button onClick={handleMessages}>Send</button>
      </div>
      <h1>Chat</h1>
      <div className="messages">
        {roomData.message &&
          roomData.message.map((msg) => <li key={msg}>{msg}</li>)}
      </div>
    </div>
  );
};

export default ChatRoom;
