import { Sparkles, Users, Award, Music2, HeartHandshake } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { BentoGrid, type BentoItem } from '../ui/bento-grid';
import { whyUs } from '../../content/copy.he';

const ICONS = [Sparkles, Users, Award, Music2, HeartHandshake];

export default function WhyUs() {
  const items: BentoItem[] = whyUs.items.map((it, i) => {
    const Icon = ICONS[i % ICONS.length];
    return {
      title: it.title,
      description: it.desc,
      icon: <Icon className="h-5 w-5" strokeWidth={1.6} />,
      colSpan: i === 0 ? 2 : 1,
    };
  });

  return (
    <Section bg="bg-linen">
      <Reveal className="text-start">
        <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
        <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">
          {whyUs.label}
        </div>
        <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {whyUs.title}
        </h2>
      </Reveal>
      <Reveal className="mt-10">
        <BentoGrid items={items} />
      </Reveal>
    </Section>
  );
}
