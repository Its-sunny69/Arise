import { GitHubSvg, LinkedInSvg, LinkSvg } from "@/assets/icons";
import PropTypes from "prop-types";

export default function TeamCard({
  name,
  role,
  image,
  linkedin,
  github,
  portfolio,
  direction = "row",
}) {
  return (
    <div
      className={`flex ${direction === "row" ? " bg-white/50 lg:flex-row" : "bg-[#dadaeb]/50 lg:flex-col "} flex-col rounded-xl border-2 border-white backdrop-blur-lg lg:flex-row`}
    >
      <div
        className={` ${direction === "row" ? "p-2 sm:p-5 lg:w-1/2" : "p-2"}`}
      >
        <img
          src={image}
          alt="Profile Image"
          className="h-96 w-full rounded-lg object-cover object-center shadow-xl"
        />
      </div>

      <div
        className={`bg-green-40 flex items-center justify-center ${direction === "row" ? "lg:w-1/2" : ""}`}
      >
        <div
          className={`flex flex-col ${direction === "row" ? "my-5 sm:my-10" : "mb-5 mt-5 sm:mb-10"}`}
        >
          <span className="title mx-2 text-left font-title text-2xl font-bold tracking-wider sm:text-4xl lg:mx-0">
            {name}
          </span>

          <div
            className={`mx-2 flex items-center lg:mx-0 ${direction === "row" ? "justify-start" : "justify-center"}`}
          >
            <span className="text-left">{role} | </span>
            <div className="ml-1 flex">
              <a
                href={linkedin}
                className="mr-1 transition-all hover:opacity-50 active:scale-95"
                target="_blank"
                aria-label="LinkedIn profile"
              >
                <img src={LinkedInSvg} alt="LinkedIn" loading="lazy" className="w-6" />
              </a>
              <a
                href={github}
                className="transition-all hover:opacity-50 active:scale-95"
                target="_blank"
                aria-label="GitHub profile"
              >
                <img src={GitHubSvg} alt="GitHub" loading="lazy" className="w-6" />
              </a>
              <a
                href={portfolio}
                className="transition-all hover:opacity-50 active:scale-95"
                target="_blank"
                aria-label="Portfolio website"
              >
                <img src={LinkSvg} alt="Portfolio" loading="lazy" className="w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TeamCard.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  linkedin: PropTypes.string.isRequired,
  github: PropTypes.string.isRequired,
  portfolio: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["row", "col"]),
};
