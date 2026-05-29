// Soft, feminine gold backdrop: warm gold glows + a delicate gold
// quatrefoil-floral pattern that fades out toward the center, so it only
// frames the edges and never sits busily behind the content.
const FLORET =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cg fill='none' stroke='%23c8a45c' stroke-width='1'%3E%3Ccircle cx='48' cy='32' r='10'/%3E%3Ccircle cx='64' cy='48' r='10'/%3E%3Ccircle cx='48' cy='64' r='10'/%3E%3Ccircle cx='32' cy='48' r='10'/%3E%3C/g%3E%3C/svg%3E\")";

// Fade the pattern away from the middle so text stays clean.
const FADE = 'radial-gradient(ellipse 72% 68% at 50% 45%, transparent 32%, rgba(0,0,0,0.55) 66%, #000 100%)';

export default function GoldDecor({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -top-28 -end-28 h-[30rem] w-[30rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,164,92,0.20), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-28 -start-28 h-[30rem] w-[30rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(200,164,92,0.16), transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: FLORET,
          backgroundSize: '96px 96px',
          WebkitMaskImage: FADE,
          maskImage: FADE,
        }}
      />
    </div>
  );
}
