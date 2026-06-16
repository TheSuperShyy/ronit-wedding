import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';
import CallPill from '../ui/CallPill';
import Reveal from '../motion/Reveal';
import { videoMoment } from '../../content/copy.he';

const TEXT_SHADOW = '0 2px 6px rgba(0,0,0,0.7)';

/** Full-bleed video "moment": parallax video under dark scrims, kicker + caption. §11.12. */
export default function VideoMoment() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    v.muted = true;
    v.play().catch(() => { /* autoplay blocked — poster stays */ });
  }, [reduced]);

  return (
    <section
      ref={ref}
      data-header-theme="dark"
      className="relative isolate flex min-h-[45svh] flex-col overflow-hidden text-ivory"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-20" style={{ y: reduced ? 0 : y, scale: reduced ? 1.05 : scale }}>
        {reduced ? (
          <img src={videoMoment.poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={videoMoment.src}
            poster={videoMoment.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-night/75 via-ink-night/[0.82] to-ink-night/95" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 55%, transparent 85%)' }}
      />

      <BrandLogo />

      <div className="relative -mt-8 flex flex-1 items-center sm:-mt-12">
        <div className="mx-auto w-full max-w-container px-6 py-12 text-center">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold sm:text-sm" style={{ textShadow: TEXT_SHADOW }}>
              {videoMoment.kicker}
            </p>
            <p
              className="text-balance mx-auto max-w-2xl text-2xl font-bold leading-snug sm:text-4xl lg:text-5xl"
              style={{ color: '#faf6ee', textShadow: TEXT_SHADOW }}
            >
              {videoMoment.caption}
            </p>
          </Reveal>
        </div>
      </div>

      <CallPill theme="dark" />
    </section>
  );
}
