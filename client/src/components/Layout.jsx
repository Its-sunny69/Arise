import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Navbar2 from "./Navbar2";

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
    <>
      <div className="w-full h-screen flex flex-row">
        {/* Navbar */}

        {!phoneView ? (
          <div className="p-4 transition-all">
            <Navbar />
          </div>
        ) : (
          ""
        )}

        {/* Main Content (Outlet) */}
        <div className="flex-1 sm:p-4 p-2 overflow-auto">
          {phoneView ? (
            <div className="flex">
               <Navbar2 /> <Navbar />
            </div>
          ) : (
            <Navbar2 />
          )}

          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
