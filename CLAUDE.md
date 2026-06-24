# CLAUDE.md

Instructions and context for Claude Code working in this project.

## Working process (per task — follow this every time)

Work **one task at a time** and stay focused on it; don't drift into adjacent
changes or start the next thing without being asked.

1. **Finish the task.** Do only what was asked, verify it, and report the result plainly.
2. **Update context.** As soon as a task is done, update this `CLAUDE.md` so it
   reflects the new state of the code (structure, components, copy keys, tokens,
   behaviors). This file IS the project context — keep it current, never stale.
3. **Remind to compact.** Before moving on to the next task, **remind the user to
   run `/compact`** so each task starts from a fresh, focused context. Wait for
   the user's next instruction; don't auto-start new work.

## Project Overview

Single-page **Hebrew RTL** landing page for **Or HaTzadik – Ronit Barash**
(אור הצדיק – רונית ברש) promoting her **Challah Separation evenings**
(ערב הפרשת חלה) — luxury, emotional, women-only productions for brides,
Bat Mitzvahs, pre-birth blessings, and prayers for salvation/healing.
20 years of event-production experience. The page opens with בס"ד.

**Language:** Hebrew only (RTL). English was deferred.

**Aesthetic:** **warm earth-tones** ("peaceful wedding") — cream backgrounds, warm-tan
hero, deep-brown CTAs, soft gold accents, Assistant type, calm and elegant. This page now
**intentionally matches the sister Uman / Tu B'Av page's design system** (see `Re-Design.md`
at the repo root — the shared spec extracted from that page). (Design history: it briefly ran
an ivory+gold look, then a GSAP/Lenis cinematic redesign with a video gate; the client chose
to unify it with the sister page's warm system. Those earlier versions were removed.)

The sister site is `../uman-tu-bav-landing` (the Uman / Tu B'Av trip) — same brand, same lead
backend, and now the **same design system**. `Re-Design.md` is the source of truth for tokens,
type, motion, and RTL rules; keep them in sync.

## Stack

- **Vite + React 18 + TypeScript** — SPA, single page, no router, anchor scroll (CTAs → `#lead`).
- **Tailwind CSS 3** — all tokens in `tailwind.config.ts`; avoid hardcoding hex in JSX.
- **Framer Motion** — the **only** motion system: `<Reveal>` (fade+Y on view, once),
  `<Reveal.Item>` (staggered list children), `<Button>` (hover lift + optional pulse),
  `FloatingDecor` (slow float). Every animated component honors `useReducedMotion()`.
  (GSAP + Lenis and the cinematic redesign/video-gate were **removed** — they may still be in
  `package.json` as unused deps.)
- **lucide-react** — line icons (Check, Play, ChevronLeft/Right, X, Phone). **clsx + tailwind-merge** — `cn()`.
- **sharp** (image optimize) + **ffmpeg/ffprobe** (video optimize). **vitest** — one logic test.
- Font (Google): **Assistant** everywhere (`sans` = `display`), weights **300–800**. Headings
  `font-bold` (hero `font-extrabold`); no global heading color — each section sets its own
  (`text-ink-deep` on cream, `text-ivory` on photo/dark overlays).

## Run

```bash
npm install
npm run dev            # http://localhost:5174
npm run build          # tsc -b && vite build → dist/
npm run preview
npm test               # vitest (lead-payload unit tests)
npm run optimize:media # photos  → public/images/*.webp
npm run optimize:videos# videos  → public/videos/*.mp4 + .webp posters
```

**Dev-server gotcha:** editing `tailwind.config.ts`, `index.html` (fonts), or
`vite.config.ts` requires a **dev server restart** — Vite caches these and HMR won't
pick them up (symptom: stale colors, or a `bg-…` "class does not exist" overlay).

## Design tokens (warm earth-tones)

In `tailwind.config.ts` → `theme.extend.colors` (mirrors `Re-Design.md` §2):

| Token | Value | Purpose |
|---|---|---|
| `hero` | `#b89e8b` | hero + closing-quote background (warm tan) |
| `cream` | `#fffcf9` | primary section background |
| `cream-alt` | `#fffbf9` | alternating section background |
| `accent` | `#c3957d` | CTA / form section background (rose-tan) |
| `accent-soft` | `#e6d2c4` | soft accent fills / chips |
| `button` | `#87573e` | primary button fill (deep brown) |
| `button-text` | `#eeecea` | button label |
| `ink-deep` | `#6b4532` | headings on light backgrounds |
| `ink-body` | `#2d2d2d` | body copy |
| `ink-night` | `#1a1612` | darkest sections / photo overlays / footer |
| `ivory` | `#faf6ee` | headings/text on photo & dark overlays |
| `divider` | `#efe5dc` | hairline borders / separators |
| `gold` | `#c5a572` | small decorative accents |

Fonts: `sans` = `display` = Assistant. `maxWidth.container = 906px`;
`ease-soft = cubic-bezier(0.22,1,0.36,1)`; shadows `card`,`cta`. Base body is
`bg-cream text-ink-body`, 18px / 1.7. Utilities `.text-balance`, `.text-pretty`, `.cv-auto`.

## Content

- **`src/content/copy.he.ts`** — single source of truth for ALL Hebrew copy, `as const`.
  Components import from here. **No Hebrew strings in JSX** (an `alt=` attribute is the
  only allowed exception). `content/copy.he.md` is the human-readable mirror.
- Don't paraphrase client wording. Key exports: `hero, intro, bride, included,
  cinematic, perfectFor, whyUs, closing, leadForm, footer, contact, gallery,
  videoMoment, videos, meta` (`rd`, `introGate` are leftover/unused).
- `contact.phone` = `050-2696862` (office line, from the brand's live site / `Re-Design.md`
  §9) — **confirm with the client** it's the right line for Challah enquiries.
  `contact.phoneLabel` = `לתיאום ערב`. Wired into every `CallPill` + the footer.
- Recent copy keys: `bride.cta` (`להזמנת ערב`), `meta.backToTop`, `videos.playAria`.
  Em-dashes (—) were stripped from the Hebrew copy (commas instead). Client revisions:
  `cinematic.quote` uses commas (not periods) between clauses; `whyUs` card 05 desc =
  `מהשיחה הראשונה ועד סיום האירוע, יד ביד יחד איתך`.

## Page structure (CURRENT)

`src/App.tsx` mounts global chrome — **`SplashScreen`** (brand hold) + **`ScrollProgress`**
(RTL top bar) — then the sections in reading order (no intro/gate). Each `<Section>`
**auto-mounts a centered `BrandLogo` (top) + theme-aware `CallPill` (bottom)** — the
"every section is its own page" rhythm; full-bleed sections hand-place them.

**Hero** (`#top`, parallax photo + ink-night scrim, **בס"ד pinned top-right (RTL `start`)**,
spotlight kicker, chevron; CTA scrolls one screen down) → **FilmStrip** (dark auto-pan photo
marquee) → **Intro** (lead + chips + promise) →
**ForBride** (text-first on mobile + arch photo + fits chips; CTA → `#lead`) → **WhatsIncluded**
(checklist + photo) → **CinematicQuote** (letterbox photo breather) → **PerfectFor** (list) →
**WhyUs** (numbered cards) → `<Divider>` → **Gallery** (draggable stacked **PhotoGallery**;
2-row grid on mobile; tap → Lightbox) → **VideoMoment** (letterbox video breather) →
**VideoGallery** (hover-expand poster strip desktop / tap grid mobile → Lightbox video) →
**LeadForm** (`#lead`, `bg-accent`) → **ClosingQuote** (shimmer line) → **Footer** (`bg-ink-deep`).

CTAs: Hero + gallery buttons **scroll to the next section**; booking CTAs go to the form
(`#lead`). All copy from `copy.he.ts` (no Hebrew in JSX; `alt` is the only exception). `rd` /
`introGate` exports are leftovers from the removed redesign/gate — unused.

## Components

- `components/layout/Section.tsx` — section wrapper: `bg` (default `bg-cream`), `className`,
  `full`, `padded`, `noLogo`, `noPill`. Applies the padding rhythm + `data-header-theme`
  (dark/light via `DARK_BGS`) and **auto-mounts `BrandLogo` (top) + `CallPill` (bottom)**.
  `Container.tsx` = 906px centered.
- `components/ui/BrandLogo.tsx` — centered brand logo at each section top (192/224/256px
  desktop, **128px on mobile**); scroll-to-top on click.
- `components/ui/CallPill.tsx` — centered tel pill at section bottom; light/dark theme rgba
  table; reads `contact.phone`.
- `components/ui/SplashScreen.tsx` — 3.5s brand hold (gold rings + breathing logo), fade-out.
- `components/ui/ScrollProgress.tsx` — top gradient bar, fills from the right (RTL).
- `components/motion/{Reveal.tsx,variants.ts}` — `<Reveal>` (fade+Y on view, once, `amount:0.15`)
  + `<Reveal.Item>` (stagger `0.08`). Reduced-motion safe.
- `components/ui/Button.tsx` — anchor CTA, `variant` `primary` (deep-brown) / `ghost`, optional
  `pulse`. Hover lift `y:-3`.
- `components/ui/Card.tsx` — frosted body card with a warm hover lift (used by WhyUs).
- `components/ui/Divider.tsx` — hairline with a slowly spinning gold sparkle.
- `components/ui/FloatingDecor.tsx` — slow floating heart/sparkle/circle SVG (decorative).
- `components/ui/Lightbox.tsx` — portal popout for images AND videos. Opens with a
  **"pulled from a deck of cards"** spring (rises + tilts; drops back on close) with faint
  backing cards; dark RTL-aware nav arrows (chevrons point outward). Reduced-motion → fade.
- `components/ui/gallery.tsx` — **`PhotoGallery`**: draggable fanned photo stack (desktop;
  tap opens Lightbox, drag doesn't) + a 2-row tap grid on mobile. Used by the Gallery section.
- `components/ui/gallery-animation.tsx` — **`ExpandableGallery`**: hover-expand poster strip
  (hovered panel grows). Used by VideoGallery (desktop) with `onOpen` → Lightbox.
- `components/sections/FilmStrip.tsx` — dark full-bleed auto-pan photo marquee.

## Imports / aliases

Use **relative imports** (`../../lib/utils`). There is **no `@/` alias** — the editor's
TS flags `baseUrl` as a deprecation error, so we removed it. `cn` lives at `src/lib/utils.ts`.

## RTL + motion rules

- `<html lang="he" dir="rtl">`. Tailwind **logical** utilities only: `ps-/pe-/ms-/me-/start-/end-`.
  Never `pl-/pr-/ml-/mr-`.
- Every animated component honors `useReducedMotion()` (Reveal, Button, FloatingDecor, Hero,
  VideoMoment, SplashScreen, ScrollProgress, Lightbox, PhotoGallery, ExpandableGallery).
- Keep most motion calm (no bounce). Intentional larger-motion exceptions live in the
  interactive galleries — draggable photos (hover scale ~1.08 + tilt), the hover-expand strip
  (flex grow), and the Lightbox "deck" spring — all gated by reduced motion.

## Media

- Source: `דף נחיתה - הפרשות חלה/` (Hebrew folder name) — 8 jpeg photos (**1536×2048**,
  WhatsApp-compressed) + 5 mp4 (2 portrait, 3 landscape).
- `scripts/optimize-media.mjs` → `public/images/{hero,ceremony,dance,crowd,table,wide,joy,pair}.webp`
  at 1600px / q86 (native res; do NOT downscale below source — that caused visible blur).
- `scripts/optimize-videos.mjs` → `public/videos/video-01..05.mp4` (H.264, faststart) + `.webp` posters.
- Photo sharpness is capped by the 1536px sources; the full-bleed hero upscales slightly on
  large screens. For perfect sharpness, get higher-res originals (not via WhatsApp) and re-run.
- `public/images/logo.webp` is the brand logo (copied from the Uman project).

## Form

`LeadForm` POSTs to **`/api/lead`** (Vercel Edge proxy in `api/lead.ts`) → forwards to
`https://api.ronitbarash.site/api/website/lead` (Ronit's backend handles dedup incl. the
**Challah** board). The endpoint is one constant — repoint if the client confirms a different
backend (TBD). Payload built by **`src/lib/lead-payload.ts`** (`buildChallahLeadPayload`,
unit-tested). Fields/`name`s: `fullName, phone, eventType, eventDate, city, hearAbout`.
State machine `idle|submitting|success|error` + toast. Local form needs `npx vercel dev`
(plain `npm run dev` 404s `/api/lead`).

## Don'ts

- Don't hardcode hex in components (use tokens); don't put Hebrew in JSX (use `copy.he.ts`).
- Don't use directional RTL utilities (`pl/pr/ml/mr`) or add a router/extra pages.
- Animation lib is **Framer Motion** only. Don't add another (GSAP/Lenis were removed);
  don't use the `@/` alias.
- Don't re-add a global `h1–h4` color (it competes with overlay headings via specificity).
- Don't add emoji *decoration* or a generic "AI" look — prefer restraint, real typography,
  gold line-icons, whitespace. (Some client copy strings include emojis; render those as-is.)

## Project meta

- Git: private repo **github.com/TheSuperShyy/ronit-wedding** (`main` tracks `origin`).
- `.gitignore` excludes `node_modules`, `dist`, `.superpowers`.
- Docs: design spec + implementation plan in `docs/superpowers/`.
- User's email: clixteam579@gmail.com
</content>
