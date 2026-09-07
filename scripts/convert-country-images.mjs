/* Converter for the Canada destination-page photography.
 *
 * Same shape as convert-programme-images.mjs: sources are Unsplash downloads
 * staged outside the repo, so the input directory is an argument.
 *
 *   node scripts/convert-country-images.mjs <source-dir>
 *
 * Widths are set by the slot each image fills, not by a blanket number. The
 * hero is a full-bleed half-width panorama; the editorial images render at
 * roughly a third to a half of a 1400px container, so 1200/1000 is already
 * past 2x for them and anything larger is bytes nobody sees.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/convert-country-images.mjs <source-dir>");
  process.exit(1);
}

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/images/countries");

const JOBS = [
  ["van-a.jpg", "canada-vancouver-golden-hour.webp", 1800], // hero
  ["van-c.jpg", "canada-vancouver-mountains.webp", 1200], // editorial
  ["rockies.jpg", "canada-moraine-lake.webp", 1200], // editorial
  ["life-c.jpg", "canada-toronto-distillery.webp", 1000], // editorial, portrait
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
