import React, { useState, useEffect } from "react";
import ShinyText from "../components/ShinyText";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import EmailManPng from "../assets/email-man.png";
import EmailSvg from "../assets/email-svg.svg";
import TwitterSvg from "../assets/twitter-svg.svg";

function ContactUs() {
  const [showRoomText, setShowRoomText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoomText(true);
    }, 1400); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <>
      <div className="w-full  p-2">
        <div className="my-4">
          <div className="w-fit  px-5 py-1 rounded-full border border-gray-400 text-sm">
            <ShinyText
              text=" 📆 | Contact"
              disabled={false}
              speed={3}
              className=""
            />
          </div>
        </div>

        <div className="my-10">
          <div className="title text-7xl flex justify-center items-center">
            <TypeAnimation
              sequence={["Contact"]}
              speed={30}
              repeat={0}
              cursor={false}
            />

            <Fade delay={500} duration={1000} triggerOnce fraction={0.5}>
            <div className="flex tracking-wider">
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline text-7xl pl-4">A</span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline text-7xl">r</span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline text-7xl">i</span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline text-7xl">s</span>
                  </div>
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <span className="title text-outline text-7xl pr-5">e</span>
                  </div>
                </div>
            </Fade>

            {showRoomText && (
              <TypeAnimation
                sequence={["Team"]}
                speed={30}
                repeat={0}
                cursor={false}
              />
            )}
          </div>
          <Fade
            delay={200}
            duration={1000}
            triggerOnce
            fraction={0.5}
            className="text-center"
          >
            <div className="text-2xl text-center">
              We’d love to hear from you! Whether you have feedback, questions,
              or suggestions, feel free to reach out.
              <br />
              Your input helps us improve Arise and make it the best tool to
              counter procrastination.
            </div>
          </Fade>
        </div>

        <Fade
          delay={400}
          duration={1000}
          triggerOnce
          fraction={0.5}
          className=""
        >
          <div className="my-16 flex">
            <div className="w-1/2 flex justify-center items-center">
              <img src={EmailManPng} alt="image" className="w-[40%]" />
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="title text-5xl flex justify-start items-center">
                Get In Touch
              </div>

              <div className="text-xl text-left mt-8">
                <div className="flex my-1">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=dynamosdev0@gmail.com"
                    target="_blank"
                    className="group hover:underline underline-offset-2 flex justify-start items-center"
                  >
                    <img src={EmailSvg} alt="" className="w-5 mr-6 " />
                    <span className="group-hover:opacity-50 group-active:scale-95 transition-all">
                      dynamosdev0@gmail.com
                    </span>
                  </a>
                </div>
                <div className="flex my-1">
                  <a
                    href="https://x.com/dynamos_dev"
                    target="_blank"
                    className="group hover:underline underline-offset-2 flex items-center justify-start"
                  >
                    <img src={TwitterSvg} alt="" className="w-7 mr-4" />
                    <span className="group-hover:opacity-50 group-active:scale-95 transition-all">
                      https://x.com/dynamos_dev
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </>
  );
}

export default ContactUs;
