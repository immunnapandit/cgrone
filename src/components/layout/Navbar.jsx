import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import { navLinks } from "@/data/navigation";
import useScrollPosition from "@/hooks/useScrollPosition";
import logo from "@/assets/images/logo/cgr-one-logo.webp";

export default function Navbar() {
  const scrolled = useScrollPosition(40);
  const [open, setOpen] = useState(false);
  /* Which mobile group is expanded, by label. This was a single boolean back
     when "Services" was the only dropdown; the layout document's nav has four,
     and one flag meant tapping any of them expanded all four at once. One at a
     time also keeps the menu short enough to scroll — the four groups hold 19
     links between them. */
  const [openGroup, setOpenGroup] = useState(null);
  const onHome = useLocation().pathname === "/";

  /* The section links are in-page anchors that only exist on the home page.
     From any other route they need to carry you back there first, so they
     become real "/#section" hrefs and let the browser do the scrolling. */
  const anchor = (href) => (onHome ? href : `/${href}`);

  return (
    /* No mount animation. This used to slide down from y:-100 on load, which
       meant the site's primary navigation started 100px off-screen and only
       came back when a JS animation frame ran. In a throttled tab that frame
       can be deferred and the header simply never appears — observed here,
       alongside the same problem in the hero copy. A fixed header must be
       on screen from first paint. */
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-lg py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        {/* The height lives on the link, not the image, so the header keeps the
            same 56/64px box that --nav-clear in index.css is derived from, and
            the logo is sized by width instead. The file is trimmed to the ink
            (aspect 4.56 rather than 3.59), so `h-16 w-auto` alone would take it
            to 291px and push the measured bar to exactly 1400. 228px between xl
            and 2xl is deliberate: that is the width the bar below was fitted to,
            so the horizontal nav keeps its clearance. */}
        <Link to="/" className="flex items-center h-14 sm:h-16">
          <img
            src={logo}
            alt="Cynosure Global Residency — Your Global Future. Our Focus."
            className="max-h-full w-auto max-w-[210px] sm:max-w-[240px] xl:max-w-[228px] 2xl:max-w-[240px] object-contain"
          />
        </Link>

        {/* Breakpoint raised from lg to xl, and the spacing tightened.
            The pillar labels from the layout document are long — "Investment &
            Business Migration" alone is most of a column — and measured at
            1400 the bar came to 1338px (logo 229 + nav 968 + button 141).
            That fits a 1400 container and nothing smaller, so between 1024 and
            1400 the old lg: nav overflowed. Below xl the hamburger takes over,
            which is where a nav this wide belongs anyway. */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 font-heading text-[12px] 2xl:text-[13px] font-medium tracking-[0.1em] 2xl:tracking-[0.14em] uppercase">
          {navLinks.map((l) =>
            l.children ? (
              <div key={l.label} className="relative group py-2">
                {/* uppercase is re-applied here because the UA stylesheet
                    sets button{text-transform:none}, which beats the nav's
                    inherited uppercase and left this reading "Services" */}
                <button className="flex items-center gap-1 uppercase text-ink hover:text-primary transition-colors duration-300">
                  {l.label}
                  <HiChevronDown className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                </button>

                {/* group-focus-within alongside group-hover, and it is not a
                    nicety: the panel is `invisible`, which takes its children
                    out of the tab order, and it opened on hover ALONE. A
                    keyboard user could tab to this button and nothing would
                    happen — all 19 links across the four dropdowns were
                    unreachable without a mouse (WCAG 2.1.1, Level A).

                    Tabbing to the button now puts focus inside the group,
                    which reveals the panel, which makes its links tabbable;
                    focus stays within the group as you move through them, so
                    it holds open until you tab past the last one.

                    Squared off at the same time. The panel was rounded-xl with
                    shadow-xl — the only rounded corner in the codebase, on a
                    site built entirely from right angles and hairlines. It
                    takes the hairline and the .feature-block shadow instead. */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 transition-all duration-300">
                  <div className="bg-white border border-hairline shadow-[0_18px_40px_-20px_rgba(17,34,61,0.45)] py-2 normal-case">
                    {l.children.map((c) =>
                      c.to ? (
                        <Link
                          key={c.label}
                          to={c.to}
                          className="block px-5 py-2.5 text-sm font-medium tracking-normal text-ink hover:text-primary hover:bg-offwhite transition-colors duration-200"
                        >
                          {c.label}
                        </Link>
                      ) : (
                        <a
                          key={c.label}
                          href={anchor(c.href)}
                          className="block px-5 py-2.5 text-sm font-medium tracking-normal text-ink hover:text-primary hover:bg-offwhite transition-colors duration-200"
                        >
                          {c.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="relative py-2 text-ink hover:text-primary transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ) : (
              <a
                key={l.label}
                href={anchor(l.href)}
                className="relative py-2 text-ink hover:text-primary transition-colors duration-300 group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            )
          )}
        </nav>

        <Link to="/contact" className="hidden xl:inline-flex btn-primary btn-sm">
          Contact Us
        </Link>

        <button className="xl:hidden text-3xl text-ink" onClick={() => setOpen(!open)}>
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="xl:hidden overflow-hidden bg-white border-t"
          >
            <div className="flex flex-col px-6 py-4 gap-1 font-heading font-medium uppercase text-[13px] tracking-[0.14em]">
              {navLinks.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    <button
                      onClick={() =>
                        setOpenGroup((g) => (g === l.label ? null : l.label))
                      }
                      aria-expanded={openGroup === l.label}
                      className="w-full flex items-center justify-between py-3 uppercase text-ink hover:text-primary transition-colors"
                    >
                      {l.label}
                      <HiChevronDown
                        className={`text-xs transition-transform duration-300 ${
                          openGroup === l.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {openGroup === l.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden pl-4"
                        >
                          {l.children.map((c) =>
                            c.to ? (
                              <Link
                                key={c.label}
                                to={c.to}
                                onClick={() => setOpen(false)}
                                className="block py-2.5 text-xs normal-case font-medium text-ink/80 hover:text-primary transition-colors"
                              >
                                {c.label}
                              </Link>
                            ) : (
                              <a
                                key={c.label}
                                href={anchor(c.href)}
                                onClick={() => setOpen(false)}
                                className="block py-2.5 text-xs normal-case font-medium text-ink/80 hover:text-primary transition-colors"
                              >
                                {c.label}
                              </a>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : l.to ? (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-ink hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={anchor(l.href)}
                    onClick={() => setOpen(false)}
                    className="py-3 text-ink hover:text-primary transition-colors"
                  >
                    {l.label}
                  </a>
                )
              )}

              {/* The desktop Contact Us button is hidden below lg, and Contact
                  is no longer a navLink — without this the mobile menu would
                  have no way to reach /contact at all. */}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center mt-4 mb-2"
              >
                Contact Us
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
