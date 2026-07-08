import AnimatedLogoSvg from "@/shared/components/AnimatedLogoSvg";
import GradientButton from "@/shared/components/GradientButton";
import { useNavigate } from "react-router-dom";

function LandingPageHeroSection() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto">
          <AnimatedLogoSvg />
        </div>

        <div className="my-12">
          <p className="inner-shadow-title rounded-full bg-[#e7f3ff]/50 px-6 py-2 text-center text-xs text-[#005f8f] md:text-sm">
            ARISE - A Productivity-Focused App
          </p>
        </div>

        <div className="w-[85%] lg:w-full">
          <p className="text-center font-title text-3xl font-bold md:text-4xl lg:text-6xl">
            Stuck in Procrastination Cycle?
          </p>

          <p className="mt-4 text-center text-base font-semibold text-subtext md:text-xl">
            Arise is here to help you take control of your time, crush your
            to-do list, <br />
            and make consistent progress towards your dreams.
          </p>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-center lg:mt-16">
        <GradientButton
          text="Get Started Now"
          onClick={() => navigate("/login")}
        />
      </div>
    </section>
  );
}

export default LandingPageHeroSection;
