import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../context/Socket";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ShinyText from "../shared/components/ShinyText";
import CardScroll from "@/shared/components/CardScroll";
import {
  ComputerBackground,
  RankFeature1,
  RankFeature2,
  RankFeature3,
} from "@/assets/images";

function WorldRank() {
  const [ranking, setRanking] = useState([]);
  const [showText, setShowText] = useState(false);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 1100);
  const currentUser = useSelector((state) => state.auth.user);
  const socket = useSocket();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
  }, [socket, currentUser._id]);

  useEffect(() => {
    handlePoints();
  }, []);

  const handlePoints = () => {
    socket.emit("points");
  };

  const cards = [
    {
      title: "Track Your Journey",
      body: "Every task you conquer brings you one step closer to the top. Compete with achievers worldwide and see how you stack up against the best!",
      image: RankFeature1,
      bgClass: "bg-blue-400",
    },
    {
      title: "Motivation at Its Best",
      body: "Rise through the ranks, earn badges, and be recognized as a true champion of productivity. Every small win counts toward your big goals.",
      image: RankFeature2,
      bgClass: "bg-blue-400",
    },
    {
      title: "Join the Race Now",
      body: " The leaderboard refreshes regularly—so every day is a new chance to shine. Push your limits, stay consistent, and become the hero of your own story!",
      image: RankFeature3,
      bgClass: "bg-blue-400",
    },
  ];

  return (
    <div className="gradient-bg mask-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText
            text="🏆 | Arise Leaderboard"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-20 text-center sm:my-10">
        <p className="font-title text-3xl font-bold sm:text-6xl">
          ARISE Global Leaderboard
        </p>

        <p className="mt-6">
          where procrastination meets its match and determination shines bright,
          Welcome to the World Ranking page of Arise!
        </p>
      </div>

      <div className="my-20 sm:my-10">
        <div className="my-5 text-center">
          <span className="font-title text-3xl font-bold sm:text-6xl">
            Rank
          </span>
        </div>

        <div className="flex items-center justify-center">
          <ul className="text-whit leaderboard-gradient relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white shadow-[0px_0px_14px_6px_#ffffff3b] transition-all sm:w-[90%]">
            {/* -- waves -- */}
            <svg
              viewBox="0 0 400 800"
              className="absolute bottom-0 right-0 h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g1" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="g2" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
                </linearGradient>

                <linearGradient id="g3" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <path
                d="
    M0,800
    C80,720 140,650 120,580
    C100,500 180,440 160,360
    C140,280 220,220 260,160
    C300,120 340,80 400,40
    L400,800 Z"
                fill="url(#g1)"
              />

              <path
                d="
    M40,800
    C120,740 180,670 160,600
    C140,520 220,460 200,380
    C180,300 260,240 300,180
    C340,140 370,110 400,80
    L400,800 Z"
                fill="url(#g2)"
              />

              <path
                d="
    M80,800
    C160,760 220,700 200,630
    C180,550 260,500 240,420
    C220,340 300,280 340,220
    C370,180 390,150 400,120
    L400,800 Z"
                fill="url(#g3)"
              />
            </svg>

            <div className="relative z-10 w-full rounded-xl backdrop-blur-xl">
              <li className="grid w-full grid-flow-row gap-4 rounded-t-xl border-b-2 border-white">
                <div className="my-4 grid grid-cols-7">
                  <div className="col-span-1 flex items-center justify-center font-bold">
                    Rank
                  </div>
                  <div className="col-span-3 flex items-center justify-center px-4 font-bold">
                    Username
                  </div>
                  <div className="col-span-3 flex items-center justify-center font-bold">
                    Task Completed
                  </div>
                </div>
              </li>

              {/* //work below and make it like the room rank table... */}
              {ranking.map((user, index) => {
                if (index < 20)
                  return (
                    <li
                      key={user._id}
                      className={`grid w-full grid-flow-row py-2 hover:opacity-70 ${
                        index === ranking.length - 1 ? "rounded-b-xl" : ""
                      } ${
                        index === 0
                          ? "bg-yellow-200 font-bold text-yellow-600"
                          : ""
                      } ${
                        user.username === currentUser.username
                          ? "bg-blue-100 font-bold text-blue-700"
                          : ""
                      }`}
                    >
                      <div className="grid grid-cols-7">
                        <div className="relative col-span-1 flex items-center justify-center">
                          {phoneView ? (
                            <>
                              {index === 0 && <EmojiEventsTwoToneIcon />}

                              {index !== 0 && (
                                <span className="px-1">{index + 1}</span>
                              )}
                            </>
                          ) : (
                            <>
                              {index === 0 ? (
                                <EmojiEventsTwoToneIcon />
                              ) : (
                                <span className="px-1">{index + 1}</span>
                              )}
                            </>
                          )}
                        </div>
                        <div className="col-span-3 flex items-center justify-center">
                          {phoneView ? (
                            <>
                              {user.username === currentUser.username && (
                                <p className="rounded-full border border-blue-700 bg-blue-50 px-2 text-xs">
                                  You
                                </p>
                              )}
                              {user.username !== currentUser.username && (
                                <>{user.username}</>
                              )}
                            </>
                          ) : (
                            <>
                              {currentUser.username === user.username ? (
                                <p
                                  className={`rounded-full px-3 text-sm ${
                                    index === 0
                                      ? "border border-yellow-600 bg-yellow-100 font-bold text-yellow-600"
                                      : "border border-blue-600 bg-blue-50 font-bold text-blue-600"
                                  }`}
                                >
                                  You
                                </p>
                              ) : (
                                <>{user.username}</>
                              )}
                            </>
                          )}
                        </div>
                        <div className="col-span-3 flex items-center justify-center">
                          {currentUser.points}
                        </div>
                      </div>
                    </li>
                  );
              })}
            </div>
          </ul>
        </div>
      </div>

      <div className="my-20 sm:my-10">
        <div className="my-5 text-center">
          <span className="font-title text-3xl font-bold sm:text-6xl">
            What you get?
          </span>
        </div>

        <div className="my-6">
          <CardScroll data={cards} />
        </div>
      </div>
    </div>
  );
}
export default WorldRank;
