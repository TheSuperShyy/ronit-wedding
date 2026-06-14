import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { introGate } from '../../content/copy.he';
import './video-gate.css';

// --- tweakable timing knobs -------------------------------------------------
const RATE = 1.75;         // video playback speed (1 = real time, higher = faster)
// WHEN the flash fires, measured in ms after the clip starts playing.
// The clip is 10s, so at this RATE it ends at ~10000 / RATE ≈ 5710ms.
// Lower this to fire the flash earlier (e.g. the moment the gate opens);
// set it to null to fire only when the clip actually ends.
const FLASH_FIRE_MS: number | null = 5200;
const FADE_START_MS = 300; // after the flash fires, when the screen starts fading to the site
const REVEAL_MS = 1100;    // after the flash fires, when the site is fully revealed (gate unmounts)
// The white flash ramps to full over ~10% of its 0.4s CSS animation
// (~40ms) — see `vgateFlash` in video-gate.css.
// ---------------------------------------------------------------------------

// fixed positions for the drifting gold light dust (deterministic, no rng)
const DUST = [
  { left: '12%', bottom: '-4%', size: '5px', dur: '13s', delay: '0s' },
  { left: '24%', bottom: '-8%', size: '3px', dur: '17s', delay: '2.4s' },
  { left: '38%', bottom: '-3%', size: '4px', dur: '15s', delay: '5s' },
  { left: '52%', bottom: '-6%', size: '6px', dur: '19s', delay: '1.2s' },
  { left: '66%', bottom: '-4%', size: '3px', dur: '14s', delay: '3.6s' },
  { left: '79%', bottom: '-7%', size: '5px', dur: '18s', delay: '6.2s' },
  { left: '90%', bottom: '-3%', size: '4px', dur: '16s', delay: '4.4s' },
] as const;

/**
 * Cinematic video intro — replaces the drawn GSAP gate. The "door" waits on its
 * first frame until the visitor clicks to enter; then /videos/gate.mp4 plays
 * (muted, slowed) full-bleed. A blurred copy of the clip fills the sides so the
 * portrait video never shows black bars, warm-graded overlays add depth, and the
 * branding sits clear of the gate. When the clip ends (or the visitor skips) a
 * blinding white flash floods through — the "passing through the gate" moment —
 * then it fades out to reveal the site (onDone). Skipped under reduced motion.
 */
export default function VideoGate({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [closing, setClosing] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const finishedRef = useRef(false);

  useEffect(() => {
    if (reduced) {
      doneRef.current();
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [reduced]);

  // Click-to-play: start both the sharp foreground clip and the blurred fill.
  const enter = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    [videoRef.current, bgRef.current].forEach((el) => {
      if (!el) return;
      el.muted = true; // no sound
      el.playbackRate = RATE;
      const p = el.play();
      if (p && p.catch) p.catch(() => { /* leave the prompt up */ });
    });
    // fire the flash at a chosen point (otherwise it waits for the clip to end)
    if (FLASH_FIRE_MS != null) window.setTimeout(finish, FLASH_FIRE_MS);
  };

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFlashing(true); // blinding white flood + zoom-through begins (t = 0)
    window.setTimeout(() => setClosing(true), FADE_START_MS); // fade out after the flash peaks
    window.setTimeout(() => doneRef.current(), REVEAL_MS);    // then reveal the site (after the fade)
  };

  if (reduced) return null;

  return (
    <div
      className={
        'vgate' +
        (started ? ' is-live' : '') +
        (flashing ? ' is-flash' : '') +
        (closing ? ' is-out' : '')
      }
      aria-label={introGate.aria}
    >
      <video
        ref={bgRef}
        className="vgate-bg"
        src="/videos/gate-new.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <video
        ref={videoRef}
        className="vgate-video"
        src="/videos/gate-new.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={finish}
      />
      <div className="vgate-tint" aria-hidden />
      <div className="vgate-vignette" aria-hidden />
      <div className="vgate-grain" aria-hidden />
      <span className="vgate-frame" aria-hidden />

      {/* delicate gold filigree in each corner */}
      <div className="vgate-corners" aria-hidden>
        {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
          <svg key={c} className={'vc ' + c} viewBox="0 0 92 92">
            <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
              <path d="M8 8 H66" />
              <path d="M8 8 V66" />
              <path d="M8 8 C46 10 60 26 62 60" />
              <path d="M22 8 C24 28 32 38 52 42" />
              <path d="M8 22 C28 24 38 32 42 52" />
            </g>
            <circle cx="62" cy="62" r="2.4" fill="currentColor" />
          </svg>
        ))}
      </div>

      {/* slow-drifting gold light dust */}
      <div className="vgate-dust" aria-hidden>
        {DUST.map((d, i) => (
          <span key={i} style={{ left: d.left, bottom: d.bottom, width: d.size, height: d.size, animationDuration: d.dur, animationDelay: d.delay }} />
        ))}
      </div>

      {started ? (
        <button type="button" className="vgate-skip" onClick={finish}>{introGate.skip}</button>
      ) : (
        <button type="button" className="vgate-enter" onClick={enter}>{introGate.enter}</button>
      )}

      <div className="vgate-flash" aria-hidden />
    </div>
  );
}
