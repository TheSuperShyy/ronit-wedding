import { useState } from 'react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Lightbox, { type LightboxItem } from '../ui/Lightbox';
import { gallery } from '../../content/copy.he';

const items: LightboxItem[] = gallery.items.map((g) => ({ type: 'image', src: g.src, alt: g.alt }));
// span pattern echoing the live bento (sm:-prefixed → uniform 2-col on mobile)
const SPANS: Record<number, string> = {
  0: 'sm:col-span-2 sm:row-span-2',
  3: 'sm:row-span-2',
  6: 'sm:col-span-2',
  9: 'sm:col-span-2',
  12: 'sm:row-span-2',
};

/** Photo gallery — dense bento grid with feature tiles + zoom-on-hover + lightbox. */
export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section bg="bg-ivory" className="relative overflow-hidden cv-auto">
      <div className="text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {gallery.label}
          </p>
          <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl">
            {gallery.title}
          </h2>
        </Reveal>
      </div>

      <Reveal
        stagger
        as="ul"
        className="mx-auto mt-10 grid max-w-6xl auto-rows-[minmax(120px,18vw)] grid-flow-row-dense grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        {gallery.items.map((g, i) => (
          <Reveal.Item key={g.src} as="li" className={`group relative overflow-hidden rounded-2xl ${SPANS[i] ?? ''}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label="הגדלת תמונה"
              className="block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-deep/20"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.06]"
              />
              <span aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-ink-night/10" />
              <span aria-hidden className="absolute inset-0 bg-ink-night/0 transition-colors duration-300 group-hover:bg-ink-night/10" />
            </button>
          </Reveal.Item>
        ))}
      </Reveal>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
