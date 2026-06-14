# CLAUDE.md

Instructions and context for Claude Code working in this project.

## Project Overview

Single-page **Hebrew RTL** landing page for **Or HaTzadik – Ronit Barash**
(אור הצדיק – רונית ברש) promoting her **Challah Separation evenings**
(ערב הפרשת חלה) — luxury, emotional, women-only productions for brides,
Bat Mitzvahs, pre-birth blessings, and prayers for salvation/healing.
20 years of event-production experience. The page opens with בס"ד.

**Language:** Hebrew only (RTL). English was deferred.

**Aesthetic:** soft **ivory + gold "peaceful wedding"** — light, airy, elegant,
restrained gold accents, an elegant serif for headings, the all-white event photos
framed in gold. (Design history: a warm-cream version read too much like the sister
Uman page; a dark high-fashion version felt generic; the client settled on this
ivory+gold direction. It is intentionally its own look, NOT a copy of the Uman page.)

There is a sister site (`../inbalel-website`, the Uman / Tu B'Av trip) — same brand,
same lead backend — but this page has its own distinct design. Don't re-mirror it.

## Stack

- **Vite + React 18 + TypeScript** — SPA, single page, no router, anchor scroll.
- **Tailwind CSS 3** — all tokens in `tailwind.config.ts`; avoid hardcoding hex in JSX.
- **GSAP 3 + ScrollTrigger** + **Lenis** — the core motion system for the **cinematic redesign**
  (the live page): smooth/momentum scroll (Lenis) wired to `ScrollTrigger.update` via `gsap.ticker`,
  plus all reveals, parallax, line-mask rises, and the scroll-assembling gallery collage. Set up in
  `components/redesign/Redesign.tsx` → `useRedesignScroll(ready)` (gated so it boots after the gate
  opens). GSAP also drives the gate overlay (`components/intro/GateIntro.tsx`).
- **Framer Motion** — now only used by `GateIntro` (`useReducedMotion`) and the older (now unused)
  section components. Not used by the redesign.
- **lucide-react** — line icons. **clsx + tailwind-merge** — the `cn()` helper.
- **sharp** (image optimize) + **ffmpeg/ffprobe** (video optimize). **vitest** — one logic test.
- Font (Google): **Assistant** everywhere — `display`, `sans`, and `label` all map to Assistant
  (weights 300–800). Headings are heavy (hero `font-extrabold`, section titles `font-bold`) for the
  modern bold look matching the sister site. (History: started on Frank Ruhl Libre serif headings;
  client wanted the modern Assistant look from orhazadik.online, so we unified on Assistant.)

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

## Design tokens (ivory + gold)

In `tailwind.config.ts` → `theme.extend.colors`:

| Token | Value | Purpose |
|---|---|---|
| `ivory` | `#fbf8f2` | primary section background, light text on photos |
| `linen` | `#f3ecdf` | alternating section background |
| `champagne` | `#efe3cf` | gold-tinted panels / icon chips / footer |
| `ink` | `#3a322a` | headings + body (warm near-black) |
| `ink-soft` | `#6b5f4f` | secondary / muted text |
| `gold` | `#c8a45c` | primary accent (rules, frames, CTA) |
| `gold-deep` | `#a87f38` | gold text on light (better contrast) |
| `gold-lite` | `#e7cf9a` | CTA gradient highlight |
| `line` | `#e6dcc9` | hairline borders |

Fonts: `display` = `sans` = `label` = Assistant (unified). Headings get weight via Tailwind utilities.
`maxWidth.container = 906px`; `ease-soft = cubic-bezier(0.22,1,0.36,1)`; shadows `card`,`cta`.
(Older dark tokens `noir/coal/bone/mute` may linger in config but are unused — ignore.)

## Content

- **`src/content/copy.he.ts`** — single source of truth for ALL Hebrew copy, `as const`.
  Components import from here. **No Hebrew strings in JSX** (an `alt=` attribute is the
  only allowed exception). `content/copy.he.md` is the human-readable mirror.
- Don't paraphrase client wording. Key exports: `hero, intro, bride, included,
  cinematic, perfectFor, whyUs, closing, leadForm, footer, contact, gallery,
  videoMoment, videos, scrollGallery(unused), meta`.
- `contact.phone` is a **placeholder** (`+972000000000`, TODO) — swap in the real
  phone/WhatsApp when the client provides it.

## Page structure — the cinematic redesign (CURRENT, live)

`src/App.tsx` renders **`VideoGate`** → **`Redesign`** (`components/redesign/Redesign.tsx`).
App holds a `ready` flag: the intro plays first, and `onDone` flips `ready`, which boots the
Lenis + ScrollTrigger scroll system for `#site`.

`Redesign` reading order (all in that one file; styling in `src/styles/redesign.css`, imported in
`main.tsx`): **Hero** (full-bleed photo, stacked gold title, media marquee, scroll cue) → **Statement**
→ **Bride (01)** → **Included (02)** → cinematic **PullBand** quote → **PerfectFor (03)** → **WhyUs (04)**
→ **KeywordBand** marquee → **Gallery (05)** (desktop: GSAP scroll-assembling collage; mobile: `.gmob`
mosaic) → **VideoFeature** → closing **PullBand** → **CtaForm** (giant CTA + lead form) → **Footer**,
plus a custom **Cursor** and `page-grain`. All copy lives in `copy.he.ts` → `rd` (no Hebrew in JSX).

The redesign was recreated from the handoff in `redesign-intro/design_handoff_challah_evening/`
(README + `app.jsx` + `site.css` — `site.css` was copied to `src/styles/redesign.css`; `#hero`
opacity was overridden to 1 since our gate reveals by fading itself out). **Lead form** posts to the
real `/api/lead` via `buildChallahLeadPayload` (field `name`s match it: `fullName, phone, eventType,
eventDate, city, hearAbout`).

`VideoGate` (`components/intro/VideoGate.tsx` + scoped `video-gate.css`) is the current intro: it
plays `public/videos/gate.mp4` full-bleed with cinematic overlays (warm grade, vignette, gold frame,
film grain, ken-burns) + centered branding, then fades out to reveal Hero on clip-end or skip.
Autoplays muted with a tap fallback (mobile); skipped under reduced-motion. Copy in `copy.he.ts` →
`introGate` (incl. `skip`). The older GSAP `GateIntro` (`components/intro/GateIntro.tsx` +
`gate-intro.css`) is kept but no longer rendered.

**Superseded:** the old Tailwind section components (`components/sections/*` — Hero, Intro, ForBride,
WhatsIncluded, Gallery, etc.) and their UI deps (`Section`, `Reveal`, `Button`, `FoilText`, `GoldDecor`,
`bento-grid`, `video-carousel`, `Lightbox`) are **no longer rendered** by `App.tsx`. They're dead code
kept for now — safe to delete once the redesign is signed off.

## Components

- `components/layout/Section.tsx` — section wrapper. Props: `bg` (default `bg-ivory`),
  `className`, `full`, **`decor`** (adds the gold floral backdrop). `Container.tsx` = 906px centered.
- `components/ui/GoldDecor.tsx` — soft gold backdrop: corner glows + a delicate gold
  quatrefoil pattern that **fades out toward the center** (radial mask) so it only frames
  edges, never sits behind text. Toggle per-section via `<Section decor>`. Currently on
  Intro, WhatsIncluded, Gallery, and the (custom) VideoGallery section.
- `components/ui/Lightbox.tsx` — click-to-zoom popout for images AND videos (Esc / arrows
  / click-out; RTL arrows). Reusable.
- `components/ui/video-carousel.tsx` — **3D coverflow** for videos (from 21st.dev, recolored).
  Only the centered clip plays (muted loop); sides show blurred posters. Auto-rotates,
  pauses on hover, reduced-motion safe. Center has an **expand** icon → opens the Lightbox
  (sound). Nav chevrons are flipped for RTL.
- `components/ui/bento-grid.tsx` — 21st.dev (kokonutd) bento, recolored to ivory+gold;
  status/tags/cta are optional. Used by **WhyUs** with lucide icons.
- `components/ui/Button.tsx` (gold gradient CTA, anchor), `FoilText.tsx` (gold shimmer,
  reduced-motion safe), `LogoBadge.tsx`.
- `components/motion/{Reveal.tsx,variants.ts}` — `<Reveal>` (fade+Y on view, once) and
  `<Reveal.Item>` for staggered lists (`staggerChildren: 0.08`).

**21st.dev integrations** were fetched from the shadcn registry (`https://21st.dev/r/<author>/<slug>`),
recolored to our tokens, pointed at framer-motion (not `motion/react`), and stripped of
shadcn-only primitives (the demo `Button` needs shadcn CSS vars we don't have).

## Imports / aliases

Use **relative imports** (`../../lib/utils`). There is **no `@/` alias** — the editor's
TS flags `baseUrl` as a deprecation error, so we removed it. `cn` lives at `src/lib/utils.ts`.

## RTL + motion rules

- `<html lang="he" dir="rtl">`. Tailwind **logical** utilities only: `ps-/pe-/ms-/me-/start-/end-`.
  Never `pl-/pr-/ml-/mr-`.
- Every animated component honors `useReducedMotion()` (Reveal, Button, FoilText,
  VideoCarousel, VideoMoment, Lightbox). Keep it calm — no bounce/large scale/rotate beyond the coverflow.

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
- Animation libs are **GSAP + ScrollTrigger + Lenis** (the redesign's motion system) and Framer Motion
  (gate only). Don't add another; don't use the `@/` alias.
- Don't decorate with emojis or default to a generic "AI" look — the client rejected both;
  prefer restraint, real typography, gold line-icons, whitespace.

## Project meta

- Git: private repo **github.com/TheSuperShyy/ronit-wedding** (`main` tracks `origin`).
- `.gitignore` excludes `node_modules`, `dist`, `.superpowers`.
- Docs: design spec + implementation plan in `docs/superpowers/`.
- User's email: clixteam579@gmail.com
</content>
