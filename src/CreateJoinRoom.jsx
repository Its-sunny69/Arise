import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./context/Socket";
const CreateJoinRoom = () => {
  const socket = useSocket();
  const [input, setInput] = useState({ userName: "", joinRoom: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    socket.on("join-msg", (data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(`${data.userName} joined room: ${data.roomId}`);

        navigate(`/chat/${data.roomId}`, {
          state: { userName: data.userName },
        });
      }
    });

    return () => {
      socket.off("join-msg");
    };
  }, [socket, navigate]);

  const handleCreateRoom = (e) => {
    e.preventDefault();
    socket.emit("create-room", input.userName);
    socket.on("msg", (val) => {
      console.log(val.user + " created Room with RoomID " + val.id);
      navigate(`/chat/${val.id}`, { state: { userName: input.userName } });
    });
    setInput({ ...input, userName: "", joinRoom: "" });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", input.userName, input.joinRoom);
  };

  return (
    <>
      <h1>Welcome To Arise</h1>
      <form action="" className="w-8">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="userName"
          placeholder="Enter Username"
          onChange={handleInput}
          value={input.userName}
        />
        <input
          type="text"
          placeholder="Enter Room ID"
          name="joinRoom"
          onChange={handleInput}
          value={input.joinRoom}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
        <hr />
        <button onClick={handleCreateRoom}>Create Room</button>
      </form>
    </>
  );
};

export default CreateJoinRoom;
