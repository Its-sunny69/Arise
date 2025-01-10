import React from "react";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { Fade, Slide } from "react-awesome-reveal";
import ArrowSvg from "../assets/arrow-svg.svg";
import SquaresBackground from "../components/SquaresBackground";
import ShinyText from "../components/ShinyText";
import BlurText from "../components/BlurText";
import GradientText from "../components/GradientText";

function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-screen">
        <div className="relative z-10 w-full h-lvh px-14 ">
          <div className="absolute inset-0 w-full h-full -z-10">
            <SquaresBackground
              speed={0.5}
              squareSize={40}
              direction="diagonal" // up, down, left, right, diagonal
              borderColor="#d5d5d5"
              hoverFillColor="#f5f5f5"
            />
          </div>

          <div>
            <div className="my-14">
              <div className="w-fit bg-gray-2100 px-5 py-1 rounded-full border border-gray-400 text-sm">
                <ShinyText
                  text="🥳 | Welcome"
                  disabled={false}
                  speed={3}
                  className=""
                />
              </div>
            </div>

            <div className="my-10">
              <div className="flex flex-col justify-center items-center">
                <Fade
                  delay={200}
                  duration={1000}
                  triggerOnce
                  fraction={0.5}
                  className="mb-10"
                >
                  <div className="">
                    <GradientText
                      colors={[
                        "#40ffaa",
                        "#4079ff",
                        "#40ffaa",
                        "#4079ff",
                        "#40ffaa",
                      ]}
                      animationSpeed={3}
                      showBorder={false}
                      className="custom-class title tracking-widest text-7xl font-extrabold drop-shadow-md"
                    >
                      ARISE
                    </GradientText>
                  </div>
                </Fade>
                <span className="title text-7xl">
                  {/* <TypeAnimation
                    sequence={["Stuck in the Cycle of Procrastination?"]}
                    speed={30}
                    repeat={0}
                  /> */}
                  <BlurText
                    text="Stuck in the Cycle of Procrastination?"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    // className="text-2xl mb-8"
                  />
                </span>
                <Fade
                  delay={200}
                  duration={1000}
                  triggerOnce
                  fraction={0.5}
                  className="text-center"
                >
                  <span className="text-2xl">
                    Every day feels like a battle against distractions and
                    unfinished tasks. <br />
                    Arise is here to help you take control of your time, crush
                    your to-do list, and make consistent progress towards your
                    dreams.
                  </span>
                </Fade>
              </div>

              <div className="mt-24 flex justify-center items-center ">
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
