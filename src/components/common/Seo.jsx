import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/data/seo";

/**
 * Keeps title, description and canonical correct during client-side navigation.
 *
 * server.js already injects these into the served HTML, which is what search
 * and link-preview crawlers read — they never run this. This exists for the
 * in-app case: React Router swaps routes without a document load, so without
 * it the tab title would stay on whatever page the visitor first landed on and
 * every history entry would share one name.
 *
 * It *mutates the server's tags* rather than rendering its own. Returning
 * <title>/<meta> from a component looks tidier and React 19 would hoist them,
 * but they land alongside the server-rendered pair instead of replacing it:
 * the head ends up with duplicate titles that accumulate on each navigation,
 * and document.querySelector keeps reading the stale server description.
 */
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);

    document.title = meta.title;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);

    /* Canonical is absolute and origin-specific, so derive it from wherever
       the page is actually being served rather than hardcoding the domain. */
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute(
        "href",
        `${window.location.origin}${meta.path === "/" ? "/" : meta.path}`
      );
    }
  }, [pathname]);

  return null;
}
