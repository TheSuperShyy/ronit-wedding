import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pearl: '#f7f1e9',
        'pearl-2': '#efe6da',
        ink: '#241a12',
        espresso: '#3a2a1c',
        'ink-body': '#2d2d2d',
        gold: '#c8a45c',
        'gold-lite': '#e7cf9a',
        'gold-deep': '#a07e3c',
        taupe: '#b89e8b',
        noir: '#141210',
        coal: '#1d1a16',
        bone: '#f2ebdd',
        mute: '#a89a85',
        line: '#3a342b',
      },
      fontFamily: {
        display: ['Heebo', 'system-ui', 'sans-serif'],
        sans: ['Assistant', 'system-ui', 'sans-serif'],
        label: ['Heebo', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '906px',
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(58,42,28,0.06), 0 18px 50px rgba(58,42,28,0.16)',
        cta: '0 10px 30px rgba(200,164,92,0.45)',
      },
      letterSpacing: {
        label: '0.3em',
      },
    },
  },
  plugins: [],
} satisfies Config;
