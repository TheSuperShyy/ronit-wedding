import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import FoilText from '../ui/FoilText';
import Button from '../ui/Button';
import LogoBadge from '../ui/LogoBadge';
import GoldDecor from '../ui/GoldDecor';
import { SOFT_EASE } from '../motion/variants';
import { hero, meta, gallery } from '../../content/copy.he';

// Five portrait event photos, fanned into a gentle 3D arc (center forward,
// outer cards angled back + scaled down). Outer two hide on small screens.
const ARC = [gallery.items[1], gallery.items[2], gallery.items[5], gallery.items[6], gallery.items[7]];
const SLOTS = [
  { rotateY: 32, scale: 0.82, z: 1, hide: true, m: '-0.7rem' },
  { rotateY: 17, scale: 0.92, z: 2, hide: false, m: '-0.7rem' },
  { rotateY: 0, scale: 1, z: 3, hide: false, m: '0rem' },
  { rotateY: -17, scale: 0.92, z: 2, hide: false, m: '-0.7rem' },
  { rotateY: -32, scale: 0.82, z: 1, hide: true, m: '-0.7rem' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ivory">
      <GoldDecor />

      {/* top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-10">
        <LogoBadge className="h-11 sm:h-14" />
        <span className="font-label text-[11px] tracking-label text-gold-deep [writing-mode:vertical-rl]">{meta.besd}</span>
      </div>

      {/* centered hero content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-4 text-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          {/* kicker */}
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
              <span className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{hero.kicker}</span>
              <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </Reveal>

          {/* headline */}
          <Reveal delay={0.08}>
            <h1 className="mt-5 font-display text-[clamp(34px,7vw,84px)] font-extrabold leading-[1.04] tracking-tight text-ink">
              {hero.titleLead}
              <br />
              <FoilText>{hero.titleFoil}</FoilText>
            </h1>
          </Reveal>

          {/* fanned 3D photo arc */}
          <div
            className="mt-9 flex items-center justify-center sm:mt-12"
            style={{ perspective: 1500 }}
          >
            {ARC.map((p, i) => {
              const s = SLOTS[i];
              return (
                <motion.div
                  key={p.src}
                  className={`relative shrink-0 ${s.hide ? 'hidden sm:block' : ''}`}
                  style={{
                    zIndex: s.z,
                    marginInline: s.m,
                    ...(reduced ? { transform: `rotateY(${s.rotateY}deg) scale(${s.scale})` } : null),
                  }}
                  initial={reduced ? false : { opacity: 0, rotateY: 0, scale: 0.9, y: 30 }}
                  animate={reduced ? undefined : { opacity: 1, rotateY: s.rotateY, scale: s.scale, y: 0 }}
                  transition={reduced ? undefined : { duration: 0.85, delay: 0.3 + i * 0.12, ease: SOFT_EASE }}
                >
                  <div className="overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-card">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="eager"
                      className="aspect-[3/4] w-[clamp(118px,15vw,198px)] rounded-xl object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* subtitle */}
          <Reveal delay={0.12}>
            <p className="mt-9 max-w-xl text-pretty text-[15.5px] leading-relaxed text-ink-soft sm:text-lg">{hero.subtitle}</p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.16}>
            <div className="mt-8">
              <Button href="#lead-form">{hero.cta}</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Local fade-up wrapper (reuses the shared motion variants via Reveal-style props).
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: SOFT_EASE, delay: delay + 0.1 }}
    >
      {children}
    </motion.div>
  );
}
