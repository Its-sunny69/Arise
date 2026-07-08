import ShinyText from "../shared/components/ShinyText";
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
import { Inzamam, Sunny } from "@/assets/images";
import TeamCard from "@/shared/components/TeamCard";
import "@/shared/styles/CSS/common.css";

function AboutUs() {
  return (
    <div className="gradient-bg relative h-full overflow-y-auto rounded-xl border-2 border-white px-3 md:px-6">
      <div className="my-10 mt-8">
        <div className="w-fit rounded-full border border-gray-400 px-5 py-1 text-sm">
          <ShinyText text="📖 | About" disabled={false} speed={3} />
        </div>
      </div>

      <div className="my-10">
        <p className="text-center font-title text-3xl font-bold md:text-4xl lg:text-6xl">
          About <span className="gradient-animated-arise">ARISE</span>
        </p>

        <div className="mt-8 md:mx-10">
          <p>
            ARISE is a productivity-driven platform designed to help individuals
            overcome procrastination, stay consistent, and unlock their true
            potential. It transforms everyday efforts into visible progress,
            allowing users to track their growth, stay accountable, and build
            meaningful habits over time. More than just a tool, ARISE is a space
            where discipline meets motivation and small actions turn into
            powerful results.
          </p>
          <br />
          <p>
            The idea behind ARISE was born during our college days, when we used
            to study in groups and naturally found ourselves competing by
            tracking each other’s progress. That sense of shared accountability
            pushed us to stay focused and do better. We realized that studying
            alone often leads to distractions and procrastination, but when
            progress is visible and shared, motivation increases. That’s when
            the idea clicked — why not build a platform where friends can
            connect, share their progress, compete, and grow together?
          </p>
          <br />
          <p>
            ARISE solves one of the biggest problems people face today — the
            inability to stay consistent. It helps users break free from
            procrastination by creating a system of accountability, visibility,
            and engagement. With features like progress tracking, shared spaces,
            leaderboards, and communication tools, users are not just working
            alone but are part of a motivating environment that pushes them
            forward.
          </p>
          <br />
          <p>
            As ARISE continues to evolve, we aim to introduce smarter insights,
            AI-driven recommendations, deeper analytics, and more interactive
            ways to stay connected and motivated. Our vision is to build a
            platform where productivity is not forced, but naturally driven by
            community, competition, and continuous self-improvement.
          </p>
        </div>
      </div>

      <div className="my-20">
        <div className="text-center">
          <p className="font-title text-3xl font-bold md:text-4xl lg:text-5xl">
            Our Team
          </p>
        </div>

        <div className="mt-8">
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
                  bulletActiveClass: "swiper-pagination-bullet-active-custom",}}
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
              />
            </SwiperSlide>

            <SwiperSlide>
              <TeamCard
                name="Inzamam Shaikh"
                role="MERN Developer"
                image={Inzamam}
                linkedin="https://www.linkedin.com/in/inzamam-shaikh-189678284/"
                github="https://github.com/Inzamamdev"
                portfolio="#"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
