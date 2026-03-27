import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
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
import Logo from "../../assets/logo.svg";
import { motion } from "motion/react";

function Navbar() {
  const [isOpened, setIsOpened] = useState(true);

  const user = useSelector((state) => state.auth.user);
  const { logout } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // console.log("user in navbar", user);

  return (
    <motion.div
      className="borde h-full overflow-y-auto border-gray-200"
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
              <img src={Logo} alt="arise" className="w-7" />
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

        <ul
          className={`borde borde-red-500 flex flex-col items-start justify-center gap-2 py-6`}
        >
          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/home"
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
            </NavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/task-list"
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
            </NavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/room"
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
            </NavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/world-rank"
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
            </NavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/aboutus"
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
            </NavLink>
          </li>

          <li className={`${isOpened ? "w-full" : "w-fit"}`}>
            <NavLink
              to="/contactus"
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
            </NavLink>
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
