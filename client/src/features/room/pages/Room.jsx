import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { useSocket } from "../../../context/Socket";
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
import ShinyText from "../../../shared/components/ShinyText";
import { timeAgo } from "../../../shared/utils/timeAgo";
import {
  getCreatedRooms,
  getJoinedRooms,
  deleteRoom,
  removeJoinedRoomById,
  removeDeletedRoom,
} from "../roomSlice";
import GradientButton from "@/shared/components/GradientButton";
import { ComputerBackground, GirlJoiningHands } from "@/assets/images";
import { compute } from "three/src/nodes/gpgpu/ComputeNode";
import CardScroll from "@/shared/components/CardScroll";

function Room() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { createdRooms, joinedRooms, createdRoomsLoading, joinedRoomsLoading } =
    useSelector((state) => state.room);

  const socket = useSocket();
  const navigate = useNavigate();
  const createdRoomRef = useRef();
  const joinRoomRef = useRef();

  const [showRoomText, setShowRoomText] = useState(false);
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

  useEffect(() => {
    if (!user?._id) {
      return;
    }

    dispatch(getCreatedRooms(user._id));
    dispatch(getJoinedRooms(user._id));
  }, [dispatch, user?._id]);

  useEffect(() => {
    socket.on("leave-user", (_users, leaveUserId, roomId) => {
      if (leaveUserId === user._id) {
        dispatch(removeJoinedRoomById(roomId));
      }
    });

    socket.on("delete", (roomId) => {
      dispatch(removeDeletedRoom(roomId));
    });

    socket.on("update-members", (data, id) => {
      createdRoomRef.current?.updateChild(data, id);
      joinRoomRef.current?.updateChild(data, id);
    });

    // socket.on("pointsSocket", (pointsData) => {
    //   const sortedRank = pointsData.sort((a, b) => b.points - a.points);
    // });

    return () => {
      socket.off("update-members");
      socket.off("leave-user");
      socket.off("delete");
      socket.off("pointsSocket");
    };
  }, [dispatch, socket, user._id]);

  const handleRoomDelete = async (roomId) => {
    try {
      await dispatch(deleteRoom(roomId)).unwrap();
      socket.emit("delete-room", roomId, user.username, user._id);
    } catch (error) {
      return error;
    }
  };

  const handleRoomClick = () => {
    navigate("create-join");
  };

  const handleCreatedRoomClick = (roomId) => {
    navigate(`chat/${roomId}`);
  };

  const handleJoinRoomClick = (roomId) => {
    navigate(`chat/${roomId}`);
  };

  const handleLeaveRoom = (roomId) => {
    socket.emit("leave-room", user._id, roomId);
  };

  const cards = [
    {
      title: "Real-Time Updates",
      body: "Stay perfectly synced with your team as every task and change reflects instantly.",
      image: ComputerBackground,
    },
    {
      title: "Track Progress",
      body: "Monitor tasks with ease and keep your goals in sight.",
      image: ComputerBackground,
    },
    {
      title: "Point System",
      body: "Get rewarded for your efforts and contributions with an engaging points system.",
      image: ComputerBackground,
    },
    {
      title: "Leaderboards",
      body: "Celebrate success with Room Leaderboards and compete on a global scale with the Global Leaderboard.",
      image: ComputerBackground,
    },
  ];

  return (
    <>
      <Outlet />
      <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText
            text="👥 | Arise Room"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-20 grid grid-cols-7 sm:my-10">
        <div className="col-span-5 flex flex-col items-start justify-center">
          <p className="text-cente font-title text-3xl font-bold sm:text-6xl">
            Welcome,
            <br />
            To Arise Room
          </p>
          <p className="text-cente mt-6">
            Take your productivity and collaboration to the next level with
            exciting features! Whether you&apos;re working or competing, Arise
            makes every effort count!
          </p>

          <div className="z-10 mt-20 flex items-center justify-start sm:mt-24">
            <GradientButton text="Create or Join" onClick={handleRoomClick} />
          </div>
        </div>

        <div className="pointer-events-none col-span-2">
          <img src={GirlJoiningHands} alt="" className="h-full w-full" />
        </div>
      </div>

      <div className="my-20 sm:my-10">
        <div>
          <div className="my-5 text-center">
            <span className="font-title text-3xl font-bold sm:text-6xl">
              Created Rooms
            </span>
          </div>

          <div className="flex min-h-56 items-center justify-center lg:m-5">
            {createdRoomsLoading === "pending" ? (
              <div className="grid w-full gap-2 sm:gap-3 lg:grid-cols-3">
                <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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

                <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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
                    <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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

                    <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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
              <div className="grid w-full lg:grid-cols-3 lg:gap-3">
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

        <div className="mt-20 sm:mt-10">
          <div className="my-5 text-center">
            <span className="font-title text-3xl font-bold sm:text-6xl">
              Joined Rooms
            </span>
          </div>

          <div className="flex min-h-60 items-center justify-center lg:m-5">
            {joinedRoomsLoading === "pending" ? (
              <div className="grid w-full gap-2 sm:gap-3 lg:grid-cols-3">
                <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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

                <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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
                    <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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
                    <div className="m-1 flex h-52 flex-col items-center justify-between rounded-lg border sm:m-2">
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
            ) : joinedRooms?.filter((room) => user._id !== room.createdBy)
                .length !== 0 ? (
              <div className="grid w-full sm:gap-4 lg:grid-cols-3 lg:gap-3">
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
                    ?.filter((room) => user._id !== room.createdBy)
                    .map((room) => (
                      <JoinCard
                        key={room._id}
                        room={room}
                        username={user.username}
                        userId={user._id}
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

      <div className="my-20 sm:my-10">
        <div className="my-5 text-center">
          <span className="font-title text-3xl font-bold sm:text-6xl">
            Features
          </span>
        </div>

        {/* <div className="m-1 grid gap-3 sm:m-5 sm:gap-5 lg:grid-cols-4">
          <Fade
            delay={200}
            duration={1000}
            triggerOnce
            fraction={0.5}
            cascade
            damping={0.2}
            className="grid"
          >
            <div className="flex flex-col rounded-md border bg-slate-100 p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:outline-dashed hover:outline-1">
              <div className="mb-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <SyncRoundedIcon
                    className="mb-4 text-gray-800"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title text-xl tracking-wider">
                  Real-Time Updates
                </span>
              </div>
              <span className="text-center">
                Stay perfectly synced with your team as every task and change
                reflects instantly.
              </span>
            </div>

            <div className="flex flex-col rounded-md border bg-slate-100 p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:outline-dashed hover:outline-1">
              <div className="mb-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <BarChartRoundedIcon
                    className="mb-4 text-gray-800"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title text-xl tracking-wider">
                  Track Progress
                </span>
              </div>
              <span className="text-center">
                Monitor tasks with ease and keep your goals in sight.
              </span>
            </div>

            <div className="flex flex-col rounded-md border bg-slate-100 p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:outline-dashed hover:outline-1">
              <div className="mb-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <AutoAwesomeRoundedIcon
                    className="mb-4 text-gray-800"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title text-xl tracking-wider">
                  Point System
                </span>
              </div>
              <span className="text-center">
                Get rewarded for your efforts and contributions with an engaging
                points system.
              </span>
            </div>

            <div className="flex flex-col rounded-md border bg-slate-100 p-4 shadow-sm transition-all hover:scale-105 hover:shadow-md hover:outline-dashed hover:outline-1">
              <div className="mb-2 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <EmojiEventsRoundedIcon
                    className="mb-4 text-gray-800"
                    style={{ width: "4rem", height: "4rem" }}
                  />
                </div>
                <span className="title text-xl tracking-wider">
                  Leaderboards
                </span>
              </div>
              <span className="text-center">
                Celebrate success with Room Leaderboards and compete on a global
                scale with the Global Leaderboard.
              </span>
            </div>
          </Fade>
        </div> */}

        <div>
          <CardScroll data={cards} textSectionDirection="left" />
        </div>
      </div>
    </div>
    </>
  );
}

export default Room;
