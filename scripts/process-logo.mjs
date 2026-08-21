import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/images/logo");
const input = path.join(dir, "Logo.jpeg");
const output = path.join(dir, "cgr-one-logo.png");

// Soft chroma-key: pixels close to white become transparent, with a smooth
// ramp so text/icon edges keep anti-aliasing instead of turning jagged.
const TRANSPARENT_BELOW = 10; // distance from white -> fully transparent
const OPAQUE_ABOVE = 45; // distance from white -> fully opaque

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const r = data[i * channels];
  const g = data[i * channels + 1];
  const b = data[i * channels + 2];

  const dist = 255 - Math.min(r, g, b);
  let alpha;
  if (dist <= TRANSPARENT_BELOW) alpha = 0;
  else if (dist >= OPAQUE_ABOVE) alpha = 255;
  else alpha = Math.round(((dist - TRANSPARENT_BELOW) / (OPAQUE_ABOVE - TRANSPARENT_BELOW)) * 255);

  rgba[i * 4] = r;
  rgba[i * 4 + 1] = g;
  rgba[i * 4 + 2] = b;
  rgba[i * 4 + 3] = alpha;
}

// Source is already 1280x357 — far higher-res than a navbar/footer logo is ever
// displayed at, so we keep native resolution instead of upscaling (which only
// bloats file size without adding real detail).
await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(output);

const webpOutput = output.replace(/\.png$/, ".webp");
await sharp(rgba, { raw: { width, height, channels: 4 } })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(webpOutput);

console.log(`Wrote ${output} and ${webpOutput} (${width}x${height}, transparent background)`);
