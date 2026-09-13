// remove-bg.mjs — removes white background from logo and saves true transparent PNG
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const inputPath = './public/logo_transparent.png';
const outputPath = './public/logo_final.png';

const img = sharp(inputPath).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const threshold = 240; // pixels brighter than this on all channels = white → transparent

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // If pixel is near-white → make transparent
  if (r > threshold && g > threshold && b > threshold) {
    data[i + 3] = 0; // alpha = 0 (fully transparent)
  }
}

const result = await sharp(Buffer.from(data), {
  raw: { width, height, channels }
}).png().toBuffer();

writeFileSync(outputPath, result);
console.log(`✅ Done! Saved transparent PNG to ${outputPath}`);
