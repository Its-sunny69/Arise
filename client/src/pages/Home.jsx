import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ShinyText from "../shared/components/ShinyText";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  ComputerBackground,
  HomeFeature1,
  HomeFeature2,
  HomeFeature3,
  Phone2,
} from "../assets/images";
import { motion, useScroll, useTransform } from "motion/react";
import GradientButton from "../shared/components/GradientButton";
import CardScroll from "@/shared/components/CardScroll";
import { ProfileLottie, CrownLottie } from "../assets/icons";

function Home() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const imageSectionRef = useRef(null);

  const user = useSelector((state) => state.auth.user);

  const { scrollYProgress: imageScrollYProgress } = useScroll({
    container: containerRef,
    target: imageSectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(imageScrollYProgress, [0, 0.6], [0.85, 1]);
  const imageY = useTransform(imageScrollYProgress, [0, 0.6], [140, 0]);
  const imageOpacity = useTransform(imageScrollYProgress, [0, 0.4], [0.35, 1]);

  const cards = [
    {
      title: "Task List",
      body: "Organize your daily tasks, set priorities, and stay on track with ease. Break big goals into manageable steps and monitor progress throughout the day. Build momentum with a clear plan that keeps you focused and productive.",
      image: HomeFeature1,
      bgClass: "bg-blue-400",
    },
    {
      title: "Collaboration Room",
      body: "Create or join rooms to collaborate in real time and get things done together. Share updates instantly, coordinate responsibilities, and keep everyone aligned on priorities. Turn teamwork into measurable progress without losing clarity.",
      image: HomeFeature2,
      bgClass: "bg-orange-400",
    },
    {
      title: "Global Leaderboard",
      body: "Compete with users worldwide, earn points, and climb the productivity rankings. Stay motivated by tracking your standing and pushing for consistent improvement. Celebrate milestones, challenge yourself, and level up your productivity every week.",
      image: HomeFeature3,
      bgClass: "bg-green-400",
    },
  ];

  return (
    <div
      className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white"
      ref={containerRef}
    >
      <div className="top-0 z-10 flex items-center justify-between border-b-2 border-white px-3 py-2 backdrop-blur-xl md:sticky md:px-6 md:py-3">
        <div className="flex items-center justify-center font-semibold tracking-wider">
          <div>
            <DotLottieReact
              src={ProfileLottie}
              loop
              autoplay
              style={{ width: 70, height: 70 }}
            />
          </div>
          <span className="text-lg font-bold capitalize md:text-xl">
            {user.username}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <DotLottieReact
              src={CrownLottie}
              loop
              autoplay
              style={{ width: 50, height: 50 }}
            />
            <span className="text-lg font-bold md:text-xl">{user.points}</span>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-6">
        <div className="mt-8">
          <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
            <ShinyText text="🎉 | Introduction" disabled={false} speed={3} />
          </div>
        </div>

        <div className="my-10 grid grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-4">
          <div className="flex flex-col items-start justify-center lg:col-span-2">
            <p className="font-title text-3xl font-bold md:text-4xl lg:text-6xl">
              Above{" "}
              <span className="gradient-animated-text">Procrastination</span>,{" "}
              <br /> One Task at a Time!
            </p>

            <span className="mt-6">
              Build momentum, crush distractions, and stay in control with Arise
              – <br /> your ultimate companion to beat procrastination and
              achieve more.
            </span>

            <div className="mt-20 flex items-center justify-start sm:mt-24">
              <GradientButton
                text="Create Task Now"
                onClick={() => navigate("/task-list")}
              />
            </div>
          </div>

          <div className="pointer-events-none z-0 col-span-1 flex items-center justify-center lg:justify-end">
            <img
              src={Phone2}
              alt=""
              width={288}
              height={576}
              loading="eager"
              decoding="async"
              className="h-auto w-72"
            />
          </div>
        </div>

        <div
          className="my-20 flex items-center justify-center"
          ref={imageSectionRef}
        >
          <motion.div
            className="relative w-full rounded-lg border border-gray-300 p-1 md:p-2 lg:w-[70%]"
            style={{
              scale: imageScale,
              y: imageY,
              opacity: imageOpacity,
            }}
          >
            <img
              src={ComputerBackground}
              alt="Home Page"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="rounded-lg"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 45%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 45%, transparent 100%)",
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-black">
              <p className="font-title text-xs font-medium text-gray-600 md:text-base">
                Collaborate with team and increase productivity!
              </p>
            </div>
          </motion.div>
        </div>

        <div className="my-20">
          <div className="my-5 text-center">
            <span className="font-title text-3xl font-bold md:text-4xl lg:text-5xl">
              What We Offer?
            </span>
          </div>
          <div className="my-6">
            <CardScroll data={cards} />
          </div>{" "}
        </div>
      </div>
    </div>
  );
}

export default Home;
