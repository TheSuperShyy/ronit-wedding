import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin gradient progress bar pinned to the top. RTL: fills from the right
 * (reading start) via transformOrigin. Re-Design.md §10.10.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: 'right' }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-gradient-to-l from-button via-accent to-hero"
    />
  );
}
