import Reveal from '../motion/Reveal';
import GrainOverlay from '../ui/GrainOverlay';
import { cinematic } from '../../content/copy.he';

export default function CinematicQuote() {
  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-noir">
      <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-60" style={{ backgroundImage: 'url(/images/crowd.webp)' }} />
      <div aria-hidden className="absolute inset-0 bg-noir/65" />
      <GrainOverlay opacity={0.06} />
      <Reveal className="relative z-10 mx-auto max-w-3xl px-8 text-center">
        <p className="font-display text-3xl font-bold leading-relaxed tracking-tight text-bone sm:text-4xl lg:text-5xl">{cinematic.quote}</p>
      </Reveal>
    </section>
  );
}
