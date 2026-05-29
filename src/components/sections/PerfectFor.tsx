import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { perfectFor } from '../../content/copy.he';

export default function PerfectFor() {
  return (
    <Section bg="bg-coal">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{perfectFor.label}</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl">{perfectFor.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {perfectFor.items.map((it, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className={`rounded-xl border border-line bg-white/[0.03] px-6 py-7 text-[16px] font-semibold text-bone transition-colors duration-300 hover:border-gold/50 ${
              i === perfectFor.items.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
            }`}
          >
            {it}
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
