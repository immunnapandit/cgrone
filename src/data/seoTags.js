/* Builds the <head> tags for a route.
 *
 * Shared by scripts/prerender.mjs (which bakes them into static HTML files for
 * the LiteSpeed host) and server.js (which injects them per request when the
 * app is served from Node). Keeping one implementation means the two can never
 * disagree about what a page claims to be.
 *
 * Like seo.js this has no imports beyond seo.js itself, so Node can load it
 * outside the Vite pipeline.
 */

import { SITE_NAME } from "./seo.js";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Marks the block in index.html that gets replaced. */
export const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;

export function buildHead(meta, siteUrl, contactEmail = "info@cgrone.com") {
  const base = siteUrl.replace(/\/+$/, "");
  const url = `${base}${meta.path === "/" ? "/" : meta.path}`;
  const image = `${base}/og-image.jpg`;

  /* One Organization node that the per-page WebPage nodes point at, rather
     than repeating the business details on every page, so search engines
     resolve a single entity rather than several near-duplicates. */
  const organization = {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: SITE_NAME,
    url: `${base}/`,
    logo: `${base}/og-image.jpg`,
    email: contactEmail,
    description:
      "Immigration and global mobility advisers connecting clients with regulated immigration professionals, lawyers and specialist advisors across India, the UK and Canada.",
    areaServed: ["IN", "GB", "CA"],
  };

  /* Breadcrumbs only where there is a real hierarchy — a one-item trail on the
     home page tells search engines nothing. */
  const crumbs =
    meta.path === "/"
      ? null
      : {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
            { "@type": "ListItem", position: 2, name: meta.title.split("|")[0].trim(), item: url },
          ],
        };

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": `${base}/#organization` },
      },
      ...(crumbs ? [crumbs] : []),
    ],
  };

  return `
    <title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <link rel="canonical" href="${esc(url)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${esc(SITE_NAME)}" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${esc(url)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="A family with passports and luggage in an airport terminal" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${esc(image)}" />

    <script type="application/ld+json">${JSON.stringify(ld)}</script>`;
}
