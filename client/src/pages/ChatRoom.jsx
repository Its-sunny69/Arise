import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/Socket";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { format, isToday, isThisWeek, isYesterday } from "date-fns";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SendSvg from "../assets/send-svg.svg";
import CopySvg from "../assets/copy-svg.svg";
import ChatLottie from "../assets/Chat.lottie";
import toast from "react-hot-toast";
import RoomTodo from "../components/RoomTodo";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { Skeleton, Stack } from "@mui/material";
import ShinyText from "../components/ShinyText";

const ChatRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [profile, setProfile] = useState("");
  const [profileName, setProfileName] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);
  const [isUserJoined, setIsUserJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  const dispatch = useDispatch();
  const currentToken = useSelector((state) => state.todos.token);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    socket.on("room-update", (updatedRoom) => {
      if (roomId == updatedRoom.roomId) {
        setRoomData(updatedRoom);
      }
    });

    socket.on("update-users", (users, socketRoomId) => {
      if (socketRoomId == roomId) {
        setUsers(users);
        setIsLoading(false);
      }
    });

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setProfile(response.payload._id);
        setProfileName(response.payload.username);
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
      profileId: profile,
      profileName: profileName,
      msg: message,
      timeStamp: new Date().toLocaleTimeString([], {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      roomId: roomData.roomId,
    });

    setMessage("");
  };

  const handleKeyDown = async (e) => {
    const key = e.key;
    if (key === "Enter") {
      handleMessages();
      setTimeout(() => {
        chatScrollDown();
      }, 100);
    }
  };

  const handleLeaveRoom = () => {
    socket.emit("leave-room", profile, roomId);
    navigate("/join-room");
  };

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

  const toggleModel = () => {
    setIsModalVisible((prev) => !prev);
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isChatOpen]);

  const chatScrollDown = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;

    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isScrolledUp = scrollHeight - (scrollTop + clientHeight) > 60;
      setShowScrollDownButton(isScrolledUp);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isChatOpen]);

  const formatDateForHeading = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else if (isThisWeek(date, { weekStartsOn: 1 })) {
      return format(date, "EEEE");
    } else {
      return format(date, "dd-MMM-yyyy");
    }
  };

  const cssForCurrentUser = "w-full flex justify-end";
  const cssForOtherUser = "w-full flex justify-start";

  return (
    <>
      {isLoading || !users.length ? (
        <div className="p-2">
          <div className="my-4 h-7">
            <div className="w-24 bg-gray-00 px-5 py-1 rounded-full border border-gray-400 text-sm">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "100%", marginY: "0px" }}
              />
            </div>
          </div>
          <div className="w-full my-10 h-16 flex justify-between items-center">
            <div className="w-full py-1 px-2">
              <Stack
                spacing={-1}
                sx={{
                  display: "flex",
                  width: "100%",
                  flexFlow: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1.5rem", width: "100%", marginY: "0px" }}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "100%", marginY: "0px" }}
                />
              </Stack>
            </div>
          </div>
        </div>
      ) : users.some((user) => user._id === profile) ? (
        <div className=" p-2">
          <div className="my-4 flex sm:block justify-between items-center">
            <div className="w-fit h-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
              <ShinyText
                text="👥 | Room"
                disabled={false}
                speed={3}
                className=""
              />
            </div>
            {phoneView ? (
              profile == users[0]?._id ? (
                ""
              ) : (
                <div className="transition-all">
                  <div className="m-3">
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Leave Room"
                      data-tooltip-place="top"
                      onClick={handleLeaveRoom}
                    >
                      <LogoutRoundedIcon className="w-4 text-red-500 hover:text-red-300 active:scale-95 transition-all" />
                    </button>
                    <Tooltip id="my-tooltip" />
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <div className="my-10">
            {roomData && users.length ? (
              <>
                <div
                  className={`w-full flex ${
                    profile == users[0]?._id
                      ? "justify-around"
                      : "justify-between"
                  } items-center`}
                >
                  <div
                    className={`font-bold sm:text-xl text-lg tracking-wider ${
                      profile == users[0]?._id ? "text-center" : ""
                    } py-1 px-2 border-b-2 border-transparent border-dotted hover:border-black transition-all`}
                  >
                    Admin: {users[0]?.username}
                    <div className="font-normal text-sm">
                      Room ID: {roomData.roomId}
                      <button
                        className="mx-2 hover:opacity-60 active:scale-95 transition-all"
                        onClick={handleCopy}
                      >
                        <img src={CopySvg} className="w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-center py-1 px-2 border-b-2 border-transparent border-dotted hover:border-black transition-all">
                    <p className="font-bold sm:text-xl text-lg tracking-wider">Users</p>
                    <div>
                      <ul className="flex">
                        {users.length ? (
                          <>
                            <li>{users[0]?.username}</li>
                            {users.length > 1 ? (
                              <li>,&nbsp;{users[1]?.username}</li>
                            ) : (
                              ""
                            )}

                            {users.length > 2 ? (
                              <>
                                <li>...</li>
                                <div className="relative">
                                  <li
                                    onClick={toggleModel}
                                    className="text-blue-500 cursor-pointer hover:text-blue-300 hover:underline transition-all"
                                  >
                                    more
                                  </li>
                                  {isModalVisible && (
                                    <div
                                      className={`absolute bg-white p-2 min-w-32 rounded-lg shadow-lg border transition-all`}
                                    >
                                      <div
                                        className="flex justify-end items-center cursor-pointer"
                                        onClick={toggleModel}
                                      >
                                        {
                                          <CloseRoundedIcon className="text-red-500 hover:text-red-300 transition-all" />
                                        }
                                      </div>
                                      <div className="my-1">
                                        {users?.map((user) => (
                                          <li
                                            key={user._id}
                                            className="hover:bg-slate-200 rounded-sm"
                                          >
                                            {user.username}
                                          </li>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          "Loading Users"
                        )}
                      </ul>
                    </div>
                  </div>
                  {phoneView ? (
                    ""
                  ) : profile == users[0]?._id ? (
                    ""
                  ) : (
                    <div className="ml-32 transition-all">
                      <div className="m-3">
                        <button
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Leave Room"
                          data-tooltip-place="top"
                          onClick={handleLeaveRoom}
                        >
                          <LogoutRoundedIcon className="w-4 text-red-500 hover:text-red-300 active:scale-95 transition-all" />
                        </button>
                        <Tooltip id="my-tooltip" />
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="w-full h-16 flex justify-between items-center">
                <div className="w-full py-1 px-2">
                  <Stack
                    spacing={-1}
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexFlow: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1.5rem", width: "100%", marginY: "0px" }}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem", width: "100%", marginY: "0px" }}
                    />
                  </Stack>
                </div>
              </div>
            )}
          </div>

          {/* Todo and Rank */}
          <div className="">{roomData && <RoomTodo roomData={roomData} />}</div>

          {/* chat */}
          <div className="fixed w-fit sm:bottom-5 bottom-2 sm:right-10 right-6 active:scale-95 hover:scale-105 hover:opacity-70 transition-all">
            <button onClick={toggleChat}>
              <DotLottieReact
                src={ChatLottie}
                loop
                autoplay
                style={{ width: 55, height: 55 }}
              />
            </button>
          </div>

          {isChatOpen && (
            <div className="sm:w-[25rem] w-[20rem] fixed sm:bottom-24 bottom-20 sm:right-10 right-6 border rounded-lg shadow-2xl backdrop-blur-xl">
              <div className="flex justify-center items-center">
                <div className="w-full flex flex-col justify-center items-center py-3 border-b rounded-t-lg">
                  <div>
                    <p className="font-bold text-xl">Chats</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-80 relative flex flex-col justify-center items-center">
                <div
                  className=" w-full px-3  overflow-y-auto"
                  ref={containerRef}
                >
                  {messages?.length == 0 ? (
                    <div className="flex flex-col justify-center items-center text-slate-300">
                      No Messages Yet
                    </div>
                  ) : (
                    ""
                  )}
                  {messages ? (
                    messages.map((item, index) => {
                      const currentDate = new Date(
                        item.timeStamp
                      ).toDateString();

                      const previousDate =
                        index > 0
                          ? new Date(
                              messages[index - 1].timeStamp
                            ).toDateString()
                          : null;

                      const isNewDate = currentDate !== previousDate;

                      return (
                        <>
                          {isNewDate && (
                            <p className="text-center text-sm text-gray-500 my-2">
                              {formatDateForHeading(item.timeStamp)}
                            </p>
                          )}

                          <div
                            className={
                              item.profileId == profile
                                ? cssForCurrentUser
                                : cssForOtherUser
                            }
                            key={index}
                          >
                            <div
                              key={item.timeStamp}
                              className=" bg-slate-300 w-fit max-w-[100%] my-3 py-1 px-2 rounded-lg flex flex-col"
                            >
                              {profile !== item.profileId && (
                                <p className="text-[0.65rem] flex justify-start pr-5 text-slate-600">
                                  {item.profileName}
                                </p>
                              )}
                              <p className="break-words whitespace-pre-wrap p-1 leading-4">
                                {item.msg}
                              </p>
                              <p className="text-[0.65rem] flex justify-end pl-5 text-slate-600">
                                {item.timeStamp.split(", ")[3]}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <p>Loading Messages...</p>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {showScrollDownButton && (
                  <button
                    className="bg-slate-100 border border-slate-200 text-gray-700 rounded-full p-1 absolute bottom-1 right-5"
                    onClick={chatScrollDown}
                  >
                    <KeyboardDoubleArrowDownRoundedIcon />
                  </button>
                )}
              </div>

              <div className="w-full flex overflow-y-auto justify-center items-center py-2  rounded-b-lg">
                <div className="w-full mx-2 flex bg-gray-200 shadow-sm rounded-md hover:outline-dotted hover:outline-1">
                  <div className="w-full py-1">
                    <input
                      type="text"
                      className="w-full px-4 py-1 bg-transparent text-gray-950 focus:outline-none"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      onKeyDown={handleKeyDown}
                      placeholder="Type..."
                    />
                  </div>
                  <div className="px-2 flex justify-center items-center">
                    <button
                      className="group active:scale-95"
                      onClick={() => {
                        handleMessages();
                        chatScrollDown();
                      }}
                    >
                      <img
                        src={SendSvg}
                        className="w-7 -rotate-45 group-hover:rotate-0 group-hover:hover:opacity-70 group-hover:scale-110 transition-all"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className=" p-2">
          <div className="my-4">
            <div className="w-fit px-5 py-1 rounded-full border border-red-400 text-sm">
              <ShinyText
                text="❌ | Access Denied"
                disabled={false}
                speed={3}
                className=""
              />
            </div>
          </div>

          <div className="my-10">
            <div className="flex flex-col justify-center items-center">
              <p className="title text-5xl">Wrong Way To Access</p>
              <p className="text-xl text-center">
                Please Join the Room to get the access in a Right Way :&#40;
                <br />
                Go to Join Room and Enter the code.
              </p>
              <div className="mt-16 flex justify-center items-center ">
                <button
                  className="font-thin group transition-all active:scale-95 border border-black py-1 px-3 hover:border-dotted shadow-lg rounded-sm bg-white"
                  onClick={() => navigate("/join-room")}
                >
                  <div className="flex justify-center items-center font-medium group-hover:text-gray-600 transition-all">
                    Join Room
                  </div>
                  <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
