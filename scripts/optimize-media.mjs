// Optimize the client Challah photos into web-ready webp at a fixed set
// of semantic names. Re-running is idempotent (overwrites same outputs).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'דף נחיתה - הפרשות חלה';
const OUT = join('public', 'images');
mkdirSync(OUT, { recursive: true });

// [source filename, output basename]
const MAP = [
  ['WhatsApp Image 2026-05-28 at 13.44.48.jpeg', 'hero'],       // shofar blow
  ['WhatsApp Image 2026-05-28 at 13.44.46.jpeg', 'ceremony'],   // kneading dough
  ['WhatsApp Image 2026-05-28 at 13.44.45 (1).jpeg', 'dance'],  // drummers / dancing
  ['WhatsApp Image 2026-05-28 at 13.44.44.jpeg', 'crowd'],      // women clapping
  ['WhatsApp Image 2026-05-28 at 13.44.45 (2).jpeg', 'table'],  // pearl-drape table
  ['WhatsApp Image 2026-05-28 at 13.42.14.jpeg', 'wide'],       // wide establishing
  ['WhatsApp Image 2026-05-28 at 13.44.45 (3).jpeg', 'joy'],    // clapping/energy
  ['WhatsApp Image 2026-05-28 at 13.44.45.jpeg', 'pair'],       // ronit + woman
];

for (const [src, name] of MAP) {
  const out = join(OUT, `${name}.webp`);
  await sharp(join(SRC, src))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log('wrote', out);
}
console.log('done');
