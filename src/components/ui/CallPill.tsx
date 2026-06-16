import { contact } from '../../content/copy.he';

const STYLES = {
  light: { background: 'rgba(135,87,62,0.08)', borderColor: 'rgba(135,87,62,0.22)', color: 'rgba(107,69,50,1)' },
  dark: { background: 'rgba(250,246,238,0.16)', borderColor: 'rgba(250,246,238,0.35)', color: 'rgba(250,246,238,0.95)' },
} as const;

/**
 * Centered phone capsule at the bottom of each section; colour follows the
 * section background (light/dark). Auto-mounted by <Section>. Re-Design.md §8.
 */
export default function CallPill({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  return (
    <div className="flex w-full items-center justify-center pb-8 pt-2 sm:pb-10 sm:pt-3">
      <a
        href={`tel:${contact.phone.replace(/-/g, '')}`}
        style={STYLES[theme]}
        className="group inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm transition-transform hover:scale-[1.02] sm:gap-2.5 sm:px-5 sm:py-2 sm:text-sm"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 flex-none sm:h-4 sm:w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="opacity-80">{contact.phoneLabel}</span>
        <span aria-hidden className="opacity-40">·</span>
        <bdi className="font-bold">{contact.phone}</bdi>
      </a>
    </div>
  );
}
