/* Bakes per-route SEO into the static build.
 *
 * The site is served as plain files by LiteSpeed, so there is no Node process
 * to inject tags per request. Without this every route would ship the same
 * title and description, and link-preview crawlers (LinkedIn, WhatsApp, Slack)
 * would see nothing useful at all — they never run the JavaScript that sets
 * them client-side.
 *
 * For each route this writes a real HTML file with that route's tags baked in,
 * so /about is a genuine document rather than a rewrite of the home page. The
 * React bundle is identical in each; only the <head> differs.
 *
 * Run automatically after `vite build`.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getRouteMeta, allPaths } from "../src/data/seo.js";
import { buildHead, SEO_BLOCK, esc } from "../src/data/seoTags.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = path.join(root, "dist");

const SITE_URL = (process.env.SITE_URL || "https://cgrone.com").replace(/\/+$/, "");
const CONTACT_EMAIL = process.env.CONTACT_TO_EMAIL || "info@cgrone.com";

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

if (!SEO_BLOCK.test(template)) {
  console.error("[prerender] <!--seo--> markers missing from index.html — aborting");
  process.exit(1);
}

/* ---- hero preload ------------------------------------------------------
 * The hero photograph is imported by heroSlides.js, so it lives inside the
 * JS bundle's dependency graph and the browser cannot discover it from the
 * HTML. Measured on the production build: the top of the page rendered white
 * for several seconds while the ~450 kB bundle downloaded, parsed and mounted
 * React, which only then requested the image. It is the LCP element, so that
 * is the worst possible thing to leave late.
 *
 * A preload link lets the browser fetch it in parallel with the bundle. Only
 * the home page gets one — preloading it on /about would download an image
 * that route never shows.
 *
 * Matched by filename because Vite hashes it and this script cannot import
 * heroSlides.js (Node will not resolve its .webp imports). KEEP THE PATTERN
 * IN STEP WITH heroSlides[0] — if the first slide changes, change this.
 */
const HERO_FIRST_SLIDE = /^skyline-london-.*\.webp$/;

const assets = await fs.readdir(path.join(dist, "assets"));
const heroAsset = assets.find((f) => HERO_FIRST_SLIDE.test(f));

if (!heroAsset) {
  console.warn(
    "[prerender] no asset matched HERO_FIRST_SLIDE — the hero image will not be preloaded"
  );
}

const heroPreload = heroAsset
  ? `    <link rel="preload" as="image" href="/assets/${heroAsset}" fetchpriority="high" />\n`
  : "";

const paths = allPaths();

for (const routePath of paths) {
  let html = template.replace(
    SEO_BLOCK,
    buildHead(getRouteMeta(routePath), SITE_URL, CONTACT_EMAIL)
  );

  if (routePath === "/" && heroPreload) {
    html = html.replace("</head>", `${heroPreload}  </head>`);
  }

  /* "/" stays dist/index.html; every other route becomes a directory with its
     own index.html, so the host serves /about without needing a rewrite and
     the URL keeps no .html extension. */
  const outFile =
    routePath === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, routePath, "index.html");

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html);
  console.log(`  ${routePath.padEnd(45)} -> ${path.relative(root, outFile)}`);
}

await fs.writeFile(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) =>
      `  <url><loc>${esc(`${SITE_URL}${p === "/" ? "/" : p}`)}</loc><changefreq>monthly</changefreq><priority>${
        p === "/" ? "1.0" : "0.8"
      }</priority></url>`
  )
  .join("\n")}
</urlset>
`
);

/* Overwrites whatever robots.txt is already on the host. The domain currently
   serves a leftover one advertising five sitemaps that do not exist. */
await fs.writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

console.log(`\n  sitemap.xml + robots.txt written for ${SITE_URL}`);
console.log(`  ${paths.length} routes pre-rendered\n`);
