/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      /* Every colour the site has. All of them resolve to the tokens in
         src/index.css (:root), so the palette is defined once.

         ---- THE RAMP IS BACK, AND THIS TIME IT IS WIRED UP -------------
         This block used to say "there are no numeric ramps here on purpose"
         because the previous ones were dead: twenty values left over from
         rejected palettes, none referenced anywhere, so `bg-primary-300`
         autocompleted into a colour that was not in the system.

         That reasoning was right about DEAD ramps and it is the reason this
         one is defined against the :root tokens rather than as literals —
         there is exactly one place any of these values exists. The ramp
         earns its place now because the palette rebuild actually uses it:
         600 for links and focus, 700 for fills, 50 for tinted grounds,
         900/950 for the navies. Add a step only when something consumes it.

         Opacity modifiers still work on every entry (bg-primary/10), and
         remain the right tool for a one-off tint. */
      colors: {
        /* Derived from the logo: hue ~212, anchored on the azure of the
           globe (#0054AE) at 600. The full derivation, the pixel sampling
           and the two earlier accent rejections are documented at the top of
           src/index.css — read that before changing any of this. */
        primary: {
          DEFAULT: "rgb(var(--c-primary) / <alpha-value>)",
          dark: "rgb(var(--c-primary-dark) / <alpha-value>)",   // .btn-primary hover
          50: "rgb(var(--c-primary-50) / <alpha-value>)",
          100: "rgb(var(--c-primary-100) / <alpha-value>)",
          200: "rgb(var(--c-primary-200) / <alpha-value>)",
          300: "rgb(var(--c-primary-300) / <alpha-value>)",
          400: "rgb(var(--c-primary-400) / <alpha-value>)",
          500: "rgb(var(--c-primary-500) / <alpha-value>)",
          600: "rgb(var(--c-primary-600) / <alpha-value>)",
          700: "rgb(var(--c-primary-700) / <alpha-value>)",
          800: "rgb(var(--c-primary-800) / <alpha-value>)",
          900: "rgb(var(--c-primary-900) / <alpha-value>)",
          950: "rgb(var(--c-primary-950) / <alpha-value>)",
        },
        /* The logo's orange star. Thin rules and small state marks only —
           never a fill, never a button, never behind white type. `accent` is
           the decorative value (2.6:1, fine for the eyebrow rule which is
           aria-hidden); `accent.strong` is the one that clears 3:1 and is
           therefore the only one allowed to carry meaning. */
        accent: {
          DEFAULT: "rgb(var(--c-accent) / <alpha-value>)",
          strong: "rgb(var(--c-accent-strong) / <alpha-value>)",
        },
        tint: "rgb(var(--c-tint) / <alpha-value>)",
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
        "border-strong": "rgb(var(--c-border-strong) / <alpha-value>)",
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
