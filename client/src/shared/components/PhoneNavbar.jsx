import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "../../assets/logo.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Task,
  Room,
  Rank,
  About,
  Contact,
  Logout,
  User,
  SideBar,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";

export default function PhoneNavbar() {
  const [isNavVisibe, setIsNavVisible] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname.slice(1);
  const { logout, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full">
      <motion.div
        layout
        className="mb-2 flex items-center justify-between border border-black bg-transparent p-2"
      >
        <div className="flex items-center justify-start space-x-2">
          <img src={Logo} alt="arise" className="w-10" />
          <hr className="h-10 w-0.5 border-none bg-black" />
          <p className="text-2xl font-extrabold tracking-wide">ARISE</p>
        </div>

        <div className="flex items-center justify-end transition-all duration-300">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
            onClick={() => setIsNavVisible(!isNavVisibe)}
          >
            <motion.img
              src={SideBar}
              alt="sidebar-menu-icon"
              className="h-6 w-6 shrink-0"
              initial={{ rotate: 180 }}
              animate={{ rotate: isNavVisibe ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isNavVisibe ? (
          <motion.div
            className="absolute right-3 top-20 z-50 w-[min(18rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-neutral-200 bg-white p-3 shadow-lg"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95">
              <img src={User} alt="user-icon" className="w-6" />
              <span>{user.username}</span>
            </div>

            <hr className="my-3 h-0.5 bg-neutral-200" />

            <ul className="flex flex-col gap-2">
              <li className="w-full">
                <NavLink
                  to="/home"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e7f3ff" : "",
                  })}
                >
                  <img src={Home} alt="home-icon" className="w-6" />
                  <span>Home</span>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/task-list"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e7f3ff" : "",
                  })}
                >
                  <img src={Task} alt="task-icon" className="w-6" />
                  <span>Task</span>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/room"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor:
                      isActive ||
                      currentPath === "join-room" ||
                      currentPath.includes("chat")
                        ? "#e7f3ff"
                        : "",
                  })}
                >
                  <img src={Room} alt="room-icon" className="w-6" />
                  <span>Room</span>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/world-rank"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e7f3ff" : "",
                  })}
                >
                  <img src={Rank} alt="rank-icon" className="w-6" />
                  <span>World Rank</span>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/aboutus"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e7f3ff" : "",
                  })}
                >
                  <img src={About} alt="about-icon" className="w-6" />
                  <span>About</span>
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/contactus"
                  onClick={() => setIsNavVisible(false)}
                  className="flex items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-[#e7f3ff] hover:opacity-80 active:scale-95"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "#e7f3ff" : "",
                  })}
                >
                  <img src={Contact} alt="contact-icon" className="w-6" />
                  <span>Contact</span>
                </NavLink>
              </li>
            </ul>

            <hr className="my-3 h-0.5 bg-neutral-200" />

            <button
              onClick={() => {
                setIsNavVisible(false);
                handleLogout();
              }}
              className="flex w-full items-center justify-start space-x-4 rounded-full px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-red-100 hover:opacity-80 active:scale-95"
            >
              <img src={Logout} alt="logout-icon" className="w-6" />
              <span>Logout</span>
            </button>
          </motion.div>
        ) : null}{" "}
      </AnimatePresence>
    </div>
  );
}
