import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import Diversity3RoundedIcon from "@mui/icons-material/Diversity3Rounded";
import TiltedScroll from "../shared/components/TitledScroll";
import ShinyText from "../shared/components/ShinyText";
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
import CardScroll from "@/shared/components/CardScroll";
import { ComputerBackground } from "@/assets/images";

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

  const cards = [
    {
      title: "Smart Task Management",
      body: "Simplify your goals with an intuitive todo system.",
      image: ComputerBackground,
      bgClass: "bg-blue-400",
    },
    {
      title: "Gamified Progress",
      body: "Turn your accomplishments into exciting rewards and rankings.",
      image: ComputerBackground,
      bgClass: "bg-green-400",
    },
    {
      title: "Personalized Insights",
      body: "Get actionable feedback to optimize your productivity and growth.",
      image: ComputerBackground,
      bgClass: "bg-purple-400",
    },
  ];

  return (
    <div className="gradient-bg mask-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText
            text="📖 | About"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-20 text-center sm:my-10">
        <p className="font-title text-3xl font-bold sm:text-6xl">About ARISE</p>

        <p className="mt-6">
          Your ultimate ally in conquering procrastination and unlocking your
          full potential.
          <br />
          Your Partner in Productivity and Growth.
        </p>
      </div>

      <div className="my-20 grid grid-cols-2 sm:my-10">
        <div className="col-span-1 flex flex-col justify-start">
          <p className="font-title text-3xl font-bold sm:text-6xl">
            Why Arise?
          </p>
          <p className="mt-6">
            We understand that starting is often the hardest part. Arise is here
            to help you break free from procrastination, organize your goals,
            and turn your dreams into achievable milestones.
          </p>
        </div>
        <div className="col-span-1">
          <TiltedScroll />
        </div>
      </div>

      <div className="my-20 grid grid-cols-2 sm:my-10">
        <div className="col-span-1">
          <TiltedScroll />
        </div>
        <div className="col-span-1 flex flex-col justify-start">
          <p className="font-title text-3xl font-bold sm:text-6xl">
            What We Do?
          </p>
          <p className="mt-6">
            We understand that starting is often the hardest part. Arise is here
            to help you break free from procrastination, organize your goals,
            and turn your dreams into achievable milestones.
          </p>
        </div>
      </div>

      <div className="my-20 sm:my-10">
        <div className="text-center">
          <p className="font-title text-3xl font-bold sm:text-6xl">
            Our Mission
          </p>
          <p className="mt-6">
            To empower individuals around the world to overcome procrastination,
            embrace productivity, and achieve greatness—one task at a time.
          </p>
        </div>

        <div className="my-6">
          <CardScroll data={cards} textSectionDirection="right" />
        </div>
      </div>

      <div className="my-20 sm:my-10">
        <div className="text-center">
          <p className="font-title text-3xl font-bold sm:text-6xl">Our Team</p>
        </div>

        <div className="mt-6">
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
              <div className="flex flex-col rounded-md bg-slate-100 shadow-sm lg:flex-row">
                <div className="p-2 sm:p-5 lg:w-1/2">
                  <img
                    src={SunnyPic}
                    alt="Image"
                    className="shadow-blue-gray-900/50 h-96 w-full rounded-lg object-cover object-center shadow-xl"
                  />
                </div>
                <div className="bg-green-40 lg:w-1/2">
                  <div className="my-5 flex flex-col sm:my-10">
                    <span className="title mx-2 text-left text-2xl tracking-wider sm:text-4xl lg:mx-0">
                      Sunny Yadav
                    </span>

                    <div className="mx-2 flex items-center justify-start lg:mx-0">
                      <span className="text-left">Frontend Developer | </span>
                      <div className="ml-1 flex">
                        <a
                          href="https://www.linkedin.com/in/sunny-yadav-557676249/"
                          className="mr-1 transition-all hover:opacity-50 active:scale-95"
                          target="_blank"
                        >
                          <img src={LinkedInSvg} />
                        </a>
                        <a
                          href="https://github.com/Its-sunny69"
                          className="transition-all hover:opacity-50 active:scale-95"
                          target="_blank"
                        >
                          <img src={GithubSvg} />
                        </a>
                      </div>
                    </div>

                    <span className="mx-4 my-2 mt-5 text-justify text-lg sm:text-xl">
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
              <div className="flex flex-col rounded-md bg-slate-100 shadow-sm lg:flex-row">
                <div className="p-2 sm:p-5 lg:w-1/2">
                  <img
                    src={InzamamPic}
                    alt="Image"
                    className="shadow-blue-gray-900/50 h-96 w-full rounded-lg object-cover object-center shadow-xl"
                  />
                </div>
                <div className="lg:w-1/2">
                  <div className="my-5 flex flex-col sm:my-10">
                    <span className="title mx-2 text-left text-2xl tracking-wider sm:text-4xl lg:mx-0">
                      Inzamam Shaikh
                    </span>

                    <div className="mx-2 flex items-center justify-start lg:mx-0">
                      <span className="text-left">MERN Developer | </span>
                      <div className="ml-1 flex">
                        <a
                          href="https://www.linkedin.com/in/inzamam-shaikh-189678284/"
                          className="mr-1 transition-all hover:opacity-50 active:scale-95"
                          target="_blank"
                        >
                          <img src={LinkedInSvg} />
                        </a>
                        <a
                          href="https://github.com/Inzamamdev"
                          className="transition-all hover:opacity-50 active:scale-95"
                          target="_blank"
                        >
                          <img src={GithubSvg} />
                        </a>
                      </div>
                    </div>

                    <span className="mx-4 my-2 mt-5 text-justify text-lg sm:text-xl">
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
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
