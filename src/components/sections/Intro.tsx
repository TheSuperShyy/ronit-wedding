import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { intro } from '../../content/copy.he';

/** Soft opening statement: lead line, the four "more" words, and the promise. */
export default function Intro() {
  return (
    <Section bg="bg-cream" className="text-center">
      <Reveal>
        <p className="text-balance text-3xl font-bold leading-snug text-ink-deep sm:text-4xl">
          {intro.lead}
        </p>
      </Reveal>

      <Reveal stagger className="mt-7 flex flex-wrap justify-center gap-2.5 sm:gap-3">
        {intro.more.map((word) => (
          <Reveal.Item
            key={word}
            className="rounded-full bg-accent-soft px-5 py-2 text-base font-semibold text-ink-deep sm:text-lg"
          >
            {word}
          </Reveal.Item>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-pretty mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-body">
          {intro.promise}
        </p>
      </Reveal>
    </Section>
  );
}
