import Reveal from '../motion/Reveal';
import { closing } from '../../content/copy.he';

export default function ClosingQuote() {
  return (
    <section className="relative bg-champagne py-24 text-center sm:py-28 lg:py-36">
      <Reveal className="mx-auto max-w-3xl px-8">
        <div aria-hidden className="mx-auto mb-9 h-px w-16 bg-gradient-to-r from-transparent via-gold-deep to-transparent" />
        <p className="font-display text-3xl font-medium leading-relaxed tracking-tight text-ink sm:text-4xl lg:text-5xl">{closing.quote}</p>
        <div aria-hidden className="mx-auto mt-9 h-px w-16 bg-gradient-to-r from-transparent via-gold-deep to-transparent" />
      </Reveal>
    </section>
  );
}
