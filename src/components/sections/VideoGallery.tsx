import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { videos } from '../../content/copy.he';

export default function VideoGallery() {
  return (
    <Section bg="bg-noir" className="overflow-hidden">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{videos.label}</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl lg:text-6xl">{videos.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.items.map((v, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className={`overflow-hidden rounded-lg border border-line bg-coal ${
              v.portrait ? 'aspect-[9/16]' : 'aspect-video'
            } ${i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
          >
            <video
              className="h-full w-full object-cover"
              src={v.src}
              poster={v.poster}
              controls
              muted
              loop
              playsInline
              preload="metadata"
            />
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
