import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/images/logo");

/* Source. Started as Logo.jpeg at 1280x357; the client has since supplied
   CynosureLogo.png and then CynosureLogo2.png, both 2171x724 — 2.9x the pixels
   and lossless. Each is still a raster with a white ground and no alpha (3
   channels, corners measured at 253-255), so everything below — the chroma key,
   the un-blend and the trim — still has to run.

   The ringing this script was written to fight is a JPEG artefact the PNG
   sources do not have. The despeckle pass stays anyway: it only ever removes
   ISOLATED low-alpha pixels, so on a clean source it is a no-op rather than a
   risk.

   To take a new supply, point `input` at it and re-run. Nothing downstream is
   hardcoded to a size, a margin or an aspect ratio — the trim finds the ink
   wherever it sits. There is still no vector original; if one arrives, this
   script and both raster outputs should go. */
const input = path.join(dir, "CynosureLogo2.png");
const output = path.join(dir, "cgr-one-logo.png");

// Soft chroma-key: pixels close to white become transparent, with a smooth
// ramp so text/icon edges keep anti-aliasing instead of turning jagged.
const TRANSPARENT_BELOW = 10; // distance from white -> fully transparent
const OPAQUE_ABOVE = 50; // distance from white -> fully opaque

// A partial-alpha pixel only counts as a real anti-aliased edge if actual ink
// sits next to it. Anything isolated is JPEG ringing around the letterforms.
const DESPECKLE_RADIUS = 2;
const INK_ALPHA = 200; // "actual ink" threshold for the neighbour search
const SPECKLE_ALPHA = 110; // only pixels below this are candidates for removal

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  const dist = 255 - Math.min(data[i * channels], data[i * channels + 1], data[i * channels + 2]);
  if (dist <= TRANSPARENT_BELOW) alpha[i] = 0;
  else if (dist >= OPAQUE_ABOVE) alpha[i] = 255;
  else alpha[i] = Math.round(((dist - TRANSPARENT_BELOW) / (OPAQUE_ABOVE - TRANSPARENT_BELOW)) * 255);
}

// Drop isolated low-alpha pixels. The source is a JPEG, so every hard navy/white
// boundary is surrounded by ringing that lands just above TRANSPARENT_BELOW and
// survives as grey speckle once the background is keyed out.
const cleaned = Uint8Array.from(alpha);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x;
    if (alpha[i] === 0 || alpha[i] >= SPECKLE_ALPHA) continue;

    let touchesInk = false;
    for (let dy = -DESPECKLE_RADIUS; dy <= DESPECKLE_RADIUS && !touchesInk; dy++) {
      const ny = y + dy;
      if (ny < 0 || ny >= height) continue;
      for (let dx = -DESPECKLE_RADIUS; dx <= DESPECKLE_RADIUS; dx++) {
        const nx = x + dx;
        if (nx < 0 || nx >= width) continue;
        if (alpha[ny * width + nx] >= INK_ALPHA) {
          touchesInk = true;
          break;
        }
      }
    }
    if (!touchesInk) cleaned[i] = 0;
  }
}

// Un-blend the white paper out of the colour channels. Each source pixel is
// C = a*F + (1-a)*255, so keeping C as-is (what this script used to do) leaves
// every edge pixel carrying most of its original near-white value. Over a light
// page that is invisible, but over the navy footer it draws a bright halo around
// every letterform. Solving back to F gives the true ink colour instead.
const rgba = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  const a = cleaned[i];
  rgba[i * 4 + 3] = a;
  if (a === 0) continue;

  const af = a / 255;
  for (let c = 0; c < 3; c++) {
    const observed = data[i * channels + c];
    const unblended = (observed - (1 - af) * 255) / af;
    rgba[i * 4 + c] = Math.max(0, Math.min(255, Math.round(unblended)));
  }
}

// Trim the transparent margin. Both supplied sources carry a wide, UNEVEN
// margin — the old scan was 1280x357 around 1139x250 of ink, 45px clear at the
// top and 61px at the bottom. Two things follow from that padding: the logo
// renders far smaller than its `h-14 w-auto` box implies (the box is mostly
// empty space, which is most of why it read as low-res), and an uneven
// top/bottom margin makes it sit visibly high in the navbar. Cropping to the
// ink fixes both, and does it for whatever margin the next source arrives with.
const box = { left: width, top: height, right: 0, bottom: 0 };
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (rgba[(y * width + x) * 4 + 3] <= 8) continue;
    if (x < box.left) box.left = x;
    if (x > box.right) box.right = x;
    if (y < box.top) box.top = y;
    if (y > box.bottom) box.bottom = y;
  }
}
const crop = {
  left: box.left,
  top: box.top,
  width: box.right - box.left + 1,
  height: box.bottom - box.top + 1,
};

const master = sharp(rgba, { raw: { width, height, channels: 4 } }).extract(crop);

// Native resolution for the PNG master — the scan is already far higher-res than
// a navbar/footer logo is displayed at, so upscaling would only add bytes.
await master.clone().png({ compressionLevel: 9 }).toFile(output);

// The webp is what the site actually loads. Largest on-screen size is the navbar
// at 64px tall (~229px wide), so 900px covers a 3x display with room to spare;
// the downscale also averages out what is left of the JPEG noise. Aspect ratio is
// unchanged, so the `h-14 w-auto` sizing in Navbar/Footer is unaffected.
const DELIVERED_WIDTH = 900;
const webpOutput = output.replace(/\.png$/, ".webp");
await master
  .clone()
  .resize({ width: DELIVERED_WIDTH, kernel: "lanczos3" })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile(webpOutput);

console.log(`Trimmed ${width}x${height} -> ${crop.width}x${crop.height} (offset ${crop.left},${crop.top})
Wrote ${output} and ${webpOutput} (${DELIVERED_WIDTH}px wide), transparent background`);
