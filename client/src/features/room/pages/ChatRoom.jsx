import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../context/Socket";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { format, isToday, isThisWeek, isYesterday } from "date-fns";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SendSvg from "../../../assets/send-svg.svg";
import CopySvg from "../../../assets/copy-svg.svg";
import ChatLottie from "../../../assets/Chat.lottie";
import toast from "react-hot-toast";
import RoomTodo from "../components/RoomTodo";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { Skeleton, Stack } from "@mui/material";
import ShinyText from "../../../shared/components/ShinyText";
import { Admin, Cancel, Logout, People, Send } from "@/assets/icons";

const ChatRoom = () => {
  const socket = useSocket();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
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
  // const [isUserJoined, setIsUserJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setProfile(currentUser?._id);
    setProfileName(currentUser?.username);

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

    socket.on("delete", () => {
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

  return (
    <>
      {isLoading || !users.length ? (
        <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
          <div className="my-4 h-7">
            <div className="bg-gray-00 w-24 rounded-full border border-gray-400 px-5 py-1 text-sm">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem", width: "100%", marginY: "0px" }}
              />
            </div>
          </div>
          <div className="my-10 flex h-16 w-full items-center justify-between">
            <div className="w-full px-2 py-1">
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
        <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
          <div className="my-20 flex justify-between sm:my-10">
            <div className="h-fit w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
              <ShinyText
                text="👥 | Room"
                disabled={false}
                speed={3}
                className=""
              />
            </div>

            <div className="rounded-lg bg-neutral-200 px-2 py-1 text-sm font-bold">
              Room ID: {roomData?.roomId}
              <button
                className="mx-2 transition-all hover:opacity-60 active:scale-95"
                onClick={handleCopy}
              >
                <img src={CopySvg} className="w-4" />
              </button>
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
                      <LogoutRoundedIcon className="w-4 text-red-500 transition-all hover:text-red-300 active:scale-95" />
                    </button>
                    <Tooltip id="my-tooltip" />
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>

          <div className="my-20 sm:my-10">
            {roomData && users.length ? (
              <>
                <div className="flex w-full items-center gap-2">
                  <div className="flex flex-1 items-center gap-2 px-2 py-1 text-lg font-bold tracking-wider transition-all sm:text-xl">
                    <img src={Admin} alt="Admin" className="w-7" />
                    <span>{users[0]?.username}</span>
                  </div>

                  <div className="flex items-center gap-2 px-2 py-1 text-center transition-all">
                    <p className="text-lg font-bold tracking-wider sm:text-xl">
                      <img src={People} alt="People" className="w-7" />
                    </p>
                    <div>
                      <ul className="relative flex items-center">
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
                                <li className="text-sm">...</li>
                                <li
                                  onClick={toggleModel}
                                  className="cursor-pointer text-sm text-blue-500 transition-all hover:text-blue-300 hover:underline"
                                >
                                  more
                                </li>
                                {isModalVisible && (
                                  <div
                                    className={`absolute right-0 top-10 min-w-32 rounded-lg border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff1f] backdrop-blur-lg transition-all sm:left-0`}
                                  >
                                    <div className="flex cursor-pointer items-center justify-end border-b-2 border-white p-2">
                                      <button
                                        className="transition-all hover:scale-110 hover:opacity-75 active:scale-95"
                                        onClick={toggleModel}
                                      >
                                        {
                                          <img
                                            src={Cancel}
                                            alt="Cancel"
                                            className="w-7"
                                          />
                                        }
                                      </button>
                                    </div>
                                    <div className="my-1">
                                      {users?.map((user) => (
                                        <li
                                          key={user._id}
                                          className="px-4 py-2"
                                        >
                                          {user.username}
                                        </li>
                                      ))}
                                    </div>
                                  </div>
                                )}
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
                    <button
                      className="rounded-xl p-2 transition-all hover:z-10 hover:bg-red-100 active:scale-95"
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Leave Room"
                      data-tooltip-place="top"
                      onClick={handleLeaveRoom}
                    >
                      <img src={Logout} alt="Leave" className="w-7" />
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-16 w-full items-center justify-between">
                <div className="w-full px-2 py-1">
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
          <div className="my-20 sm:my-10">
            {roomData?.roomId && <RoomTodo roomData={roomData} />}
          </div>

          {/* chat */}
          <div className="fixed bottom-2 right-6 w-fit transition-all hover:scale-105 hover:opacity-70 active:scale-95 sm:bottom-5 sm:right-10">
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
            <div className="fixed bottom-20 right-6 w-[20rem] rounded-xl bg-gradient-to-r from-[#9ecae1] to-[#4292c6] p-[1.5px] shadow-[0_0_20px_rgba(66,146,198,0.2)] sm:bottom-24 sm:right-10 sm:w-[25rem]">
              <div className="chat-gradient gap-1 rounded-xl">
                <div className="flex items-center justify-center">
                  <div className="flex w-full flex-col items-center justify-center rounded-t-lg border-b-2 border-white py-3">
                    <div>
                      <p className="font-title text-2xl font-bold">Chats</p>
                    </div>
                  </div>
                </div>
                <div className="relative flex h-80 w-full flex-col items-center justify-center">
                  <div
                    className="w-full overflow-y-auto px-3"
                    ref={containerRef}
                  >
                    {messages?.length == 0 ? (
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        No Messages Yet
                      </div>
                    ) : (
                      ""
                    )}
                    {messages ? (
                      messages.map((item, index) => {
                        const currentDate = new Date(
                          item.timeStamp,
                        ).toDateString();

                        const previousDate =
                          index > 0
                            ? new Date(
                                messages[index - 1].timeStamp,
                              ).toDateString()
                            : null;

                        const isNewDate = currentDate !== previousDate;

                        return (
                          <div key={index}>
                            {isNewDate && (
                              <p className="my-2 text-center text-sm text-gray-500">
                                {formatDateForHeading(item.timeStamp)}
                              </p>
                            )}

                            <div
                              className={
                                item.profileId === profile
                                  ? "flex w-full justify-end"
                                  : "flex w-full justify-start"
                              }
                              key={index}
                            >
                              <div
                                key={item.timeStamp}
                                className={`my-3 flex w-fit max-w-[100%] flex-col rounded-lg ${item.profileId === profile ? 'bg-[#a8e8ff]' : 'bg-[#dadaeb]'} px-2 py-1`}
                              >
                                {profile !== item.profileId && (
                                  <p className="flex justify-start pr-5 text-[0.65rem] text-slate-600">
                                    {item.profileName}
                                  </p>
                                )}
                                <p className="whitespace-pre-wrap break-words p-1 text-sm leading-4">
                                  {item.msg}
                                </p>
                                <p className="flex justify-end pl-5 text-[0.65rem] text-slate-600">
                                  {item.timeStamp.split(", ")[3]}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>Loading Messages...</p>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {showScrollDownButton && (
                    <button
                      className="absolute bottom-1 right-5 rounded-full border border-slate-200 bg-slate-100 p-1 text-gray-700"
                      onClick={chatScrollDown}
                    >
                      <KeyboardDoubleArrowDownRoundedIcon />
                    </button>
                  )}
                </div>

                <div className="flex w-full items-center justify-center overflow-y-auto rounded-b-lg p-2">
                  <div className="flex w-full gap-2 rounded-full border-2 border-blue-400 bg-white/40 py-1 pl-4 pr-1 text-sm shadow-[0px_0px_14px_6px_#ffffff1f] transition-all focus-within:outline-dotted focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-gray-400">
                    <input
                      type="text"
                      className="w-full bg-transparent outline-none"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      onKeyDown={handleKeyDown}
                      placeholder="Type..."
                    />

                    <button
                      className="flex items-center justify-center rounded-full bg-black p-2 text-sm font-medium text-white shadow-sm transition-all hover:opacity-70 active:scale-95 group"
                      onClick={() => {
                        handleMessages();
                        chatScrollDown();
                      }}
                    >
                      <img
                        src={Send}
                        className="w-7 -rotate-45 transition-all group-hover:rotate-0"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-2">
          <div className="my-4">
            <div className="w-fit rounded-full border border-red-400 px-5 py-1 text-sm">
              <ShinyText
                text="❌ | Access Denied"
                disabled={false}
                speed={3}
                className=""
              />
            </div>
          </div>

          <div className="my-10">
            <div className="flex flex-col items-center justify-center">
              <p className="title text-5xl">Wrong Way To Access</p>
              <p className="text-center text-xl">
                Please Join the Room to get the access in a Right Way :&#40;
                <br />
                Go to Join Room and Enter the code.
              </p>
              <div className="mt-16 flex items-center justify-center">
                <button
                  className="group rounded-sm border border-black bg-white px-3 py-1 font-thin shadow-lg transition-all hover:border-dotted active:scale-95"
                  onClick={() => navigate("/join-room")}
                >
                  <div className="flex items-center justify-center font-medium transition-all group-hover:text-gray-600">
                    Join Room
                  </div>
                  <hr className="h-0.5 w-0 bg-black transition-all duration-500 group-hover:w-full" />
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
