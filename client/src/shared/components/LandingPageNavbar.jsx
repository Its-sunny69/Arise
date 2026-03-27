import { useState } from "react";
import { useMotionValueEvent, motion } from "motion/react";
import PropTypes from "prop-types";
import GradientButton from "./GradientButton";
import Logo from "../../assets/logo.svg";

export default function LandingPageNavbar({ yProgress }) {
  const [isCompact, setIsCompact] = useState(() => yProgress.get() >= 0.1);

  useMotionValueEvent(yProgress, "change", (latest) => {
    const nextIsCompact = latest >= 0.1;
    setIsCompact((prev) => (prev === nextIsCompact ? prev : nextIsCompact));
  });

  return (
    <>
      {!isCompact ? (
        <motion.div
          layout
          className="borde grid w-full grid-cols-8 border-black bg-transparent px-8 py-4"
        >
          <div className="col-span-2 flex items-center justify-start space-x-2">
            <img src={Logo} alt="arise" className="w-10" />
            <hr className="h-10 w-0.5 border-none bg-black" />
            <p className="text-2xl font-extrabold tracking-wide">ARISE</p>
          </div>

          <ul className="col-span-4 flex items-center justify-center space-x-8 text-sm font-semibold tracking-wider">
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#research">RESEARCH</a>
            </li>
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#about">ABOUT</a>
            </li>
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#contact">CONTACT</a>
            </li>
          </ul>

          <div className="col-span-2 flex items-center justify-end">
            <GradientButton
              text="Get Started"
              onClick={() => console.log("Clicked")}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="inner-shadow-title mt-4 grid w-[85%] grid-cols-8 rounded-full border border-[#c8eeff] bg-[#e7f3ff]/50 px-4 py-2 backdrop-blur-md"
        >
          <div className="col-span-2 flex items-center justify-start space-x-2">
            <img src={Logo} alt="arise" className="w-10" />
            <hr className="h-10 w-0.5 border-none bg-black" />
            <p className="text-2xl font-extrabold tracking-wide">ARISE</p>
          </div>

          <ul className="col-span-4 flex items-center justify-center space-x-8 text-sm font-semibold tracking-wider">
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#research">RESEARCH</a>
            </li>
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#about">ABOUT</a>
            </li>
            <li className="transition-all duration-300 hover:opacity-50">
              <a href="#contact">CONTACT</a>
            </li>
          </ul>

          <div className="col-span-2 flex items-center justify-end">
            <GradientButton
              text="Get Started"
              onClick={() => console.log("Clicked")}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

LandingPageNavbar.propTypes = {
  yProgress: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
};
