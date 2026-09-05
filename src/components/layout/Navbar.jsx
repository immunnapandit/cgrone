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
  const { pathname, hash } = useLocation();
  const onHome = pathname === "/";

  /* The section links are in-page anchors that only exist on the home page.
     From any other route they need to carry you back there first, so they
     become real "/#section" hrefs and let the browser do the scrolling. */
  const anchor = (href) => (onHome ? href : `/${href}`);

  /* ---- active state ------------------------------------------------------
     There was none. Not a weak one — none: nothing in the header changed
     between routes, so on any of the fifteen pages the navigation answered
     "where am I?" with silence. A visitor on /countries/canada got no
     indication they were inside Global Immigration, and the four dropdown
     groups (19 links) gave no clue which one they had come through.

     `isCurrent` is the exact page. `inSection` is prefix matching, so a
     programme or country page lights its parent group: /investment-migration/
     antigua-barbuda is inside the Investment & Business Migration group via
     that group's /investment-migration child. "/" is exact-only — as a prefix
     it matches every route on the site.

     `isCurrent` compares the fragment too, not just the pathname. Comparing
     pathnames alone marked THREE children current on /about — "About
     Cynosure", "Our Story" and "Our Process" all live at /about — so the menu
     announced "current page" three times and highlighted three rows. A
     fragment-bearing child is current only when that fragment is the one in
     the URL; the bare child is current only when there is no fragment. */
  const isCurrent = (to) => {
    const [base, frag] = to.split("#");
    if (pathname !== base) return false;
    return frag ? hash === `#${frag}` : !hash;
  };

  const inSection = (to) => {
    const base = to.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const groupActive = (l) =>
    l.children ? l.children.some((c) => c.to && inSection(c.to)) : inSection(l.to);

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
      <div className="container-page flex items-center justify-between">
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
              /* py-2 moved OFF this wrapper and onto the button below. It was
                 padding a plain div, so the button inside measured 21px tall —
                 under WCAG 2.2's 24px target minimum — while the sibling plain
                 nav links, which carry py-2 on the <a> itself, measured 37px.
                 The two looked identical and had different hit areas. The
                 wrapper keeps the hover group and the panel's positioning
                 context; only the padding moved, so nothing shifts visually. */
              <div key={l.label} className="relative group">
                {/* uppercase is re-applied here because the UA stylesheet
                    sets button{text-transform:none}, which beats the nav's
                    inherited uppercase and left this reading "Services" */}
                {/* aria-haspopup + aria-expanded: the panel below opens on
                    hover and on focus-within, so to a screen reader this
                    control previously announced as a plain button that did
                    nothing. It cannot report true/false honestly — the open
                    state lives in CSS, not in React — but "menu, collapsed" is
                    the correct resting announcement, and the panel's contents
                    enter the tab order on focus regardless. */}
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={false}
                  className="relative flex items-center gap-1 py-2 uppercase text-ink hover:text-primary transition-colors duration-300"
                >
                  {l.label}
                  <HiChevronDown aria-hidden="true" className="text-xs transition-transform duration-300 group-hover:rotate-180" />
                  {/* The active-section rule. Same 2px accent underline the
                      plain links already grow on hover, held at full width —
                      so "you are here" and "you are hovering" share one visual
                      language instead of introducing a second. Not a colour
                      change: colour alone would fail 1.4.1. */}
                  {groupActive(l) && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary"
                    />
                  )}
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
                          /* aria-current marks the exact page inside the open
                             panel; the left rule + offwhite ground is its
                             visible equivalent, so which of the six children
                             you are on is answerable without opening anything
                             else. Hash children resolve to their pathname, so
                             "About Cynosure" and "Our Story" both read as
                             current on /about — correct, since they are the
                             same document. */
                          aria-current={isCurrent(c.to) ? "page" : undefined}
                          className={`block px-5 py-2.5 text-sm font-medium tracking-normal transition-colors duration-200 hover:text-primary hover:bg-offwhite ${
                            isCurrent(c.to)
                              ? "text-ink bg-offwhite border-l-2 border-primary pl-[18px]"
                              : "text-ink"
                          }`}
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
                aria-current={isCurrent(l.to) ? "page" : undefined}
                className="relative py-2 text-ink hover:text-primary transition-colors duration-300 group"
              >
                {l.label}
                {/* One rule, two jobs: it grows from 0 on hover and is simply
                    held at full width when this is the current page. */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 group-hover:w-full ${
                    isCurrent(l.to) ? "w-full" : "w-0"
                  }`}
                />
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

        {/* Had no accessible name at all — an icon-only button whose only
            content is an SVG, so it announced as "button". It is also the
            single most important control on the site below xl, since it is the
            only route to the navigation.

            -mr-2 p-2 gives it a 44x44 hit area (the glyph alone was ~30px,
            under both the 44pt Apple and 48dp Material floors) while the
            negative margin keeps the icon optically flush with the container
            gutter, so nothing moves visually. */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="xl:hidden -mr-2 p-2 text-3xl text-ink"
          /* Opening the menu expands the group you are currently inside. All
             four started collapsed, so on /countries/canada the menu opened
             onto four identical closed rows and gave no more sense of place
             than the header already did. Only set on open — after that the
             visitor's own toggling wins. */
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) setOpenGroup(navLinks.find(groupActive)?.label ?? null);
          }}
        >
          {open ? <HiX aria-hidden="true" /> : <HiMenu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            /* border-hairline, not a bare `border-t` — that fell through to
               Tailwind's default gray-200, the one untokenised border left in
               the codebase. */
            className="xl:hidden overflow-hidden bg-white border-t border-hairline"
          >
            <div className="flex flex-col px-6 py-4 gap-1 font-heading font-medium uppercase text-[13px] tracking-[0.14em]">
              {navLinks.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    {/* Active section gets the accent rule down its left edge
                        — the vertical counterpart of the desktop underline,
                        because these rows are stacked rather than in a line. */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenGroup((g) => (g === l.label ? null : l.label))
                      }
                      aria-expanded={openGroup === l.label}
                      className={`w-full flex items-center justify-between py-3 uppercase text-ink hover:text-primary transition-colors ${
                        groupActive(l) ? "border-l-2 border-primary pl-3" : ""
                      }`}
                    >
                      {l.label}
                      <HiChevronDown
                        aria-hidden="true"
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
                                aria-current={isCurrent(c.to) ? "page" : undefined}
                                className={`block py-2.5 text-xs normal-case transition-colors hover:text-primary ${
                                  isCurrent(c.to)
                                    ? "font-semibold text-ink"
                                    : "font-medium text-ink/80"
                                }`}
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
                    aria-current={isCurrent(l.to) ? "page" : undefined}
                    className={`py-3 text-ink hover:text-primary transition-colors ${
                      isCurrent(l.to) ? "border-l-2 border-primary pl-3" : ""
                    }`}
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
