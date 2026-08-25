import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollTop from "@/components/common/ScrollTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ServiceDetail from "@/pages/ServiceDetail";

/** Land at the top on a route change. With a #hash we scroll to the section
 *  ourselves — the browser's native fragment jump fires before React has
 *  mounted the target, so links like /about#security-privacy would otherwise
 *  land at the top of the page. */
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
      <ScrollToTopOnNavigate />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        {/* vercel.json rewrites every path to index.html, so an unknown URL
            would otherwise render header + footer with nothing between */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <ScrollTop />
    </div>
  );
}
