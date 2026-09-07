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
 * Coverage: the firm is ESTABLISHED in India, the UK, Canada, Australia and
 * New Zealand, and ADVISES ON destinations well beyond them — the Caribbean
 * citizenship programmes and the European and Gulf residence ones among them.
 * Descriptions that name the five must not imply the five are the limit; the
 * default one below is the place that got this wrong. The United States is NOT
 * served as a destination — an early version of this file advertised it.
 */

export const SITE_NAME = "Cynosure Global Residency";

export const DEFAULT_META = {
  title: "Cynosure Global Residency | Immigration & Global Mobility",
  description:
    "Immigration, global mobility and investment migration advisory across India, the UK, Canada, Australia, New Zealand and selected destinations worldwide.",
};

/* Unknown paths. Added 2026-09-05 alongside the real not-found page.
   The fallback used to be `{ ...DEFAULT_META, path: "/" }`, which was
   defensible while an unknown URL redirected to the home page and became it.
   It is not defensible now that /nope renders a not-found page and stays at
   /nope: that fallback titled the page "Cynosure Global Residency |
   Immigration & Global Mobility" and pointed the CANONICAL at "/", i.e. told
   every crawler that each broken URL on the site is a duplicate of the home
   page. server.js sends a 404 status for these, so the metadata is the last
   part still claiming otherwise. */
export const NOT_FOUND_META = {
  title: "Page Not Found | Cynosure Global Residency",
  description:
    "The page you were looking for has been moved, renamed, or never existed.",
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
      "Residence, work, study and family pathways to Canada, Australia, New Zealand and selected global destinations, via the regulated professional in each country.",
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

/* CBI/RBI programme detail pages. Keyed by the same slug as
   src/data/programmePages.js — add an entry here when a programme page is
   written, or it will render without meta and stay out of the sitemap.

   Descriptions say what the page covers without quoting a threshold, for the
   same reason the pages themselves do not: see the header of
   programmePages.js. */
const PROGRAMME_META = {
  "antigua-barbuda": {
    title: "Antigua & Barbuda Citizenship by Investment | Cynosure",
    description:
      "Citizenship by investment in Antigua and Barbuda — qualifying routes, who may be included, the application process and due diligence, coordinated with licensed agents in-country.",
  },
  /* These four ran 187–192 characters when they were written and the rule at
     the top of this file is ~160, so every one of them was being truncated in
     a listing at the point it named the routes — which is the part a searcher
     is looking for. Trimmed to fit. */
  dominica: {
    title: "Dominica Citizenship by Investment | Cynosure",
    description:
      "Citizenship by investment in Dominica — the two qualifying routes, which relatives may be included, the process and due diligence.",
  },
  grenada: {
    title: "Grenada Citizenship by Investment | Cynosure",
    description:
      "Citizenship by investment in Grenada — the two qualifying routes, the US E-2 treaty position, who may be included and the application process.",
  },
  "st-kitts-nevis": {
    title: "St. Kitts & Nevis Citizenship by Investment | Cynosure",
    description:
      "Citizenship by investment in St Kitts and Nevis — the three qualifying routes, who may be included, the mandatory interview and due diligence.",
  },
  "st-lucia": {
    title: "Saint Lucia Citizenship by Investment | Cynosure",
    description:
      "Citizenship by investment in Saint Lucia — the four qualifying routes including government bonds, who may be included and the process.",
  },
  portugal: {
    title: "Portugal Golden Residence Permit | Cynosure",
    description:
      "Portugal Golden Residence Permit - Schengen travel, a low physical-presence expectation and a potential long-term citizenship pathway.",
  },
  uae: {
    title: "UAE Golden Visa | Cynosure",
    description:
      "UAE Golden Visa - renewable long-term residence for qualifying investors, entrepreneurs and other eligible applicants.",
  },
  greece: {
    title: "Greece Golden Visa | Cynosure",
    description:
      "Greece Golden Visa - qualifying residence investment options, a five-year permit and family inclusion considerations.",
  },
  malta: {
    title: "Malta Citizenship by Naturalization | Cynosure",
    description:
      "Malta citizenship by naturalization for exceptional services by direct investment, subject to the applicable legal requirements.",
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

  const programme =
    path.startsWith("/investment-migration/") &&
    PROGRAMME_META[path.slice("/investment-migration/".length)];
  if (programme) return { ...programme, path };

  /* `path` stays the requested one, so the canonical is self-referential
     rather than claiming to be the home page. */
  return { ...NOT_FOUND_META, path };
}

/** Every indexable path, for the sitemap.
 *  The retired /services/* URLs are deliberately absent — App.jsx redirects
 *  them, and a redirect does not belong in a sitemap. */
export function allPaths() {
  return [
    ...Object.keys(ROUTES),
    ...Object.keys(COUNTRY_META).map((slug) => `/countries/${slug}`),
    ...Object.keys(PROGRAMME_META).map((slug) => `/investment-migration/${slug}`),
  ];
}
