import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Frosted body card with a warm hover lift. Body-only (no heading color).
 * Re-Design.md §10.2.
 */
export default function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -4, boxShadow: '0 18px 38px rgba(107,69,50,0.16)' }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl bg-cream/95 p-5 text-ink-body shadow-card ring-1 ring-divider/80 backdrop-blur-[1px] text-pretty sm:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
