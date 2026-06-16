import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Button from '../ui/Button';
import { bride } from '../../content/copy.he';

/** "For the bride" — text column beside an arched photo, with the fits chips. */
export default function ForBride() {
  return (
    <Section bg="bg-cream-alt">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className="order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent sm:text-sm">
            {bride.kicker}
          </p>
          <h2 className="text-balance mt-3 text-3xl font-extrabold text-ink-deep sm:text-4xl">
            {bride.title}
          </h2>
          <p className="text-pretty mt-5 text-lg leading-relaxed text-ink-body">{bride.body}</p>

          <p className="mt-7 text-base font-semibold text-ink-deep">{bride.fitsLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {bride.fits.map((f) => (
              <span
                key={f}
                className="rounded-full border border-ink-deep/15 bg-cream px-4 py-1.5 text-sm font-semibold text-ink-deep"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Button href="#lead">{bride.cta}</Button>
          </div>
        </Reveal>

        <Reveal className="order-2" delay={0.1}>
          <div className="overflow-hidden rounded-3xl shadow-card ring-1 ring-divider">
            <img
              src="/images/pair.webp"
              alt="רגע מרגש בערב הפרשת חלה לכלה"
              className="aspect-[4/5] h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
