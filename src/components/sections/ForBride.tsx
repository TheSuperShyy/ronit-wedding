import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { bride } from '../../content/copy.he';

export default function ForBride() {
  return (
    <Section bg="bg-coal">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <Reveal className="order-2 sm:order-none">
          <figure className="overflow-hidden rounded-xl border border-gold/30">
            <img
              src="/images/pair.webp"
              alt="רונית ברש בערב הפרשת חלה"
              loading="lazy"
              className="h-[420px] w-full object-cover object-[center_25%] lg:h-[560px]"
            />
          </figure>
        </Reveal>
        <Reveal className="text-start">
          <div aria-hidden className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent" />
          <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold">{bride.kicker}</div>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-bone sm:text-5xl">{bride.title}</h2>
          <p className="mt-5 text-pretty text-mute">{bride.body}</p>
          <p className="mt-7 font-semibold text-bone">{bride.fitsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-x-7 gap-y-2">
            {bride.fits.map((f) => (
              <li key={f} className="border-b border-gold/40 pb-1 text-[15px] text-gold">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
