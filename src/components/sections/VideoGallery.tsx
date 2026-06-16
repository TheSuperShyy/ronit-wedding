import { useState } from 'react';
import { Play } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Lightbox, { type LightboxItem } from '../ui/Lightbox';
import { ExpandableGallery } from '../ui/gallery-animation';
import { videos } from '../../content/copy.he';

const lbItems: LightboxItem[] = videos.items.map((v) => ({ type: 'video', src: v.src, poster: v.poster }));
const stripItems = videos.items.map((v) => ({ poster: v.poster }));

/**
 * Video showcase. Desktop: hover-expand poster strip. Mobile: tap-friendly
 * poster grid. Both open the video in the deck-animated Lightbox (with sound).
 */
export default function VideoGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section bg="bg-cream" className="cv-auto">
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

      {/* desktop: hover-expand strip */}
      <Reveal className="mt-10 hidden md:block">
        <ExpandableGallery items={stripItems} ariaLabel={videos.playAria} onOpen={setOpen} />
      </Reveal>

      {/* mobile: tap-friendly poster grid */}
      <Reveal stagger className="mt-10 grid grid-cols-2 gap-4 md:hidden">
        {videos.items.map((v, i) => (
          <Reveal.Item key={v.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={videos.playAria}
              className={`group relative block w-full overflow-hidden rounded-2xl shadow-card ring-1 ring-divider focus:outline-none focus-visible:ring-4 focus-visible:ring-ink-deep/20 ${
                v.portrait ? 'aspect-[9/16]' : 'aspect-video'
              }`}
            >
              <img src={v.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
              <span aria-hidden className="absolute inset-0 bg-ink-night/20" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/90 text-button shadow-cta backdrop-blur">
                  <Play size={22} fill="currentColor" className="ms-0.5" />
                </span>
              </span>
            </button>
          </Reveal.Item>
        ))}
      </Reveal>

      <Lightbox items={lbItems} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </Section>
  );
}
