import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, setToken } from "./features/todosSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//manage password toast error...!!!!!!!!!!!!!!

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // const [error, setError] = useState([])

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
    dispatch(register(userData)).then( async (response) => {
      console.log(response);

      if (response.payload) {
        dispatch(setToken(response.payload.token));
        navigate("/");
      } else {
        const err = response.error.message;
        console.log("err", err)
        // setError(err)

        toast.error(err, {
          position: 'top-center',
          duration: 5000,
        });
      }
    });
  };


  // const handleError = () => {
  //   error.forEach((value) => {
  //     console.log(value)
  //   })
  // }

  // useEffect(() => {
  //   if (error) {
  //     console.log(error)
  //     handleError();
  //   }
   
  // }, [error])

  return (
    <>
      <div className="w-full h-lvh flex justify-center items-center">
        <div className=" w-[30%] bg-slate-100 p-5 rounded-md shadow-md">
          <form action="" onSubmit={handleSubmit}>
            <div className="my-4 flex flex-col">
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
            <div className="my-4 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="border border-black"
                type="text"
                name="email"
                value={userData.email}
                id="email"
                onChange={handleInput}
              />
            </div>
            <div className="my-4 flex flex-col">
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

            {/* <button type="submit">Submit</button> */}
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              type="submit"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
          </form>

          <div>
            Already an User?
            <button
              onClick={() => navigate("/login")}
              className="mx-2 text-slate-800 hover:text-slate-400"
            >
              Login Here!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
