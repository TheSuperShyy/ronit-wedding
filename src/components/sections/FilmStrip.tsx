import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { gallery } from '../../content/copy.he';

const photos = [...gallery.items, ...gallery.items]; // duplicated for a seamless loop

/**
 * Dark full-bleed photo marquee (PhotoMarquee). Edge-to-edge portrait cards on
 * ink-night, auto-pans, pauses off-screen, static under reduced motion. §10.14.
 */
export default function FilmStrip() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0, margin: '200px' });
  const moving = !reduced && inView;

  return (
    <div ref={ref} data-header-theme="dark" dir="ltr" aria-hidden className="relative overflow-hidden bg-ink-night py-3">
      <motion.div
        className="flex w-max gap-3 will-change-transform sm:gap-4"
        animate={moving ? { x: ['0%', '-50%'] } : undefined}
        transition={moving ? { duration: 50, ease: 'linear', repeat: Infinity, repeatType: 'loop' } : undefined}
      >
        {photos.map((g, i) => (
          <div
            key={i}
            className="aspect-[3/4] h-44 flex-none overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-56"
          >
            <img src={g.src} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-night to-transparent" />
    </div>
  );
}
