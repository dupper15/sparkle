/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "custom-blue": "#02033B",
      },
    },
  },
  plugins: [scrollbarHide, require("daisyui")],
};
