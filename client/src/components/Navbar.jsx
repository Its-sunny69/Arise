import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function Navbar() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedIn = !!currentToken;

  const username = useSelector((state) => state.todos.user?.username);

  const [isHoverd, setIsHovered] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  console.log(currentPath);
  return (
    <>
      <div
        className={`${
          isHoverd
            ? "w-40 outline-1 outline-dashed"
            : "w-12 border border-black"
        } h-full shadow-lg rounded-md transition-all duration-300 bg-slate-50`}
      >
        <ul
          className=" bg-slate-5 h-full flex flex-col justify-between items-center rounded-md transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full m-2 px-2 flex flex-col justify-center items-center">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <HomeRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500 `}
                >
                  Home
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>

            <NavLink
              to="/task-list"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <ChecklistRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500`}
                >
                  Task
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>

            <NavLink
              to="/room"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive ||
                  currentPath == "join-room" ||
                  currentPath.includes("chat")
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <GroupsRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500`}
                >
                  Room
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>

            <NavLink
              to="/world-rank"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <MilitaryTechRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500`}
                >
                  Rank
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>

            <NavLink
              to="aboutus"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <ImportContactsRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500`}
                >
                  About
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>

            <NavLink
              to="contactus"
              className={({ isActive }) =>
                `mx-1 my-1 p-2 w-full flex ${
                  isActive
                    ? "bg-red-100"
                    : isHoverd
                    ? "justify-start"
                    : "justify-center"
                } items-center text-center hover:bg-slate-100  group rounded-sm transition-all`
              }
            >
              <PermContactCalendarRoundedIcon className="text-gray-800" />
              <div
                className={`mx-2 ${
                  isHoverd ? "flex" : "hidden"
                } flex-col justify-center items-center active:scale-95 transition-all`}
              >
                <span
                  className={` ${
                    isHoverd
                      ? "block animate-jump-in animate-ease-in"
                      : "hidden"
                  } transition-all delay-500`}
                >
                  Contact
                </span>

                <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-gray-800" />
              </div>
            </NavLink>
          </div>
          <div className=" w-full m-2 px-2 flex flex-col justify-center items-center">
            {isLoggedIn ? (
              <>
                <div
                  className={`mx-1 my-1 p-2 w-full flex ${
                    isHoverd ? "justify-start" : "justify-center"
                  } items-center text-center rounded-sm transition-all`}
                >
                  <PersonRoundedIcon className="text-gray-800" />
                  <span
                    className={`ml-2 ${
                      isHoverd
                        ? "block animate-jump-in animate-ease-in"
                        : "hidden"
                    } transition-all delay-500`}
                  >
                    {username}
                  </span>
                </div>

                <NavLink
                  to="/logout"
                  className={`mx-1 my-1 p-2 w-full flex ${
                    isHoverd ? "justify-start" : "justify-center"
                  } items-center text-center hover:bg-red-100  group rounded-sm transition-all`}
                >
                  <LogoutRoundedIcon className="text-red-600" />
                  <div
                    className={`mx-2 ${
                      isHoverd ? "flex" : "hidden"
                    } flex-col justify-center items-center active:scale-95 transition-all`}
                  >
                    <span
                      className={` ${
                        isHoverd
                          ? "block animate-jump-in animate-ease-in"
                          : "hidden"
                      } transition-all text-red-600 delay-500`}
                    >
                      Logout
                    </span>

                    <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-red-600" />
                  </div>
                </NavLink>
              </>
            ) : (
              ""
            )}
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
