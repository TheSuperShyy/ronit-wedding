import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { intro } from '../../content/copy.he';

export default function Intro() {
  return (
    <Section bg="bg-ivory" decor className="text-start">
      <Reveal>
        <div aria-hidden className="mb-7 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <p className="font-display text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {intro.lead}
        </p>
      </Reveal>
      <Reveal as="ul" stagger className="mt-8 flex flex-wrap items-center gap-3">
        {intro.more.map((m) => (
          <Reveal.Item
            as="li"
            key={m}
            className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-champagne/60 px-5 py-2.5 shadow-[0_4px_14px_rgba(58,50,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:bg-champagne"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold transition-colors group-hover:bg-gold-deep" />
            <span className="font-display text-lg font-medium tracking-tight text-gold-deep sm:text-xl">{m}</span>
          </Reveal.Item>
        ))}
      </Reveal>
      <Reveal>
        <p className="mt-9 max-w-2xl text-pretty text-ink-soft lg:text-lg">{intro.promise}</p>
      </Reveal>
    </Section>
  );
}
