import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navbar() {
  const currentToken = useSelector((state) => state.todos.token);
  const isLoggedIn = !!currentToken;

  return (
    <>
      <div>
        <ul>
          {isLoggedIn ? (
            <li>
              <NavLink to="/logout" className="text-red-500">
                Logout
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
