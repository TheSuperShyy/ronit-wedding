import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import Button from './Button';
import Lightbox, { type LightboxItem } from './Lightbox';
import { gallery, bride } from '../../content/copy.he';

type Direction = 'left' | 'right';

function getRandomNumberInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Fan layout for all gallery photos (desktop offsets; scaled down on mobile).
const XS = ['-455px', '-325px', '-195px', '-65px', '65px', '195px', '325px', '455px'];
const YS = ['16px', '34px', '10px', '26px', '12px', '30px', '18px', '38px'];
const Z = [80, 70, 60, 50, 45, 35, 25, 15];
const DIRS: Direction[] = ['left', 'left', 'left', 'left', 'right', 'right', 'right', 'right'];

const PHOTOS = gallery.items.map((item, i) => ({
  id: i,
  order: i,
  x: XS[i % XS.length],
  y: YS[i % YS.length],
  zIndex: Z[i % Z.length],
  direction: DIRS[i % DIRS.length],
  item,
}));

const LB_ITEMS: LightboxItem[] = gallery.items.map((g) => ({ type: 'image', src: g.src, alt: g.alt }));

/**
 * Draggable stacked-photo gallery. All event photos fan out on load, can be
 * dragged and tilt on hover, and open in a popup lightbox on tap/click. Uses
 * our photos + Hebrew copy + warm tokens; scales down on small screens; fully
 * static under reduced motion.
 */
export function PhotoGallery({ animationDelay = 0.3 }: { animationDelay?: number }) {
  const reduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setIsVisible(true);
      setIsLoaded(true);
      return;
    }
    const t1 = window.setTimeout(() => setIsVisible(true), animationDelay * 1000);
    const t2 = window.setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [animationDelay, reduced]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const photoVariants = {
    hidden: { x: 0, y: 0, rotate: 0, scale: 1 },
    visible: (custom: { x: string; y: string; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: reduced
        ? { duration: 0 }
        : { type: 'spring', stiffness: 70, damping: 12, mass: 1, delay: custom.order * 0.12 },
    }),
  };

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-0 top-[200px] -z-10 hidden h-[300px] w-full bg-[linear-gradient(to_right,#b89e8b_1px,transparent_1px),linear-gradient(to_bottom,#b89e8b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] md:block"
      />
      <p className="my-2 text-center text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
        {gallery.label}
      </p>
      <h2 className="text-balance mx-auto max-w-2xl py-3 text-center text-4xl font-extrabold text-ink-deep md:text-6xl">
        {gallery.title}
      </h2>

      {/* desktop: draggable fan stack */}
      <div className="relative mb-8 hidden h-[300px] w-full items-center justify-center sm:h-[350px] md:flex">
        <motion.div
          className="relative mx-auto flex w-full max-w-7xl justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="relative flex w-full justify-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <div className="origin-center scale-[0.32] sm:scale-50 md:scale-[0.68] lg:scale-90 xl:scale-100">
              <div className="relative h-[220px] w-[220px]">
                {[...PHOTOS].reverse().map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="absolute left-0 top-0"
                    style={{ zIndex: photo.zIndex }}
                    variants={photoVariants}
                    custom={{ x: photo.x, y: photo.y, order: photo.order }}
                  >
                    <Photo
                      width={220}
                      height={220}
                      src={photo.item.src}
                      alt={photo.item.alt}
                      direction={photo.direction}
                      reduced={!!reduced}
                      onOpen={() => setOpen(photo.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* mobile: 2-row grid (tap to open the popup) */}
      <div className="mb-8 grid grid-cols-4 gap-2 md:hidden">
        {gallery.items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-square overflow-hidden rounded-xl shadow-card ring-1 ring-divider focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-deep/20"
          >
            <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex w-full justify-center">
        <Button
          href="#lead"
          onClick={(e) => {
            e.preventDefault();
            const next = e.currentTarget.closest('section')?.nextElementSibling;
            if (next) next.scrollIntoView({ behavior: 'smooth' });
            else window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }}
        >
          {bride.cta}
        </Button>
      </div>

      <Lightbox items={LB_ITEMS} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}

export function Photo({
  src,
  alt,
  className,
  direction,
  width,
  height,
  reduced,
  onOpen,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
  reduced?: boolean;
  onOpen?: () => void;
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (reduced) return;
    setRotation(getRandomNumberInRange(1, 4) * (direction === 'left' ? -1 : 1));
  }, [direction, reduced]);

  return (
    <motion.div
      drag={!reduced}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={reduced ? undefined : { scale: 1.1, zIndex: 9999 }}
      whileHover={reduced ? undefined : { scale: 1.08, rotateZ: 2 * (direction === 'left' ? -1 : 1), zIndex: 9999 }}
      whileDrag={reduced ? undefined : { scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      onTap={() => onOpen?.()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen?.();
        }
      }}
      role="button"
      aria-label={alt}
      style={{
        width,
        height,
        zIndex: 1,
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        touchAction: 'none',
      }}
      className={cn(className, 'relative mx-auto shrink-0 cursor-pointer active:cursor-grabbing')}
      draggable={false}
      tabIndex={0}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-card ring-1 ring-divider">
        <img
          className="absolute inset-0 h-full w-full rounded-3xl object-cover"
          src={src}
          alt={alt}
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    </motion.div>
  );
}
