import { useState, useEffect, useRef, lazy, Suspense } from "react";
import LandingPageNavbar from "../shared/components/LandingPageNavbar";
import LandingPagePhoneNavbar from "@/shared/components/LandingPagePhoneNavbar";
import { useScroll, useTransform } from "motion/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  LandingPageHeroSection,
  LandingPageFeaturesSection,
  LandingPageContactSection,
  LandingPageFooterSection,
} from "@/components/LandingPage/index";

const LandingPageAboutSection = lazy(
  () => import("@/components/LandingPage/LandingPageAboutSection"),
);

function Landing() {
  const [phoneView, setPhoneView] = useState(window.innerWidth < 640);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref });

  const yProgress = useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.5, 1]);

  useEffect(() => {
    const handleResize = () => {
      setPhoneView(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={ref} className="relative min-h-screen w-full">
      <div className="bg-gradient inner-shadow-bg absolute z-[-1] flex h-screen w-full items-center justify-center"></div>

      <nav className="sticky top-0 z-10 flex items-center justify-center">
        {phoneView ? (
          <LandingPagePhoneNavbar yProgress={yProgress} />
        ) : (
          <LandingPageNavbar yProgress={yProgress} />
        )}
      </nav>

      <main className="hero mx-auto px-3 py-14 font-body text-lg lg:w-[85%] lg:px-20">
        <LandingPageHeroSection />

        <LandingPageFeaturesSection />

        <Suspense fallback={null}>
          <LandingPageAboutSection />
        </Suspense>

        <LandingPageContactSection />
      </main>

      <LandingPageFooterSection />
    </div>
  );
}

export default Landing;
