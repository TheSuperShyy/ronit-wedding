import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { perfectFor } from '../../content/copy.he';

/** "Especially suited for" — a clean list of occasions with gold markers. */
export default function PerfectFor() {
  return (
    <Section bg="bg-cream-alt" className="text-center">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
          {perfectFor.label}
        </p>
        <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl">
          {perfectFor.title}
        </h2>
      </Reveal>

      <Reveal stagger as="ul" className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-2">
        {perfectFor.items.map((item) => (
          <Reveal.Item
            key={item}
            as="li"
            className="flex items-center justify-center gap-3 rounded-2xl bg-cream/95 px-5 py-4 text-lg font-semibold text-ink-deep shadow-card ring-1 ring-divider/80"
          >
            <span aria-hidden className="h-2 w-2 flex-none rotate-45 bg-gold" />
            {item}
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
