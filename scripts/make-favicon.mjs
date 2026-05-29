// Generates a tightly-cropped favicon from the brand logo. The source logo has
// wide whitespace padding, so it reads tiny at favicon sizes. We trim that
// padding, then place the mark on a square transparent canvas with a small
// margin so the logo fills the icon. Run: node scripts/make-favicon.mjs
import sharp from 'sharp';

const SRC = 'public/images/logo.webp';
const OUT = 'public/favicon.webp';
const SIZE = 256; // square favicon
const MARGIN = 12; // breathing room around the trimmed mark

const trimmed = await sharp(SRC)
  .trim({ threshold: 18 }) // remove the near-white border
  .toBuffer();

await sharp(trimmed)
  .resize(SIZE - MARGIN * 2, SIZE - MARGIN * 2, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top: MARGIN,
    bottom: MARGIN,
    left: MARGIN,
    right: MARGIN,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .webp({ quality: 92 })
  .toFile(OUT);

console.log(`Wrote ${OUT} (${SIZE}x${SIZE}, trimmed)`);
