import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../slice/todosSlice";
import "@material/web/textfield/filled-text-field";
import { toast } from "react-hot-toast";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import LoginImage from "../assets/login.lottie";
import SplitText from "../components/SplitText";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("final", userData);

    dispatch(login(userData)).then((response) => {
      // console.log("frontend", response);

      if (response.payload.token) {
        dispatch(setToken(response.payload.token));

        toast.success(`Login Successfully`, {
          position: "top-center",
          duration: 3000,
        });

        navigate("/");
      } else {
        const err = response.payload.msg;
        // console.log("err", err);

        if (Array.isArray(err)) {
          setError(err);
        } else {
          toast.error(err, {
            position: "top-center",
            duration: 3000,
          });
        }
      }
    });
  };

  return (
    <>
      <div className="w-full min-h-lvh flex justify-center items-center">
        <div className=" w-[60%] my-8 flex rounded-md shadow-lg bg-green-30">
          <div className="w-1/2 bg-slate-100 rounded-l-md flex justify-center items-center">
            <DotLottieReact
              src={LoginImage}
              loop
              autoplay
              style={{ width: 500, height: 500 }}
            />
          </div>

          <div className="w-1/2 p-6 flex flex-col justify-center items-center">
            <div className=" text-center">
              <div className="flex justify-center items-center tracking-widest">
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-[2.5rem] px-[0.1rem] pl-4">
                    A
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-[2.5rem] px-[0.1rem]">
                    r
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-[2.5rem] px-[0.1rem]">
                    i
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-[2.5rem] px-[0.1rem]">
                    s
                  </span>
                </div>
                <div className="hover:scale-110 cursor-pointer transition-all">
                  <span className="title text-outline text-[2.5rem] px-[0.1rem] pr-5">
                    e
                  </span>
                </div>
              </div>
              <div className="title text-5xl font-bold my-2 drop-shadow-sm">
                <SplitText
                  text="Hello Again!"
                  delay={150}
                  animationFrom={{
                    opacity: 0,
                    transform: "translate3d(0,50px,0)",
                  }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  easing="easeOutCubic"
                  threshold={0.2}
                  rootMargin="-50px"
                />
              </div>
            </div>
            <form action="" onSubmit={handleSubmit} className="mt-10 w-full">
              <div className="my-4 flex flex-col">
                <label htmlFor="email" className="text-2xl">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="w-full my-2 px-4 py-1 border-black rounded-sm text-gray-800 focus:outline-dotted focus:bg-slate-100 bg-slate-50 shadow-sm border-1 border-b focus:border-none"
                  value={userData.email}
                  onChange={handleInput}
                  placeholder="Your Email"
                  required
                />
                {error
                  ? error.map((element) =>
                      element.email ? (
                        <>
                          <div
                            className="text-[0.8rem] text-red-500"
                            key={element.username}
                          >
                            {element.email}
                          </div>
                        </>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </div>
              <div className="my-4 flex flex-col">
                <label htmlFor="password" className="text-2xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full my-2 px-4 py-1 border-black rounded-sm text-gray-800 focus:outline-dotted focus:bg-slate-100 bg-slate-50 shadow-sm border-1 border-b focus:border-none"
                  value={userData.password}
                  onChange={handleInput}
                  placeholder="Your Password"
                  required
                />
              </div>

              <div className="flex mt-10 justify-between items-center">
                <div className="flex">
                  New User?
                  <button
                    onClick={() => navigate("/signup")}
                    className="mx-2 text-slate-800 group hover:text-slate-400"
                  >
                    Register Here!
                    <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-black" />
                  </button>
                </div>
                <button
                  className="font-thin group transition-all active:scale-95 border border-black py-1 px-5 hover:border-dotted shadow-lg rounded-sm bg-white"
                  type="submit"
                >
                  <div className="flex justify-center items-center font-medium group-hover:text-gray-600 transition-all">
                    Login
                  </div>
                  <hr className="w-0 group-hover:w-full h-0.5 transition-all duration-500 bg-black" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
