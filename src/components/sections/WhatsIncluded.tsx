import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { included } from '../../content/copy.he';

export default function WhatsIncluded() {
  return (
    <Section bg="bg-noir" className="overflow-hidden">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{included.label}</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl lg:text-6xl">{included.title}</h2>
      </Reveal>
      <div className="mt-10 grid items-start gap-8 sm:grid-cols-[1fr_1fr]">
        <Reveal as="ul" stagger className="relative">
          {included.items.map((it, i) => (
            <Reveal.Item as="li" key={i} className="flex items-baseline gap-4 border-b border-line py-4 last:border-0">
              <span className="min-w-[44px] font-display text-3xl font-black text-transparent [-webkit-text-stroke:1px_#c8a45c] sm:text-4xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[15px] leading-snug text-bone">
                <span aria-hidden className="me-1">{it.icon}</span>
                {it.text}
              </span>
            </Reveal.Item>
          ))}
          <Reveal.Item as="li" className="pt-6">
            <span className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 font-label text-xs tracking-wider text-gold">
              {included.duration}
            </span>
          </Reveal.Item>
        </Reveal>
        <Reveal>
          <figure className="relative overflow-hidden rounded-xl border border-gold/30">
            <img
              src="/images/ceremony.webp"
              alt={included.photoTag}
              loading="lazy"
              className="h-[440px] w-full object-cover object-[center_25%] lg:h-[600px]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/85 to-transparent px-4 pb-3.5 pt-10 font-display text-[15px] text-bone">
              {included.photoTag}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
