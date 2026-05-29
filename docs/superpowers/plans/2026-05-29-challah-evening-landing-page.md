# Challah Evening Landing Page ("Luminous Ceremony") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, Hebrew-only (RTL) landing page promoting Ronit Barash's Challah Separation evenings, with a distinctive "Luminous Ceremony" aesthetic and a lead-capture form.

**Architecture:** Vite + React 18 + TypeScript SPA, no router. Tailwind holds all design tokens. Framer Motion drives a staggered hero load + on-scroll reveals. Copy lives in one typed content module (no Hebrew strings in JSX). The lead form posts to a Vercel Edge proxy that forwards to Ronit's backend (Challah board). Mirrors the sister Uman page at `../inbalel-website` for structure; diverges in palette/typography/motion for its own identity.

**Tech Stack:** Vite 5, React 18, TypeScript 5, Tailwind 3, Framer Motion 11, Vitest (one logic unit test), sharp (image optimization). Fonts: Frank Ruhl Libre (display), Assistant (body), Heebo (labels).

**Source spec:** `docs/superpowers/specs/2026-05-29-challah-evening-landing-page-design.md`

**Note on version control:** The user chose **local only — no git**. So there are no `git commit` steps. Each task ends with a **Checkpoint** (typecheck/build/visual) instead. Version control can be added later.

---

## File Structure

```
ronit-wedding/
  package.json                         # deps + scripts
  vite.config.ts                       # vite + react plugin
  postcss.config.js                    # tailwind + autoprefixer
  tailwind.config.ts                   # ALL design tokens (palette, fonts, easings, shadows)
  tsconfig.json                        # TS strict config
  vitest.config.ts                     # test runner
  index.html                           # RTL shell, fonts, SEO meta
  api/
    lead.ts                            # Vercel Edge proxy → Ronit backend
  scripts/
    optimize-media.mjs                 # jpeg → public/images/*.webp via sharp
  public/
    images/                            # generated webp photos (build artifact of the script)
  src/
    main.tsx                           # React entry + scroll reset
    index.css                          # tailwind layers + base + utilities
    App.tsx                            # section composition in reading order
    content/
      copy.he.ts                       # typed Hebrew copy (single source of truth)
    lib/
      lead-payload.ts                  # pure buildChallahLeadPayload() (unit-tested)
      lead-payload.test.ts             # Vitest unit test
    components/
      motion/
        variants.ts                    # fadeUp variants + SOFT_EASE
        Reveal.tsx                     # scroll-reveal wrapper (+ Reveal.Item)
      layout/
        Container.tsx                  # max-width 906px centered
        Section.tsx                    # padded section w/ bg + optional grain/glow
      ui/
        GrainOverlay.tsx               # film-grain layer
        GlowField.tsx                  # radial candle-glow wash
        Embers.tsx                     # floating ember particles (hero)
        Ornament.tsx                   # gold ✦ divider rule
        ArchPhoto.tsx                  # arched (portal) framed image
        FoilText.tsx                   # gold-foil shimmer headline span
        Button.tsx                     # gold shimmer CTA (anchor)
        LogoBadge.tsx                  # logo image
      sections/
        Hero.tsx
        Intro.tsx
        ForBride.tsx
        WhatsIncluded.tsx
        CinematicQuote.tsx
        PerfectFor.tsx
        WhyUs.tsx
        ClosingQuote.tsx
        LeadForm.tsx
        Footer.tsx
content/
  copy.he.md                           # human-readable canonical copy (reference)
```

content (Hebrew) is taken verbatim from the spec and the client `.docx`. Photos source: `דף נחיתה - הפרשות חלה/` (8 jpeg, 5 mp4).

---

## Task 1: Scaffold the Vite + React + TS project

**Files:**
- Create: `package.json`, `vite.config.ts`, `postcss.config.js`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "ronit-challah",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "optimize:media": "node scripts/optimize-media.mjs"
  },
  "dependencies": {
    "framer-motion": "^11.11.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "sharp": "^0.34.5",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.6.3",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5174, host: true },
});
```

- [ ] **Step 3: Create `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- [ ] **Step 5: Create `index.html`** (RTL shell + fonts + SEO; favicon omitted for now)

```html
<!doctype html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#241a12" />
    <meta name="google" content="notranslate" />
    <title>ערב הפרשת חלה שלא תשכחי בחיים | אור הצדיק – רונית ברש</title>
    <meta
      name="description"
      content="בס״ד · ערב הפרשת חלה יוקרתי ומרגש לכלות, בת-מצוות, לידות וישועות — הפקה נשית עם רונית ברש: שופר, מתופפות, טקס מרגש ושמחה בלתי נשכחת."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700;900&family=Heebo:wght@300;400;600&family=Assistant:wght@400;600;700;800&display=swap"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

- [ ] **Step 7: Create placeholder `src/App.tsx`** (replaced in Task 17)

```tsx
export default function App() {
  return <main className="min-h-screen grid place-items-center">בס״ד</main>;
}
```

- [ ] **Step 8: Install dependencies**

Run: `npm install`
Expected: completes, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 9: Checkpoint — dev server boots**

Run: `npm run dev`
Expected: Vite prints `Local: http://localhost:5174/`. Open it; the page shows "בס״ד" centered. Stop the server (Ctrl+C). (CSS is unstyled until Task 2 — that's fine.)

---

## Task 2: Tailwind tokens + global CSS ("Luminous Ceremony" palette)

**Files:**
- Create: `tailwind.config.ts`, `src/index.css`

- [ ] **Step 1: Create `tailwind.config.ts`**

```ts
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
      },
      fontFamily: {
        display: ['"Frank Ruhl Libre"', 'serif'],
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
```

- [ ] **Step 2: Create `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
    position: relative;
  }
  body {
    @apply bg-pearl text-ink-body font-sans antialiased;
    font-size: 18px;
    line-height: 1.7;
    overflow-x: clip;
  }
  /* No global heading color — each section sets its own (espresso on
     pearl, ivory/white on photo overlays). */
  h1, h2, h3, h4 {
    line-height: 1.18;
  }
  ::selection {
    background: rgba(200, 164, 92, 0.25);
    color: #3a2a1c;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }
  .text-pretty { text-wrap: pretty; }
  .cv-auto {
    content-visibility: auto;
    contain-intrinsic-size: 800px;
  }
}
```

- [ ] **Step 3: Checkpoint — Tailwind compiles**

Run: `npm run dev`
Expected: page background is now warm pearl (`#f7f1e9`), "בס״ד" renders in the Assistant font. No console errors. Stop the server.

---

## Task 3: Hebrew copy content module

**Files:**
- Create: `src/content/copy.he.ts`, `content/copy.he.md`

- [ ] **Step 1: Create `content/copy.he.md`** (human-readable canonical reference)

```markdown
# ערב הפרשת חלה — אור הצדיק רונית ברש (קופי קנוני)

בס"ד

## כותרת ראשית
הפקת ערב הפרשת חלה שלא תשכחי בחיים ✨
אור הצדיק – רונית ברש
הפקות יוקרתיות לכלות, בת-מצוות, לידות וישועות 💍

## פתיח
יש רגעים בחיים שמגיע להם יותר…
יותר שמחה. יותר קדושה. יותר רגש. יותר חוויה.
אנחנו ב״אור הצדיק – רונית ברש״ מפיקות ערבי הפרשת חלה מרגשים ויוקרתיים עם אווירה מיוחדת, מוזיקה, תפילות ושמחה נשית שמרחיבה את הלב ✨

## לכלה
ערב הפרשת חלה לכלה 💍
לפני שאת נכנסת לחופה יש רגע אחד לעצור, להתרגש, להתפלל ולהיות עטופה באהבה.
הגישה היא כל הסיפור — רונית ברש קלילה, נעימה, מצחיקה ומחברת, כך שהערב מתאים לכולן: דתיות, מסורתיות, חילוניות — וכל אחת מרגישה חלק.

## מה כולל הערב
🎤 הנחיה מלאה של רונית ברש המגיעה עם שופר
📢 מערכת הגברה מקצועית
🥁 צוות של 2 מתופפות מקצועיות
📯 שופרות ואווירה עוצמתית
👰 שטיח כניסה חגיגי לכלה
🕯️ טקס הפרשת חלה מרגש ומיוחד
🎶 מוזיקה, שמחה וריקודים
💖 חוויה נשית בלתי נשכחת
⏰ משך הטקס: בין שעה וחצי לשעתיים

## רגע קולנועי
יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים ❤️

## מתאים במיוחד עבור
💍 כלות לפני חתונה
👑 ערבי בת מצווה
🤍 ערב לקראת לידה
🙏 תפילות לישועה ורפואה
👭 אירועים נשיים פרטיים

## למה דווקא אנחנו
✨ אווירה יוקרתית ומרגשת
✨ גישה קלילה שמתאימה לכולן
✨ 20 שנות ניסיון בהפקות אירועים
✨ מוזיקה, שמחה, ריקודים וחיבור אמיתי
✨ ליווי אישי וחם

## ציטוט סיום
יש ערבים שלא שוכחים… ויש רגעים שנשארים בלב לכל החיים ❤️

## טופס
תשרייני לי תאריך — שם מלא, טלפון, סוג האירוע, תאריך האירוע, עיר, איך שמעת עלינו?
```

- [ ] **Step 2: Create `src/content/copy.he.ts`** (typed; components import from here)

```ts
/**
 * Single source-of-truth for all Hebrew copy. No Hebrew strings in JSX.
 * Structured top-to-bottom in page reading order.
 */

export const meta = {
  besd: 'בס״ד',
  brand: 'אור הצדיק · רונית ברש',
} as const;

export const hero = {
  kicker: 'אור הצדיק · רונית ברש',
  titleLead: 'ערב הפרשת חלה',
  titleFoil: 'שלא תשכחי בחיים',
  subtitle: 'רגע אחד לעצור, להתרגש ולהתפלל — ערב נשי יוקרתי, עטוף באור, במוזיקה ובשמחה ✨',
  cta: '💍 תשרייני לי תאריך',
} as const;

export const intro = {
  lead: 'יש רגעים בחיים שמגיע להם יותר…',
  more: ['יותר שמחה', 'יותר קדושה', 'יותר רגש', 'יותר חוויה'],
  promise:
    'אנחנו ב״אור הצדיק – רונית ברש״ מפיקות ערבי הפרשת חלה מרגשים ויוקרתיים עם אווירה מיוחדת, מוזיקה, תפילות ושמחה נשית שמרחיבה את הלב ✨',
} as const;

export const bride = {
  kicker: 'ערב הפרשת חלה לכלה 💍',
  title: 'לפני שאת נכנסת לחופה',
  body: 'יש רגע אחד לעצור, להתרגש, להתפלל ולהיות עטופה באהבה. ערב נשי, שמח ומרגש במיוחד — עם אנרגיה טובה, חיבור אמיתי והמון לב ❤️',
  fitsLabel: 'הגישה היא כל הסיפור — מתאים לכולן',
  fits: ['דתיות', 'מסורתיות', 'חילוניות'],
} as const;

export const included = {
  label: 'חוויה מלאה מתחילתה ועד סופה',
  title: 'מה כולל הערב',
  items: [
    { icon: '🎤', text: 'הנחיה מלאה של רונית ברש המגיעה עם שופר' },
    { icon: '📢', text: 'מערכת הגברה מקצועית' },
    { icon: '🥁', text: 'צוות של 2 מתופפות מקצועיות' },
    { icon: '📯', text: 'שופרות ואווירה עוצמתית' },
    { icon: '👰', text: 'שטיח כניסה חגיגי לכלה' },
    { icon: '🕯️', text: 'טקס הפרשת חלה מרגש ומיוחד' },
    { icon: '🎶', text: 'מוזיקה, שמחה וריקודים' },
    { icon: '💖', text: 'חוויה נשית בלתי נשכחת' },
  ],
  duration: '⏰ משך הטקס · שעה וחצי עד שעתיים',
  photoTag: 'טקס הפרשת חלה — רגע של קדושה',
} as const;

export const cinematic = {
  quote: 'יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים ❤️',
} as const;

export const perfectFor = {
  label: 'כל רגע שמגיע לו אור',
  title: 'מתאים במיוחד עבור',
  items: [
    '💍 כלות לפני חתונה',
    '👑 ערבי בת מצווה',
    '🤍 ערב לקראת לידה',
    '🙏 תפילות לישועה ורפואה',
    '👭 אירועים נשיים פרטיים',
  ],
} as const;

export const whyUs = {
  label: 'למה כולם מדברים על הערבים של רונית',
  title: 'למה דווקא אנחנו',
  items: [
    'אווירה יוקרתית ומרגשת',
    'גישה קלילה שמתאימה לכולן',
    '20 שנות ניסיון בהפקות אירועים',
    'מוזיקה, שמחה, ריקודים וחיבור אמיתי',
    'ליווי אישי וחם',
  ],
} as const;

export const closing = {
  quote: 'יש ערבים שלא שוכחים… ויש רגעים שנשארים בלב לכל החיים ❤️',
} as const;

export const leadForm = {
  title: 'תשרייני לי תאריך 💍',
  subtitle: 'נחזור אליך בהקדם לתיאום הערב',
  fields: {
    fullName: 'שם מלא',
    phone: 'טלפון',
    eventType: 'סוג האירוע',
    eventDate: 'תאריך האירוע',
    city: 'עיר',
    hearAbout: 'איך שמעת עלינו?',
  },
  cta: '💍 תשרייני לי תאריך',
  submitting: 'שולח…',
  success: 'נשלח! נחזור אליך בהקדם 💍',
  error: 'משהו השתבש — נסי שוב או חייגי אלינו',
} as const;

export const footer = {
  brand: 'אור הצדיק – רונית ברש',
  tagline: 'הפקות יוקרתיות לכלות, בת-מצוות, לידות וישועות',
} as const;

/** Contact details. TBD — replace placeholder when the client provides it. */
export const contact = {
  phone: '+972000000000', // TODO(client): real phone/WhatsApp number
  phoneLabel: 'לתיאום ערב',
} as const;
```

- [ ] **Step 3: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors (the module is `as const`, fully typed).

---

## Task 4: Media optimization script + run it

**Files:**
- Create: `scripts/optimize-media.mjs`
- Generates: `public/images/*.webp`

- [ ] **Step 1: Create `scripts/optimize-media.mjs`**

```js
// Optimize the client Challah photos into web-ready webp at a fixed set
// of semantic names. Re-running is idempotent (overwrites same outputs).
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'דף נחיתה - הפרשות חלה';
const OUT = join('public', 'images');
mkdirSync(OUT, { recursive: true });

// [source filename, output basename]
const MAP = [
  ['WhatsApp Image 2026-05-28 at 13.44.48.jpeg', 'hero'],       // shofar blow
  ['WhatsApp Image 2026-05-28 at 13.44.46.jpeg', 'ceremony'],   // kneading dough
  ['WhatsApp Image 2026-05-28 at 13.44.45 (1).jpeg', 'dance'],  // drummers / dancing
  ['WhatsApp Image 2026-05-28 at 13.44.44.jpeg', 'crowd'],      // women clapping
  ['WhatsApp Image 2026-05-28 at 13.44.45 (2).jpeg', 'table'],  // pearl-drape table
  ['WhatsApp Image 2026-05-28 at 13.42.14.jpeg', 'wide'],       // wide establishing
  ['WhatsApp Image 2026-05-28 at 13.44.45 (3).jpeg', 'joy'],    // clapping/energy
  ['WhatsApp Image 2026-05-28 at 13.44.45.jpeg', 'pair'],       // ronit + woman
];

for (const [src, name] of MAP) {
  const out = join(OUT, `${name}.webp`);
  await sharp(join(SRC, src))
    .rotate()
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out);
  console.log('wrote', out);
}
console.log('done');
```

- [ ] **Step 2: Run the script**

Run: `npm run optimize:media`
Expected: prints `wrote public/images/hero.webp` … through `pair.webp`, then `done`.

- [ ] **Step 3: Checkpoint — files exist**

Run: `node -e "console.log(require('fs').readdirSync('public/images'))"`
Expected: array containing `hero.webp, ceremony.webp, dance.webp, crowd.webp, table.webp, wide.webp, joy.webp, pair.webp`.

---

## Task 5: Motion primitives

**Files:**
- Create: `src/components/motion/variants.ts`, `src/components/motion/Reveal.tsx`

- [ ] **Step 1: Create `src/components/motion/variants.ts`**

```ts
import type { Variants } from 'framer-motion';

export const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: SOFT_EASE } },
};

export const fadeUpContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: SOFT_EASE } },
};
```

- [ ] **Step 2: Create `src/components/motion/Reveal.tsx`**

```tsx
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, fadeUpContainer, fadeUpItem, SOFT_EASE } from './variants';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'header' | 'article' | 'ul' | 'li';
  stagger?: boolean;
};

function Reveal({ children, className, delay = 0, as = 'div', stagger = false }: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger ? fadeUpContainer : fadeUp}
      transition={!stagger ? { duration: 0.7, ease: SOFT_EASE, delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

function Item({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  if (reduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <MotionTag className={className} variants={fadeUpItem}>
      {children}
    </MotionTag>
  );
}

Reveal.Item = Item;
export default Reveal;
```

- [ ] **Step 3: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 6: Layout primitives (Container, Section)

**Files:**
- Create: `src/components/layout/Container.tsx`, `src/components/layout/Section.tsx`

- [ ] **Step 1: Create `src/components/layout/Container.tsx`**

```tsx
import type { ReactNode } from 'react';

export default function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-container px-6 sm:px-8 ${className}`}>{children}</div>;
}
```

- [ ] **Step 2: Create `src/components/layout/Section.tsx`**

```tsx
import type { ReactNode } from 'react';
import Container from './Container';

type Props = {
  children: ReactNode;
  id?: string;
  bg?: string;
  className?: string;
  /** Render children edge-to-edge (no Container/padding). */
  full?: boolean;
};

export default function Section({ children, id, bg = 'bg-pearl', className = '', full = false }: Props) {
  return (
    <section id={id} className={`relative ${bg} ${full ? '' : 'py-16 sm:py-20'} ${className}`}>
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}
```

- [ ] **Step 3: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 7: UI atoms — atmosphere + ornament

**Files:**
- Create: `src/components/ui/GrainOverlay.tsx`, `GlowField.tsx`, `Embers.tsx`, `Ornament.tsx`

- [ ] **Step 1: Create `src/components/ui/GrainOverlay.tsx`**

```tsx
// Static SVG film-grain layer. Pointer-events none; sits above bg, below content.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function GrainOverlay({ opacity = 0.05 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 mix-blend-multiply"
      style={{ backgroundImage: GRAIN, opacity }}
    />
  );
}
```

- [ ] **Step 2: Create `src/components/ui/GlowField.tsx`**

```tsx
// Radial candle-glow wash. position via inset utility classes from caller.
export default function GlowField({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={{
        background:
          'radial-gradient(circle, rgba(200,164,92,0.20), rgba(200,164,92,0) 70%)',
      }}
    />
  );
}
```

- [ ] **Step 3: Create `src/components/ui/Embers.tsx`** (uses CSS keyframes defined inline once)

```tsx
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
```

- [ ] **Step 4: Create `src/components/ui/Ornament.tsx`**

```tsx
export default function Ornament({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-gold ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
      <span className="text-sm">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold to-transparent" />
    </div>
  );
}
```

- [ ] **Step 5: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 8: UI atoms — FoilText, ArchPhoto, Button, LogoBadge

**Files:**
- Create: `src/components/ui/FoilText.tsx`, `ArchPhoto.tsx`, `Button.tsx`, `LogoBadge.tsx`
- Note: the logo file. The Uman logo lives at `../inbalel-website/public/images/logo.webp`. Copy it in.

- [ ] **Step 1: Copy the brand logo into this project**

Run: `node -e "require('fs').copyFileSync('../inbalel-website/public/images/logo.webp','public/images/logo.webp')"`
Expected: no output (success). The file `public/images/logo.webp` now exists.

- [ ] **Step 2: Create `src/components/ui/FoilText.tsx`**

```tsx
import type { ReactNode } from 'react';

// Animated gold-foil gradient text. Wrap a heading span.
export default function FoilText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(100deg,#f3dca0,#fff4d8 30%,#c8a45c 55%,#fff4d8 75%,#e7cf9a)',
        backgroundSize: '220% auto',
        animation: 'foil-shimmer 5s linear infinite',
      }}
    >
      <style>{`@keyframes foil-shimmer { to { background-position: 220% center; } }`}</style>
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/ArchPhoto.tsx`**

```tsx
type Props = {
  src: string;
  alt: string;
  tag?: string;
  className?: string;
  height?: string; // tailwind height class, e.g. 'h-[330px]'
};

// Arched (portal) framed image with gold border + optional caption tag.
export default function ArchPhoto({ src, alt, tag, className = '', height = 'h-[330px]' }: Props) {
  return (
    <figure
      className={`relative overflow-hidden rounded-t-[160px] rounded-b-2xl border border-gold/40 shadow-card ${height} ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-[center_25%]" />
      {tag && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3.5 pt-8 font-display text-[15px] text-white">
          {tag}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Button.tsx`** (gold shimmer CTA, renders an anchor)

```tsx
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> & {
  children: ReactNode;
};

export default function Button({ children, className = '', ...rest }: Props) {
  const reduced = useReducedMotion();
  return (
    <motion.a
      whileHover={reduced ? undefined : { y: -3 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full ' +
        'px-9 py-4 font-sans text-base font-bold text-[#2a1d0e] shadow-cta isolate ' +
        'bg-gradient-to-br from-gold-lite to-gold focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/40 ' +
        className
      }
      {...(rest as any)}
    >
      {!reduced && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-3/5 w-2/5 -skew-x-12"
          style={{
            background: 'linear-gradient(120deg,transparent,rgba(255,255,255,.7),transparent)',
            animation: 'btn-sweep 4.5s 2s infinite',
          }}
        />
      )}
      <style>{`@keyframes btn-sweep { 0% { left: -60%; } 22%, 100% { left: 140%; } }`}</style>
      <span className="relative">{children}</span>
    </motion.a>
  );
}
```

- [ ] **Step 5: Create `src/components/ui/LogoBadge.tsx`**

```tsx
export default function LogoBadge({ className = '' }: { className?: string }) {
  return <img src="/images/logo.webp" alt="אור הצדיק – רונית ברש" className={className} />;
}
```

- [ ] **Step 6: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 9: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Create `src/components/sections/Hero.tsx`**

```tsx
import { useReducedMotion } from 'framer-motion';
import GrainOverlay from '../ui/GrainOverlay';
import GlowField from '../ui/GlowField';
import Embers from '../ui/Embers';
import FoilText from '../ui/FoilText';
import Button from '../ui/Button';
import LogoBadge from '../ui/LogoBadge';
import { hero, meta } from '../../content/copy.he';

export default function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink">
      <style>{`
        @keyframes hero-zoom { from { transform: scale(1.12); } to { transform: scale(1); } }
        @keyframes hero-flicker { 0%,100% { opacity:.7; } 45% { opacity:1; } 70% { opacity:.82; } }
        @keyframes hero-up { from { opacity:0; transform: translateY(22px); } to { opacity:1; transform: translateY(0); } }
        @keyframes arch-in { from { opacity:0; transform: translateX(-50%) scale(.9); } to { opacity:1; transform: translateX(-50%) scale(1); } }
      `}</style>

      {/* background photo */}
      <div
        className="absolute inset-0 bg-cover bg-[center_18%]"
        style={{
          backgroundImage: 'url(/images/hero.webp)',
          animation: reduced ? undefined : 'hero-zoom 18s ease-out forwards',
        }}
      />
      {/* warm wash */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: 'radial-gradient(120% 80% at 50% 30%, rgba(255,214,150,.55), rgba(255,180,90,0) 60%)' }}
      />
      {/* candle glow */}
      <GlowField
        className="left-1/2 top-[34%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2"
      />
      {/* arched portal */}
      <div
        aria-hidden
        className="absolute left-1/2 top-20 h-[430px] w-[260px] -translate-x-1/2 rounded-t-[140px] border border-gold-lite/55"
        style={{
          boxShadow: 'inset 0 0 40px rgba(231,207,154,.18)',
          animation: reduced ? undefined : 'arch-in 1.4s .5s cubic-bezier(.22,1,.36,1) both',
        }}
      />
      {/* legibility veil */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(13,10,7,.30) 0%, rgba(13,10,7,0) 30%, rgba(13,10,7,.18) 55%, rgba(13,10,7,.86) 100%)' }}
      />
      <Embers />
      <GrainOverlay />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4">
        <LogoBadge className="h-10 drop-shadow-[0_2px_8px_rgba(0,0,0,.4)]" />
        <span className="font-label text-[11px] tracking-label text-[#f4ead3] [writing-mode:vertical-rl]">{meta.besd}</span>
      </div>

      {/* hero text */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-7 pb-12 text-center">
        <div className="font-label text-xs tracking-label text-gold-lite" style={{ animation: reduced ? undefined : 'hero-up .8s .7s both' }}>
          {hero.kicker}
        </div>
        <h1
          className="my-3 font-display text-[clamp(38px,11vw,52px)] font-black leading-[1.08] text-[#fff7ea]"
          style={{ animation: reduced ? undefined : 'hero-up .9s .82s both' }}
        >
          {hero.titleLead}
          <br />
          <FoilText>{hero.titleFoil}</FoilText>
        </h1>
        <p
          className="mx-auto mb-6 max-w-[340px] text-[15.5px] leading-relaxed text-[#f1e6d4]"
          style={{ animation: reduced ? undefined : 'hero-up .8s 1s both' }}
        >
          {hero.subtitle}
        </p>
        <div style={{ animation: reduced ? undefined : 'hero-up .8s 1.15s both' }}>
          <Button href="#lead-form">{hero.cta}</Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire Hero into App temporarily to view it**

Modify `src/App.tsx`:

```tsx
import Hero from './components/sections/Hero';

export default function App() {
  return (
    <main className="overflow-x-clip">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Checkpoint — visual**

Run: `npm run dev`
Expected: hero loads with the shofar photo, slow zoom, flickering glow, arch drawing in, embers rising, foil headline shimmering, gold CTA with light sweep. Stop the server.

---

## Task 10: Intro section

**Files:**
- Create: `src/components/sections/Intro.tsx`

- [ ] **Step 1: Create `src/components/sections/Intro.tsx`**

```tsx
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Ornament from '../ui/Ornament';
import { intro } from '../../content/copy.he';

export default function Intro() {
  return (
    <Section className="text-center">
      <Reveal>
        <Ornament className="mx-auto mb-8 max-w-[200px]" />
        <p className="font-display text-2xl font-bold text-espresso sm:text-3xl">{intro.lead}</p>
      </Reveal>
      <Reveal as="ul" stagger className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-x-6 gap-y-2">
        {intro.more.map((m) => (
          <Reveal.Item as="li" key={m} className="font-display text-xl text-gold-deep">
            ✦ {m}
          </Reveal.Item>
        ))}
      </Reveal>
      <Reveal>
        <p className="mx-auto mt-8 max-w-2xl text-pretty text-ink-body">{intro.promise}</p>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 11: ForBride section

**Files:**
- Create: `src/components/sections/ForBride.tsx`

- [ ] **Step 1: Create `src/components/sections/ForBride.tsx`**

```tsx
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import ArchPhoto from '../ui/ArchPhoto';
import { bride } from '../../content/copy.he';

export default function ForBride() {
  return (
    <Section bg="bg-pearl-2">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <Reveal>
          <div className="font-label text-[11px] tracking-label text-gold-deep">{bride.kicker}</div>
          <h2 className="mt-2 font-display text-3xl font-bold text-espresso sm:text-4xl">{bride.title}</h2>
          <p className="mt-4 text-pretty text-ink-body">{bride.body}</p>
          <p className="mt-5 font-semibold text-espresso">{bride.fitsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {bride.fits.map((f) => (
              <li key={f} className="rounded-full border border-gold/40 bg-white/60 px-4 py-1.5 text-sm text-gold-deep">
                ✨ {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <ArchPhoto src="/images/pair.webp" alt="רונית ברש בערב הפרשת חלה" height="h-[360px]" />
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 12: WhatsIncluded section

**Files:**
- Create: `src/components/sections/WhatsIncluded.tsx`

- [ ] **Step 1: Create `src/components/sections/WhatsIncluded.tsx`**

```tsx
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Ornament from '../ui/Ornament';
import ArchPhoto from '../ui/ArchPhoto';
import GlowField from '../ui/GlowField';
import { included } from '../../content/copy.he';

export default function WhatsIncluded() {
  return (
    <Section className="overflow-hidden">
      <GlowField className="right-0 top-0 h-[300px] w-[60%]" />
      <Reveal>
        <div className="font-label text-[11px] tracking-label text-gold-deep">{included.label}</div>
        <h2 className="mt-1 font-display text-3xl font-bold text-espresso sm:text-4xl">{included.title}</h2>
        <Ornament className="my-6 max-w-[260px]" />
      </Reveal>
      <div className="grid items-start gap-5 sm:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <ArchPhoto src="/images/ceremony.webp" alt={included.photoTag} tag={included.photoTag} height="h-[340px]" />
        </Reveal>
        <Reveal as="ul" stagger className="relative">
          {included.items.map((it, i) => (
            <Reveal.Item as="li" key={i} className="flex items-start gap-3 border-b border-espresso/10 py-3 last:border-0">
              <span className="min-w-[28px] font-display text-base font-bold text-transparent [-webkit-text-stroke:1px_#c8a45c]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[15px] leading-snug text-ink-body">
                <span aria-hidden className="me-1">{it.icon}</span>
                {it.text}
              </span>
            </Reveal.Item>
          ))}
        </Reveal>
      </div>
      <Reveal>
        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-2 font-label text-xs tracking-wider text-gold-deep">
          {included.duration}
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 13: CinematicQuote break

**Files:**
- Create: `src/components/sections/CinematicQuote.tsx`

- [ ] **Step 1: Create `src/components/sections/CinematicQuote.tsx`**

```tsx
import Reveal from '../motion/Reveal';
import GrainOverlay from '../ui/GrainOverlay';
import { cinematic } from '../../content/copy.he';

export default function CinematicQuote() {
  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0 bg-cover bg-[center_30%] opacity-60" style={{ backgroundImage: 'url(/images/crowd.webp)' }} />
      <div aria-hidden className="absolute inset-0 bg-ink/55" />
      <GrainOverlay opacity={0.06} />
      <Reveal className="relative z-10 mx-auto max-w-2xl px-8 text-center">
        <p className="font-display text-2xl leading-relaxed text-[#fff4e2] sm:text-3xl">{cinematic.quote}</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 14: PerfectFor section

**Files:**
- Create: `src/components/sections/PerfectFor.tsx`

- [ ] **Step 1: Create `src/components/sections/PerfectFor.tsx`**

```tsx
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import { perfectFor } from '../../content/copy.he';

export default function PerfectFor() {
  return (
    <Section bg="bg-pearl-2" className="text-center">
      <Reveal>
        <div className="font-label text-[11px] tracking-label text-gold-deep">{perfectFor.label}</div>
        <h2 className="mt-1 font-display text-3xl font-bold text-espresso sm:text-4xl">{perfectFor.title}</h2>
      </Reveal>
      <Reveal as="ul" stagger className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
        {perfectFor.items.map((it, i) => (
          <Reveal.Item
            as="li"
            key={i}
            className={`rounded-2xl border border-gold/30 bg-white/60 px-5 py-4 text-[15px] font-semibold text-espresso shadow-card ${
              i === perfectFor.items.length - 1 ? 'sm:col-span-2' : ''
            }`}
          >
            {it}
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 15: WhyUs section

**Files:**
- Create: `src/components/sections/WhyUs.tsx`

- [ ] **Step 1: Create `src/components/sections/WhyUs.tsx`**

```tsx
import Section from '../layout/Section';
import Reveal from '../motion/Reveal';
import Ornament from '../ui/Ornament';
import { whyUs } from '../../content/copy.he';

export default function WhyUs() {
  return (
    <Section>
      <Reveal>
        <div className="font-label text-[11px] tracking-label text-gold-deep">{whyUs.label}</div>
        <h2 className="mt-1 font-display text-3xl font-bold text-espresso sm:text-4xl">{whyUs.title}</h2>
        <Ornament className="my-6 max-w-[220px]" />
      </Reveal>
      <Reveal as="ul" stagger className="mx-auto max-w-2xl">
        {whyUs.items.map((it, i) => (
          <Reveal.Item as="li" key={i} className="flex items-center gap-3 border-b border-espresso/10 py-3.5 last:border-0 text-ink-body">
            <span aria-hidden className="text-gold">✨</span>
            <span className="text-[16px]">{it}</span>
          </Reveal.Item>
        ))}
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 16: ClosingQuote band

**Files:**
- Create: `src/components/sections/ClosingQuote.tsx`

- [ ] **Step 1: Create `src/components/sections/ClosingQuote.tsx`**

```tsx
import Reveal from '../motion/Reveal';
import Ornament from '../ui/Ornament';
import { closing } from '../../content/copy.he';

export default function ClosingQuote() {
  return (
    <section className="relative bg-taupe py-20 text-center">
      <Reveal className="mx-auto max-w-2xl px-8">
        <Ornament className="mx-auto mb-7 max-w-[180px] !text-white/70" />
        <p className="font-display text-2xl font-bold leading-relaxed text-[#fff7ea] sm:text-3xl">{closing.quote}</p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 17: Lead payload builder (TDD) + API proxy

**Files:**
- Create: `src/lib/lead-payload.ts`, `src/lib/lead-payload.test.ts`, `vitest.config.ts`, `api/lead.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
```

- [ ] **Step 2: Write the failing test `src/lib/lead-payload.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { buildChallahLeadPayload } from './lead-payload';

function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

describe('buildChallahLeadPayload', () => {
  it('maps form fields to backend snake_case keys', () => {
    const payload = buildChallahLeadPayload(
      fd({ fullName: ' שרה ', phone: '0501234567', eventType: 'כלה', eventDate: '2026-07-01', city: 'תל אביב', hearAbout: 'אינסטגרם' }),
      '',
    );
    expect(payload).toMatchObject({
      name: 'שרה',
      phone: '0501234567',
      event_type: 'כלה',
      event_date: '2026-07-01',
      city: 'תל אביב',
      referral_source: 'אינסטגרם',
      service: 'challah',
      utm_source: 'direct',
      ig_id: null,
    });
  });

  it('pulls ig_id and utm_source from the query string', () => {
    const payload = buildChallahLeadPayload(
      fd({ fullName: 'דנה', phone: '0500000000' }),
      '?ig_id=abc123&utm_source=instagram',
    );
    expect(payload.ig_id).toBe('abc123');
    expect(payload.utm_source).toBe('instagram');
  });

  it('omits empty optional fields as undefined', () => {
    const payload = buildChallahLeadPayload(fd({ fullName: 'א', phone: '05' }), '');
    expect(payload.city).toBeUndefined();
    expect(payload.event_type).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — `buildChallahLeadPayload` is not defined / module not found.

- [ ] **Step 4: Implement `src/lib/lead-payload.ts`**

```ts
// Pure transform: form values → the JSON the backend expects.
// Kept framework-free so it is unit-testable without a DOM.
export type ChallahLeadPayload = {
  name: string;
  phone: string;
  event_type?: string;
  event_date?: string;
  city?: string;
  referral_source?: string;
  service: 'challah';
  ig_id: string | null;
  utm_source: string;
};

const clean = (v: FormDataEntryValue | null): string => String(v ?? '').trim();
const opt = (v: FormDataEntryValue | null): string | undefined => {
  const s = clean(v);
  return s === '' ? undefined : s;
};

export function buildChallahLeadPayload(formData: FormData, search: string): ChallahLeadPayload {
  const params = new URLSearchParams(search);
  return {
    name: clean(formData.get('fullName')),
    phone: clean(formData.get('phone')),
    event_type: opt(formData.get('eventType')),
    event_date: opt(formData.get('eventDate')),
    city: opt(formData.get('city')),
    referral_source: opt(formData.get('hearAbout')),
    service: 'challah',
    ig_id: params.get('ig_id'),
    utm_source: params.get('utm_source') || 'direct',
  };
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test`
Expected: PASS — 3 tests green.

- [ ] **Step 6: Create `api/lead.ts`** (Vercel Edge proxy — verbatim pattern from the Uman page)

```ts
// Vercel Edge Function — thin proxy from the site to the Ronit backend.
// The site posts to /api/lead; this forwards JSON to the backend, which
// handles dedup (incl. the Challah board), attribution, and Monday writes.
// TBD: confirm this is the correct backend for the Challah page.

export const config = { runtime: 'edge' };

const BACKEND_URL = 'https://api.ronitbarash.site/api/website/lead';

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method_not_allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const upstream = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { 'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'upstream_unreachable' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

- [ ] **Step 7: Checkpoint** — `npm test` passes and `npx tsc -b` is clean.

---

## Task 18: LeadForm section

**Files:**
- Create: `src/components/sections/LeadForm.tsx`

- [ ] **Step 1: Create `src/components/sections/LeadForm.tsx`**

```tsx
import { useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Reveal from '../motion/Reveal';
import { buildChallahLeadPayload } from '../../lib/lead-payload';
import { leadForm } from '../../content/copy.he';

const fieldClass =
  'w-full rounded-xl border border-gold/30 bg-white px-4 py-3 text-ink-body text-base ' +
  'placeholder:text-espresso/40 focus:outline-none focus:ring-4 focus:ring-gold/25 transition-shadow';
const labelClass = 'block text-espresso font-semibold mb-1.5 text-[15px]';

type InputProps = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string };

function Field({ id, label, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {rest.required && <span className="text-rose-500 ms-1" aria-hidden>*</span>}
      </label>
      <input id={id} name={id} className={fieldClass} {...rest} />
    </div>
  );
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const TOAST_TONE: Record<Exclude<Status, 'idle'>, string> = {
  submitting: 'bg-espresso text-pearl',
  success: 'bg-emerald-700/95 text-white',
  error: 'bg-rose-800/95 text-white',
};

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const reduced = useReducedMotion();
  const f = leadForm.fields;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const payload = buildChallahLeadPayload(new FormData(formEl), window.location.search);
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`submit failed (${res.status})`);
      setStatus('success');
      formEl.reset();
    } catch (err) {
      console.error('LeadForm submit failed', err);
      setStatus('error');
    }
    setTimeout(() => setStatus((p) => (p === 'submitting' ? p : 'idle')), 5000);
  }

  const isSubmitting = status === 'submitting';
  const toastVisible = status !== 'idle';
  const toastMessage =
    status === 'submitting' ? leadForm.submitting
    : status === 'success' ? leadForm.success
    : status === 'error' ? leadForm.error : '';

  return (
    <section id="lead-form" className="relative bg-gradient-to-b from-pearl-2 to-pearl py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-6">
        <div className="mb-9 text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-espresso sm:text-4xl">{leadForm.title}</h2>
            <p className="mt-2 text-ink-body">{leadForm.subtitle}</p>
          </Reveal>
        </div>
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-gold/20 bg-white/70 p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="fullName" label={f.fullName} autoComplete="name" required />
              <Field id="phone" label={f.phone} type="tel" inputMode="tel" autoComplete="tel" required />
              <Field id="eventType" label={f.eventType} />
              <Field id="eventDate" label={f.eventDate} type="date" />
              <Field id="city" label={f.city} autoComplete="address-level2" />
              <Field id="hearAbout" label={f.hearAbout} />
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-br from-gold-lite to-gold px-9 py-4 font-bold text-[#2a1d0e] shadow-cta transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? leadForm.submitting : leadForm.cta}
              </button>
            </div>
          </form>
        </Reveal>
        <AnimatePresence>
          {toastVisible && (
            <motion.div
              key={status}
              role="status"
              aria-live="polite"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed inset-x-4 bottom-6 z-50 mx-auto max-w-md rounded-xl px-5 py-4 text-center shadow-cta ${TOAST_TONE[status as Exclude<Status, 'idle'>]}`}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 19: Footer

**Files:**
- Create: `src/components/sections/Footer.tsx`

- [ ] **Step 1: Create `src/components/sections/Footer.tsx`**

```tsx
import LogoBadge from '../ui/LogoBadge';
import { footer, contact } from '../../content/copy.he';

export default function Footer() {
  return (
    <footer className="bg-ink py-10 text-center text-[#cbb9aa]">
      <LogoBadge className="mx-auto mb-3 h-12 opacity-90" />
      <p className="px-6 text-sm">{footer.brand} · {footer.tagline}</p>
      <a
        href={`tel:${contact.phone}`}
        className="mt-3 inline-block font-label text-xs tracking-wider text-gold-lite underline-offset-4 hover:underline"
      >
        📞 {contact.phoneLabel}
      </a>
    </footer>
  );
}
```

- [ ] **Step 2: Checkpoint — typecheck**

Run: `npx tsc -b`
Expected: no errors.

---

## Task 20: Compose App + final verification

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx` with the full composition**

```tsx
import Hero from './components/sections/Hero';
import Intro from './components/sections/Intro';
import ForBride from './components/sections/ForBride';
import WhatsIncluded from './components/sections/WhatsIncluded';
import CinematicQuote from './components/sections/CinematicQuote';
import PerfectFor from './components/sections/PerfectFor';
import WhyUs from './components/sections/WhyUs';
import ClosingQuote from './components/sections/ClosingQuote';
import LeadForm from './components/sections/LeadForm';
import Footer from './components/sections/Footer';

export default function App() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <Intro />
      <ForBride />
      <WhatsIncluded />
      <CinematicQuote />
      <PerfectFor />
      <WhyUs />
      <ClosingQuote />
      <LeadForm />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Checkpoint — production build**

Run: `npm run build`
Expected: `tsc -b` clean + Vite build succeeds, emits `dist/`.

- [ ] **Step 3: Checkpoint — preview the full page**

Run: `npm run preview`
Expected: open the printed URL. Scroll top→bottom: hero choreography, then Intro, ForBride (arched photo), WhatsIncluded (arched ceremony photo + numbered list), cinematic quote over photo, PerfectFor cards, WhyUs list, closing quote band, lead form, footer. No horizontal scroll. Stop the server.

- [ ] **Step 4: Checkpoint — reduced motion**

In the OS / browser, enable "reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects OFF), reload preview.
Expected: hero renders fully static (no zoom/embers/shimmer), sections appear without reveal animation, all content still visible and laid out correctly.

- [ ] **Step 5: Checkpoint — form behavior (optional, needs backend)**

Run: `npx vercel dev` (if Vercel CLI available)
Expected: submitting the form shows the "submitting" then "success" toast (or "error" if backend rejects). Without `vercel dev`, `npm run dev` serves the static site and `/api/lead` 404s — that is expected locally; the form logic is already covered by the Task 17 unit tests.

---

## Self-Review

**Spec coverage:**
- Hebrew-only RTL → Task 1 (`<html lang="he" dir="rtl">`), all copy in `copy.he.ts`. ✓
- "Luminous Ceremony" aesthetic (pearl + candle-gold, serif, foil, arches, grain, glow, embers) → Tasks 2, 7, 8, 9. ✓
- Distinctive typography (Frank Ruhl Libre / Assistant / Heebo) → Task 1 fonts + Task 2 tokens. ✓
- All 10 sections → Tasks 9–16, 18, 19; composed in Task 20. ✓
- All 8 "what's included" items + duration → `included` in Task 3, rendered Task 12. ✓
- Form fields (6) + CTA + states → Tasks 17–18. ✓
- Form backend = Uman proxy, repointable (one `BACKEND_URL` const) → Task 17. ✓
- Media pipeline (sharp → webp) → Task 4. ✓
- RTL logical utilities (`ms-/me-`), `<bdi>` not needed (no inline LTR numerals in copy) → components use `ms-`/`me-`. ✓
- Reduced motion honored → Reveal, Button, Embers, Hero, LeadForm all gate on `useReducedMotion`; verified Task 20 step 4. ✓
- Lazy images, no CLS → `loading="lazy"` + fixed heights on ArchPhoto / bg sections. ✓
- Open items: `contact.phone` placeholder w/ TODO (Task 3); backend TBD note (Task 17). ✓

**Placeholder scan:** No "TBD/TODO implement later" in code steps. The only TODO is the intentional client phone number (`contact.phone`), flagged in the spec as an open item. All steps contain complete code. ✓

**Type consistency:** `buildChallahLeadPayload(formData, search)` signature identical in Task 17 definition, test, and Task 18 caller. Content keys (`hero.titleFoil`, `included.items[].icon/text`, `leadForm.fields.*`) defined in Task 3 and used verbatim in section tasks. `ArchPhoto` props (`src/alt/tag/height`) consistent across Tasks 8/11/12. ✓

**Out of scope (per spec):** English/bilingual, video hero, router — none introduced. ✓
