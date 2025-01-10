import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthUser } from "../slice/todosSlice";
import { useSocket } from "../context/Socket";
import { TypeAnimation } from "react-type-animation";
import { Fade, Slide } from "react-awesome-reveal";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ConfettiBackground from "../components/confettiBackground";
import ShinyText from "../components/ShinyText";
import GradientText from "../components/GradientText";

function WorldRank() {
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState();
  const [ranking, setRanking] = useState([]);
  const [point, setPoint] = useState();
  const [showText, setShowText] = useState(false);
  const currentToken = useSelector((state) => state.todos.token);
  const dispatch = useDispatch();
  const socket = useSocket();

  const userAuth = async () => {
    // console.log("currentToken", currentToken);

    dispatch(AuthUser(currentToken)).then((response) => {
      if (response.payload) {
        setUsername(response.payload.username);
        setUserId(response.payload._id);
        setPoint(response.payload.points);
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
      // console.log("pointsData", pointsData);
      const sortedRank = pointsData.sort((a, b) => b.points - a.points);
      setRanking(sortedRank);
    });

    // socket.emit("refresh", userId);

    return () => {
      socket.off("pointsSocket");
      // socket.off("refresh");
    };
  }, [socket, userId]);

  useEffect(() => {
    handlePoints();
  }, []);

  const handlePoints = () => {
    socket.emit("points");
  };
  // console.log("point", point);

  return (
    <div className="">
      {/* <ConfettiBackground className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" /> */}
      {/* <div className="relative z-10"> */}
      <div className="  p-2">
        <div className="my-4">
          <div className="w-fit bg-gray-2100 px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text="🏆 | Arise Leaderboard"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-10">
          <div className="title text-7xl flex justify-center items-center">
            <Fade delay={700} duration={1000} triggerOnce fraction={0.5}>
              <div className="flex tracking-wider">
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-7xl pl-4">A</span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-7xl">r</span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-7xl">i</span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-7xl">s</span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-7xl pr-5">e</span>
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
            <div className="text-2xl text-center">
              where procrastination meets its match and determination shines
              bright,
              <br />
              Welcome to the World Ranking page of Arise!
            </div>
          </Fade>
        </div>

        <div className="mt-20">
          <div className="my-8 text-center">
            <span className="title text-5xl">Rank</span>
          </div>
          <Fade
            delay={200}
            duration={1000}
            triggerOnce
            fraction={0.5}
          >
          <div className="flex justify-center items-center">
            <ul className="w-[90%] bg-slate-50 border flex flex-col justify-center items-center rounded-2xl transition-all shadow-sm">
              <li className="w-full  grid grid-flow-row gap-4 rounded-t-2xl border-b-2">
                <div className="grid grid-cols-8 my-7">
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
                      index === 0 ? "bg-green-200 text-green-700 font-bold" : ""
                    } ${
                      user.username === username
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : ""
                    }`}
                  >
                    <div className="grid grid-cols-7">
                      <div className="col-span-1 relative flex justify-center items-center">
                        {index === 0 && (
                          <EmojiEventsTwoToneIcon className="absolute left-6" />
                        )}
                        {user.username === username && (
                          <p className="border absolute left-4 bg-blue-50 border-blue-700 rounded-full px-2 text-xs">
                            You
                          </p>
                        )}
                        <span className="px-1">{index + 1}</span>
                      </div>
                      <div className="col-span-3 flex justify-center items-center">
                        {user.username}
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

        <div className="mt-20">
          <div className="my-5 text-center">
            <span className="title text-5xl">What You Get ?</span>
          </div>

          <div className="m-5 grid grid-cols-3 gap-5">
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
      {/* </div> */}
    </div>
  );
}
export default WorldRank;
