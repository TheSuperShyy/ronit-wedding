import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type LightboxItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string; alt?: string };

type Props = {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
};

// Click-to-zoom popout for images and videos.
// Esc closes; ←/→ navigate (RTL: → previous, ← next).
export default function Lightbox({ items, index, onClose, onIndexChange }: Props) {
  const reduced = useReducedMotion();
  const open = index !== null;

  const go = (dir: 1 | -1) =>
    onIndexChange((index! + dir + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(-1);
      else if (e.key === 'ArrowLeft') go(1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, items.length]);

  const item = open ? items[index!] : null;
  const arrowBtn =
    'absolute top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full ' +
    'border border-white/25 bg-black/40 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold';

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          initial={reduced ? false : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            aria-label="סגירה"
            className="absolute end-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition-colors hover:border-gold hover:text-gold"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>

          {items.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="הקודם" className={`${arrowBtn} end-4`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="הבא" className={`${arrowBtn} start-4`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
            </>
          )}

          <motion.div
            key={index}
            className="relative flex max-h-[90vh] max-w-[94vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            initial={reduced ? false : { scale: 0.92, opacity: 0 }}
            animate={reduced ? undefined : { scale: 1, opacity: 1 }}
            exit={reduced ? undefined : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.type === 'image' ? (
              <img src={item.src} alt={item.alt} className="max-h-[90vh] max-w-[94vw] rounded-lg object-contain shadow-2xl" />
            ) : (
              <video src={item.src} poster={item.poster} controls autoPlay playsInline className="max-h-[90vh] max-w-[94vw] rounded-lg shadow-2xl" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
