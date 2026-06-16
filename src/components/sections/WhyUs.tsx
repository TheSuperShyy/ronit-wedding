import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Card from '../ui/Card';
import { whyUs } from '../../content/copy.he';

/** "Why us" — numbered reason cards in a responsive grid. */
export default function WhyUs() {
  return (
    <Section bg="bg-cream">
      <div className="text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {whyUs.label}
          </p>
          <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl">
            {whyUs.title}
          </h2>
        </Reveal>
      </div>

      <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.items.map((item, i) => (
          <Reveal.Item key={item.title}>
            <Card className="h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-button text-lg font-bold text-button-text">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-bold text-ink-deep">{item.title}</h3>
              <p className="text-pretty mt-2 leading-relaxed text-ink-body">{item.desc}</p>
            </Card>
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
