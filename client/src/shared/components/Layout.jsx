import { useState, useEffect, Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import PhoneNavbar from "./PhoneNavbar";
import PageLoading from "./PageLoading";

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
      className={`flex h-dvh w-full ${phoneView ? "flex-col" : "flex-row"} relative bg-gray-50 p-2`}
    >
      {phoneView ? (
        <div className="sticky top-0 z-50 flex items-center justify-center">
          <PhoneNavbar />
        </div>
      ) : (
        <motion.div className="pr-2 transition-all duration-500">
          <Navbar />
        </motion.div>
      )}

      <div className="h-full w-full overflow-hidden">
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;
