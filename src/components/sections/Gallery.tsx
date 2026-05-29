import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { gallery } from '../../content/copy.he';

export default function Gallery() {
  return (
    <Section bg="bg-noir" className="overflow-hidden">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{gallery.label}</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl lg:text-6xl">{gallery.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
        {gallery.items.map((p, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className={`group relative overflow-hidden rounded-lg border border-white/10 ${
              i === 0 ? 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2' : ''
            }`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className={`h-full w-full object-cover transition-transform duration-700 ease-soft group-hover:scale-105 ${
                i === 0 ? 'aspect-square sm:aspect-auto sm:h-full' : 'aspect-square'
              }`}
            />
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gold/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-multiply" />
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
