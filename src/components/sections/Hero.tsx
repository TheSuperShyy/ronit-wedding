import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SOFT_EASE } from '../motion/variants';
import Button from '../ui/Button';
import BrandLogo from '../ui/BrandLogo';
import CallPill from '../ui/CallPill';
import { meta, hero } from '../../content/copy.he';

const TEXT_SHADOW = '0 2px 6px rgba(0,0,0,0.7)';

/**
 * Full-viewport opening: parallax photo backdrop under layered ink-night
 * scrims, per-section BrandLogo + dark CallPill, spotlight kicker, stacked
 * display title, subtitle, CTA, and a bouncing scroll chevron. Re-Design.md §11.1.
 */
export default function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, ease: SOFT_EASE, delay },
        };

  return (
    <header
      ref={ref}
      id="top"
      data-header-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-ivory"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{ scale: reduced ? 1 : bgScale, y: reduced ? 0 : bgY }}
      >
        <img src="/images/hero.webp" alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-night/75 via-ink-night/[0.82] to-ink-night/95" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 85%)' }}
      />

      <motion.p
        {...rise(0.05)}
        className="absolute start-5 top-5 z-20 text-sm font-semibold tracking-[0.3em] text-ivory/90 sm:start-7 sm:top-7 sm:text-base"
        style={{ textShadow: TEXT_SHADOW }}
      >
        {meta.besd}
      </motion.p>

      <BrandLogo />

      <div className="relative -mt-6 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-0 text-center sm:-mt-8 sm:justify-start">
        <div className="mx-auto w-full max-w-container">
          <motion.p
            {...rise(0.1)}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.32em] text-gold sm:text-sm"
            style={{ textShadow: TEXT_SHADOW }}
          >
            {hero.kicker}
          </motion.p>
          <motion.h1
            initial={reduced ? undefined : { opacity: 0, y: 32, letterSpacing: '0.05em' }}
            animate={reduced ? undefined : { opacity: 1, y: 0, letterSpacing: '0em' }}
            transition={reduced ? undefined : { duration: 1.3, ease: SOFT_EASE, delay: 0.15 }}
            className="text-balance mx-auto mb-6 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-6xl lg:text-7xl"
            style={{ color: '#faf6ee', textShadow: TEXT_SHADOW }}
          >
            {hero.titleLead}
            <span className="mt-1 block text-gold">{hero.titleFoil}</span>
          </motion.h1>
          <motion.p
            {...rise(0.3)}
            className="text-pretty mx-auto mb-8 max-w-xl text-lg font-light sm:text-2xl"
            style={{ textShadow: TEXT_SHADOW }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div {...rise(0.55)}>
            <Button
              href="#lead"
              onClick={(e) => {
                e.preventDefault();
                window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
              }}
              pulse
            >
              {hero.cta}
            </Button>
          </motion.div>
          {!reduced && (
            <motion.div
              aria-hidden
              className="mt-8 flex justify-center text-ivory/85 sm:mt-10"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
            >
              <ChevronDown className="h-10 w-10 sm:h-16 sm:w-16" strokeWidth={1.4} />
            </motion.div>
          )}
        </div>
      </div>

      <CallPill theme="dark" />
    </header>
  );
}
