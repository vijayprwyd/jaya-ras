/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      border: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        primary:
          "background: transparent linear-gradient(180deg, #00539A 0%, #003765 100%) 0% 0% no-repeat padding-box;",
      },
      colors: {
        lightBlack: "rgba(0,0,0,0.5)",
        lightBlue: "#F2F6FD",
        white1: "#cdd8e1",
        blue: "#064c98",
        "blue-100": "#0b4f9a",
      },
      height: {
        22: "88px",
      },
    },
  },
  plugins: [],
};
