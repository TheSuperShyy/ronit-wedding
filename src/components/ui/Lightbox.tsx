import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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
 * Click-to-zoom popout for images and videos. Esc closes, arrows navigate,
 * click-out closes. RTL: the start-side chevron advances forward.
 */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;

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

  if (!open) return null;
  const item = items[index as number];
  const go = (dir: number) => onIndex(((index as number) + dir + items.length) % items.length);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-night/92 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="סגירה"
        className="absolute end-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-ivory hover:bg-cream/25"
      >
        <X size={22} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(1); }}
            aria-label="הבא"
            className="absolute start-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-ivory hover:bg-cream/25"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
            aria-label="הקודם"
            className="absolute end-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream/15 text-ivory hover:bg-cream/25"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <div className="max-h-[88vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt={item.alt ?? ''}
            className="max-h-[88vh] max-w-[92vw] rounded-xl object-contain shadow-card"
          />
        ) : (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="max-h-[88vh] max-w-[92vw] rounded-xl shadow-card"
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
