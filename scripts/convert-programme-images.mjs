/* One-off converter for the Caribbean programme photographs.
 *
 * Same job as convert-hero-images.mjs, but the sources for these do not live
 * in the repo — they are Unsplash downloads staged in a scratch directory, so
 * the input path is an argument rather than a fixed folder.
 *
 *   node scripts/convert-programme-images.mjs <source-dir>
 *
 * Heroes go to 1600px because they fill the right half of the split header at
 * their natural aspect (705px at a 1440 viewport, so 1600 covers 2x). Features
 * render at 380px in the Benefits column, so 1100 is already past 2x and
 * anything larger is bytes nobody downloads for a reason.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/convert-programme-images.mjs <source-dir>");
  process.exit(1);
}

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/assets/images/programmes"
);

/* [input, output, width]. The width is the role: 1600 hero, 1100 feature. */
const JOBS = [
  ["dm-a.jpg", "dominica-roseau-harbour.webp", 1600],
  ["dm-c.jpg", "dominica-trafalgar-falls.webp", 1100],
  ["gd-b.jpg", "grenada-carenage.webp", 1600],
  ["gd-c.jpg", "grenada-st-georges-aerial.webp", 1100],
  ["kn-b.jpg", "st-kitts-southeast-peninsula.webp", 1600],
  ["kn-c.jpg", "st-kitts-coastline.webp", 1100],
  ["lc-b.jpg", "st-lucia-piton-beach.webp", 1600],
  ["lc-a.jpg", "st-lucia-soufriere.webp", 1100],
];

for (const [input, output, width] of JOBS) {
  const from = path.join(src, input);
  const to = path.join(out, output);

  const meta = await sharp(from).metadata();
  await sharp(from).resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(to);

  const after = await sharp(to).metadata();
  const bytes = (await stat(to)).size;
  console.log(
    `${input} (${meta.width}x${meta.height}) -> ${output} (${after.width}x${after.height}, ${(bytes / 1024).toFixed(0)} kB)`
  );
}
