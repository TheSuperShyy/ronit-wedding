import Reveal from '../motion/Reveal';
import { cinematic } from '../../content/copy.he';

// Solid typographic pull-quote — high contrast, gives the page rhythm
// between the photo/video sections (no busy image behind the text).
export default function CinematicQuote() {
  return (
    <section className="relative bg-linen pt-24 pb-12 sm:pt-28 sm:pb-14 lg:pt-32 lg:pb-16">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <div aria-hidden className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
        <p className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {cinematic.quote}
        </p>
        <div aria-hidden className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </Reveal>
    </section>
  );
}
