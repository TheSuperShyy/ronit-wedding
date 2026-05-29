import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { bride } from '../../content/copy.he';

export default function ForBride() {
  return (
    <Section bg="bg-linen">
      <div className="grid items-center gap-10 sm:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 sm:order-none">
          <figure className="overflow-hidden rounded-xl border border-line bg-white p-1.5 shadow-[0_18px_50px_rgba(58,50,42,0.12)]">
            <img
              src="/images/pair.webp"
              alt="רונית ברש בערב הפרשת חלה"
              loading="lazy"
              className="h-[420px] w-full rounded-lg object-cover object-[center_25%] lg:h-[580px]"
            />
          </figure>
        </Reveal>
        <Reveal className="text-start">
          <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
          <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">{bride.kicker}</div>
          <h2 className="mt-3 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{bride.title}</h2>
          <p className="mt-6 text-pretty text-ink-soft lg:text-lg">{bride.body}</p>
          <p className="mt-8 font-semibold text-ink">{bride.fitsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
            {bride.fits.map((f) => (
              <li key={f} className="border-b border-gold/50 pb-1 text-[15px] text-gold-deep">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
