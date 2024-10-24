import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "./context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "./features/todosSlice";
import SendSvg from "./assets/send-svg.svg";

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

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="border-2 border-black m-2 p-2">
        {roomData ? (
          <>
            <div className="flex justify-center items-center">
              <div className="w-[80%] flex justify-center items-center mb-5 bg-slate-100 rounded-md shadow-sm">
                <div className="my-2 font-bold text-xl tracking-wider">
                  Room: {roomData.createdBy}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-[80%] flex flex-col justify-center items-center my-5 bg-slate-100 rounded-md">
                <p className="font-bold">User Joined:</p>
                <div>
                  <ul>
                    {users
                      ? users.map((user) => <li key={user}>{user}</li>)
                      : "Loading Users"}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-[40%] flex flex-col justify-center items-center mt-5 py-2 bg-slate-200 rounded-t-md">
                <div>
                  <p>Chats</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex justify-center items-center">
          <div className="w-[40%] h-64 flex flex-col overflow-y-auto justify-center items-center bg-slate-100 ">
            <div className="w-[60%] px-3">
              {messages?.length == 0 ? (
                <div className="flex flex-col justify-center items-center text-slate-300">
                  No Messages Yet
                </div>
              ) : (
                ""
              )}
              {messages ? (
                messages.map((item) => (
                  <>
                   {/* <div class="h-0 w-0 border-t-[25px] border-r-[55px] border-b-[25px] border-solid border-t-transparent border-b-transparent border-r-[#555] -z-10"></div> */}
                    <div
                      key={item.timeStamp}
                      className=" bg-slate-300 w-fit max-w-[100%] my-3 py-1 px-2 rounded-lg flex flex-col"
                    >
                      <p className="text-[0.65rem] flex justify-start pr-5 text-slate-600">
                        {item.profileName}
                      </p>
                      <p className="break-words whitespace-pre-wrap p-1 leading-4">
                        {item.msg}
                      </p>
                      <p className="text-[0.65rem] flex justify-end pl-5 text-slate-600">
                        {item.timeStamp.substring(0, 4)}
                      </p>
                    </div>
                  </>
                ))
              ) : (
                <p>Loading Messages...</p>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-[40%] flex overflow-y-auto justify-center items-center mb-5 py-2 bg-slate-200 rounded-b-md">
            <div className="w-[50%] flex">
              <div className="w-4/5 py-1">
                <input
                  type="text"
                  className="w-full px-4 py-1 rounded-l-lg text-gray-800 focus:outline-none focus:bg-slate-300"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="w-1/5 flex justify-center items-center hover:opacity-60">
                <button
                  className="w-full flex items-center bg-gradient-to-br from-blue-500 to-purple-400 text-sm font-medium text-white rounded-r-lg justify-center py-1.5 hover:scale-105 hover:opacity-70 transition-all duration-200"
                  onClick={handleMessages}
                >
                  <img src={SendSvg} className="w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
