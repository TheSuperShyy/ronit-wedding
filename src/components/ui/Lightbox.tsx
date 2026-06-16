import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export type LightboxItem = {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
};

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/**
 * Click-to-zoom popout for images and videos. Opens by springing up from a
 * "deck" of cards (rises from below with a card-tilt) and drops back into the
 * deck on close. Esc closes, arrows navigate, click-out closes. RTL-aware.
 */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onIndex(((index as number) + 1) % items.length);
      if (e.key === 'ArrowRight') onIndex(((index as number) - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, items.length, onClose, onIndex]);

  const item = index !== null ? items[index] : null;
  const go = (dir: number) => {
    if (index === null) return;
    onIndex((index + dir + items.length) % items.length);
  };

  // "Pulled up from a deck of cards" — rise from below with a card tilt on open,
  // drop back down into the deck on close. Plain fade under reduced motion.
  const cardVariants = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { y: 170, scale: 0.55, rotate: -7, opacity: 0 },
        animate: {
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 260, damping: 22, mass: 0.9 },
        },
        exit: {
          y: 190,
          scale: 0.5,
          rotate: 6,
          opacity: 0,
          transition: { duration: 0.32, ease: [0.4, 0, 0.85, 0.3] },
        },
      };

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-night/92 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="absolute end-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-ink-night/55 text-ivory ring-1 ring-cream/20 backdrop-blur transition-colors hover:bg-ink-night/80 sm:end-4 sm:top-4"
          >
            <X size={20} />
          </button>

          {items.length > 1 && (
            <>
              {/* right edge (RTL start) → previous, chevron points outward */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                aria-label="הקודם"
                className="absolute start-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink-night/55 text-ivory ring-1 ring-cream/20 backdrop-blur transition-colors hover:bg-ink-night/80 sm:start-4 sm:h-12 sm:w-12"
              >
                <ChevronRight size={24} />
              </button>
              {/* left edge (RTL end) → next, chevron points outward */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                aria-label="הבא"
                className="absolute end-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-ink-night/55 text-ivory ring-1 ring-cream/20 backdrop-blur transition-colors hover:bg-ink-night/80 sm:end-4 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={24} />
              </button>
            </>
          )}

          <motion.div
            className="relative max-h-[88vh] max-w-[92vw]"
            style={{ transformPerspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* faint backing cards = the "deck" */}
            {!reduced && (
              <>
                <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 translate-y-2 rotate-[5deg] rounded-2xl bg-ivory/10 ring-1 ring-ivory/15" />
                <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 translate-y-1 -rotate-[4deg] rounded-2xl bg-ivory/15 ring-1 ring-ivory/20" />
              </>
            )}
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.alt ?? ''}
                className="block max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-card"
              />
            ) : (
              <video
                src={item.src}
                poster={item.poster}
                controls
                autoPlay
                playsInline
                className="block max-h-[88vh] max-w-[92vw] rounded-2xl shadow-card"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
