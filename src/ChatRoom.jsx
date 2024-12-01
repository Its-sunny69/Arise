import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "./context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "./features/todosSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import SendSvg from "./assets/send-svg.svg";
import CopySvg from "./assets/copy-svg.svg";
import HomeSvg from "./assets/home-svg.svg";
import SessionLeaveSvg from "./assets/session-leave-svg-com.svg";
import Todo from "./components/Todo";
import toast from "react-hot-toast";
import RoomTodo from "./components/RoomTodo";

const ChatRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [profile, setProfile] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();

  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    socket.on("room-update", (updatedRoom) => {
      if (roomId == updatedRoom.roomId) {
        console.log("roomUpdate", updatedRoom);
        setRoomData(updatedRoom);
      }
    });

    socket.on("update-users", (users, socketRoomId) => {
      if (socketRoomId == roomId) {
        setUsers(users);
      }
    });

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setProfile(response.payload._id);
      }
    });

    socket.on("updated-msg", (data, socketRoomId) => {
      if (socketRoomId == roomId) {
        setMessages(data);
      }
    });

    socket.on("leave-user", (updatedRoom, user, socketRoomId) => {
      if (socketRoomId == roomId) {
        setUsers(updatedRoom);
      }
    });

    socket.on("delete", (id) => {
      navigate("/join-room");
    });

    socket.emit("rejoin-room", profile, roomId);
    return () => {
      socket.off("room-update");
      socket.off("update-users");
      socket.off("rejoin-room");
      socket.off("updated-msg");
      socket.off("leave-user");
      socket.off("delete");
      socket.off("join-msg");
    };
  }, [socket, roomId]);

  const handleMessages = () => {
    if (message.trim() === "") return;
    socket.emit("send-msg", {
      profileName: profile,
      msg: message,
      timeStamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
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

  const handleLeaveRoom = () => {
    socket.emit("leave-room", profile, roomId);
    navigate("/join-room");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(roomId)
      .then(() => {
        toast.success("ID copied to clipboard!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const cssForCurrentUser = "w-full flex justify-end";
  const cssForOtherUser = "w-full flex justify-start";
  console.log("roomData", roomData);
  return (
    <>
      <div className="border-2 border-black m-2 p-2">
        {roomData ? (
          <>
            <div className="flex justify-center items-center">
              <div className="w-[80%] flex justify-between items-center mb-5 bg-slate-100 rounded-md shadow-sm">
                <div className="m-3">
                  <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Go to Home Page"
                    data-tooltip-place="top"
                    className="hover:opacity-55"
                    onClick={() => navigate("/")}
                  >
                    <img src={HomeSvg} className="w-7" />
                  </button>
                  <Tooltip id="my-tooltip" />
                </div>

                <div className="my-2 font-bold text-xl tracking-wider">
                  Room: {users[0]?.username}
                  <div className="font-normal text-sm flex justify-center items-center mt-2">
                    Room ID: {roomData.roomId}
                    <button className="mx-2" onClick={handleCopy}>
                      <img src={CopySvg} className="w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  {profile == users[0] ? null : (
                    <>
                      <div className="m-3">
                        <button
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Leave Room"
                          data-tooltip-place="top"
                          className="hover:opacity-55"
                          onClick={handleLeaveRoom}
                        >
                          <img src={SessionLeaveSvg} className="w-7" />
                        </button>
                        <Tooltip id="my-tooltip" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center">
              <div className="w-[80%] flex flex-col justify-center items-center my-5 bg-slate-100 rounded-md">
                <p className="font-bold">User Joined:</p>
                <div>
                  <ul>
                    {users
                      ? users.map((user) => (
                          <li key={user._id}>{user.username}</li>
                        ))
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
          <div className="w-[40%] h-72 flex flex-col justify-center items-center bg-slate-100">
            <div className="w-full px-3 bg-slate-100 overflow-y-auto">
              {messages?.length == 0 ? (
                <div className="flex flex-col justify-center items-center text-slate-300">
                  No Messages Yet
                </div>
              ) : (
                ""
              )}
              {messages ? (
                messages.map((item, index) => (
                  <>
                    <div
                      className={
                        item.profileName == profile
                          ? cssForCurrentUser
                          : cssForOtherUser
                      }
                      key={index}
                    >
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
                          {item.timeStamp}
                          {console.log(item.timeStamp)}
                        </p>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <p>Loading Messages...</p>
              )}
              <div ref={messagesEndRef} className="bg-blue-800" />
            </div>
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
                  placeholder="Type..."
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
      <div>{roomData && <RoomTodo roomData={roomData} />}</div>
    </>
  );
};

export default ChatRoom;
