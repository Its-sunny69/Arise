import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="w-full h-screen flex flex-row">
        {/* Navbar */}
        <div className="p-4 transition-all">
          <Navbar />
        </div>

        {/* Main Content (Outlet) */}
        <div className="flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
