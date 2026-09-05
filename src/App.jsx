import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollTop from "@/components/common/ScrollTop";
import Seo from "@/components/common/Seo";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Leadership from "@/pages/Leadership";
import GlobalMobility from "@/pages/GlobalMobility";
import ContactPage from "@/pages/Contact";
import CountryDetail from "@/pages/CountryDetail";
import InvestmentMigration from "@/pages/InvestmentMigration";
import ProgrammeDetail from "@/pages/ProgrammeDetail";
import GlobalImmigration from "@/pages/GlobalImmigration";
import WorkforceMobility from "@/pages/WorkforceMobility";
import WorkforceSector from "@/pages/WorkforceSector";
import NotFound from "@/pages/NotFound";

/* The four India-specific service pages were retired on 2026-08-27 when the
   client's new documents reorganised the offering by country and theme. These
   keep the old URLs alive — they were in the sitemap and may be linked from
   elsewhere, and a redirect to the page that now carries the content is better
   than dropping the visitor on the home page. */
const RETIRED_SERVICE_ROUTES = {
  "india-uk-expansion": "/countries/uk",
  "india-canada-business-expansion": "/countries/canada",
  "india-canada-business-launch": "/countries/canada",
  "india-canada-corporate-mobility": "/global-mobility",
};

function RetiredServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={RETIRED_SERVICE_ROUTES[slug] ?? "/"} replace />;
}


/* Scroll AND focus. The scroll half was already here; the focus half was not,
   and without it a client-side route change moves the page but not the
   keyboard. Focus stayed on whatever nav link was activated — inside a
   dropdown panel that had just closed — so a screen reader announced nothing
   and the next Tab resumed from the middle of the header rather than at the
   top of the new page (WCAG 2.4.3).

   Focus goes to <main>, which is tabindex="-1" so it can receive it
   programmatically without joining the tab order. Skipped on first paint
   (there has been no navigation to announce) and skipped for in-page #anchor
   links, where the browser's own behaviour is already correct.

   Looked up by id rather than through a ref passed down from App: <main> is
   rendered by App and read here, so a ref would have to be drilled through
   props for no benefit, and exhaustive-deps then (wrongly) demands
   `ref.current` in the dependency array. getElementById has neither problem
   and the element is guaranteed mounted by the time an effect runs.

   "Has the path changed?" rather than "is this the first render?". The
   obvious guard is a `firstRender` ref flipped to false on the first pass,
   and it is WRONG here — main.jsx wraps the app in <StrictMode>, which
   simulates a remount by running every effect twice. The first pass cleared
   the flag and the second then focused <main>, so the focus fired on plain
   page loads: measured, activeElement was MAIN on a cold load of /leadership
   when it should have been BODY. Comparing the previous pathname is immune to
   how many times the effect runs, because on mount there is nothing to
   compare against but itself. */
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const navigated = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (navigated && !hash) {
      document.getElementById("main")?.focus({ preventScroll: true });
    }

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // one frame is enough for the route's sections to be in the DOM
    const id = requestAnimationFrame(() => {
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="font-body">
      <Seo />
      <ScrollToTopOnNavigate />

      {/* Skip link. There was none, and the header carries 19 dropdown links
          plus five top-level items — so reaching the content of any page by
          keyboard meant tabbing through the entire navigation, on every
          single page (WCAG 2.4.1, Level A). It is the first focusable thing
          in the document and is invisible until focused. */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      {/* The site had no <main> at all: every page was header, then bare
          <section>s, then footer, so assistive technology had no primary
          landmark to jump to and the skip link above would have had nothing
          to point at. tabIndex -1 lets ScrollToTopOnNavigate move focus here
          on route change without putting it in the tab order. */}
      <main id="main" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/global-mobility" element={<GlobalMobility />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* the three pillars — see Cynosure_Website_Layout_Pattern.docx */}
        <Route path="/investment-migration" element={<InvestmentMigration />} />
        {/* one page per CBI/RBI programme — nested under the pillar rather than
            under /countries/, which is for the jurisdictions we operate in */}
        <Route path="/investment-migration/:slug" element={<ProgrammeDetail />} />
        <Route path="/global-immigration" element={<GlobalImmigration />} />
        <Route path="/workforce-mobility" element={<WorkforceMobility />} />
        <Route path="/workforce-mobility/:slug" element={<WorkforceSector />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />
        <Route path="/services/:slug" element={<RetiredServiceRedirect />} />
        {/* A real not-found page, not `<Navigate to="/" replace />`. See the
            note in NotFound.jsx: the redirect hid the failure from the visitor
            AND contradicted the 404 status server.js already sends. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}
