import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ArrowSvg from "../assets/arrow-svg.svg";
import SquaresBackground from "../components/SquaresBackground";
import ShinyText from "../components/ShinyText";
import BlurText from "../components/BlurText";

function Landing() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="w-full h-screen">
        <div className="relative z-10 w-full h-lvh sm:p-0 sm:px-14 p-2 px-5 ">
          <div className="absolute inset-0 w-full h-full -z-10">
            <SquaresBackground
              speed={0.5}
              squareSize={40}
              direction="diagonal"
              borderColor="#d5d5d5"
              hoverFillColor="#f5f5f5"
            />
          </div>

          <div>
            <div className="lg:my-14 my-10">
              <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
                <ShinyText
                  text="🥳 | Welcome"
                  disabled={false}
                  speed={3}
                  className=""
                />
              </div>
            </div>

            <div className="sm:my-10 my-14">
              <div className="flex flex-col justify-center items-center">
                <Fade
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
                </Fade>
                <span className="title sm:text-7xl text-5xl text-center">
                  <BlurText
                    text="Stuck in the Cycle of Procrastination?"
                    delay={150}
                    animateBy="words"
                    direction="top"
                  />
                </span>
                <Fade
                  delay={200}
                  duration={1000}
                  triggerOnce
                  fraction={0.5}
                  className="sm:text-center text-justify my-2"
                >
                  {phoneView ? (
                    <span className="text-lg">
                      Every day feels like a battle against distractions and
                      unfinished tasks. Arise is here to help you take control
                      of your time, crush your to-do list, and make consistent
                      progress towards your dreams.
                    </span>
                  ) : (
                    <span className="text-2xl">
                      Every day feels like a battle against distractions and
                      unfinished tasks. <br />
                      Arise is here to help you take control of your time, crush
                      your to-do list, and make consistent progress towards your
                      dreams.
                    </span>
                  )}
                </Fade>
              </div>

              <div className="lg:mt-24 mt-20 flex justify-center items-center ">
                <button
                  className="font-thin group transition-all active:scale-95"
                  onClick={() => navigate("/login")}
                >
                  <div className="flex justify-center items-center font-bold group-hover:text-gray-600 gap-2 transition-all">
                    Get Started Now
                    <img
                      src={ArrowSvg}
                      className="rotate-45 group-hover:rotate-90 transition-all transform duration-300"
                    />
                  </div>
                  <hr className="w-0 group-hover:w-full h-1 transition-all duration-500 bg-black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
