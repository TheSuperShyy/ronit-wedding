import { useReducedMotion } from 'framer-motion';
import GrainOverlay from '../ui/GrainOverlay';
import Reveal from '../motion/Reveal';
import { videoMoment } from '../../content/copy.he';

// Full-width cinematic video break. Autoplays muted/looping unless the
// user prefers reduced motion, in which case the poster frame is shown.
export default function VideoMoment() {
  const reduced = useReducedMotion();
  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-noir">
      {reduced ? (
        <img src={videoMoment.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          src={videoMoment.src}
          poster={videoMoment.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <div aria-hidden className="absolute inset-0 bg-noir/55" />
      <GrainOverlay opacity={0.06} />
      <Reveal className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        <p className="font-display text-3xl font-bold leading-relaxed tracking-tight text-bone sm:text-4xl lg:text-5xl">{videoMoment.caption}</p>
      </Reveal>
    </section>
  );
}
