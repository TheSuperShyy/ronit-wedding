import { Check } from 'lucide-react';
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { included } from '../../content/copy.he';

/** "What the evening includes" — checklist grid beside the ceremony photo. */
export default function WhatsIncluded() {
  return (
    <Section bg="bg-cream">
      <div className="text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {included.label}
          </p>
          <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl">
            {included.title}
          </h2>
        </Reveal>
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal stagger as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {included.items.map((item) => (
            <Reveal.Item
              key={item.text}
              as="li"
              className="flex items-start gap-3 rounded-2xl bg-cream/95 p-4 shadow-card ring-1 ring-divider/80"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-button/10 text-button">
                <Check size={16} strokeWidth={2.5} />
              </span>
              <span className="text-pretty text-base leading-snug text-ink-body">{item.text}</span>
            </Reveal.Item>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-8">
          <figure className="overflow-hidden rounded-3xl shadow-card ring-1 ring-divider">
            <img
              src="/images/ceremony.webp"
              alt="לישת הבצק בטקס הפרשת חלה"
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="bg-ink-night/80 px-5 py-3 text-center text-sm font-medium text-ivory">
              {included.photoTag}
            </figcaption>
          </figure>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2 text-base font-semibold text-ink-deep">
            {included.duration}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
