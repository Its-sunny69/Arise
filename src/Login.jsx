import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "./features/todosSlice";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("final", userData);

    dispatch(login(userData)).then((response) => {
      console.log(response);

      if (response.payload) {
        dispatch(setToken(response.payload.token));
        navigate("/");
      }
    });
  };

  return (
    <>
      <form action="" onClick={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            className="border border-black"
            type="email"
            name="email"
            value={userData.email}
            id="email"
            onChange={handleInput}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="border border-black"
            type="password"
            name="password"
            value={userData.password}
            id="password"
            onChange={handleInput}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        New User?
        <button onClick={() => navigate("/signup")}>Register Here!</button>
      </div>
    </>
  );
}

export default Login;
