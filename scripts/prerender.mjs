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

const paths = allPaths();

for (const routePath of paths) {
  const html = template.replace(
    SEO_BLOCK,
    buildHead(getRouteMeta(routePath), SITE_URL, CONTACT_EMAIL)
  );

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
