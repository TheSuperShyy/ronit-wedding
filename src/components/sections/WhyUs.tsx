import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { whyUs } from '../../content/copy.he';

export default function WhyUs() {
  return (
    <Section bg="bg-coal">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{whyUs.label}</div>
        <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl">{whyUs.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mt-10 max-w-2xl">
        {whyUs.items.map((it, i) => (
          <Reveal.Item as="li" key={i} className="flex items-baseline gap-4 border-b border-line py-5 last:border-0 text-bone">
            <span aria-hidden className="text-gold">—</span>
            <span className="font-display text-xl font-medium tracking-tight sm:text-2xl">{it}</span>
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
