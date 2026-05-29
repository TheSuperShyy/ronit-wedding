// Web-optimize the client Challah videos into public/videos/ as H.264 mp4
// (faststart for streaming) plus a webp poster frame for each. Idempotent.
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'דף נחיתה - הפרשות חלה';
const OUT = join('public', 'videos');
mkdirSync(OUT, { recursive: true });

// [source filename, output basename]
const MAP = [
  ['WhatsApp Video 2026-05-28 at 10.14.21 (1).mp4', 'video-01'], // portrait
  ['WhatsApp Video 2026-05-28 at 10.14.21.mp4', 'video-02'],     // portrait
  ['WhatsApp Video 2026-05-28 at 10.14.23 (1).mp4', 'video-03'], // landscape
  ['WhatsApp Video 2026-05-28 at 10.14.23.mp4', 'video-04'],     // landscape
  ['WhatsApp Video 2026-05-28 at 13.44.44.mp4', 'video-05'],     // landscape, long
];

function run(args) {
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '));
}

for (const [src, name] of MAP) {
  const input = join(SRC, src);
  const mp4 = join(OUT, `${name}.mp4`);
  const poster = join(OUT, `${name}.webp`);

  // Transcode: cap longest side at 1080, H.264 CRF 27, faststart, AAC 96k.
  run([
    '-y', '-i', input,
    '-vf', "scale='if(gt(iw,ih),min(1080,iw),-2)':'if(gt(iw,ih),-2,min(1080,ih))'",
    '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p',
    '-crf', '27', '-preset', 'veryfast', '-movflags', '+faststart',
    '-c:a', 'aac', '-b:a', '96k',
    mp4,
  ]);

  // Poster frame at ~1s.
  run(['-y', '-ss', '1', '-i', input, '-frames:v', '1', '-vf', 'scale=720:-2', poster]);

  console.log('wrote', mp4, '+', poster);
}
console.log('done');
