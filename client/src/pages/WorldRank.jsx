import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import { useSocket } from "../context/Socket";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShinyText from "../components/ShinyText";

function WorldRank() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [ranking, setRanking] = useState([]);
  const [showText, setShowText] = useState(false);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userAuth = async () => {
    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        setUserId(response.payload._id);
      }
    });
  };

  useEffect(() => {
    userAuth();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    socket.on("pointsSocket", (pointsData) => {
      const sortedRank = pointsData.sort((a, b) => b.points - a.points);
      setRanking(sortedRank);
    });

    return () => {
      socket.off("pointsSocket");
    };
  }, [socket, userId]);

  useEffect(() => {
    handlePoints();
  }, []);

  const handlePoints = () => {
    socket.emit("points");
  };

  return (
    <div className="">
      <div className="  p-2">
        <div className="my-4">
          <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text="🏆 | Arise Leaderboard"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-10">
          <div className="title sm:text-7xl text-5xl sm:flex text-center justify-center items-center">
            <Fade delay={700} duration={1000} triggerOnce fraction={0.5}>
              <div className="flex sm:justify-normal justify-center tracking-wider">
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

            {showText && (
              <TypeAnimation
                sequence={["Global Leaderboard"]}
                speed={30}
                repeat={0}
                cursor={false}
              />
            )}
          </div>

          <Fade
            delay={400}
            duration={1000}
            triggerOnce
            fraction={0.5}
            className="text-center"
          >
            {phoneView ? (
              <div className=" text-lg text-justify my-2">
                where procrastination meets its match and determination shines
                bright, Welcome to the World Ranking page of Arise!
              </div>
            ) : (
              <div className="sm:text-2xl text-center">
                where procrastination meets its match and determination shines
                bright,
                <br />
                Welcome to the World Ranking page of Arise!
              </div>
            )}
          </Fade>
        </div>

        <div className="sm:mt-20 mt-10">
          <div className="sm:my-8 my-4 text-center">
            <span className="title sm:text-5xl text-4xl">Rank</span>
          </div>
          <Fade delay={200} duration={1000} triggerOnce fraction={0.5}>
            <div className="flex justify-center items-center">
              <ul className="sm:w-[90%] w-full bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
                <li className="w-full  grid grid-flow-row gap-4 rounded-t-2xl border-b-2">
                  <div className="grid grid-cols-7 my-4">
                    <div className="col-span-1 flex justify-center items-center font-bold">
                      Rank
                    </div>
                    <div className="col-span-3 flex justify-center items-center px-4 font-bold">
                      Username
                    </div>
                    <div className="col-span-3 flex justify-center items-center font-bold">
                      Task Completed
                    </div>
                  </div>
                </li>

                {ranking.map((user, index) => {
                  return (
                    <li
                      key={user._id}
                      className={`w-full grid grid-flow-row hover:opacity-70 py-2 ${
                        index === ranking.length - 1 ? "rounded-b-2xl" : ""
                      } ${
                        index === 0
                          ? "bg-green-200 text-green-700 font-bold"
                          : ""
                      } ${
                        user.username === username
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : ""
                      }`}
                    >
                      <div className="grid grid-cols-7">
                        <div className="col-span-1 relative flex justify-center items-center">
                          {phoneView ? (
                            <>
                              {index === 0 && <EmojiEventsTwoToneIcon />}

                              {index !== 0 && (
                                <span className="px-1">{index + 1}</span>
                              )}
                            </>
                          ) : (
                            <>
                              {index === 0 && (
                                <EmojiEventsTwoToneIcon className="absolute left-6" />
                              )}
                              {user.username === username && (
                                <p className="border absolute left-4 bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                                  You
                                </p>
                              )}
                              <span className="px-1">{index + 1}</span>
                            </>
                          )}
                        </div>
                        <div className="col-span-3 flex justify-center items-center">
                          {phoneView ? (
                            <>
                              {user.username === username && (
                                <p className="border bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                                  You
                                </p>
                              )}
                              {user.username !== username && (
                                <>{user.username}</>
                              )}
                            </>
                          ) : (
                            <>{user.username}</>
                          )}
                        </div>
                        <div className="col-span-3 flex justify-center items-center">
                          {user.points}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Fade>
        </div>

        <div className="sm:mt-20 mt-10">
          <div className="sm:my-5 my-4 text-center">
            <span className="title sm:text-5xl text-4xl">What You Get ?</span>
          </div>

          <div className="sm:m-5 grid sm:grid-cols-3 sm:gap-5 gap-3">
            <Fade
              delay={200}
              duration={1000}
              triggerOnce
              fraction={0.5}
              cascade
              damping={0.2}
              className="grid"
            >
              <div className=" flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
                <div className=" flex flex-col justify-center mb-2 items-center">
                  <div className="flex justify-center items-center">
                    <EmojiEventsRoundedIcon
                      className="text-gray-800 mb-4"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                  </div>
                  <span className="title tracking-wider text-xl">
                    Track Your Journey
                  </span>
                </div>
                <span className="text-center">
                  Every task you conquer brings you one step closer to the top.
                  Compete with achievers worldwide and see how you stack up
                  against the best!
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
                    Motivation at Its Best
                  </span>
                </div>
                <span className="text-center">
                  Rise through the ranks, earn badges, and be recognized as a
                  true champion of productivity. Every small win counts toward
                  your big goals.
                </span>
              </div>

              <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
                <div className=" flex flex-col justify-center mb-2 items-center">
                  <div className="flex justify-center items-center">
                    <FlightTakeoffRoundedIcon
                      className="text-gray-800 mb-4"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                  </div>
                  <span className="title tracking-wider text-xl">
                    Join the Race Now
                  </span>
                </div>
                <span className="text-center">
                  The leaderboard refreshes regularly—so every day is a new
                  chance to shine. Push your limits, stay consistent, and become
                  the hero of your own story!
                </span>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WorldRank;
