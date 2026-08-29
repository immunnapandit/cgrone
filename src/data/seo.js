/* Per-route metadata — the single source of truth for titles, descriptions
 * and canonicals.
 *
 * Deliberately has NO imports. server.js reads this at request time to inject
 * tags into the served HTML, and Node cannot follow the `.webp` imports in the
 * data files. Keeping it dependency-free lets the same table drive both the
 * server-rendered tags and the client-side ones.
 *
 * These are written for search results, not reused from the UI copy: titles
 * stay under ~60 characters and descriptions under ~160 so neither is
 * truncated in a listing.
 *
 * Coverage: India, the UK, Canada, Australia and New Zealand. The United
 * States is NOT served — an early version of this file advertised it.
 */

export const SITE_NAME = "Cynosure Global Residency";

export const DEFAULT_META = {
  title: "Cynosure Global Residency | Immigration & Global Mobility",
  description:
    "An international advisory platform for immigration, global mobility, investment migration and cross-border expansion across India, the UK, Canada, Australia and New Zealand.",
};

/* Static routes. Country pages are matched separately below so a new country
   does not need an entry here. */
const ROUTES = {
  "/": DEFAULT_META,

  "/about": {
    title: "About | Experience, Perspective, Global Reach | Cynosure",
    description:
      "Cynosure Global Residency is an international advisory platform built on decades of experience and a network of trusted professionals across jurisdictions.",
  },

  "/leadership": {
    title: "Leadership | Srikanth Koochavaram, Founder | Cynosure",
    description:
      "Srikanth Koochavaram, founder of Cynosure — 20+ years in immigration consulting, global mobility, investment migration and international business development.",
  },

  "/investment-migration": {
    title: "Citizenship & Residency by Investment | Cynosure",
    description:
      "Caribbean citizenship by investment and European and UAE residence-by-investment routes, plus business migration — assessed against your objectives and profile.",
  },

  "/global-immigration": {
    title: "Global Immigration | Canada, Australia, New Zealand | Cynosure",
    description:
      "Permanent residence, work, study and family pathways to Canada, Australia and New Zealand, coordinated with the regulated professional in each country.",
  },

  "/workforce-mobility": {
    title: "International Workforce Mobility | Cynosure",
    description:
      "Connecting employers with qualified international talent across healthcare, hospitality and skilled technical trades — sourcing, screening and mobility coordination.",
  },

  "/workforce-mobility/healthcare": {
    title: "Healthcare Workforce Mobility | Cynosure",
    description:
      "International career pathways for nurses, carers and allied healthcare professionals across Germany, Malta, Poland, Portugal and Cyprus.",
  },

  "/workforce-mobility/hospitality": {
    title: "Hospitality Workforce Mobility | Cynosure",
    description:
      "International opportunities for chefs, cooks, F&B and hotel professionals across Malta, Greece, Croatia, Portugal and Cyprus.",
  },

  "/global-mobility": {
    title: "Corporate Immigration & Global Mobility | Cynosure",
    description:
      "End-to-end global mobility support for employers relocating employees across international markets — immigration, relocation, family mobility and case management.",
  },

  "/contact": {
    title: "Contact Cynosure Global Residency | Book a Consultation",
    description:
      "Tell us about your circumstances, objectives and plans. Book a confidential consultation with the Cynosure advisory team, or email info@cgrone.com.",
  },
};

const COUNTRY_META = {
  india: {
    title: "India | Where Cynosure Began | Cynosure Global Residency",
    description:
      "Cynosure has practised from India since 2006. Business structured in India alongside the overseas entity, planned and timed as one cross-border move.",
  },
  uk: {
    title: "United Kingdom | Market Entry & Expansion | Cynosure",
    description:
      "Establish and grow a business in the UK — market entry strategy, company formation, tax and compliance, and an established network of UK professionals.",
  },
  canada: {
    title: "Canada Immigration & Market Entry | Cynosure",
    description:
      "Permanent residence, work, study, family and business immigration, plus Canadian market entry — coordinated with qualified Canadian immigration professionals.",
  },
  australia: {
    title: "Australia Immigration & Global Mobility | Cynosure",
    description:
      "Skilled, employer-sponsored, business, family and student pathways to Australia, coordinated with registered migration agents and immigration lawyers.",
  },
  "new-zealand": {
    title: "New Zealand Immigration | Cynosure Global Residency",
    description:
      "Skilled migration, work, business, family and study pathways to New Zealand, coordinated with Licensed Immigration Advisers and immigration lawyers.",
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

  const country = path.startsWith("/countries/") && COUNTRY_META[path.slice("/countries/".length)];
  if (country) return { ...country, path };

  return { ...DEFAULT_META, path: "/" };
}

/** Every indexable path, for the sitemap.
 *  The retired /services/* URLs are deliberately absent — App.jsx redirects
 *  them, and a redirect does not belong in a sitemap. */
export function allPaths() {
  return [
    ...Object.keys(ROUTES),
    ...Object.keys(COUNTRY_META).map((slug) => `/countries/${slug}`),
  ];
}
