import { useReducedMotion } from 'framer-motion';
import GrainOverlay from '../ui/GrainOverlay';
import Embers from '../ui/Embers';
import FoilText from '../ui/FoilText';
import Button from '../ui/Button';
import LogoBadge from '../ui/LogoBadge';
import { hero, meta } from '../../content/copy.he';

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-noir">
      <style>{`
        @keyframes hero-zoom { from { transform: scale(1.12); } to { transform: scale(1); } }
        @keyframes hero-up { from { opacity:0; transform: translateY(22px); } to { opacity:1; transform: translateY(0); } }
      `}</style>

      {/* background photo */}
      <div
        className="absolute inset-0 bg-cover bg-[center_18%]"
        style={{
          backgroundImage: 'url(/images/hero.webp)',
          animation: reduced ? undefined : 'hero-zoom 18s ease-out forwards',
        }}
      />
      {/* legibility veil — mostly dark at the bottom */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(20,18,16,.72) 0%, rgba(20,18,16,.28) 30%, rgba(20,18,16,.55) 62%, rgba(20,18,16,.97) 100%)' }}
      />
      <Embers />
      <GrainOverlay />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4">
        <LogoBadge className="h-11 drop-shadow-[0_2px_10px_rgba(0,0,0,.6)] sm:h-14" />
        <span className="font-label text-[11px] tracking-label text-bone [writing-mode:vertical-rl]">{meta.besd}</span>
      </div>

      {/* hero text — anchored bottom-start (right in RTL) */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-7 pb-12 text-start sm:pb-16 lg:pb-24">
        <div className="mx-auto w-full max-w-container">
          <div
            aria-hidden
            className="mb-5 h-px w-16 bg-gradient-to-l from-gold to-transparent"
            style={{ animation: reduced ? undefined : 'hero-up .8s .6s both' }}
          />
          <div
            className="font-label text-[11px] uppercase tracking-[0.3em] text-gold sm:text-xs"
            style={{ animation: reduced ? undefined : 'hero-up .8s .7s both' }}
          >
            {hero.kicker}
          </div>
          <h1
            className="my-4 font-display text-[clamp(44px,10vw,104px)] font-black leading-[0.95] tracking-tight text-bone"
            style={{ animation: reduced ? undefined : 'hero-up .9s .82s both' }}
          >
            {hero.titleLead}
            <br />
            <FoilText>{hero.titleFoil}</FoilText>
          </h1>
          <p
            className="mb-8 max-w-md text-[15.5px] leading-relaxed text-mute sm:text-lg"
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
