import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
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
import GlobalImmigration from "@/pages/GlobalImmigration";
import WorkforceMobility from "@/pages/WorkforceMobility";
import WorkforceSector from "@/pages/WorkforceSector";

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


function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/global-mobility" element={<GlobalMobility />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* the three pillars — see Cynosure_Website_Layout_Pattern.docx */}
        <Route path="/investment-migration" element={<InvestmentMigration />} />
        <Route path="/global-immigration" element={<GlobalImmigration />} />
        <Route path="/workforce-mobility" element={<WorkforceMobility />} />
        <Route path="/workforce-mobility/:slug" element={<WorkforceSector />} />
        <Route path="/countries/:slug" element={<CountryDetail />} />
        <Route path="/services/:slug" element={<RetiredServiceRedirect />} />
        {/* vercel.json rewrites every path to index.html, so an unknown URL
            would otherwise render header + footer with nothing between */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ScrollTop />
    </div>
  );
}
