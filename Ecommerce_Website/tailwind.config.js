/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins"],
      },
      backgroundImage: {
        img: "url('../src/assets/bg-6.png')",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".no-spinner": {
          "-moz-appearance": "textfield",
          appearance: "textfield",
          "&::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
          "&::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: "0",
          },
        },
      });
    },
  ],
};
