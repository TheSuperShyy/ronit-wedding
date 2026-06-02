import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { gallery } from '../../content/copy.he';

export default function Gallery() {
  return (
    <Section bg="bg-ivory" decor className="overflow-hidden">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{gallery.label}</div>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{gallery.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {gallery.items.map((p, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className={`group relative overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_30px_rgba(58,50,42,0.10)] transition-colors duration-300 hover:border-gold/50 ${
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
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
