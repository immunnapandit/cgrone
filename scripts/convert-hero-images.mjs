import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/assets/images/hero");

const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".png"));

for (const file of files) {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace(/\.png$/i, ".webp"));

  await sharp(input).webp({ quality: 88 }).toFile(output);

  const before = (await stat(input)).size;
  const after = (await stat(output)).size;
  const savedPct = (100 - (after / before) * 100).toFixed(1);

  console.log(
    `${file} (${(before / 1024 / 1024).toFixed(2)} MB) -> ${path.basename(output)} (${(after / 1024 / 1024).toFixed(2)} MB), ${savedPct}% smaller`
  );
}
