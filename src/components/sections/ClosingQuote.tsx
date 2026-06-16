import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';
import CallPill from '../ui/CallPill';
import { closing } from '../../content/copy.he';

/** Final emotional close: parallax photo under dark scrims, shimmer quote. §11.16. */
export default function ClosingQuote() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const yShift = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative isolate flex min-h-[60svh] flex-col overflow-hidden text-ivory"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ scale: reduced ? 1.08 : scale, y: reduced ? 0 : yShift }}>
        <img src="/images/joy.webp" alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-night/75 via-ink-night/[0.82] to-ink-night/95" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 85%)' }}
      />

      <BrandLogo />

      <div className="relative -mt-6 flex flex-1 items-center justify-center px-6 sm:-mt-8">
        <motion.p
          className="text-balance relative mx-auto max-w-2xl text-center text-2xl font-medium italic leading-snug sm:text-4xl"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgba(250,246,238,0.95) 0%, rgba(250,246,238,1) 40%, #ffffff 50%, rgba(250,246,238,1) 60%, rgba(250,246,238,0.95) 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
          animate={reduced ? undefined : { backgroundPosition: ['200% 0%', '-200% 0%'] }}
          transition={reduced ? undefined : { duration: 9, ease: 'linear', repeat: Infinity }}
        >
          {closing.quote}
        </motion.p>
      </div>

      <CallPill theme="dark" />
    </section>
  );
}
