import { useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { videoMoment } from '../../content/copy.he';

// The video is low-res, so it is shown CONTAINED + framed (sharp when
// downscaled) rather than stretched full-bleed. Two-column on desktop;
// stacks on mobile.
export default function VideoMoment() {
  const reduced = useReducedMotion();
  return (
    <section className="bg-linen pt-6 pb-16 sm:pt-8 sm:pb-20 lg:pt-10 lg:pb-24">
      <div className="mx-auto grid max-w-container items-center gap-10 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <Reveal className="text-center lg:text-start">
          <div aria-hidden className="mx-auto mb-6 h-px w-16 bg-gradient-to-l from-gold to-transparent lg:mx-0" />
          <div className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-deep sm:text-xs">
            {videoMoment.kicker}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold leading-snug tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {videoMoment.caption}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-gold/30 bg-ivory p-2 shadow-[0_24px_60px_rgba(58,50,42,0.16)]">
            {reduced ? (
              <img
                src={videoMoment.poster}
                alt=""
                className="aspect-video w-full rounded-xl object-cover"
              />
            ) : (
              <video
                className="aspect-video w-full rounded-xl object-cover"
                src={videoMoment.src}
                poster={videoMoment.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
