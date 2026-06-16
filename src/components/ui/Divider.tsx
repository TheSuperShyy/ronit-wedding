import { motion, useReducedMotion } from 'framer-motion';

/**
 * Full-width hairline rule with a slowly spinning gold sparkle. Paints cream
 * behind itself; used between consecutive info sections. Re-Design.md §10.4.
 */
export default function Divider() {
  const reduced = useReducedMotion();
  return (
    <div className="bg-cream">
      <div className="mx-auto flex w-full max-w-container items-center gap-4 px-5 sm:px-8">
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-divider to-transparent" />
        <motion.svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="flex-none text-accent"
          animate={reduced ? undefined : { rotate: [0, 360] }}
          transition={reduced ? undefined : { duration: 28, ease: 'linear', repeat: Infinity }}
        >
          <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
        </motion.svg>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-divider to-transparent" />
      </div>
    </div>
  );
}
