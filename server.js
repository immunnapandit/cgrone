/* Production server for Render.
 *
 * Vercel would serve `dist/` from its CDN and run each file under `api/` as its
 * own serverless function, so no server was needed. Render runs a single long
 * lived Node process instead, so this does both jobs: static assets, the two
 * form endpoints, and the SPA fallback.
 *
 * The handlers under api/ are mounted unchanged — they only rely on
 * `res.status().json()`, which Express provides natively, so one implementation
 * still covers Render, Vercel, and the Vite dev shim.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import contact from "./api/contact.js";
import newsletter from "./api/newsletter.js";

const dist = fileURLToPath(new URL("./dist", import.meta.url));
const app = express();

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

app.use((_req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.sendFile(path.join(dist, "index.html"));
});

/* Render supplies PORT and expects the process to bind it on all interfaces. */
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`CGR ONE listening on :${port}`);
});
