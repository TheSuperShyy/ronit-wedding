import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        hero: '#b89e8b', // hero + closing-quote background (warm tan)
        cream: '#fffcf9', // primary section background
        'cream-alt': '#fffbf9', // alternating section background
        accent: '#c3957d', // CTA & form section background
        'accent-soft': '#e6d2c4', // soft accent fills / chips
        button: '#87573e', // primary button fill (deep brown)
        'button-text': '#eeecea', // button label
        'ink-deep': '#6b4532', // headings on light backgrounds
        'ink-body': '#2d2d2d', // body copy
        'ink-night': '#1a1612', // darkest sections / overlays
        ivory: '#faf6ee', // headings/text on photo & dark overlays
        divider: '#efe5dc', // 2px section separators
        gold: '#c5a572', // small accents, decorative highlights
        'gold-deep': '#a87f38', // gold text on light (better contrast)
        'gold-lite': '#e7cf9a', // gold gradient / foil highlight
      },
      fontFamily: {
        sans: ['Assistant', 'system-ui', 'sans-serif'],
        display: ['Assistant', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '906px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(107, 69, 50, 0.06), 0 8px 24px rgba(107, 69, 50, 0.08)',
        cta: '0 6px 18px rgba(135, 87, 62, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
