import { meta } from '../../content/copy.he';

/**
 * Centered brand logo at the top of each section (the per-section "page" rhythm).
 * Click scrolls to the top. Auto-mounted by <Section>; hand-placed on full-bleed
 * sections. In-flow (not fixed). Re-Design.md §8.
 */
export default function BrandLogo() {
  return (
    <div className="flex w-full items-center justify-center pb-0 pt-1 sm:pt-2">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={meta.backToTop}
        className="cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-90"
      >
        <img
          src="/images/logo.webp"
          alt={meta.brand}
          className="block h-32 w-32 sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          loading="lazy"
          decoding="async"
        />
      </button>
    </div>
  );
}
