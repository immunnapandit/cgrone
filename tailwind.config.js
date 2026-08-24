/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      /* All values resolve to the brand tokens in src/index.css (:root),
         which were sampled from the Cynosure Global Residency logo. */
      colors: {
        // star + tagline rules — #F97709
        primary: {
          DEFAULT: "rgb(var(--c-primary) / <alpha-value>)",
          dark: "rgb(var(--c-primary-dark) / <alpha-value>)",
          50: "#FFF3E6",
          100: "#FFE1C2",
          200: "#FDC489",
          300: "#FBA24F",
          400: "#FA8B25",
          500: "#F97709",
          600: "#D96407",
          700: "#AE4F06",
          800: "#7D3904",
          900: "#4A2202",
        },
        // globe gradient blue — #0A56A4
        brand: {
          DEFAULT: "rgb(var(--c-brand) / <alpha-value>)",
          dark: "rgb(var(--c-brand-dark) / <alpha-value>)",
          light: "rgb(var(--c-brand-light) / <alpha-value>)",
          50: "#EDF4FC",
          100: "#D2E3F7",
          200: "#A5C7EF",
          300: "#6FA5E2",
          400: "#2E7BCB",
          500: "#0A56A4",
          600: "#084A8E",
          700: "#063B72",
          800: "#042A52",
          900: "#021932",
        },
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        dark: "rgb(var(--c-ink-deep) / <alpha-value>)",
        offwhite: "rgb(var(--c-offwhite) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        soft: "rgb(var(--c-soft) / <alpha-value>)",
        hairline: "rgb(var(--c-hairline) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "Times New Roman", "serif"],
        heading: ["Jost", "sans-serif"],
        body: ["Jost", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.028em",
        tightish: "-0.022em",
        kicker: "0.22em",
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
