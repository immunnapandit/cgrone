/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      /* Every colour the site has. All of them resolve to the tokens in
         src/index.css (:root), so the palette is defined once.

         There are no numeric ramps here on purpose. `primary` and `brand`
         used to carry 50-900 scales — twenty values, none of them referenced
         anywhere, and both left over from palettes the client has since
         rejected (the brand ramp was still the old #0A56A4 blue). A dead ramp
         is not harmless: it makes `bg-primary-300` autocomplete and compile
         into a colour that is not in the system. If a tint is genuinely
         needed, use an opacity modifier — bg-primary/10 — which stays on
         palette by construction. */
      colors: {
        /* The accent. Gold (#AB8A21) first, then a steel blue (#3E6FB5) — the
           client rejected both, the second as "not premium". It is
           henleyglobal.com's own #405363 now: a desaturated slate that is the
           single most-used colour in their stylesheet (170 occurrences). A
           saturated accent is what read cheap; this one barely registers as a
           colour, which is the point. */
        primary: {
          DEFAULT: "rgb(var(--c-primary) / <alpha-value>)",
          dark: "rgb(var(--c-primary-dark) / <alpha-value>)",   // .btn-primary hover
        },
        // #263E69, one step off --c-ink. The page-title gradient and the
        // SecurityPrivacy top rule are the only things that need a navy that
        // separates from the workhorse one.
        brand: "rgb(var(--c-brand) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        dark: "rgb(var(--c-ink-deep) / <alpha-value>)",
        offwhite: "rgb(var(--c-offwhite) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        soft: "rgb(var(--c-soft) / <alpha-value>)",
        hairline: "rgb(var(--c-hairline) / <alpha-value>)",
        // form errors only — see the note on --c-error in index.css
        error: "rgb(var(--c-error) / <alpha-value>)",
      },
      /* EB Garamond + Roboto — henleyglobal.com's pairing, which the client
         asked for by name. Read off their stylesheet:
           h1,h2,h3 { font-family: Garamond Regular, serif; font-weight: 400 }
           body     { font-family: ...Roboto...; font-size: 1rem; line-height: 1.5 }
         Note the weight: 400, not 500 or 600. */
      fontFamily: {
        display: ["EB Garamond", "Garamond", "Georgia", "serif"],
        heading: ["Roboto", "system-ui", "sans-serif"],
        body: ["Roboto", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "normal",
        tightish: "normal",
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
