import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ArrowSvg from "../assets/arrow-svg.svg";
import SquaresBackground from "../shared/components/SquaresBackground";
import ShinyText from "../shared/components/ShinyText";
import BlurText from "../shared/components/BlurText";
import CustomSvg from "../assets/arise-custom.svg";
import GradientButton from "../shared/components/GradientButton";
import LandingPageNavbar from "../shared/components/LandingPageNavbar";
import { createLayout } from "animejs";
import { use } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import ColorBends from "@/components/ColorBends";

function Landing() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });

  const yProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log("progress:", latest);
    // console.log("yProgress:", yProgress.get());
  });

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log("Landing page rendered");

  return (
    <>
      <div ref={ref} className="relative min-h-screen w-full">
        <div className="borde bg-gradient inner-shadow-bg absolute z-[-1] flex h-screen w-full items-center justify-center border-black"></div>

        {/* <ColorBends
          rotation={45}
          speed={0.2}
          colors={["#1a40ff", "#b6dafb"]}
          transparent
          autoRotate={0.1}
          scale={1}
          frequency={0.9}
          warpStrength={1}
          mouseInfluence={0.4}
          parallax={0.5}
          noise={0}
        /> */}

        <div className="borde sticky top-0 z-10 flex items-center justify-center border-red-400">
          <LandingPageNavbar yProgress={yProgress} />
        </div>

        <div className="borde-x-2 mx-auto w-[85%] border-[#deebf7] px-20 py-16 font-body text-lg">
          <div className="borde border-red-400">
            {/* <div className="">
              <div className="w-fit rounded-full border border-gray-400 px-4 py-1 text-sm">
                <ShinyText
                  text="ARISE"
                  disabled={false}
                  speed={3}
                  className=""
                />
              </div>
            </div> */}

            <div className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <img src={CustomSvg} className="mx-auto w-52" />
                </div>

                <div className="my-12">
                  <p className="inner-shadow-title rounded-full bg-[#e7f3ff]/50 px-6 py-2 text-sm text-[#005f8f]">
                    ARISE - A Productivity-Focused App
                  </p>
                </div>

                <p className="text-center font-title text-5xl font-bold sm:text-6xl">
                  Stuck in Procrastination Cycle?
                </p>

                <p className="mt-4 text-center text-xl font-semibold text-subtext">
                  {/* Every day feels like a battle against distractions and
                  unfinished tasks. <br /> */}
                  Arise is here to help you take control of your time, crush
                  your to-do list, <br />
                  and make consistent progress towards your dreams.
                </p>
              </div>

              <div className="mt-20 flex items-center justify-center lg:mt-16">
                <GradientButton
                  text="Get Started Now"
                  onClick={() => navigate("/login")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[85%] border-x-2 border-[#deebf7] px-20 py-20 font-body text-lg">
          <div className="border border-red-400">
            <div className="">
              <div className="w-fit rounded-full border border-gray-400 px-4 py-1 text-sm">
                <ShinyText
                  text="ARISE"
                  disabled={false}
                  speed={3}
                  className=""
                />
              </div>
            </div>

            <div className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <img src={CustomSvg} className="mx-auto w-60" />
                </div>

                <div className="my-8">
                  <p className="rounded-full border border-neutral-400 px-4 py-1 text-sm font-semibold text-neutral-700">
                    ARISE - A Productivity-Focused App
                  </p>
                </div>

                <p className="text-center font-title text-5xl font-bold sm:text-6xl">
                  Stuck in the Cycle of <br /> Procrastination?
                </p>

                <p className="mt-4 text-center text-xl text-subtext">
                  Every day feels like a battle against distractions and
                  unfinished tasks. <br />
                  Arise is here to help you take control of your time, crush
                  your to-do list, <br />
                  and make consistent progress towards your dreams.
                </p>
              </div>

              <div className="mt-20 flex items-center justify-center lg:mt-16">
                <button
                  className="group font-thin transition-all active:scale-95"
                  onClick={() => navigate("/login")}
                >
                  <div className="flex items-center justify-center gap-2 font-bold transition-all group-hover:text-gray-600">
                    Get Started Now
                    <img
                      src={ArrowSvg}
                      className="rotate-45 transform transition-all duration-300 group-hover:rotate-90"
                    />
                  </div>
                  <hr className="h-1 w-0 bg-black transition-all duration-500 group-hover:w-full" />
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
