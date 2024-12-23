import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
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

  return (
    <>
      <div className={`${isHoverd ? "w-40" : "w-12"} h-full shadow-lg transition-all duration-300`}>
        <ul
          className=" bg-slate-200 h-full flex flex-col justify-between items-center rounded-md transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-full m-2 px-2 flex flex-col justify-center items-center">
            <NavLink
              to="/"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <HomeRoundedIcon />
             <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all duration-1000 delay-1000`}>Home</span>
            </NavLink>

            <NavLink
              to="/task-list"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <ChecklistRoundedIcon />
              <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>Task</span>
            </NavLink>

            <NavLink
              to="/room"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <GroupsRoundedIcon />
              <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>Room</span>
            </NavLink>

            <NavLink
              to="/world-rank"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <MilitaryTechRoundedIcon />
              <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>Rank</span>
            </NavLink>

            <NavLink
              to="aboutus"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <ImportContactsRoundedIcon />
              <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>About</span>
            </NavLink>

            <NavLink
              to="contactus"
              className={`mx-1 my-1 p-2 w-full flex ${
                isHoverd ? "justify-start" : "justify-center"
              } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
            >
              <PermContactCalendarRoundedIcon />
              <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>Contact</span>
            </NavLink>
          </div>
          <div className=" w-full m-2 px-2 flex flex-col justify-center items-center">
            {isLoggedIn ? (
              <>
                <div
                  className={`mx-1 my-1 p-2 w-full flex ${
                    isHoverd ? "justify-start" : "justify-center"
                  } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
                >
                  <PersonRoundedIcon />
                  <span className={`ml-2 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>{username}</span>
                </div>

                <NavLink
                  to="/logout"
                  className={`mx-1 my-1 p-2 w-full flex ${
                    isHoverd ? "justify-start" : "justify-center"
                  } items-center text-center hover:bg-slate-400 rounded-md transition-all`}
                >
                  <LogoutRoundedIcon className="text-red-600" />
                  <span className={`ml-2 text-red-600 ${isHoverd ? "block animate-jump-in animate-ease-in" : "hidden"} transition-all delay-1000`}>Logout</span>
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
