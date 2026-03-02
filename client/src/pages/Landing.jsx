import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ArrowSvg from "../assets/arrow-svg.svg";
import SquaresBackground from "../shared/components/SquaresBackground";
import ShinyText from "../shared/components/ShinyText";
import BlurText from "../shared/components/BlurText";
import CustomSvg from "../assets/arise-custom.svg";

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
        <div className="w-[80%] mx-auto py-20 text-lg font-body border border-blue-400">
          <div className="border border-red-400">
            <div className="">
              <div className="w-fit px-4 py-1 rounded-full border border-gray-400 text-sm">
                <ShinyText
                  text="ARISE"
                  disabled={false}
                  speed={3}
                  className=""
                />
              </div>
            </div>

            <div className="">
              <div className="flex flex-col justify-center items-center">
                <div>
                  <img src={CustomSvg} className="w-60 mx-auto" />
                </div>

                <div className="my-8">
                  <p className="border border-neutral-400 rounded-full px-4 py-1 text-sm font-semibold text-neutral-700">ARISE - A Productivity-Focused App</p>
                </div>

                <p className="font-title font-bold sm:text-6xl text-5xl text-center">
                  Stuck in the Cycle of <br /> Procrastination?
                </p>

                <p className="mt-4 text-center">
                  Every day feels like a battle against distractions and
                  unfinished tasks. <br />
                  Arise is here to help you take control of your time, crush
                  your to-do list, <br />and make consistent progress towards your
                  dreams.
                </p>
              </div>

              <div className="lg:mt-16 mt-20 flex justify-center items-center ">
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
