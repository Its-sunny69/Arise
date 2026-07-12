import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../../../shared/components/Logo";
import { Hide, See } from "@/assets/icons";
import "@/shared/styles/CSS/common.css";

function SignUp() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const [inputErrors, setInputErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const password = userData.password || "";
  const passwordCriteria = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const validateInputfields = () => {
    const { username, email, password } = userData;

    let errors = {};

    if (!username) {
      errors.username = "Username is required";
    } else if (username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    } else if (username.length > 10) {
      errors.username = "Username must be 10 characters or less";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordCriteria.minLength) {
      errors.password = "Password must be at least 8 characters";
    } else if (!passwordCriteria.uppercase) {
      errors.password = "Password must contain at least 1 uppercase letter";
    } else if (!passwordCriteria.lowercase) {
      errors.password = "Password must contain at least 1 lowercase letter";
    } else if (!passwordCriteria.number) {
      errors.password = "Password must contain at least 1 number";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (isLoadingRef.current || isLoading) return;

    const errors = validateInputfields();
    if (Object.keys(errors).length > 0) {
      setInputErrors(errors);
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);

      await dispatch(register(userData)).then(async (response) => {
        if (response.payload.token) {
          toast.success(`Registered Successfully`, {
            position: "top-center",
            duration: 3000,
          });

          navigate("/home", { viewTransition: "true" });
        } else {
          const backendError = response.payload.msg;

          if (Array.isArray(backendError)) {
            setError(backendError);
          } else {
            toast.error(backendError || "Registration failed.", {
              position: "top-center",
              duration: 3000,
            });
          }
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  return (
    <div className="gradient-bg flex min-h-lvh w-full items-center justify-center bg-gray-50">
      <div className="mx-5 my-8 flex min-h-[34rem] w-full rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] sm:mx-0 sm:w-[90%] lg:w-[70%]">
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
              Let&rsquo;s Begin the Journey!
            </p>
          </div>

          <form action="" onSubmit={handleSubmit} className="mt-5 w-full">
            <div className="my-8 flex flex-col">
              <div
                className={`flex w-full rounded-full border-2 bg-white/40 px-4 py-3 shadow-[0px_0px_14px_6px_#ffffff1f] transition-all ${inputErrors.username ? "border-red-400 focus-within:border-red-400" : "border-gray-300 focus-within:border-gray-400"}`}
              >
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="w-full bg-transparent outline-none"
                  value={userData.username}
                  onChange={handleInput}
                  placeholder="What should we call you?"
                />
              </div>

              {inputErrors.username && (
                <div className="ml-5 mt-1 text-sm text-red-500">
                  {inputErrors.username}
                </div>
              )}
            </div>

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
                <div className="ml-5 mt-1 text-sm text-red-500">
                  {inputErrors.email}
                </div>
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

              <div className="ml-5 mt-2 w-full">
                <ul className="space-y-1 text-sm">
                  <li
                    className={
                      passwordCriteria.minLength
                        ? "text-green-500"
                        : attemptedSubmit
                          ? "text-red-500"
                          : "text-gray-600"
                    }
                  >
                    <span className="inline-block w-4">
                      {passwordCriteria.minLength ? "✓" : "•"}
                    </span>
                    at least 8 characters
                  </li>

                  <li
                    className={
                      passwordCriteria.uppercase
                        ? "text-green-500"
                        : attemptedSubmit
                          ? "text-red-500"
                          : "text-gray-600"
                    }
                  >
                    <span className="inline-block w-4">
                      {passwordCriteria.uppercase ? "✓" : "•"}
                    </span>
                    at least 1 uppercase letter
                  </li>

                  <li
                    className={
                      passwordCriteria.lowercase
                        ? "text-green-500"
                        : attemptedSubmit
                          ? "text-red-500"
                          : "text-gray-600"
                    }
                  >
                    <span className="inline-block w-4">
                      {passwordCriteria.lowercase ? "✓" : "•"}
                    </span>
                    at least 1 lowercase letter
                  </li>

                  <li
                    className={
                      passwordCriteria.number
                        ? "text-green-500"
                        : attemptedSubmit
                          ? "text-red-500"
                          : "text-gray-600"
                    }
                  >
                    <span className="inline-block w-4">
                      {passwordCriteria.number ? "✓" : "•"}
                    </span>
                    at least 1 number
                  </li>
                </ul>
              </div>
            </div>

            {error && error.length > 0 && (
              <div className="my-5 flex flex-col gap-1 rounded-xl border-2 border-red-500 bg-red-100/50 p-5">
                {error.map((message, index) => (
                  <p
                    key={index}
                    className="whitespace-pre-line text-sm text-red-500"
                  >
                    <span className="inline-block w-4">•</span>
                    {message}
                  </p>
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center justify-between">
              <div className="flex flex-col items-start text-sm lg:flex-row lg:items-center">
                Already an User?
                <Link
                  to="/login"
                  className="group cursor-pointer text-gray-600 hover:text-gray-400 lg:mx-2"
                >
                  Login Here!
                  <hr className="h-0.5 w-0 bg-black transition-all duration-500 group-hover:w-full" />
                </Link>
              </div>

              <button
                className="rounded-xl bg-black px-9 py-3 text-sm font-bold text-white shadow-[0px_0px_14px_6px_#ffffff1f] transition-all hover:opacity-70 active:scale-95"
                type="submit"
                disabled={isLoading}
              >
                SignUP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
