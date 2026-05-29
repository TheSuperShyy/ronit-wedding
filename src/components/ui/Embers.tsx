import { useReducedMotion } from 'framer-motion';

const EMBERS = [
  { left: '18%', dx: '30px', dur: '7s', delay: '.2s' },
  { left: '32%', dx: '-20px', dur: '9s', delay: '1.4s' },
  { left: '50%', dx: '14px', dur: '6.5s', delay: '.8s' },
  { left: '64%', dx: '-26px', dur: '8.5s', delay: '2.1s' },
  { left: '78%', dx: '22px', dur: '7.5s', delay: '.4s' },
  { left: '88%', dx: '-12px', dur: '10s', delay: '1.1s' },
];

export default function Embers() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes ember-rise {
          0% { opacity: 0; transform: translateY(0) translateX(0); }
          12% { opacity: .9; }
          90% { opacity: .7; }
          100% { opacity: 0; transform: translateY(-560px) translateX(var(--dx)); }
        }
      `}</style>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="absolute bottom-[-12px] h-[5px] w-[5px] rounded-full"
          style={{
            left: e.left,
            ['--dx' as string]: e.dx,
            background: 'radial-gradient(circle,#ffdfa0,#d8a64a)',
            boxShadow: '0 0 8px 2px rgba(255,200,120,.6)',
            animation: `ember-rise ${e.dur} linear ${e.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
