import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { intro } from '../../content/copy.he';

export default function Intro() {
  return (
    <Section bg="bg-noir" className="text-start">
      <Reveal>
        <div aria-hidden className="mb-7 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <p className="font-display text-3xl font-black leading-tight tracking-tight text-bone sm:text-4xl lg:text-5xl">
          {intro.lead}
        </p>
      </Reveal>
      <Reveal as="ul" stagger className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2">
        {intro.more.map((m, i) => (
          <Reveal.Item as="li" key={m} className="flex items-center gap-4">
            {i > 0 && <span aria-hidden className="text-gold/50">/</span>}
            <span className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl">{m}</span>
          </Reveal.Item>
        ))}
      </Reveal>
      <Reveal>
        <p className="mt-8 max-w-2xl text-pretty text-mute">{intro.promise}</p>
      </Reveal>
    </Section>
  );
}
