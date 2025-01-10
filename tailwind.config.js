/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
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
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("tailwindcss-animated"), require("daisyui")],
};
