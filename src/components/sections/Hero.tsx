import { useReducedMotion } from 'framer-motion';
import FoilText from '../ui/FoilText';
import Button from '../ui/Button';
import LogoBadge from '../ui/LogoBadge';
import { hero, meta } from '../../content/copy.he';

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ivory">
      <style>{`
        @keyframes hero-zoom { from { transform: scale(1.12); } to { transform: scale(1); } }
        @keyframes hero-up { from { opacity:0; transform: translateY(22px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      {/* background photo — the original portrait shofar shot on mobile (fills a
          portrait screen), and a wider establishing shot on desktop (the tall
          shofar photo crops badly in a wide hero). */}
      <div
        className="absolute inset-0 bg-cover bg-[center_18%] lg:hidden"
        style={{
          backgroundImage: 'url(/images/hero.webp)',
          animation: reduced ? undefined : 'hero-zoom 18s ease-out forwards',
        }}
      />
      <div
        className="absolute inset-0 hidden bg-cover bg-[center_38%] lg:block"
        style={{
          backgroundImage: 'url(/images/crowd.webp)',
          animation: reduced ? undefined : 'hero-zoom 18s ease-out forwards',
        }}
      />
      {/* soft legibility scrim — darkens only where text sits at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(58,50,42,.30) 0%, rgba(58,50,42,0) 35%, rgba(58,50,42,.55) 100%)' }}
      />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 lg:px-10">
        <LogoBadge className="h-11 drop-shadow-[0_2px_10px_rgba(0,0,0,.4)] sm:h-14" />
        <span className="font-label text-[11px] tracking-label text-ivory drop-shadow-[0_1px_6px_rgba(0,0,0,.5)] [writing-mode:vertical-rl]">{meta.besd}</span>
      </div>

      {/* hero text — anchored bottom-start (right in RTL) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-7 pb-12 text-start sm:pb-16 lg:pb-28 lg:px-10">
        <div className="mx-auto w-full max-w-container">
          <div
            aria-hidden
            className="mb-5 h-px w-16 bg-gradient-to-l from-gold-lite to-transparent"
            style={{ animation: reduced ? undefined : 'hero-up .8s .6s both' }}
          />
          <div
            className="font-label text-[11px] uppercase tracking-[0.3em] text-gold-lite drop-shadow-[0_1px_8px_rgba(0,0,0,.5)] sm:text-xs"
            style={{ animation: reduced ? undefined : 'hero-up .8s .7s both' }}
          >
            {hero.kicker}
          </div>
          <h1
            className="my-4 font-display text-[clamp(40px,9vw,92px)] font-extrabold leading-[1.02] tracking-tight text-ivory"
            style={{ animation: reduced ? undefined : 'hero-up .9s .82s both', textShadow: '0 2px 24px rgba(58,50,42,.45)' }}
          >
            {hero.titleLead}
            <br />
            <FoilText>{hero.titleFoil}</FoilText>
          </h1>
          <p
            className="mb-8 max-w-md text-[15.5px] leading-relaxed text-ivory/90 drop-shadow-[0_1px_10px_rgba(0,0,0,.5)] sm:text-lg lg:max-w-lg"
            style={{ animation: reduced ? undefined : 'hero-up .8s 1s both' }}
          >
            {hero.subtitle}
          </p>
          <div style={{ animation: reduced ? undefined : 'hero-up .8s 1.15s both' }}>
            <Button href="#lead-form">{hero.cta}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
