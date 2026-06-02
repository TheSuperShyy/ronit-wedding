import { useState } from 'react';
import Reveal from '../motion/Reveal';
import Lightbox, { type LightboxItem } from '../ui/Lightbox';
import { VideoCarousel } from '../ui/video-carousel';
import GoldDecor from '../ui/GoldDecor';
import { videos } from '../../content/copy.he';

const lightboxItems: LightboxItem[] = videos.items.map((v) => ({
  type: 'video',
  src: v.src,
  poster: v.poster,
}));

const carouselVideos = videos.items.map((v) => ({ src: v.src, poster: v.poster }));

export default function VideoGallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-ivory py-20 sm:py-24 lg:py-32">
      <GoldDecor />
      <div className="relative mx-auto w-full max-w-container px-6 sm:px-8">
        <Reveal className="text-center">
          <div aria-hidden className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">
            {videos.label}
          </div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {videos.title}
          </h2>
        </Reveal>

        <Reveal className="mt-12">
          <VideoCarousel videos={carouselVideos} onOpen={setOpen} />
        </Reveal>
      </div>

      <Lightbox items={lightboxItems} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </section>
  );
}
