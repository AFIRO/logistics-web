/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        delaware: {
          primary: "#EF463C",

          secondary: "#C42828",

          accent: "#aa9aca",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#36D399",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('/background.svg')",
      },
    },
  },
  plugins: [require("daisyui")],
};
