import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register, setToken } from "./features/todosSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("final", userData);
    dispatch(register(userData)).then((response) => {
      console.log(response);

      if (response.payload) {
        dispatch(setToken(response.payload.token));
        navigate("/");
      }
    });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="border border-black"
            type="text"
            name="username"
            value={userData.username}
            id="username"
            onChange={handleInput}
          />
        </div>
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
    </>
  );
}

export default SignUp;
