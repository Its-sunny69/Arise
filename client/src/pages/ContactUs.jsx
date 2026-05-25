import { useState, useEffect } from "react";
import ShinyText from "../shared/components/ShinyText";
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import EmailManPng from "../assets/email-man.png";
import EmailSvg from "../assets/email-svg.svg";
import TwitterSvg from "../assets/twitter-svg.svg";
import { ComputerBackground, GirlJoiningHands, GirlOnCall } from "@/assets/images";

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
    <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-6">
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

      <div className="my-20 sm:my-10">
        <p className="text-center font-title text-3xl font-bold sm:text-6xl">
          Contact <span className="gradient-animated-arise">ARISE</span> Team
        </p>

        <p className="mx-10 mt-6">
          We’d love to hear from you. Whether you have questions, feedback,
          suggestions, or just want to share your experience with ARISE, feel
          free to reach out to our team. Every message helps us improve and
          build a better platform to fight procrastination and support your
          productivity journey. We’re always here to listen, learn, and grow
          with you.
        </p>
      </div>

      <div className="my-20 grid grid-cols-2 sm:my-10">
        <div className="pointer-events-none col-span-1">
          <img
            src={GirlOnCall}
            alt=""
            className="h-full w-full rounded-lg"
          />
        </div>

        <div className="col-span-1 flex flex-col items-start justify-between rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] backdrop-blur-lg">
          <p className="p-4">
            You can contact us using the details provided below, or reach out
            directly to the developers through their social handles listed on
            the About page under the Team section. We’re always open to
            connecting and would be happy to assist you.
          </p>

          <div className="border-t-2 border-white p-4 w-full">
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
