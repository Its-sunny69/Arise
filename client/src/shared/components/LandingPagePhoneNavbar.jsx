import { useState } from "react";
import Logo from "./Logo";
import GradientButton from "./GradientButton";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent } from "motion/react";
import PropTypes from "prop-types";

function LandingPagePhoneNavbar({ yProgress }) {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const [isCompact, setIsCompact] = useState(() => yProgress.get() >= 0.1);

  const navigate = useNavigate();

  useMotionValueEvent(yProgress, "change", (latest) => {
    const nextIsCompact = latest >= 0.03;
    setIsCompact((prev) => (prev === nextIsCompact ? prev : nextIsCompact));
  });

  return (
    <>
      {!isCompact ? (
        <motion.div
          layout
          className="flex w-full items-center justify-between bg-transparent px-3 py-4"
        >
          <div className="col-span-2 flex items-center justify-start space-x-2">
            <Logo className="w-10" />
            <hr className="h-10 w-0.5 border-none bg-black" />
            <p className="text-2xl font-extrabold tracking-wide">ARISE</p>
          </div>

          <div className="flex gap-2">
            <div className="col-span-2 flex items-center justify-end">
              <GradientButton text="Login" onClick={() => navigate("/login", { viewTransition: "true" })} />
            </div>

            <div className="flex items-center justify-end transition-all duration-300">
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-95"
                onClick={() => setIsNavVisible(!isNavVisible)}
                aria-label={
                  isNavVisible
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isNavVisible}
              >
                <div className="relative flex h-6 w-6 items-center justify-start">
                  <motion.span
                    className="absolute h-0.5 w-6 rounded-full bg-black"
                    initial={false}
                    animate={{
                      rotate: isNavVisible ? 45 : 0,
                      y: isNavVisible ? 0 : -7,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-5 rounded-full bg-black"
                    initial={false}
                    animate={{
                      opacity: isNavVisible ? 0 : 1,
                      scaleX: isNavVisible ? 0.2 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 rounded-full bg-black"
                    initial={false}
                    animate={{
                      rotate: isNavVisible ? -45 : 0,
                      y: isNavVisible ? 0 : 7,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isNavVisible && (
              <motion.div
                className="absolute right-3 top-20 z-50 w-[min(14rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-lg"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ul className="flex flex-col gap-2">
                  <li className="w-full">
                    <a
                      href="#features"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>Feature</span>
                    </a>
                  </li>

                  <li className="w-full">
                    <a
                      href="#about"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>About</span>
                    </a>
                  </li>

                  <li className="w-full">
                    <a
                      href="#contact"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          layout
          className="inner-shadow-title mt-4 flex w-[90%] items-center justify-between rounded-full border border-[#dadaeb] bg-[#efedf5]/50 px-4 py-2 backdrop-blur-md md:w-[85%]"
        >
          <div className="col-span-2 flex items-center justify-start space-x-2">
            <Logo className="w-8 md:w-10" />
            <hr className="h-10 w-0.5 border-none bg-black" />
            <p className="text-xl font-extrabold tracking-wide md:text-2xl">
              ARISE
            </p>
          </div>

          <div className="flex gap-2">
            <div className="col-span-2 flex items-center justify-end">
              <GradientButton text="Login" onClick={() => navigate("/login", { viewTransition: "true" })} />
            </div>

            <div className="flex items-center justify-end transition-all duration-300">
              <button
                className="flex items-center justify-center rounded-full transition-all active:scale-95 md:h-12 md:w-12"
                onClick={() => setIsNavVisible(!isNavVisible)}
                aria-label={
                  isNavVisible
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={isNavVisible}
              >
                <div className="relative flex h-6 w-6 items-center justify-start">
                  <motion.span
                    className="absolute h-0.5 w-6 rounded-full bg-black"
                    initial={false}
                    animate={{
                      rotate: isNavVisible ? 45 : 0,
                      y: isNavVisible ? 0 : -7,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-5 rounded-full bg-black"
                    initial={false}
                    animate={{
                      opacity: isNavVisible ? 0 : 1,
                      scaleX: isNavVisible ? 0.2 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute h-0.5 w-6 rounded-full bg-black"
                    initial={false}
                    animate={{
                      rotate: isNavVisible ? -45 : 0,
                      y: isNavVisible ? 0 : 7,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                </div>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isNavVisible && (
              <motion.div
                className="absolute right-3 top-20 z-50 w-[min(14rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-lg"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ul className="flex flex-col gap-2">
                  <li className="w-full">
                    <a
                      href="#features"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>Feature</span>
                    </a>
                  </li>

                  <li className="w-full">
                    <a
                      href="#about"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>About</span>
                    </a>
                  </li>

                  <li className="w-full">
                    <a
                      href="#contact"
                      onClick={() => setIsNavVisible(false)}
                      className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                    >
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}{" "}
    </>
  );
}

export default LandingPagePhoneNavbar;

LandingPagePhoneNavbar.propTypes = {
  yProgress: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
};
