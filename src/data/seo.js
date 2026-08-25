/* Per-route metadata — the single source of truth for titles, descriptions
 * and canonicals.
 *
 * Deliberately has NO imports. server.js reads this at request time to inject
 * tags into the served HTML, and Node cannot follow services.js's `.webp`
 * imports. Keeping it dependency-free lets the same table drive both the
 * server-rendered tags and the client-side ones.
 *
 * These are written for search results, not reused from the UI copy: titles
 * stay under ~60 characters and descriptions under ~160 so neither is
 * truncated in a listing.
 *
 * Note the coverage claim. The site sells India, the UK and Canada — an
 * earlier description here advertised the United States, which the business
 * does not serve.
 */

export const SITE_NAME = "CGR ONE";

export const DEFAULT_META = {
  title: "CGR ONE | Immigration & Global Mobility — India, UK, Canada",
  description:
    "Strategy-first immigration and global mobility advice. CGR ONE connects you with regulated immigration professionals, lawyers and specialist advisors across India, the UK and Canada.",
};

/* Static routes. Service pages are matched separately below so a new service
   does not need an entry here. */
const ROUTES = {
  "/": DEFAULT_META,

  "/about": {
    title: "About CGR ONE | 20+ Years in Immigration & Mobility",
    description:
      "CGR ONE is a global platform for immigration, mobility and opportunity, built on more than two decades of international experience across India, the UK and Canada.",
  },
};

const SERVICE_META = {
  "india-uk-expansion": {
    title: "India to UK Business Expansion | CGR ONE",
    description:
      "Establish and grow your Indian business in the UK. Market entry strategy, company formation, tax and compliance, backed by an established network of UK professionals.",
  },
  "india-canada-business-expansion": {
    title: "India to Canada Business Expansion | CGR ONE",
    description:
      "Take your Indian business into the Canadian market with the right structure, local professional support and a clear, commercially sensible entry plan.",
  },
  "india-canada-corporate-mobility": {
    title: "India–Canada Corporate Mobility | CGR ONE",
    description:
      "Move staff between India and Canada with the right work permits and corporate structures, coordinated with regulated immigration professionals in both countries.",
  },
  "india-canada-business-launch": {
    title: "Launch a Business in Canada from India | CGR ONE",
    description:
      "Launch and operate a Canadian business from India — company setup, banking, compliance and the local advisors needed to trade from day one.",
  },
};

/**
 * Resolve metadata for a pathname.
 * Unknown paths fall back to the home metadata, matching the router's
 * catch-all redirect to "/" so the two never disagree.
 */
export function getRouteMeta(pathname = "/") {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (ROUTES[path]) return { ...ROUTES[path], path };

  const service = path.startsWith("/services/") && SERVICE_META[path.slice("/services/".length)];
  if (service) return { ...service, path };

  return { ...DEFAULT_META, path: "/" };
}

/** Every indexable path, for the sitemap. */
export function allPaths() {
  return [
    ...Object.keys(ROUTES),
    ...Object.keys(SERVICE_META).map((slug) => `/services/${slug}`),
  ];
}
