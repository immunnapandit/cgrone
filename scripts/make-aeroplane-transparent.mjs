import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/images/about");
const input = path.join(dir, "aeroplane.png");

const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const out = Buffer.alloc(width * height * 4);
for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const brightness = (r + g + b) / 3;

  let alpha;
  if (brightness >= 248) alpha = 0;
  else if (brightness <= 200) alpha = 255;
  else alpha = Math.round(((248 - brightness) / (248 - 200)) * 255);

  out[j] = r;
  out[j + 1] = g;
  out[j + 2] = b;
  out[j + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(input);

console.log(`aeroplane.png background removed (${width}x${height})`);
