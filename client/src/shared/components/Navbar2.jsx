import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import profileLottie from "../../assets/profile.lottie";
import crownLottie from "../../assets/crown.lottie";

function Navbar2() {
  const user = useSelector((state) => state.auth.user);

  const capitalizeString = (str) => {
    const firstLetter = str.charAt(0).toUpperCase();
    const remainingLetters = str.slice(1);

    const finalStr = firstLetter + remainingLetters;

    return finalStr;
  };
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-full flex justify-between items-center">
          <div className="sm:my-4 flex justify-center items-center font-semibold tracking-wider">
            <div>
              <DotLottieReact
                src={profileLottie}
                loop
                autoplay
                style={{ width: 70, height: 70 }}
              />
            </div>
            <span className="text-xl font-bold">
              {capitalizeString(user.username)}
            </span>
          </div>
        </div>
        <div className="flex mx-1 px-2 justify-between items-center">
          <div className="flex justify-center items-center">
            <DotLottieReact
              src={crownLottie}
              loop
              autoplay
              style={{ width: 50, height: 50 }}
            />
            <span className="text-xl font-bold">{user.points}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar2;
