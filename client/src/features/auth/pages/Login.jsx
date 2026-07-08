import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../features/auth/authSlice";
// import "@material/web/textfield/filled-text-field";
import { toast } from "react-hot-toast";
import Logo from "../../../shared/components/Logo";
import { Hide, See } from "@/assets/icons";
import "@/shared/styles/CSS/common.css";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;

    if (inputErrors[name]) {
      setInputErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const validateInputfields = () => {
    const { email, password } = userData;

    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isLoadingRef.current || isLoading) return;

    const errors = validateInputfields();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);

      await dispatch(login(userData)).then((response) => {
        const isFulfilled = response.meta?.requestStatus === "fulfilled";
        const token = response.payload?.token;

        if (isFulfilled && token) {
          toast.success(`Login Successfully`, {
            position: "top-center",
            duration: 3000,
          });

          navigate("/home");
        } else {
          const backendError = response.payload?.msg;

          if (Array.isArray(backendError)) {
            setError(backendError);
          } else {
            toast.error(backendError || "Login failed", {
              position: "top-center",
              duration: 3000,
            });
          }
        }
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-bg flex min-h-lvh w-full items-center justify-center bg-gray-50">
      <div className="mx-5 my-5 flex min-h-[34rem] w-full rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] sm:mx-0 sm:w-[90%] lg:w-[70%]">
        {phoneView ? (
          ""
        ) : (
          <div className="flex w-1/2 flex-col items-center justify-center">
            <Logo className="w-1/2" />
            <p className="mt-5 text-center text-sm">
              Above Procrastination,
              <br />
              One Task at a Time!
            </p>
          </div>
        )}

        <div className="flex w-full flex-col items-center justify-center p-6 sm:w-1/2">
          <div className="">
            <p className="gradient-animated-arise text-center font-title text-3xl font-bold sm:text-6xl">
              ARISE
            </p>
            <p className="text-center text-lg sm:text-xl">
              Hello, Welcome back!
            </p>
          </div>

          <form action="" onSubmit={handleSubmit} className="mt-5 w-full">
            <div className="my-8 flex flex-col">
              <div
                className={`flex w-full rounded-full border-2 bg-white/40 px-4 py-3 shadow-[0px_0px_14px_6px_#ffffff1f] transition-all ${inputErrors.email ? "border-red-400 focus-within:border-red-400" : "border-gray-300 focus-within:border-gray-400"}`}
              >
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="w-full bg-transparent outline-none"
                  value={userData.email}
                  onChange={handleInput}
                  placeholder="Your Email"
                />
              </div>
              {inputErrors.email && (
                <p className="ml-5 mt-1 text-sm text-red-500">
                  {inputErrors.email}
                </p>
              )}
            </div>

            <div className="my-8 flex flex-col">
              <div
                className={`flex w-full gap-2 rounded-full border-2 bg-white/40 py-1 pl-4 pr-1 shadow-[0px_0px_14px_6px_#ffffff1f] transition-all ${inputErrors.password ? "border-red-400 focus-within:border-red-400" : "border-gray-300 focus-within:border-gray-400"}`}
              >
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  className="w-full bg-transparent outline-none"
                  value={userData.password}
                  onChange={handleInput}
                  placeholder="Your Password"
                />

                <button
                  className="flex items-center justify-center rounded-full bg-black p-2.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-70 active:scale-95"
                  type="button"
                  onClick={handlePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <img src={Hide} alt="Hide" className="w-6" />
                  ) : (
                    <img src={See} alt="See" className="w-6" />
                  )}
                </button>
              </div>
              {inputErrors.password && (
                <p className="ml-5 mt-1 text-sm text-red-500">
                  {inputErrors.password}
                </p>
              )}
            </div>

            {error && error.length > 0 && (
              <div className="my-5 flex flex-col gap-1 rounded-xl border-2 border-red-500 bg-red-100/50 p-5">
                {error.map((message, index) => (
                  <p key={index} className="text-sm text-red-500">
                    {message}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center justify-between">
              <div className="flex flex-col items-start text-sm lg:flex-row lg:items-center">
                New User?
                <Link
                  to="/signup"
                  className="group cursor-pointer text-gray-600 hover:text-gray-400 lg:mx-2"
                >
                  Register Here!
                  <hr className="h-0.5 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                </Link>
              </div>

              <button
                className="rounded-xl bg-black px-9 py-3 text-sm font-bold text-white shadow-[0px_0px_14px_6px_#ffffff1f] transition-all hover:opacity-70 active:scale-95"
                type="submit"
                disabled={isLoading}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
