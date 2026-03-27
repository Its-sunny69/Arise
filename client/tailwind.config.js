/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "skew-scroll": "skew-scroll 20s linear infinite",
        shine: "shine 5s linear infinite",
        gradient: "gradient 8s linear infinite",
      },
      keyframes: {
        "skew-scroll": {
          "0%": {
            transform: "rotateX(20deg) rotateZ(-20deg) skewX(20deg)",
          },
          "100%": {
            transform:
              "rotateX(20deg) rotateZ(-20deg) skewX(20deg) translateY(-100%)",
          },
        },
        shine: {
          "0%": { "background-position": "100%" },
          "100%": { "background-position": "-100%" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      fontFamily: {
        title: ["ClashDisplay-Variable"],
        body: [
          // "MerriweatherSans-Variable", 
          "Clinton"
        ],
      },
      colors: {
        text: "#0C0C0C",
        subtext: "#4A4A4A",
        muted: "#7A7A7A",
        border: "#E5E5E5",
        background: "#FDFDFD",
        card: "#FFFFFF",
      },
    },
  },

  plugins: [tailwindcssAnimated],
};
