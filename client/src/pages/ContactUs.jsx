import { useState, useEffect } from "react";
import ShinyText from "../shared/components/ShinyText";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import EmailManPng from "../assets/email-man.png";
import EmailSvg from "../assets/email-svg.svg";
import TwitterSvg from "../assets/twitter-svg.svg";
import { ComputerBackground, GirlJoiningHands } from "@/assets/images";

function ContactUs() {
  const [showRoomText, setShowRoomText] = useState(false);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRoomText(true);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="gradient-bg mask-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
      <div className="my-20 sm:my-10">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText
            text="📆 | Contact"
            disabled={false}
            speed={3}
            className=""
          />
        </div>
      </div>

      <div className="my-20 text-center sm:my-10">
        <p className="font-title text-3xl font-bold sm:text-6xl">
          Contact ARISE Team
        </p>

        <p className="mt-6">
          We’d love to hear from you! Whether you have feedback, questions, or
          suggestions, feel free to reach out.
          <br />
          Your input helps us improve Arise and make it the best tool to counter
          procrastination.
        </p>
      </div>

      <div className="my-20 grid grid-cols-2 sm:my-10">
        <div className="pointer-events-none col-span-1 p-6">
          <img
            src={ComputerBackground}
            alt=""
            className="h-full w-full rounded-lg"
          />
        </div>

        <div className="col-span-1 flex flex-col items-start justify-center">
          <p className="font-title text-3xl font-bold sm:text-6xl">
            Get In Touch
          </p>
          <p className="mt-6">
            We’d love to hear from you! Whether you have feedback, questions, or
            suggestions, feel free to reach out.
            <br />
            Your input helps us improve Arise and make it the best tool to
            counter procrastination.
          </p>

          <div className="mt-6">
            <div className="my-1 flex">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=dynamosdev0@gmail.com"
                target="_blank"
                className="group flex items-center justify-start underline-offset-2 hover:underline"
              >
                <img src={EmailSvg} alt="" className="mr-6 w-5" />
                <span className="transition-all group-hover:opacity-50 group-active:scale-95">
                  dynamosdev0@gmail.com
                </span>
              </a>
            </div>
            <div className="my-1 flex">
              <a
                href="https://x.com/dynamos_dev"
                target="_blank"
                className="group flex items-center justify-start underline-offset-2 hover:underline"
              >
                <img src={TwitterSvg} alt="" className="mr-4 w-7" />
                <span className="transition-all group-hover:opacity-50 group-active:scale-95">
                  https://x.com/dynamos_dev
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
