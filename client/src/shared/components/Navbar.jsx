import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  About,
  Contact,
  Home,
  Rank,
  Room,
  SideBar,
  Task,
  User,
  Logout,
} from "../../assets/icons";
import Logo from "./Logo";
import { motion } from "motion/react";
import { logout } from "@/features/auth/authSlice";
import TransitionNavLink from "./TransitionNavLink";

function Navbar() {
  const [isOpened, setIsOpened] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { viewTransition: "true" });
  };

  return (
    <motion.div
      className="h-full overflow-y-auto"
      initial={false}
      animate={{ width: isOpened ? 220 : 75 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.nav className="flex h-full w-full flex-col items-stretch justify-start overflow-x-hidden px-3 transition-all duration-300">
        <div className="relative flex h-24 items-center justify-end py-6">
          {isOpened && (
            <motion.div
              className="pointer-events-none absolute left-0 right-16 flex items-center justify-start space-x-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Logo className="w-7" />
              <hr className="h-8 w-0.5 border-none bg-black" />
              <motion.p className="text-lg font-extrabold tracking-wide">
                ARISE
              </motion.p>
            </motion.div>
          )}

          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsOpened(!isOpened)}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-3 transition-all hover:bg-[#e7f3ff] hover:opacity-80"
            >
              <motion.img
                src={SideBar}
                alt="sidebar-menu-icon"
                className="h-6 w-6 shrink-0"
                animate={{ rotate: isOpened ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>

        <hr className="h-0.5 bg-neutral-200" />

        <ul className={`flex flex-col items-start justify-center gap-2 py-6`}>
          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/home"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={Home} alt="home-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Home
                </motion.span>
              )}
            </TransitionNavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/task-list"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={Task} alt="task-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Task
                </motion.span>
              )}
            </TransitionNavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/room"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={Room} alt="room-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Room
                </motion.span>
              )}
            </TransitionNavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/world-rank"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={Rank} alt="rank-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Rank
                </motion.span>
              )}
            </TransitionNavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/aboutus"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={About} alt="about-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  About
                </motion.span>
              )}
            </TransitionNavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <TransitionNavLink
              to="/contactus"
              viewTransition
              className={`flex items-center rounded-full ${isOpened ? "justify-start space-x-4 px-4 py-3" : "justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#e7f3ff" : "",
              })}
            >
              <img src={Contact} alt="contact-icon" className="w-6" />

              {isOpened && (
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Contact
                </motion.span>
              )}
            </TransitionNavLink>
          </li>
        </ul>

        <hr className="h-0.5 bg-neutral-200" />

        <div className={`flex flex-col items-start justify-center gap-2 py-6`}>
          <div
            className={`flex items-center rounded-full ${isOpened ? "w-full justify-start space-x-4 px-4 py-3" : "w-fit justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95`}
          >
            <img src={User} alt="user-icon" className="w-6" />

            {isOpened && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {user?.username}
              </motion.span>
            )}
          </div>

          <button
            className={`flex items-center rounded-full ${isOpened ? "w-full justify-start space-x-4 px-4 py-3" : "w-fit justify-center p-3"} text-sm text-gray-800 transition-all duration-300 hover:bg-red-100 hover:opacity-80 active:scale-95`}
            onClick={handleLogout}
          >
            <img src={Logout} alt="logout-icon" className="w-6" />

            {isOpened && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Logout
              </motion.span>
            )}
          </button>
        </div>
      </motion.nav>
    </motion.div>
  );
}

export default Navbar;
