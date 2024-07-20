/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  screens: {
    sm: "576px",
    "sm-max": { max: "576px" },
    md: "768px",
    "md-max": { max: "768px" },
    lg: "992px",
    "lg-max": { max: "992px" },
    xl: "1200px",
    "xl-max": { max: "1200px" },
    "2xl": "1320px",
    "2xl-max": { max: "1320px" },
    "3xl": "1600px",
    "3xl-max": { max: "1600px" },
    "4xl": "1850px",
    "4xl-max": { max: "1850px" },
    "md-min": { min: "1520px" }, // Existing min screen size
    "md-1520": "1520px", // New screen size
    "md-1520-max": { max: "1520px" }, // New max screen size
  },
  theme: {
    extend: {
      fontFamily: {
        testing: ["Testing", "sans"],
      },
    },
  },
  plugins: [],
};
