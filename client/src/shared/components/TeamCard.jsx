import GithubSvg from "../../assets/github-svg.svg";
import LinkedInSvg from "../../assets/linkedin-svg.svg";
import LinkSvg from "../../assets/link.svg";
import PropTypes from "prop-types";

export default function TeamCard({
  name,
  role,
  image,
  linkedin,
  github,
  portfolio,
}) {
  return (
    <div className="flex flex-col rounded-xl border-2 border-white bg-white/50 shadow-[0px_0px_14px_6px_#ffffff3b] backdrop-blur-lg lg:flex-row">
      <div className="p-2 sm:p-5 lg:w-1/2">
        <img
          src={image}
          alt="Image"
          className="h-96 w-full rounded-lg object-cover object-center shadow-xl"
        />
      </div>
      <div className="bg-green-40 flex items-center justify-center lg:w-1/2">
        <div className="my-5 flex flex-col sm:my-10">
          <span className="title mx-2 text-left font-title text-2xl font-bold tracking-wider sm:text-4xl lg:mx-0">
            {name}
          </span>

          <div className="mx-2 flex items-center justify-start lg:mx-0">
            <span className="text-left">{role} | </span>
            <div className="ml-1 flex">
              <a
                href={linkedin}
                className="mr-1 transition-all hover:opacity-50 active:scale-95"
                target="_blank"
              >
                <img src={LinkedInSvg} />
              </a>
              <a
                href={github}
                className="transition-all hover:opacity-50 active:scale-95"
                target="_blank"
              >
                <img src={GithubSvg} />
              </a>
              <a
                href={portfolio}
                className="transition-all hover:opacity-50 active:scale-95"
                target="_blank"
              >
                <img src={LinkSvg} className="" />
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
};
