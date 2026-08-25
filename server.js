/* Production server for Render.
 *
 * Vercel would serve `dist/` from its CDN and run each file under `api/` as its
 * own serverless function, so no server was needed. Render runs a single long
 * lived Node process instead, so this does several jobs: static assets, the two
 * form endpoints, robots/sitemap, per-route SEO tags, and the SPA fallback.
 *
 * The handlers under api/ are mounted unchanged — they only rely on
 * `res.status().json()`, which Express provides natively, so one implementation
 * still covers Render, Vercel, and the Vite dev shim.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import contact from "./api/contact.js";
import newsletter from "./api/newsletter.js";
import { getRouteMeta, allPaths, SITE_NAME } from "./src/data/seo.js";

const dist = fileURLToPath(new URL("./dist", import.meta.url));
const app = express();

/* Absolute URLs are required for canonical and og:url. Set SITE_URL on Render
   to the live domain; the fallback keeps a preview deploy from advertising
   itself as production. */
const SITE_URL = (process.env.SITE_URL || "https://cgrone.com").replace(/\/+$/, "");

// Render terminates TLS at its proxy, so the client IP the rate limiter reads
// arrives in X-Forwarded-For. Without this Express reports the proxy address
// and every visitor shares one bucket.
app.set("trust proxy", 1);

app.use(express.json({ limit: "64kb" }));

/* `all` rather than `post` so the handlers' own method guard answers a GET
   with 405, instead of it falling through to the SPA fallback and returning
   index.html to something expecting JSON. */
app.all("/api/contact", contact);
app.all("/api/newsletter", newsletter);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

/* ---------------------------------------------------------------- SEO ---- */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Identity shared by every page. Kept as one Organization node that the
   per-page WebPage nodes point at, rather than repeating it, so search engines
   resolve a single entity for the business. */
const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/og-image.jpg`,
  email: process.env.CONTACT_TO_EMAIL || "info@cgrone.com",
  description:
    "Immigration and global mobility advisers connecting clients with regulated immigration professionals, lawyers and specialist advisors across India, the UK and Canada.",
  areaServed: ["IN", "GB", "CA"],
};

function buildHead(meta, url) {
  const image = `${SITE_URL}/og-image.jpg`;

  /* Breadcrumbs only where there is a real hierarchy — emitting a one-item
     trail for the home page tells search engines nothing. */
  const crumbs =
    meta.path === "/"
      ? null
      : {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: meta.title.split("|")[0].trim(), item: url },
          ],
        };

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      organizationLd,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        isPartOf: { "@id": `${SITE_URL}/#organization` },
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

/* Read once at boot — the file only changes on redeploy, and re-reading it per
   request would put disk IO in front of every page view. */
const templatePath = path.join(dist, "index.html");
const template = fs.readFileSync(templatePath, "utf8");
const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;

if (!SEO_BLOCK.test(template)) {
  // Loud rather than silent: without the markers every page ships the same
  // title and the per-route work below is invisible.
  console.warn("[seo] markers not found in dist/index.html — serving default tags");
}

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

app.get("/sitemap.xml", (_req, res) => {
  const urls = allPaths()
    .map((p) => {
      const loc = `${SITE_URL}${p === "/" ? "/" : p}`;
      return `  <url><loc>${esc(loc)}</loc><changefreq>monthly</changefreq><priority>${
        p === "/" ? "1.0" : "0.8"
      }</priority></url>`;
    })
    .join("\n");

  res.type("application/xml").send(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
  );
});

/* ------------------------------------------------------------ static ----- */

/* Asset filenames are content-hashed by Vite, so they can be cached hard.
   index.html must not be — it is what points at the current hashes, and a
   cached copy would keep serving the previous build's assets. */
app.use(
  express.static(dist, {
    index: false,
    maxAge: "1y",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
    },
  })
);

app.use((req, res) => {
  const meta = getRouteMeta(req.path);
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;

  /* An unknown path resolves to the home metadata, and the client router
     redirects it to "/" — so tell crawlers it is not a distinct page rather
     than letting them index duplicates of the home page under junk URLs. */
  const isKnown = allPaths().includes(req.path.replace(/\/+$/, "") || "/");
  if (!isKnown) res.status(404);

  res.setHeader("Cache-Control", "no-cache");
  res.send(template.replace(SEO_BLOCK, buildHead(meta, url)));
});

/* Render supplies PORT and expects the process to bind it on all interfaces. */
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`${SITE_NAME} listening on :${port} — canonical origin ${SITE_URL}`);
});
