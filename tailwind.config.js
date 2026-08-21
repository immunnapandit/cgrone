/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F5750E",
          50: "#FFF4E9",
          100: "#FFE4C7",
          200: "#FFC48A",
          300: "#FFA24D",
          400: "#FA8B29",
          500: "#F5750E",
          600: "#D4600A",
          700: "#A34A08",
          800: "#723406",
          900: "#421F04",
        },
        dark: "#111417",
        ink: "#0B1B3E",
        offwhite: "#F7F5F2",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Jost", "sans-serif"],
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        floatY: "floatY 4s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
