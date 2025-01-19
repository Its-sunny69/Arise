import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/Socket";
import RoomCard from "../components/RoomCard";
import JoinCard from "../components/JoinCard";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import { Skeleton } from "@mui/material";
import ShinyText from "../components/ShinyText";

function Room() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  const [createdRooms, setCreatedRooms] = useState([]);
  const [joinedRooms, setJoinedRooms] = useState([]);
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const socket = useSocket();
  const navigate = useNavigate();
  const createdRoomRef = useRef();
  const joinRoomRef = useRef();

  const [showRoomText, setShowRoomText] = useState(false);
  const [joinRoomLoading, setJoinRoomLoading] = useState(true);
  const [createdRoomLoading, setCreatedRoomLoading] = useState(true);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoomText(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const userAuth = async () => {
    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        roomCreatedData(response.payload._id);
        roomJoinData(response.payload._id);
        setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    socket.on("leave-user", (users, user, id) => {
      if (user == userId) {
        setJoinedRooms((prev) => prev.filter((room) => room.roomId !== id));
      }
    });

    socket.on("delete", (id, user) => {
      if (user == userId) {
        const data = createdRooms.filter((room) => room.roomId != id);
        setCreatedRooms(data);
      }
      const data2 = joinedRooms.filter((room) => room.roomId != id);

      setJoinedRooms(data2);
    });

    socket.on("update-members", (data, id) => {
      createdRoomRef.current?.updateChild(data, id);
      joinRoomRef.current?.updateChild(data, id);
    });

    socket.on("pointsSocket", (pointsData) => {
      const sortedRank = pointsData.sort((a, b) => b.points - a.points);
      setRanking(sortedRank);
    });

    return () => {
      socket.off("update-members");
      socket.off("leave-user");
      socket.off("delete");
      socket.off("pointsSocket");
    };
  }, [socket, userId]);

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

  const roomCreatedData = async (username) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/api/rooms/${username}`;
      setCreatedRoomLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCreatedRooms(data);
      setCreatedRoomLoading(false);
    } catch (error) {
      return error;
    }
  };

  const roomJoinData = async (username) => {
    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/api/rooms/join/${username}`;
      setJoinRoomLoading(true);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setJoinedRooms(data);
      setJoinRoomLoading(false);
    } catch (error) {
      return error;
    }
  };

  const handleRoomDelete = async (roomId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/rooms/${roomId}`,
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
      setCreatedRooms(createdRooms.filter((room) => room.roomId !== roomId));
      socket.emit("delete-room", roomId, username, userId);
    } catch (error) {
      return error;
    }
  };

  const handleRoomClick = () => {
    navigate("/join-room");
  };

  const handleCreatedRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoomClick = (roomId) => {
    navigate(`/chat/${roomId}`);
  };

  const handleLeaveRoom = (roomId) => {
    socket.emit("leave-room", userId, roomId);
  };

  return (
    <div className="  p-2">
      <div className="my-4">
        <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
          <ShinyText
            text="👥 | Arise Room"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-10">
        <div className="title sm:text-7xl text-5xl text-center lg:flex justify-center items-center">
          <TypeAnimation
            sequence={["Welcome To"]}
            speed={30}
            repeat={0}
            cursor={false}
          />

          <div className="flex justify-center items-center">
            <Fade delay={700} duration={1000} triggerOnce fraction={0.5}>
              <div className="flex tracking-wider">
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl pl-4">
                    A
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl">
                    r
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl">
                    i
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl">
                    s
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl pr-5">
                    e
                  </span>
                </div>
              </div>
            </Fade>

            {showRoomText && (
              <TypeAnimation
                sequence={["Room"]}
                speed={30}
                repeat={0}
                cursor={false}
              />
            )}
          </div>
        </div>

        <Fade
          delay={200}
          duration={1000}
          triggerOnce
          fraction={0.5}
          className="text-center"
        >
          {phoneView ? (
            <div className="text-lg text-justify my-2">
              Take your productivity and collaboration to the next level with
              exciting features! Whether you're working or competing, Arise
              makes every effort count!
            </div>
          ) : (
            <div className="text-2xl text-center">
              Take your productivity and collaboration to the next level with
              exciting features!
              <br />
              Whether you're working or competing, Arise makes every effort
              count!
            </div>
          )}
        </Fade>

        <div className="sm:mt-16 mt-12 flex justify-center items-center ">
          <button
            className="font-thin group transition-all active:scale-95 border border-black py-1 px-3 hover:border-dotted shadow-lg rounded-sm bg-white"
            onClick={handleRoomClick}
          >
            <div className="flex justify-center items-center font-medium group-hover:text-gray-600 transition-all">
              Create or Join Room
            </div>
            <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-black" />
          </button>
        </div>
      </div>

      <div className="mt-20">
        <div>
          <div className="my-5 text-center">
            <span className="title sm:text-5xl text-4xl"> Created Rooms </span>
          </div>

          <div className="min-h-56 lg:m-5 flex justify-center items-center">
            {createdRoomLoading ? (
              <div className="w-full grid lg:grid-cols-4  sm:gap-3 gap-2">
                <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.5rem 0.5rem 0 0",
                    }}
                  />
                  <div className="w-full">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "20%",
                        marginLeft: "0.75rem",
                      }}
                    />

                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "70%",
                        marginLeft: "0.75rem",
                      }}
                    />
                  </div>

                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                  />
                </div>

                <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.5rem 0.5rem 0 0",
                    }}
                  />
                  <div className="w-full">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "20%",
                        marginLeft: "0.75rem",
                      }}
                    />

                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "70%",
                        marginLeft: "0.75rem",
                      }}
                    />
                  </div>

                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                  />
                </div>

                {phoneView ? (
                  ""
                ) : (
                  <>
                    <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0.5rem 0.5rem 0 0",
                        }}
                      />
                      <div className="w-full">
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "20%",
                            marginLeft: "0.75rem",
                          }}
                        />

                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "70%",
                            marginLeft: "0.75rem",
                          }}
                        />
                      </div>

                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0 0 0.5rem 0.5rem",
                        }}
                      />
                    </div>

                    <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0.5rem 0.5rem 0 0",
                        }}
                      />
                      <div className="w-full">
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "20%",
                            marginLeft: "0.75rem",
                          }}
                        />

                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "70%",
                            marginLeft: "0.75rem",
                          }}
                        />
                      </div>

                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0 0 0.5rem 0.5rem",
                        }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : createdRooms?.length ? (
              <div className="w-full grid lg:grid-cols-4 lg:gap-3">
                <Fade
                  delay={200}
                  duration={1000}
                  triggerOnce
                  fraction={0.5}
                  cascade
                  damping={0.2}
                  className="grid"
                >
                  {createdRooms.map((room) => (
                    <RoomCard
                      key={room._id}
                      room={room}
                      timeAgo={timeAgo}
                      handleCreatedRoomClick={handleCreatedRoomClick}
                      handleRoomDelete={handleRoomDelete}
                      ref={createdRoomRef}
                    />
                  ))}
                </Fade>
              </div>
            ) : (
              <div className="">No Room Created</div>
            )}
          </div>
        </div>

        <div className="sm:mt-20 mt-12">
          <div className="my-5 text-center">
            <span className="title sm:text-5xl text-4xl"> Joined Rooms </span>
          </div>

          <div className="min-h-60 lg:m-5 flex justify-center items-center">
            {joinRoomLoading ? (
              <div className="w-full grid lg:grid-cols-4 sm:gap-3 gap-2">
                <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.5rem 0.5rem 0 0",
                    }}
                  />
                  <div className="w-full">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "20%",
                        marginLeft: "0.75rem",
                      }}
                    />

                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "70%",
                        marginLeft: "0.75rem",
                      }}
                    />
                  </div>

                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                  />
                </div>

                <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0.5rem 0.5rem 0 0",
                    }}
                  />
                  <div className="w-full">
                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "20%",
                        marginLeft: "0.75rem",
                      }}
                    />

                    <Skeleton
                      variant="text"
                      sx={{
                        fontSize: "1.5rem",
                        width: "70%",
                        marginLeft: "0.75rem",
                      }}
                    />
                  </div>

                  <Skeleton
                    variant="rectangular"
                    sx={{
                      width: "100%",
                      height: "3rem",
                      borderRadius: "0 0 0.5rem 0.5rem",
                    }}
                  />
                </div>

                {phoneView ? (
                  ""
                ) : (
                  <>
                    <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0.5rem 0.5rem 0 0",
                        }}
                      />
                      <div className="w-full">
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "20%",
                            marginLeft: "0.75rem",
                          }}
                        />

                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "70%",
                            marginLeft: "0.75rem",
                          }}
                        />
                      </div>

                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0 0 0.5rem 0.5rem",
                        }}
                      />
                    </div>
                    <div className="sm:m-2 m-1 h-52 border rounded-lg flex flex-col justify-between items-center">
                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0.5rem 0.5rem 0 0",
                        }}
                      />
                      <div className="w-full">
                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "20%",
                            marginLeft: "0.75rem",
                          }}
                        />

                        <Skeleton
                          variant="text"
                          sx={{
                            fontSize: "1.5rem",
                            width: "70%",
                            marginLeft: "0.75rem",
                          }}
                        />
                      </div>

                      <Skeleton
                        variant="rectangular"
                        sx={{
                          width: "100%",
                          height: "3rem",
                          borderRadius: "0 0 0.5rem 0.5rem",
                        }}
                      />
                    </div>{" "}
                  </>
                )}
              </div>
            ) : joinedRooms?.filter((room) => userId !== room.createdBy)
                .length !== 0 ? (
              <div className="w-full grid lg:grid-cols-4 lg:gap-3 sm:gap-4">
                <Fade
                  delay={100}
                  duration={1000}
                  triggerOnce
                  fraction={0.5}
                  cascade
                  damping={0.2}
                  className="grid"
                >
                  {joinedRooms
                    ?.filter((room) => userId !== room.createdBy)
                    .map((room) => (
                      <JoinCard
                        key={room._id}
                        room={room}
                        username={username}
                        userId={userId}
                        ref={joinRoomRef}
                        timeAgo={timeAgo}
                        handleJoinRoomClick={handleJoinRoomClick}
                        handleLeaveRoom={handleLeaveRoom}
                      />
                    ))}
                </Fade>
              </div>
            ) : (
              <div className="">No Room Joined</div>
            )}
          </div>
        </div>
      </div>

      <div className="sm:mt-20 mt-12">
        <div className="my-5 text-center">
          <span className="title sm:text-5xl text-4xl">Features</span>
        </div>

        <div className="sm:m-5 m-1 grid lg:grid-cols-4 sm:gap-5 gap-3">
          <Fade
            delay={200}
            duration={1000}
            triggerOnce
            fraction={0.5}
            cascade
            damping={0.2}
            className="grid"
          >
            <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
              <div className=" flex flex-col justify-center mb-2 items-center">
                <div className="flex justify-center items-center">
                  <SyncRoundedIcon
                    className="text-gray-800 mb-4"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title tracking-wider text-xl">
                  Real-Time Updates
                </span>
              </div>
              <span className="text-center">
                Stay perfectly synced with your team as every task and change
                reflects instantly.
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
              <div className=" flex flex-col justify-center mb-2 items-center">
                <div className="flex justify-center items-center">
                  <BarChartRoundedIcon
                    className="text-gray-800 mb-4"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title tracking-wider text-xl">
                  Track Progress
                </span>
              </div>
              <span className="text-center">
                Monitor tasks with ease and keep your goals in sight.
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
              <div className=" flex flex-col justify-center mb-2 items-center">
                <div className="flex justify-center items-center">
                  <AutoAwesomeRoundedIcon
                    className="text-gray-800 mb-4"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title tracking-wider text-xl">
                  Point System
                </span>
              </div>
              <span className="text-center">
                Get rewarded for your efforts and contributions with an engaging
                points system.
              </span>
            </div>

            <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
              <div className=" flex flex-col justify-center mb-2 items-center">
                <div className="flex justify-center items-center">
                  <EmojiEventsRoundedIcon
                    className="text-gray-800 mb-4"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title tracking-wider text-xl">
                  Leaderboards
                </span>
              </div>
              <span className="text-center">
                Celebrate success with Room Leaderboards and compete on a global
                scale with the Global Leaderboard.
              </span>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Room;
