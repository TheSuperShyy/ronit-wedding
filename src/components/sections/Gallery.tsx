import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import GoldDecor from '../ui/GoldDecor';
import { gallery } from '../../content/copy.he';

/**
 * Image collection. On desktop (with motion) it's a scroll-driven "assembling
 * collage": as the section is scrolled through, the photos slide/scale/rotate
 * from scattered offsets into an overlapping editorial montage, then drift with
 * parallax. Mobile and reduced-motion fall back to a clean grid.
 */

const G = gallery.items;

type Slot = {
  src: string;
  alt: string;
  left: number; // % of the centered stage
  top: number; // % of the stage height
  w: number; // % of the stage width
  z: number;
  rot: number; // resting rotation (deg)
  fromX: number; // entrance offset (px)
  fromY: number;
  fromRot: number;
  par: number; // late parallax drift (px)
};

const SLOTS: Slot[] = [
  { ...G[1], left: 1, top: 34, w: 24, z: 2, rot: -4, fromX: -90, fromY: 90, fromRot: -10, par: 46 },
  { ...G[2], left: 16, top: 23, w: 22, z: 4, rot: 3, fromX: -40, fromY: -120, fromRot: 8, par: -58 },
  { ...G[5], left: 30, top: 37, w: 28, z: 6, rot: -2, fromX: 0, fromY: 140, fromRot: -6, par: 30 },
  { ...G[3], left: 52, top: 21, w: 22, z: 5, rot: 4, fromX: 40, fromY: -130, fromRot: 10, par: -48 },
  { ...G[6], left: 64, top: 35, w: 24, z: 3, rot: -3, fromX: 90, fromY: 100, fromRot: -8, par: 54 },
  { ...G[0], left: 80, top: 25, w: 19, z: 2, rot: 5, fromX: 120, fromY: -80, fromRot: 12, par: -36 },
  { ...G[7], left: 39, top: 56, w: 22, z: 7, rot: 1, fromX: 0, fromY: 160, fromRot: 5, par: 24 },
];

function CollageItem({ p, slot }: { p: MotionValue<number>; slot: Slot }) {
  const x = useTransform(p, [0, 0.5], [slot.fromX, 0]);
  const y = useTransform(p, [0, 0.5, 1], [slot.fromY, 0, slot.par]);
  const scale = useTransform(p, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(p, [0, 0.32], [0, 1]);
  const rotate = useTransform(p, [0, 0.5], [slot.fromRot, slot.rot]);
  return (
    <motion.figure
      className="absolute"
      style={{ left: `${slot.left}%`, top: `${slot.top}%`, width: `${slot.w}%`, zIndex: slot.z, x, y, scale, rotate, opacity }}
    >
      <div className="overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-card">
        <img src={slot.src} alt={slot.alt} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover" />
      </div>
    </motion.figure>
  );
}

function GalleryCollage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  return (
    <section ref={trackRef} id="gallery" className="relative hidden bg-ivory md:block" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <GoldDecor />
        {/* pinned heading */}
        <div className="absolute inset-x-0 top-0 z-40 px-6 pt-14 text-center">
          <div aria-hidden className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{gallery.label}</div>
          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink lg:text-5xl">{gallery.title}</h2>
        </div>
        {/* collage stage */}
        <div className="relative mx-auto h-full w-full max-w-6xl px-6">
          {SLOTS.map((slot, i) => (
            <CollageItem key={i} p={scrollYProgress} slot={slot} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryGrid({ className = '' }: { className?: string }) {
  return (
    <Section bg="bg-ivory" decor className={`overflow-hidden ${className}`}>
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{gallery.label}</div>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{gallery.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {gallery.items.map((p, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className="group relative overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_30px_rgba(58,50,42,0.10)] transition-colors duration-300 hover:border-gold/50"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="aspect-square h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105"
            />
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}

export default function Gallery() {
  const reduced = useReducedMotion();
  // reduced motion → clean grid for everyone
  if (reduced) return <GalleryGrid />;
  // motion → grid on mobile, scroll-assembling collage on md+
  return (
    <>
      <GalleryGrid className="md:hidden" />
      <GalleryCollage />
    </>
  );
}
