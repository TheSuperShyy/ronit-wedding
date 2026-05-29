# CLAUDE.md

Instructions and context for Claude Code working in this project.

## Project Overview

Single-page landing page for **Or HaTzadik – Ronit Barash** (אור הצדיק – רונית ברש)
promoting her **Challah Separation evenings** (ערב הפרשת חלה) — luxury, emotional
women-only productions for brides, Bat Mitzvahs, pre-birth blessings, and prayers
for salvation/healing. 20 years of event-production experience.

This is the **second page** in Ronit's brand. The first is the Uman / Tu B'Av trip
page (`../inbalel-website`). This page must stay **visually consistent** with it —
same warm earth-tone palette, same Hebrew typography, same calm spiritual mood —
so all of Ronit's pages read as one brand. Reuse the design tokens below verbatim.

The page opens with בס"ד.

## Content

Client-supplied copy is bilingual:

- **Hebrew** is the primary/canonical version — RTL, lead with this.
- **English** is the secondary version (same content, provided by the client).

Keep both copies in `content/` as the human-readable source of truth
(`content/copy.he.md`, `content/copy.en.md`), and mirror them into typed TS
modules under `src/content/` that components import. **No copy strings live inside
JSX** — components reference the content module. The markdown wins on disagreement.

Key copy blocks (do not paraphrase the client's wording):
- Hook: "הפקת ערב הפרשת חלה שלא תשכחי בחיים" / "A Challah Separation Evening You'll Never Forget"
- "מה כולל הערב?" / "What's Included in the Evening?" — the icon bullet list (host + shofar, sound system, 2 drummers, shofars, entrance carpet, ceremony, music/dancing).
- Ceremony duration: 1.5–2 hours (שעה וחצי לשעתיים).
- "מתאים במיוחד עבור" / "Perfect For" list.
- "למה דווקא אנחנו?" / "Why Choose Us?" list.
- Closing quote: "יש ערבים שלא שוכחים… ויש רגעים שנשארים בלב לכל החיים ❤️"
- CTA: "💍 תשרייני לי תאריך" / "💍 Reserve My Date"

## Stack (mirror the brand page)

- **Vite + React 18 + TypeScript** — SPA, no SSR, single page.
- **Tailwind CSS** — palette locked in `tailwind.config.ts`.
- **Framer Motion** — reveal + float + hover micro-interactions only.
- **Google Font: Assistant** — the brand's Hebrew typeface (free analog to "Ravmesser Assistant").
- **No router** — single page, anchor scrolling only.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to dist/
npm run preview      # serve the production build
```

## Design tokens — SHARED BRAND PALETTE (copied from the Uman page)

All colors, fonts, max-widths, and easings live ONLY in `tailwind.config.ts`.
Components consume tokens via Tailwind utilities — **never hardcode hex in JSX/CSS**.

Theme audit (must return only `tailwind.config.ts`):
```bash
grep -rE '#[0-9a-fA-F]{3,6}' src/
```

| Token | Value | Purpose |
|---|---|---|
| `hero` | `#b89e8b` | hero + closing-quote background |
| `cream` | `#fffcf9` | primary section background |
| `cream-alt` | `#fffbf9` | alternating section background |
| `accent` | `#c3957d` | CTA & form section background |
| `accent-soft` | `#e6d2c4` | soft accent fills |
| `button` | `#87573e` | primary button fill |
| `button-text` | `#eeecea` | button text |
| `ink-deep` | `#6b4532` | headings on cream sections |
| `ink-body` | `#2d2d2d` | body copy |
| `ink-night` | `#1a1612` | deepest text/overlays |
| `ivory` | `#faf6ee` | text over photos/overlays |
| `divider` | `#efe5dc` | 2px section separator |
| `gold` | `#c5a572` | accent / shofar / sparkle detail |

Other locked tokens: `fontFamily.sans = ['Assistant', ...]`, `maxWidth.container = 906px`,
`transitionTimingFunction.soft = cubic-bezier(0.22, 1, 0.36, 1)`,
shadows `card` and `cta` (see the Uman `tailwind.config.ts` for exact values).

## Animation rules

Keep motion calm and identical in spirit to the brand page. Three primitives only:

1. `<Reveal>` — fade + 16px Y on viewport enter, fires once. 700ms, soft ease.
2. `<FloatingDecor>` — slow Y ±8px loop on decorative SVGs, opacity ~0.12.
3. `<Button>` — translateY(-2px) on hover, shadow grow. No color shift.

Hard rules:
- Every animated component honors `useReducedMotion()`.
- No bounce, no scale > 1.02, no rotate.
- `Reveal` fires once, unobserves itself. No replay on scroll-up.
- Lists stagger at `staggerChildren: 0.08`.

## RTL (Hebrew is primary)

- `<html lang="he" dir="rtl">` in `index.html`.
- Use Tailwind **logical** utilities: `ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`.
  **Do not** use `pl-*`/`pr-*`/`ml-*`/`mr-*` — they break under RTL.
- Wrap LTR numerals/phone numbers in `<bdi>` when inside RTL paragraphs.

## Form

Reuse the brand's lead pipeline. `LeadForm` POSTs to **`/api/lead`** (a Vercel Edge
Function that proxies to `https://api.ronitbarash.site/api/website/lead`). The Ronit
backend handles phone-based dedup across boards (including the **Challah** board),
channel attribution, and the Monday writes — no env vars needed on our side.

Form fields (from client copy): Full Name, Phone Number, Type of Event, Event Date,
City, "How did you hear about us?". On mount, read `?ig_id=` and `?utm_source=` from
the URL and include them in the payload. Remap field names to the backend's snake_case
Zod keys (`fullName → name`, etc.) and translate Hebrew values to English on submit.
State machine: `idle | submitting | success | error`, one toast per state.

Local dev with the form: `npx vercel dev` (so `/api/lead` is served alongside Vite).
Plain `npm run dev` serves the static site only — submissions 404.

## Heading colors

No global heading color in `src/index.css` — the base layer only sets `font-weight`
and `line-height` on `h1–h4`. Each section picks its color explicitly:
- Cream-background sections: `text-ink-deep` on the `<h2>`.
- Photo/overlay sections (Hero, closing quote, form over accent/photo): `text-ivory`.

Do **not** re-add a global `@apply text-ink-deep` to `h1–h4` — it bleeds brown text
through over photos.

## File-organization rules

- `src/components/sections/` — one file per page block, named in reading order (Hero → Footer).
- `src/components/ui/` — reusable atoms (Button, Card, Badge, Divider, FloatingDecor, LogoBadge).
- `src/components/layout/` — page-level primitives (Section, Container).
- `src/components/motion/` — animation primitives (Reveal, variants).
- Keep each file under ~120 lines; extract sub-components when a section grows past that.

## Assets

Client photos/videos for Ronit live in `../inbalel-website/רונית -דף נחיתה אומן/`
(shared brand asset folder) plus its `testimonials/` subfolder and `ronit-logo.jpeg`
/ `logo-removebg.png`. Reuse the optimization scripts pattern from the Uman page
(`sharp` for images, HEIC conversion) rather than committing raw HEIC/originals.

## Don'ts

- Don't hardcode hex colors in components.
- Don't put copy strings inside JSX (Hebrew or English).
- Don't change the shared palette — branding consistency across Ronit's pages depends on it.
- Don't add a real form backend without explicit instruction (the proxy already exists).
- Don't introduce additional animation libraries.
- Don't use directional Tailwind utilities (`pl/pr/ml/mr`) in this RTL project.
- Don't add a router or extra pages.

## Notes

- Brand: "אור הצדיק – רונית ברש" / "Or HaTzadik – Ronit Barash".
- Sister page: `../inbalel-website` (Uman / Tu B'Av trip) — single source of brand truth for palette, fonts, and component patterns.
- Mobile breakpoint mirrored from brand: 600px. Max container width: 906px.
- User's email: clixteam579@gmail.com
</content>
</invoke>
