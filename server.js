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
import { buildHead, SEO_BLOCK, esc } from "./src/data/seoTags.js";

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

/* Only needed when the site and the API are on different origins (a static
   frontend on one host, this server on another). Same-origin deploys never hit
   this because the browser sends no Origin header worth checking.
   ALLOWED_ORIGINS is a comma-separated allowlist — deliberately not "*", since
   these endpoints send mail and should not be callable from any page. */
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use("/api", (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin.replace(/\/+$/, ""))) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Max-Age", "86400");
  }
  // Preflight must not reach the handlers' method guard, which would 405 it.
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

/* `all` rather than `post` so the handlers' own method guard answers a GET
   with 405, instead of it falling through to the SPA fallback and returning
   index.html to something expecting JSON. */
app.all("/api/contact", contact);
app.all("/api/newsletter", newsletter);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

/* ---------------------------------------------------------------- SEO ---- */

/* Tag building lives in src/data/seoTags.js because scripts/prerender.mjs
   needs exactly the same output when it bakes these into the static build. */
const organizationEmail = process.env.CONTACT_TO_EMAIL || "info@cgrone.com";

/* The frontend is deployed separately as static files, so on the API-only
   service dist/ does not exist. Reading it unconditionally at boot would crash
   the process before it ever served a request. Serving the app stays supported
   for a single-service deploy and for local testing of the built output. */
const templatePath = path.join(dist, "index.html");
const template = fs.existsSync(templatePath)
  ? fs.readFileSync(templatePath, "utf8")
  : null;

if (template && !SEO_BLOCK.test(template)) {
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

if (template) {
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

    /* An unknown path resolves to NOT_FOUND_META with a self-referential
       canonical, and the client router renders the not-found page and stays
       put. The 404 status below is what stops crawlers indexing junk URLs.

       This used to read "resolves to the home metadata, and the client router
       redirects it to '/'" — both halves changed on 2026-09-05 when the
       redirect was replaced by a real not-found page, because sending a 404
       and then serving a copy of the home page is a soft 404. */
    const isKnown = allPaths().includes(req.path.replace(/\/+$/, "") || "/");
    if (!isKnown) res.status(404);

    res.setHeader("Cache-Control", "no-cache");
    res.send(template.replace(SEO_BLOCK, buildHead(meta, SITE_URL, organizationEmail)));
  });
} else {
  /* API-only deployment. A bare 200 at the root keeps uptime checks and
     Render's own health probe happy without pretending to be the website. */
  app.get("/", (_req, res) =>
    res.json({ service: `${SITE_NAME} API`, endpoints: ["/api/contact", "/api/newsletter"] })
  );
  app.use((_req, res) => res.status(404).json({ error: "Not found" }));
}

/* Render supplies PORT and expects the process to bind it on all interfaces. */
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`${SITE_NAME} listening on :${port} — canonical origin ${SITE_URL}`);
});
