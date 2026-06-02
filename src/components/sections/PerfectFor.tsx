import { Gem, Crown, Baby, HandHeart, UsersRound } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { perfectFor } from '../../content/copy.he';

// Refined gold line-icons, one per occasion (replaces the emoji prefixes).
const ICONS = [Gem, Crown, Baby, HandHeart, UsersRound];

export default function PerfectFor() {
  return (
    <Section bg="bg-linen" decor className="overflow-hidden">
      <Reveal className="text-center">
        <div aria-hidden className="mx-auto mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{perfectFor.label}</div>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{perfectFor.title}</h2>
      </Reveal>

      <Reveal as="ul" stagger className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {perfectFor.items.map((it, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal.Item
              as="li"
              key={i}
              className={`group flex flex-col items-center gap-4 rounded-2xl border border-line bg-white/70 px-6 py-9 text-center shadow-[0_10px_30px_rgba(58,50,42,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:bg-white hover:shadow-[0_18px_40px_rgba(58,50,42,0.12)] ${
                i === perfectFor.items.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-champagne text-gold-deep shadow-inner transition-colors group-hover:border-gold/40">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="font-display text-lg font-medium text-ink">{it}</span>
            </Reveal.Item>
          );
        })}
      </Reveal>
    </Section>
  );
}
