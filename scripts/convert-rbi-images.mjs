/* Converter for the four RBI programme photographs — Portugal, UAE, Greece,
 * Malta. Same job and the same output sizes as convert-programme-images.mjs,
 * which did the five Caribbean CBI pages.
 *
 *   node scripts/convert-rbi-images.mjs <source-dir>
 *
 * Two differences from the Caribbean converter, both because this one is
 * expected to run BEFORE all eight sources exist:
 *
 *   1. A missing source is skipped and reported, not thrown. Drop in whatever
 *      you have, run it, drop in the rest later and run it again.
 *   2. It prints a status table at the end listing what is still outstanding,
 *      so the gap is visible rather than something you discover on the page.
 *
 * Sizes are the roles, unchanged: 1600 for a hero, because it fills the right
 * half of the split header (705px at a 1440 viewport, so 1600 covers 2x); 1100
 * for a feature, which renders at 380px beside Benefits and is already past 2x.
 *
 * ---- THE RULE THAT MATTERS MORE THAN THE SIZES --------------------------
 * Every photograph must be of the place it claims to be, confirmed from the
 * photograph itself and not from the filename or the search result that
 * produced it. convert-programme-images.mjs records why: two candidates that
 * came back under "st kitts and nevis" were Puerto Rico and St Barthélemy. On
 * a page selling residence in a country, a picture of a different country is a
 * false claim in the one place nobody proofreads.
 *
 * The same rule rules out AI-generated cityscapes here. A synthesised "Lisbon"
 * is a picture of nowhere, which is the failure above in its strongest form.
 *
 * Licence: Unsplash or equivalent — free for commercial use, no attribution
 * required, which is the licence banners.js already restricts this project to.
 * Check each frame for identifiable faces and third-party branding before use.
 */
import sharp from "sharp";
import { stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const src = process.argv[2];
if (!src) {
  console.error("usage: node scripts/convert-rbi-images.mjs <source-dir>");
  process.exit(1);
}

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/assets/images/programmes"
);

/* [input, output, width, brief].
 *
 * The brief is the art direction, kept next to the filename so that whoever
 * sources a replacement knows what the slot needs rather than guessing from
 * the name. Architecture and place throughout — no people, no documents, no
 * flags, matching the treatment the Caribbean set already established.
 *
 * A hero is cropped HARD by the right half of the split header, so it needs a
 * subject that survives losing most of its width: horizon high, the interest
 * in the upper two thirds, nothing important at the edges.
 */
const JOBS = [
  ["pt-a.jpg", "portugal-lisbon-alfama.webp", 1600,
   "Lisbon, Alfama — São Vicente de Fora and the Panteão Nacional dome above the rooftops."],
  ["pt-b.jpg", "portugal-porto-douro.webp", 1100,
   "Porto — the Douro gorge, the Ponte Maria Pia arch and the Serra do Pilar monastery."],

  ["ae-a.jpg", "uae-dubai-skyline.webp", 1600,
   "Dubai — the Burj Khalifa above the Business Bay skyline."],
  ["ae-b.jpg", "uae-abu-dhabi-grand-mosque.webp", 1100,
   "Abu Dhabi — the Sheikh Zayed Grand Mosque and its reflecting pool."],

  ["gr-a.jpg", "greece-athens-acropolis.webp", 1600,
   "Athens — the Acropolis, with the Parthenon above the Odeon of Herodes Atticus."],
  ["gr-b.jpg", "greece-athens-caryatids.webp", 1100,
   "Athens — the Porch of the Caryatids on the Erechtheion."],

  ["mt-a.jpg", "malta-valletta-grand-harbour.webp", 1600,
   "Valletta — the fortified peninsula and the Grand Harbour."],
  ["mt-b.jpg", "malta-valletta-facades.webp", 1100,
   "Valletta — limestone façades with the enclosed timber balconies (gallarija)."],
];

const done = [];
const missing = [];

for (const [input, output, width, brief] of JOBS) {
  const from = path.join(src, input);
  const to = path.join(out, output);

  if (!existsSync(from)) {
    missing.push([input, output, width, brief]);
    continue;
  }

  const meta = await sharp(from).metadata();
  await sharp(from)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(to);

  const after = await sharp(to).metadata();
  const bytes = (await stat(to)).size;
  console.log(
    `${input} (${meta.width}x${meta.height}) -> ${output} (${after.width}x${after.height}, ${(bytes / 1024).toFixed(0)} kB)`
  );
  done.push(output);
}

console.log(`\n${done.length} of ${JOBS.length} converted.`);

if (missing.length) {
  console.log(`\nStill needed — put these in ${src} and run again:\n`);
  for (const [input, output, width, brief] of missing) {
    console.log(`  ${input}  ->  ${output}  (${width}px ${width === 1600 ? "hero" : "feature"})`);
    console.log(`      ${brief}\n`);
  }
  console.log("Wire them into src/data/programmePages.js only once the files exist —");
  console.log("a static import of a missing asset fails the Vite build.");
}
