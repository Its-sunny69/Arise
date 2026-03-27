import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import ArrowSvg from "../assets/arrow-svg.svg";
import SquaresBackground from "../shared/components/SquaresBackground";
import ShinyText from "../shared/components/ShinyText";
import profileLottie from "../assets/profile.lottie";
import crownLottie from "../assets/crown.lottie";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ComputerBackground, Phone2 } from "../assets/images";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Test2 from "../assets/sunny-pic2.png";
import Test3 from "../assets/inzamam-pic.jpg";
import Test4 from "../assets/sunny-pic2.png";
import GradientButton from "../shared/components/GradientButton";
import CardScroll from "@/shared/components/CardScroll";

function Home() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const imageSectionRef = useRef(null);
  const cardSectionRef = useRef(null);

  const user = useSelector((state) => state.auth.user);

  const { scrollYProgress: imageScrollYProgress } = useScroll({
    container: containerRef,
    target: imageSectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollY: cardScrollY } = useScroll({
    container: cardSectionRef,
  });

  const imageScale = useTransform(imageScrollYProgress, [0, 0.6], [0.85, 1]);
  const imageY = useTransform(imageScrollYProgress, [0, 0.6], [140, 0]);
  const imageOpacity = useTransform(imageScrollYProgress, [0, 0.4], [0.35, 1]);

  const cards = [
    {
      title: "Task List",
      body: "Organize your daily tasks, set priorities, and stay on track with ease. Break big goals into manageable steps and monitor progress throughout the day. Build momentum with a clear plan that keeps you focused and productive.",
      image: ComputerBackground,
      bgClass: "bg-blue-400",
    },
    {
      title: "Collaboration Room",
      body: "Create or join rooms to collaborate in real time and get things done together. Share updates instantly, coordinate responsibilities, and keep everyone aligned on priorities. Turn teamwork into measurable progress without losing clarity.",
      image: Test2,
      bgClass: "bg-orange-400",
    },
    {
      title: "Global Leaderboard",
      body: "Compete with users worldwide, earn points, and climb the productivity rankings. Stay motivated by tracking your standing and pushing for consistent improvement. Celebrate milestones, challenge yourself, and level up your productivity every week.",
      image: Test3,
      bgClass: "bg-green-400",
    },
  ];

  useMotionValueEvent(cardScrollY, "change", (latest) => {
    const el = cardSectionRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setActiveCardIndex(0);
      return;
    }

    const progress = latest / maxScroll;
    const nextIndex = Math.round(progress * (cards.length - 1));
    const clampedIndex = Math.max(0, Math.min(cards.length - 1, nextIndex));
    setActiveCardIndex(clampedIndex);
  });

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(user);

  return (
    <div
      className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white"
      ref={containerRef}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-white px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-center font-semibold tracking-wider">
          <div>
            <DotLottieReact
              src={profileLottie}
              loop
              autoplay
              style={{ width: 70, height: 70 }}
            />
          </div>
          <span className="text-xl font-bold capitalize">{user.username}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <DotLottieReact
              src={crownLottie}
              loop
              autoplay
              style={{ width: 50, height: 50 }}
            />
            <span className="text-xl font-bold">{user.points}</span>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="my-20 sm:my-10">
          <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
            <ShinyText
              text="🎉 | Introduction"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-20 sm:my-10">
          <div className="relative flex flex-col items-start justify-center">
            {/* <Fade
                delay={200}
                duration={1000}
                triggerOnce
                fraction={0.5}
                className="mb-10"
              >
                <div className="flex tracking-widest">
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline sm:text-7xl text-6xl pl-4">
                      A
                    </span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline sm:text-7xl text-6xl">
                      r
                    </span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline sm:text-7xl text-6xl">
                      i
                    </span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline sm:text-7xl text-6xl">
                      s
                    </span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline sm:text-7xl text-6xl pr-5">
                      e
                    </span>
                  </div>
                </div>
              </Fade> */}

            <span className="font-title text-3xl font-bold sm:text-6xl">
              Above Procrastination, <br /> One Task at a Time!
            </span>

            <span className="mt-6">
              Build momentum, crush distractions, and stay in control with Arise
              – <br /> your ultimate companion to beat procrastination and
              achieve more.
            </span>
          </div>

          <div className="z-10 mt-20 flex items-center justify-start sm:mt-24">
            <GradientButton
              text="Create Task Now"
              onClick={() => navigate("/task-list")}
            />
          </div>

          <div className="bg-gree-400 pointer-events-none absolute right-0 top-20 z-0 flex w-[40%] items-center justify-end">
            <img src={Phone2} alt="" className="w-[75%]" />
          </div>
        </div>

        <div
          className="my-20 flex items-center justify-center sm:my-10"
          ref={imageSectionRef}
        >
          <motion.div
            className="relative w-[70%] rounded-lg border border-gray-300 p-2"
            style={{
              scale: imageScale,
              y: imageY,
              opacity: imageOpacity,
            }}
          >
            <figure>
              {/* <figcaption className="mt-2 text-center text-xs text-gray-500">
                  Generated with Gemini AI
                </figcaption> */}

              <img
                src={ComputerBackground}
                alt="Home Page"
                className="rounded-lg"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 45%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 45%, transparent 100%)",
                }}
              />
            </figure>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-black">
              <p className="font-title font-medium text-gray-600">
                Collaborate with team and increase productivity!
              </p>
            </div>
          </motion.div>
        </div>

        <div className="my-20">
          <CardScroll data={cards} />
        </div>
      </div>
    </div>
  );
}

export default Home;
