import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

export type ExpandableItem = { poster: string; alt?: string };

type Props = {
  items: ExpandableItem[];
  /** Opens the item (e.g. the video player) at this index. */
  onOpen?: (index: number) => void;
  /** Accessible label for each panel (single string). */
  ariaLabel?: string;
  className?: string;
};

/**
 * Horizontal expand-on-hover gallery: panels share the row; the hovered one
 * grows while the others shrink. Each panel shows a poster + play button and
 * opens its item via onOpen. Static (equal panels) under reduced motion.
 */
export function ExpandableGallery({ items, onOpen, ariaLabel, className = '' }: Props) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  const flexFor = (i: number) => (hovered === null ? 1 : hovered === i ? 2.5 : 0.55);

  return (
    <div className={`flex h-[24rem] w-full gap-2 lg:h-[28rem] ${className}`}>
      {items.map((it, i) => (
        <motion.button
          type="button"
          key={i}
          aria-label={ariaLabel}
          className="group relative cursor-pointer overflow-hidden rounded-2xl ring-1 ring-divider focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-deep/30"
          style={{ flex: 1 }}
          animate={reduced ? undefined : { flex: flexFor(i) }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onOpen?.(i)}
        >
          <img src={it.poster} alt={it.alt ?? ''} className="h-full w-full object-cover" loading="lazy" decoding="async" />
          <motion.span
            aria-hidden
            className="absolute inset-0 bg-ink-night"
            initial={false}
            animate={{ opacity: hovered === i ? 0.05 : 0.35 }}
            transition={{ duration: 0.3 }}
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-button shadow-cta backdrop-blur transition-transform duration-200 ease-soft group-hover:scale-110">
              <Play size={24} fill="currentColor" className="ms-0.5" />
            </span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
