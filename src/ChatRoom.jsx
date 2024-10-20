import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "./context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "./features/todosSlice";
const ChatRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);

  useEffect(() => {
    socket.on("room-update", (updatedRoom) => {
      setRoomData(updatedRoom);
    });

    socket.on("update-users", (users) => {
      setUsers(users);
    });

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setProfile(response.payload.username);
      }
    });

    socket.on("updated-msg", (data) => {
      setMessages(data);
    });

    socket.emit("rejoin-room", profile, roomId);
    return () => {
      socket.off("room-update");
      socket.off("update-users");
      socket.off("rejoin-room");
      socket.off("updated-msg");
    };
  }, [socket, roomId]);

  const handleMessages = () => {
    if (message.trim() === "") return;
    socket.emit("send-msg", {
      profileName: profile,
      msg: message,
      timeStamp: new Date().toLocaleTimeString(),
      roomId: roomData.roomId,
    });

    setMessage("");
    console.log(message);
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      handleMessages();
    }
  };

  return (
    <>
      {roomData ? (
        <div>
          Room:{roomData.createdBy}
          {users
            ? users.map((user) => <li key={user}>{user}</li>)
            : "Loading Users"}
          <div>
            <p>Chat</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div>
        <input
          type="text"
          className="border-2 border-black"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleMessages}>Send</button>
      </div>

      {messages ? (
        messages.map((item) => (
          <div key={item.timeStamp} className="bg-red-700 w-20 my-3">
            <p className="text-xs">{item.profileName}</p>
            <p>{item.msg}</p>
            <p className="text-xs pl-10">{item.timeStamp.substring(0, 5)}</p>
          </div>
        ))
      ) : (
        <p>Loading Messages...</p>
      )}
    </>
  );
};

export default ChatRoom;
