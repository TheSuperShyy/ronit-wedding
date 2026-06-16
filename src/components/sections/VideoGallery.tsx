import { useState } from 'react';
import { Play } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Lightbox, { type LightboxItem } from '../ui/Lightbox';
import { videos } from '../../content/copy.he';

const items: LightboxItem[] = videos.items.map((v) => ({ type: 'video', src: v.src, poster: v.poster }));

/** Video showcase — poster cards that open a full-screen player (with sound). */
export default function VideoGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section bg="bg-cream-alt" className="cv-auto">
      <div className="text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {videos.label}
          </p>
          <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl lg:text-5xl">
            {videos.title}
          </h2>
        </Reveal>
      </div>

      <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {videos.items.map((v, i) => (
          <Reveal.Item key={v.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label="נגני סרטון"
              className={`group relative block w-full overflow-hidden rounded-2xl shadow-card ring-1 ring-divider transition-shadow hover:shadow-cta focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-deep/20 lg:rounded-3xl ${
                v.portrait ? 'aspect-[9/16]' : 'aspect-video'
              }`}
            >
              <img
                src={v.poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-0 bg-ink-night/15 transition-colors group-hover:bg-ink-night/5" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/95 text-button shadow-cta backdrop-blur transition-transform duration-200 ease-soft group-hover:scale-110 sm:h-16 sm:w-16">
                  <Play size={24} fill="currentColor" className="ms-0.5" />
                </span>
              </span>
            </button>
          </Reveal.Item>
        ))}
      </Reveal>

      <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
