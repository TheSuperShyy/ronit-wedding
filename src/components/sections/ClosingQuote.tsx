import Reveal from '../motion/Reveal';
import { closing } from '../../content/copy.he';

export default function ClosingQuote() {
  return (
    <section className="relative bg-noir py-24 text-center sm:py-32">
      <Reveal className="mx-auto max-w-3xl px-8">
        <div aria-hidden className="mx-auto mb-9 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="font-display text-3xl font-black leading-relaxed tracking-tight text-bone sm:text-4xl lg:text-5xl">{closing.quote}</p>
      </Reveal>
    </section>
  );
}
