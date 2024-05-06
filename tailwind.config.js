/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      border: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        lightBlack: "rgba(0,0,0,0.5)",
        lightBlue: "#F2F6FD",
        white1: "#cdd8e1",
      },
      height: {
        22: "88px",
      },
    },
  },
  plugins: [],
};
