import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedIn = !!currentToken;

  return (
    <>
      <div>
        <ul >
          {isLoggedIn ? (
            <li>
              <NavLink to="/logout" className="flex justify-center items-center my-1">
                <button className="relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-white rounded-md group-hover:bg-opacity-0">
                    Logout
                  </span>
                </button>
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
