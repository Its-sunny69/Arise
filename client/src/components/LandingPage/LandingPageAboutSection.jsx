import { Inzamam, Sunny } from "@/assets/images";
import {
  Autoplay,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import TeamCard from "@/shared/components/TeamCard";

function LandingPageAboutSection() {
  return (
    <section className="my-32 scroll-m-20" id="about">
      <h2 className="text-center font-title text-3xl font-bold md:text-4xl lg:text-5xl">
        About Us
      </h2>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="col-span-1">
          <Swiper
            modules={[
              Autoplay,
              Mousewheel,
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
            ]}
            spaceBetween={10}
            slidesPerView={1}
            centeredSlides={true}
            slideToClickedSlide={true}
            mousewheel={true}
            initialSlide={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            className="h-full w-full"
          >
            <SwiperSlide>
              <TeamCard
                name="Sunny Yadav"
                role="Frontend Developer"
                image={Sunny}
                linkedin="https://www.linkedin.com/in/sunny-yadav-557676249/"
                github="https://github.com/Its-sunny69"
                portfolio="https://sunny-portfolio-teal.vercel.app/"
                direction="col"
              />
            </SwiperSlide>

            <SwiperSlide>
              <TeamCard
                name="Inzamam Shaikh"
                role="MERN Developer"
                image={Inzamam}
                linkedin="https://www.linkedin.com/in/inzamam-shaikh-189678284/"
                github="https://github.com/Inzamamdev"
                portfolio="https://github.com/Inzamamdev"
                direction="col"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="col-spans-1 p-2">
          <p className="text-sm text-subtext">
            <span className="mb-2 inline-block">
              ARISE is a productivity-driven platform designed to help
              individuals overcome procrastination, stay consistent, and unlock
              their true potential. It transforms everyday efforts into visible
              progress, allowing users to track their growth, stay accountable,
              and build meaningful habits over time.
            </span>
            <span className="mb-2 inline-block">
              The idea behind ARISE was born during our college days, when we
              used to study in groups and naturally found ourselves competing by
              tracking each other’s progress. That sense of shared
              accountability pushed us to stay focused and do better. We
              realized that studying alone often leads to distractions and
              procrastination, but when progress is visible and shared,
              motivation increases. That’s when the idea clicked — why not build
              a platform where friends can connect, share their progress,
              compete, and grow together?
            </span>
            <span className="mb-2 inline-block">
              As ARISE continues to evolve, we aim to introduce smarter
              insights, AI-driven recommendations, deeper analytics, and more
              interactive ways to stay connected and motivated.
            </span>
            <span className="mb-2 inline-block">
              ARISE is build by two friends Inzamam and Sunny, who are
              passionate about productivity, technology, and helping others
              achieve their goals.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LandingPageAboutSection;
