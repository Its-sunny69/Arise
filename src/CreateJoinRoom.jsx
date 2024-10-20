import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "./context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "./features/todosSlice";
const CreateJoinRoom = () => {
  const socket = useSocket();
  const [input, setInput] = useState({ joinRoom: "" });
  const [profile, setProfile] = useState();
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();

  dispatch(AuthUser(currentToken)).then((response) => {
    if (response.payload) {
      setProfile(response.payload.username);
    }
  });

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
    socket.emit("create-room", profile);
    socket.on("msg", (val) => {
      console.log(val.user + " created Room with RoomID " + val.id);
      navigate(`/chat/${val.id}`);
    });
    setInput({ ...input, userName: "", joinRoom: "" });
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    socket.emit("join-room", profile, input.joinRoom);
  };

  return (
    <>
      <h1>Welcome To Arise</h1>
      <form action="" className="w-8">
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
