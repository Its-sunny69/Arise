import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import TiltedScroll from "../components/TitledScroll";
import ShinyText from "../components/ShinyText";
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
import SunnyPic from "../assets/sunny-pic2.png";
import InzamamPic from "../assets/inzamam-pic.jpg";
import GithubSvg from "../assets/github-svg.svg";
import LinkedInSvg from "../assets/linkedin-svg.svg";

function AboutUs() {
  const [activeDiv, setActiveDiv] = useState(0);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 1100);
  const divCount = 4;
  const delay = 2000;

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 1100);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDiv((prevActiveDiv) => (prevActiveDiv + 1) % divCount);
    }, delay);

    return () => clearInterval(interval);
  }, [divCount, delay]);
  return (
    <>
      <div className="w-full  p-2">
        <div className="my-4">
          <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text="📖 | About"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-10">
          <div className="title sm:text-7xl text-5xl flex justify-center items-center">
            <TypeAnimation
              sequence={["About"]}
              speed={30}
              repeat={0}
              cursor={false}
            />

            <Fade delay={700} duration={1000} triggerOnce fraction={0.5}>
              <div className="flex tracking-wider">
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline sm:text-7xl text-5xl sm:pl-4 pl-2">
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
          </div>

          <Fade
            delay={200}
            duration={1000}
            triggerOnce
            fraction={0.5}
            className="text-center"
          >
            {phoneView ? (
              <div className="sm:text-2xl sm:text-center text-lg sm:my-0 text-justify my-2">
                Your ultimate ally in conquering procrastination and unlocking
                your full potential. Your Partner in Productivity and Growth.
              </div>
            ) : (
              <div className="text-2xl text-center">
                Your ultimate ally in conquering procrastination and unlocking
                your full potential.
                <br />
                Your Partner in Productivity and Growth.
              </div>
            )}
          </Fade>
        </div>

        <Fade
          cascade
          delay={200}
          damping={0.1}
          duration={1000}
          triggerOnce
          fraction={0.5}
        >
          <div className="sm:mt-20 mt-10 sm:mx-5 lg:flex">
            <div className="lg:w-1/2">
              <div className="sm:my-8 lg:text-left text-center">
                <span className="title sm:text-5xl text-4xl">Why Arise?</span>
              </div>

              <div className="sm:my-8 my-4 text-justify">
                <span className="sm:text-2xl text-lg">
                  We understand that starting is often the hardest part. Arise
                  is here to help you break free from procrastination, organize
                  your goals, and turn your dreams into achievable milestones.
                </span>
              </div>
            </div>

            <div className="lg:w-1/2">
              <TiltedScroll />
            </div>
          </div>

          <div className="sm:mt-14 mt-10 flex flex-col-reverse lg:flex-row sm:mx-5">
            {phoneView ? (
              ""
            ) : (
              <div className="w-1/2 relative">
                <div
                  className={`absolute ${
                    activeDiv === 0
                      ? "top-32 left-44 scale-[200%] shadow-lg border border-gray-800"
                      : "top-5 left-10"
                  } w-28 h-14 rounded-sm transition-all duration-500 flex justify-center items-center bg-white border border-gray-800`}
                >
                  Productivity
                </div>
                <div
                  className={`absolute ${
                    activeDiv === 1
                      ? "top-32 left-44 scale-[200%] shadow-lg border border-gray-800"
                      : "top-6 left-11"
                  } w-28 h-14 rounded-sm transition-all duration-500 flex justify-center items-center bg-white border border-gray-800`}
                >
                  Motivation
                </div>
                <div
                  className={`absolute ${
                    activeDiv === 2
                      ? "top-32 left-44 scale-[200%] shadow-lg border border-gray-800"
                      : "top-7 left-12"
                  } w-28 h-14 rounded-sm transition-all duration-500 flex justify-center items-center bg-white border border-gray-800`}
                >
                  Focus
                </div>
              </div>
            )}

            <div className="lg:w-1/2">
              <div className="sm:my-8 mt-2 lg:text-left text-center">
                <span className="title sm:text-5xl text-4xl">What We Do?</span>
              </div>

              <div className="sm:my-8 my-4 text-justify">
                <span className="sm:text-2xl text-lg">
                  We understand that starting is often the hardest part. Arise
                  is here to help you break free from procrastination, organize
                  your goals, and turn your dreams into achievable milestones.
                </span>
              </div>
            </div>
          </div>

          <div className="lg:mt-20 mt-10">
            <div className="sm:my-8 text-center">
              <span className="title sm:text-5xl text-4xl">Our Mission</span>
            </div>

            {phoneView ? (
              <div className="sm:my-8 sm:text-center my-4 text-justify">
                <span className="sm:text-2xl text-lg ">
                  To empower individuals around the world to overcome
                  procrastination, embrace productivity, and achieve
                  greatness—one task at a time.
                </span>
              </div>
            ) : (
              <div className="my-8 text-center">
                <span className="text-2xl ">
                  To empower individuals around the world to overcome
                  procrastination, embrace productivity,
                  <br />
                  and achieve greatness—one task at a time.
                </span>
              </div>
            )}

            <div className="sm:m-5 grid lg:grid-cols-3 sm:gap-5 gap-3">
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
                      <PlaylistAddCheckRoundedIcon
                        className="text-gray-800 mb-4"
                        style={{ width: "4rem", height: "4rem" }}
                      />
                    </div>
                    <span className="title tracking-wider text-xl">
                      Smart Task Management
                    </span>
                  </div>
                  <span className="text-center">
                    Simplify your goals with an intuitive todo system.
                  </span>
                </div>

                <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
                  <div className=" flex flex-col justify-center mb-2 items-center">
                    <div className="flex justify-center items-center">
                      <SportsEsportsRoundedIcon
                        className="text-gray-800 mb-4"
                        style={{ width: "4rem", height: "4rem" }}
                      />
                    </div>
                    <span className="title tracking-wider text-xl">
                      Gamified Progress
                    </span>
                  </div>
                  <span className="text-center">
                    Turn your accomplishments into exciting rewards and
                    rankings.
                  </span>
                </div>

                <div className="flex flex-col p-4 rounded-md bg-slate-100 border hover:outline-dashed hover:outline-1 hover:scale-105 transition-all shadow-sm hover:shadow-md">
                  <div className=" flex flex-col justify-center mb-2 items-center">
                    <div className="flex justify-center items-center">
                      <Diversity3RoundedIcon
                        className="text-gray-800 mb-4"
                        style={{ width: "4rem", height: "4rem" }}
                      />
                    </div>
                    <span className="title tracking-wider text-xl">
                      Community Support
                    </span>
                  </div>
                  <span className="text-center">
                    Connect with like-minded achievers for inspiration and
                    encouragement.
                  </span>
                </div>
              </Fade>
            </div>
          </div>

          <div className="sm:mt-20 mt-10">
            <div className="sm:my-8 my-4 text-center">
              <span className="title sm:text-5xl text-4xl">Our Team</span>
            </div>
          </div>

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
            className="w-full h-full"
          >
            <SwiperSlide>
              <div className="flex lg:flex-row flex-col bg-slate-100 rounded-md shadow-sm">
                <div className="lg:w-1/2 sm:p-5 p-2">
                  <img
                    src={SunnyPic}
                    alt="Image"
                    className="object-cover object-center w-full rounded-lg shadow-xl h-96 shadow-blue-gray-900/50"
                  />
                </div>
                <div className="lg:w-1/2 bg-green-40">
                  <div className="sm:my-10 my-5 flex flex-col">
                    <span className="title tracking-wider sm:text-4xl text-2xl lg:mx-0 mx-2 text-left">
                      Sunny Yadav
                    </span>

                    <div className="flex justify-start items-center lg:mx-0 mx-2">
                      <span className="text-left">Frontend Developer | </span>
                      <div className="flex ml-1">
                        <a
                          href="https://www.linkedin.com/in/sunny-yadav-557676249/"
                          className="mr-1 hover:opacity-50 active:scale-95 transition-all"
                          target="_blank"
                        >
                          <img src={LinkedInSvg} />
                        </a>
                        <a
                          href="https://github.com/Its-sunny69"
                          className="hover:opacity-50 active:scale-95 transition-all"
                          target="_blank"
                        >
                          <img src={GithubSvg} />
                        </a>
                      </div>
                    </div>

                    <span className="text-justify sm:text-xl text-lg mt-5 mx-4 my-2">
                      We specialize in building responsive, high-performance web
                      applications using React and seamless API integration.
                      With expertise in Redux, we ensure smooth data flow and
                      exceptional user experiences. Our focus is on delivering
                      efficient, user-friendly solutions that bring your vision
                      to life.
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex lg:flex-row flex-col bg-slate-100 rounded-md shadow-sm">
                <div className="lg:w-1/2 sm:p-5 p-2">
                  <img
                    src={InzamamPic}
                    alt="Image"
                    className="object-cover object-center w-full rounded-lg shadow-xl h-96 shadow-blue-gray-900/50"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="sm:my-10 my-5 flex flex-col">
                    <span className="title tracking-wider sm:text-4xl text-2xl lg:mx-0 mx-2 text-left">
                      Inzamam Shaikh
                    </span>

                    <div className="flex justify-start items-center lg:mx-0 mx-2">
                      <span className="text-left">MERN Developer | </span>
                      <div className="flex ml-1">
                        <a
                          href="https://www.linkedin.com/in/inzamam-shaikh-189678284/"
                          className="mr-1 hover:opacity-50 active:scale-95 transition-all"
                          target="_blank"
                        >
                          <img src={LinkedInSvg} />
                        </a>
                        <a
                          href="https://github.com/Inzamamdev"
                          className="hover:opacity-50 active:scale-95 transition-all"
                          target="_blank"
                        >
                          <img src={GithubSvg} />
                        </a>
                      </div>
                    </div>

                    <span className="text-justify sm:text-xl text-lg mt-5 mx-4 my-2">
                      We craft responsive, high-performance web applications
                      using React, with seamless API integration and WebSocket
                      support for real-time updates, WebRTC, Firebase, and
                      DigitalOcean, we ensure scalable backends, smooth
                      communication, and delivering exceptional, user-friendly
                      solutions tailored to your vision.
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </Fade>
      </div>
    </>
  );
}

export default AboutUs;
