import { Mic, Volume2, Users, Sparkles, Crown, Flame, Music, Heart } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { included } from '../../content/copy.he';

// Refined gold line-icons replace the heavy outline numerals + emoji.
const ICONS = [Mic, Volume2, Users, Sparkles, Crown, Flame, Music, Heart];

export default function WhatsIncluded() {
  return (
    <Section bg="bg-ivory" decor className="overflow-hidden">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{included.label}</div>
        <h2 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{included.title}</h2>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="flex flex-col">
          <Reveal as="ul" stagger className="grid gap-3 sm:grid-cols-2">
            {included.items.map((it, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal.Item
                  as="li"
                  key={i}
                  className="group flex items-center gap-3.5 rounded-2xl border border-line bg-white/70 px-4 py-3.5 shadow-[0_6px_20px_rgba(58,50,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/45 hover:bg-white hover:shadow-[0_12px_28px_rgba(58,50,42,0.10)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-champagne text-gold-deep transition-colors group-hover:border-gold/40">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="text-[14px] leading-snug text-ink lg:text-[15px]">{it.text}</span>
                </Reveal.Item>
              );
            })}
          </Reveal>
          <Reveal className="pt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/60 px-4 py-2 font-label text-xs tracking-wider text-gold-deep">
              {included.duration}
            </span>
          </Reveal>
        </div>

        <Reveal>
          <figure className="relative h-full overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-[0_18px_50px_rgba(58,50,42,0.14)]">
            <img
              src="/images/ceremony.webp"
              alt={included.photoTag}
              loading="lazy"
              className="h-[360px] w-full rounded-xl object-cover object-[center_25%] sm:h-[440px] lg:h-full lg:min-h-[520px]"
            />
            <figcaption className="absolute inset-x-1.5 bottom-1.5 rounded-b-xl bg-gradient-to-t from-ink/75 to-transparent px-4 pb-3.5 pt-10 font-display text-[15px] text-ivory">
              {included.photoTag}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
