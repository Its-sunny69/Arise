import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import PhoneNavbar from "./PhoneNavbar";
import Noise from "./Noise";
import ColorBends from "@/components/ColorBends";

function Layout() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`borde flex h-screen w-full ${phoneView ? "flex-col" : "flex-row"} relative border-gray-200 bg-gray-50 p-2`}
    >
      {/* <Noise
        patternSize={250}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={15}
      /> */}

      {phoneView ? (
        <div className="borde sticky top-0 z-10 flex items-center justify-center border border-red-400">
          <PhoneNavbar />
        </div>
      ) : (
        <motion.div className="borde-2 border-black pr-2 transition-all duration-500">
          <Navbar />
        </motion.div>
      )}

      <div className="h-full w-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
