import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GradientButton from "../shared/components/GradientButton";
import LandingPageNavbar from "../shared/components/LandingPageNavbar";
import { useScroll, useTransform } from "motion/react";
import AnimatedLogoSvg from "@/shared/components/AnimatedLogoSvg";
import {
  FeatureRank,
  FeatureRoom,
  FeatureRoomChat,
  FeatureRoomPage,
  FeatureTask,
  Inzamam,
  Sunny,
} from "@/assets/images";
import {
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TeamCard from "@/shared/components/TeamCard";
import LandingPagePhoneNavbar from "@/shared/components/LandingPagePhoneNavbar";
import { EmailSvg, TwitterSvg } from "@/assets/icons";

function Landing() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const navigate = useNavigate();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });

  const yProgress = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.5, 1]);

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen w-full">
      <div className="bg-gradient inner-shadow-bg absolute z-[-1] flex h-screen w-full items-center justify-center"></div>

      <div className="sticky top-0 z-10 flex items-center justify-center">
        {phoneView ? (
          <LandingPagePhoneNavbar yProgress={yProgress} />
        ) : (
          <LandingPageNavbar yProgress={yProgress} />
        )}
      </div>

      <div className="hero mx-auto px-3 py-14 font-body text-lg lg:w-[85%] lg:px-20">
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto">
              <AnimatedLogoSvg />
            </div>

            <div className="my-12">
              <p className="inner-shadow-title rounded-full bg-[#e7f3ff]/50 px-6 py-2 text-center text-xs text-[#005f8f] md:text-sm">
                ARISE - A Productivity-Focused App
              </p>
            </div>

            <div className="w-[85%] lg:w-full">
              <p className="text-center font-title text-3xl font-bold md:text-4xl lg:text-6xl">
                Stuck in Procrastination Cycle?
              </p>

              <p className="mt-4 text-center text-base font-semibold text-subtext md:text-xl">
                Arise is here to help you take control of your time, crush your
                to-do list, <br />
                and make consistent progress towards your dreams.
              </p>
            </div>
          </div>

          <div className="mt-20 flex items-center justify-center lg:mt-16">
            <GradientButton
              text="Get Started Now"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>

        <div className="my-32 scroll-m-20" id="features">
          <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
            Features
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3">
            <div className="relative flex h-[24rem] flex-col justify-between overflow-hidden border-b-2 border-r-2 border-white p-2 md:col-span-2">
              <div className="z-[5]">
                <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
                  TASK LIST
                </p>
                <p className="mt-2 font-title text-xl font-bold md:text-3xl">
                  Personal Task Management
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Organize and prioritize your tasks with our intuitive
                  interface.
                </p>
              </div>

              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={FeatureTask}
                  className="h-full w-full object-cover object-left lg:object-center"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, black 0%, transparent 60%)",
                    maskImage:
                      "linear-gradient(to top, black 0%, transparent 60%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              </div>
            </div>

            <div className="relative col-span-1 flex h-[24rem] flex-col justify-between overflow-hidden border-b-2 border-l-2 border-white p-2">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={FeatureRoom}
                  className="h-full w-full object-cover object-left lg:object-top"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to top, black 0%, transparent 60%)",
                    maskImage:
                      "linear-gradient(to top, black 0%, transparent 60%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              </div>

              <div className="z-[5] text-right">
                <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
                  ROOMS
                </p>
                <p className="mt-2 font-title text-xl font-bold md:text-3xl">
                  Collaborate
                  <br />
                  with your team
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Create a room to collaborate And organize tasks with team in
                  real-time.
                </p>
              </div>
            </div>

            <div className="relative flex h-[24rem] flex-col justify-center overflow-hidden border-y-2 border-white p-2 md:col-span-3">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={FeatureRoomPage}
                  className="h-full w-full object-cover object-left-top"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to right, black 0%, transparent 50%)",
                    maskImage:
                      "linear-gradient(to right, black 0%, transparent 50%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              </div>

              <div className="z-[5] text-right">
                <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
                  ROOM FEATURES
                </p>
                <p className="mt-2 font-title text-xl font-bold md:text-3xl">
                  Sync with Team in Real-Time
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  <span>
                    Stay organized and on top of your tasks with our shared task
                    lists.
                  </span>
                  <br />
                  <span className="my-2 inline-block">
                    Communicate with your team in real-time through our
                    intuitive chat interface.
                  </span>
                  <br />
                  <span>
                    Get rewarded for your efforts and contributions with an
                    engaging points system.
                  </span>
                </p>
              </div>
            </div>

            <div className="relative col-span-1 flex h-[24rem] flex-col justify-between overflow-hidden border-r-2 border-t-2 border-white p-2">
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={FeatureRoomChat}
                  className="h-full w-full object-cover object-left lg:object-top"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, transparent 60%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, transparent 60%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              </div>

              <div className="absolute bottom-0 right-0 z-[5]">
                <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
                  CHAT
                </p>
                <p className="mt-2 font-title text-xl font-bold md:text-3xl">
                  Stay Updated <br /> with Your Team
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Chat with your team in real-time, share updates, and stay
                  connected
                </p>
              </div>
            </div>

            <div className="relative flex h-[24rem] flex-col justify-between overflow-hidden border-l-2 border-t-2 border-white p-2 md:col-span-2">
              <div className="absolute bottom-0 right-0 z-[5] text-right">
                <p className="text-[0.7rem] font-extrabold tracking-[0.3rem] text-purple-500">
                  LEADERBOARD
                </p>
                <p className="mt-2 font-title text-xl font-bold md:text-3xl">
                  Compete and Earn Rewards
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Stack up points, climb the leaderboard, and earn rewards for
                  your hard work.
                </p>
              </div>

              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={FeatureRank}
                  className="h-full w-full object-cover object-left-top"
                  style={{
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, transparent 60%)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, transparent 60%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-32 scroll-m-20" id="about">
          <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
            About Us
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
            <div className="col-span-1">
              <Swiper
                modules={[
                  Autoplay,
                  Mousewheel,
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                ]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                slideToClickedSlide={true}
                mousewheel={true}
                initialSlide={1}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{ clickable: true }}
                className="h-full w-full"
              >
                <SwiperSlide>
                  <TeamCard
                    name="Sunny Yadav"
                    role="Frontend Developer"
                    image={Sunny}
                    linkedin="https://www.linkedin.com/in/sunny-yadav-557676249/"
                    github="https://github.com/Its-sunny69"
                    portfolio="https://sunny-portfolio-teal.vercel.app/"
                    direction="col"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <TeamCard
                    name="Inzamam Shaikh"
                    role="MERN Developer"
                    image={Inzamam}
                    linkedin="https://www.linkedin.com/in/inzamam-shaikh-189678284/"
                    github="https://github.com/Inzamamdev"
                    portfolio="#"
                    direction="col"
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="col-spans-1 p-2">
              <p className="text-sm text-subtext">
                <span className="mb-2 inline-block">
                  ARISE is a productivity-driven platform designed to help
                  individuals overcome procrastination, stay consistent, and
                  unlock their true potential. It transforms everyday efforts
                  into visible progress, allowing users to track their growth,
                  stay accountable, and build meaningful habits over time.
                </span>
                <span className="mb-2 inline-block">
                  The idea behind ARISE was born during our college days, when
                  we used to study in groups and naturally found ourselves
                  competing by tracking each other’s progress. That sense of
                  shared accountability pushed us to stay focused and do better.
                  We realized that studying alone often leads to distractions
                  and procrastination, but when progress is visible and shared,
                  motivation increases. That’s when the idea clicked — why not
                  build a platform where friends can connect, share their
                  progress, compete, and grow together?
                </span>
                <span className="mb-2 inline-block">
                  As ARISE continues to evolve, we aim to introduce smarter
                  insights, AI-driven recommendations, deeper analytics, and
                  more interactive ways to stay connected and motivated.
                </span>
                <span className="mb-2 inline-block">
                  ARISE is build by two friends Inzamam and Sunny, who are
                  passionate about productivity, technology, and helping others
                  achieve their goals.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="my-32 scroll-m-20" id="contact">
          <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
            Contact Us
          </h2>

          <div className="mt-16 grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-3 lg:gap-6">
            <p className="col-span-1 p-2 text-sm text-subtext lg:col-span-2">
              <span className="mb-2 inline-block">
                We’d love to hear from you. Whether you have questions,
                feedback, suggestions, or just want to share your experience
                with ARISE, feel free to reach out to our team. Every message
                helps us improve and build a better platform to fight
                procrastination and support your productivity journey. We’re
                always here to listen, learn, and grow with you.
              </span>
              <span className="inline-block">
                You can contact us using the details provided below, or reach
                out directly to the developers through their social handles
                listed on the About page under the Team section. We’re always
                open to connecting and would be happy to assist you.
              </span>
            </p>

            <div className="col-span-1">
              <div className="flex flex-col items-start justify-between overflow-hidden rounded-xl border-2 border-white bg-[#dadaeb]/50 py-2 text-sm text-subtext shadow-[0px_0px_14px_6px_#dadaeb69] backdrop-blur-lg">
                <div className="my-1 px-4">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=dynamosdev0@gmail.com"
                    target="_blank"
                    className="group flex min-w-0 items-center justify-start break-words underline-offset-2 hover:underline"
                  >
                    <img src={EmailSvg} alt="" className="mr-6 w-4" />
                    <span className="min-w-0 transition-all group-hover:opacity-50 group-active:scale-95">
                      dynamosdev0@gmail.com
                    </span>
                  </a>
                </div>
                <hr className="my-1 w-full border border-white" />
                <div className="my-1 px-4">
                  <a
                    href="https://x.com/dynamos_dev"
                    target="_blank"
                    className="group flex min-w-0 items-center justify-start break-words underline-offset-2 hover:underline"
                  >
                    <img src={TwitterSvg} alt="" className="mr-4 w-6" />
                    <span className="min-w-0 transition-all group-hover:opacity-50 group-active:scale-95">
                      https://x.com/dynamos_dev
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative m-3 flex min-h-[14rem] flex-col items-center justify-between overflow-hidden rounded-xl border-2 border-white bg-[#dadaeb]/50 p-4 text-xs text-subtext shadow-[0px_0px_14px_6px_#dadaeb69] backdrop-blur-lg md:text-sm lg:m-4">
        <div
          className="flex items-center justify-center font-title text-[8rem] font-bold leading-none text-[#9e9ac8] md:text-[10rem] lg:text-[14rem]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 70%)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 70%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          arise
        </div>
        <div className="flex flex-col items-center justify-center p-4 lg:flex-row">
          All rights reserved &copy; 2026&nbsp;
          <span className="hidden lg:inline">|</span>&nbsp;
          <a
            href="/about"
            className="transition-all hover:underline hover:opacity-70"
          >
            Made with ❤️ by Dev Dynamos
          </a>
        </div>
      </div>
    </div>
  );
}

export default Landing;
