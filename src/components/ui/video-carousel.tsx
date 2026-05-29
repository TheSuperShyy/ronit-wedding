import React from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface CarouselVideo {
  src: string;
  poster: string;
  alt?: string;
}

interface Props {
  videos: CarouselVideo[];
  className?: string;
  /** Called when the centered video is clicked (e.g. open a popout with sound). */
  onOpen?: (index: number) => void;
}

// 3D coverflow carousel for videos. Only the centered clip plays (muted
// loop); side cards show their poster, blurred. Auto-rotates, pauses on
// hover, and honors reduced motion.
export const VideoCarousel = React.forwardRef<HTMLDivElement, Props>(
  ({ videos, className, onOpen }, ref) => {
    const reduced = useReducedMotion();
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(videos.length / 2));
    const paused = React.useRef(false);

    const next = React.useCallback(
      () => setCurrentIndex((i) => (i + 1) % videos.length),
      [videos.length],
    );
    const prev = () => setCurrentIndex((i) => (i - 1 + videos.length) % videos.length);

    React.useEffect(() => {
      if (reduced) return;
      const timer = setInterval(() => {
        if (!paused.current) next();
      }, 6000);
      return () => clearInterval(timer);
    }, [next, reduced]);

    return (
      <div
        ref={ref}
        className={cn('relative flex w-full items-center justify-center', className)}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div className="relative flex h-[360px] w-full items-center justify-center [perspective:1200px] md:h-[460px]">
          {videos.map((v, index) => {
            const total = videos.length;
            const offset = index - currentIndex;
            let pos = (offset + total) % total;
            if (pos > Math.floor(total / 2)) pos = pos - total;

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return (
              <button
                key={index}
                type="button"
                aria-label={isCenter ? 'הגדלת הסרטון' : 'הצג סרטון'}
                onClick={() => (isCenter ? onOpen?.(index) : setCurrentIndex(index))}
                className="absolute h-[330px] w-[200px] overflow-hidden rounded-3xl border border-line bg-linen shadow-[0_24px_60px_rgba(58,50,42,0.22)] transition-all duration-500 ease-soft md:h-[440px] md:w-[270px]"
                style={{
                  transform: `translateX(${pos * 46}%) scale(${isCenter ? 1 : isAdjacent ? 0.86 : 0.7}) rotateY(${pos * -10}deg)`,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                  filter: isCenter ? 'none' : 'blur(4px)',
                  visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                  cursor: isCenter ? 'pointer' : 'pointer',
                }}
              >
                {isCenter && !reduced ? (
                  <video
                    key={v.src}
                    className="h-full w-full object-cover"
                    src={v.src}
                    poster={v.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={v.poster} alt={v.alt ?? ''} loading="lazy" className="h-full w-full object-cover" />
                )}

                {isCenter && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 left-1/2 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur"
                  >
                    <Expand className="h-5 w-5" strokeWidth={2} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* nav */}
        <button
          type="button"
          aria-label="הקודם"
          onClick={prev}
          className="absolute start-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ivory/80 text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold-deep sm:start-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="הבא"
          onClick={next}
          className="absolute end-0 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ivory/80 text-ink backdrop-blur transition-colors hover:border-gold hover:text-gold-deep sm:end-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>
    );
  },
);

VideoCarousel.displayName = 'VideoCarousel';
