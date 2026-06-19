import { GradientBackground } from "@/assets/images";
import PropTypes from "prop-types";

export default function Logo({ className = "", alt = "arise" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4.5 18.5 75 75"
      className={className}
      role="img"
      aria-label={alt}
    >
      <defs>
        <clipPath id="logo-clip" clipPathUnits="userSpaceOnUse">
          <path d="M 59 90 V 56.136 C 58.66 46.48 51.225 39 42 39 c -9.389 0 -17 7.611 -17 17 s 7.611 17 17 17 h 8.5 v 17 H 42 C 23.222 90 8 74.778 8 56 s 15.222 -34 34 -34 c 18.61 0 33.433 14.994 34 33.875 V 90 H 59 z V 55.74 V 90 H 59 z M 59 22 L 76 22 L 76 90 L 59 90 L 59 22 Z" />
        </clipPath>
      </defs>

      <image
        href={GradientBackground}
        x="4.5"
        y="18.5"
        width="75"
        height="75"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#logo-clip)"
      />
    </svg>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string,
};
