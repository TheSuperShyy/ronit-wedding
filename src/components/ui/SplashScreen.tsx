import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { meta } from '../../content/copy.he';

const HOLD_MS = 3500;
const REDUCED_HOLD_MS = 800;

/**
 * Opening brand hold: gold radial bloom, three expanding rings, a softly
 * breathing logo, then a 0.6s fade-out. Re-Design.md §10.12.
 */
export default function SplashScreen() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(false), reduced ? REDUCED_HOLD_MS : HOLD_MS);
    return () => window.clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(197,165,114,0.24) 0%, rgba(197,165,114,0) 70%)' }}
          />
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {!reduced &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute h-44 w-44 rounded-full ring-2 ring-gold sm:h-56 sm:w-56 lg:h-64 lg:w-64"
                  initial={{ scale: 1, opacity: 0.55 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 2.4, ease: 'easeOut', repeat: Infinity, delay: i * 0.8 }}
                />
              ))}
            <motion.img
              src="/images/logo.webp"
              alt={meta.brand}
              className="relative block h-44 w-44 rounded-full object-cover shadow-card ring-2 ring-gold/80 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
              loading="eager"
              decoding="sync"
              animate={reduced ? undefined : { scale: [1, 1.02, 1] }}
              transition={reduced ? undefined : { duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
