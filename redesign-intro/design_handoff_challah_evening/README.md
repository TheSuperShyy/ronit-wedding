# Handoff: ערב הפרשת חלה — Challah Evening landing page (cinematic redesign)

## Overview
A single-page, **Hebrew RTL** marketing site for "אור הצדיק · רונית ברש" Challah-separation evenings. It opens with a **golden wrought-iron gate intro** (GSAP) that swings open and flies through into the site, then a cinematic, motion-driven scrolling landing page (Felix-Nieto-inspired): huge stacked type, full-bleed photo/video chapter blocks, scroll-assembling photo collage, marquees, and a giant closing CTA. Theme is a warm **wedding** palette (ivory/champagne + deep gold + warm ink).

## About the design files
The files in this bundle are **design references built in HTML/JSX (in-browser React via Babel)** — a working prototype of the intended look and behavior, **not** production code to ship as-is. Your repo is **React + Vite + TypeScript + Tailwind**. The task is to **recreate these designs in that environment** using its patterns: split `app.jsx` into `src/components/*.tsx`, use the **npm** `gsap` + `lenis` packages (not the CDN tags in `index.html`), and either fold `site.css`/`gate.css` tokens into your Tailwind theme or import the CSS directly. `index.html` here is only the no-build preview shell — discard it for Vite.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion timings and interactions are all defined below and in the CSS. Recreate pixel-for-pixel; lift exact values from `site.css` / `gate.css`.

## Tech / libraries
- **React** (function components + hooks).
- **GSAP 3.12** + **ScrollTrigger** — all scroll animation, parallax, the gate timeline, the collage.
- **Lenis 1.1** — smooth/momentum scroll, wired to `ScrollTrigger.update` via `gsap.ticker`.
- Fonts: **Assistant** (Google Fonts, weights 400/500/600/700/800) for the entire site — headings, body, labels.
- RTL: `<html dir="rtl" lang="he">`. Use logical CSS props (`inset-inline-*`, `margin-inline-*`).

## Design tokens (from site.css `:root`)
```
--bg:#faf5ec;  --bg-2:#f2e9da;  --panel:#f2e9da;      /* ivory / champagne */
--ink:#2c2318; --ink-2:rgba(44,35,24,.64); --ink-3:rgba(44,35,24,.42);
--gold:#a9803a; --gold-soft:#bd9450;
--line:rgba(44,35,24,.14); --line-2:rgba(44,35,24,.26);
--soft:cubic-bezier(0.22,1,0.36,1);   /* standard easing */
--font:'Assistant',system-ui,sans-serif;
```
Gate intro uses its own darker tokens (see `gate.css`): bg ~`#0c0b09`, gold strokes `#ecd190` / `#f2d99a`.
Type scale: display/headlines `font-weight:800`, `letter-spacing:-.02em…-.04em`; section titles `clamp(34px,5.4vw,76px)`; hero stacked `clamp(44px,9vw,122px)`; body `clamp(16px,1.3vw,20px)/1.8`; labels Assistant 600, `letter-spacing:.28–.34em`, uppercase.

## Screens / sections (page order)
All flat (image-less) sections are LIGHT (ivory) with dark ink text; photo sections use dark overlays + white text.

1. **Gate intro** (`Gate`, `gate.css`) — fixed full-screen dark overlay over the whole site. A gold wrought-iron gate (two leaves + frame/posts/finials, built as SVG path strings via a `curl()` fiddlehead generator) with interlocking **wedding-rings** emblem, soft warm glow, embers, a "הקישי כדי להיכנס" label + pulsing gold line. On click/Enter: rings flare → leaves swing open (rotateY ±92°) → white light blooms → camera flies through (`scene` scale→9) → white flash → reveals hero; then `document.body.classList.remove('locked')` AND `ScrollTrigger.refresh()` (critical — positions were computed while scroll-locked). Total ~6.5s.
2. **Hero** — full-bleed `crowd.webp` bg + dark scrim; CENTER-aligned: gold eyebrow "אור הצדיק · רונית ברש", big stacked title `ערב / הפרשת / חלה` (last word gold foil-gradient), subline, an auto-scrolling **media marquee** strip (all photos+video stills, seamless via per-tile `margin-inline-start`), centered down-chevron scroll cue (smooth-scrolls to next section via `lenis.scrollTo`). Logo top corner, "בס״ד" other corner.
3. **Statement** (`Collage`) — light. Small gold marker "רגע אחד לעצור", then a big right-aligned two-line statement: "יש רגעים בחיים" (ink) / "שמגיע להם יותר." (gold). **Line-mask rise** GSAP reveal. Lead paragraph beneath.
4. **Bride (01)** (`Bride`, `.feature`) — full-bleed `pair.webp`, white text bottom: "01 — הכלה", huge "לכלה", role line, copy, chips (דתיות · מסורתיות · חילוניות), a pill **"view" hover-marquee** link (`ViewLink`) → #lead-form.
5. **What's included (02)** (`Included`) — light. Header, a wide cinematic `ceremony.webp` band (gold inner frame + caption), then a **4-up card grid** of 8 items, each card: big gold outline number that fills + lifts on hover; centered "משך הטקס · שעה וחצי עד שעתיים".
6. **Cinematic quote** (`PullBand` dance.webp) — full-bleed photo, dark scrim, big centered pull-quote with parallax bg.
7. **Perfect for (03)** (`PerfectFor`) — light numbered hairline list, staggered in.
8. **Why us (04)** (`WhyUs`) — light 2-column numbered list (title + desc), staggered.
9. **Keyword marquee** — auto-scrolling band: יוקרה · אור · מוזיקה · תפילה · שמחה · ריקודים · קדושה (diamond separators).
10. **Gallery (05)** (`Gallery`) — desktop: **scroll-assembling collage** (`.gcollage`, 300vh, sticky pin): 7 photo/video cards fly from scattered offsets, scale/rotate into an overlapping montage, then parallax-drift; pinned heading. Mobile/reduced-motion: clean `.mosaic` grid fallback.
11. **Video moment** (`VideoFeature`, `.feature`) — full-bleed `video-04.webp`, "להרגיש".
12. **Closing quote** (`PullBand` joy.webp).
13. **CTA + Lead form** (`CtaForm`) — giant stacked "תשרייני לי / תאריך" (line-mask rise), then a form (underline-style fields: name, phone, eventType select, date, city, referral) that staggers in; gold pill submit.
14. **Footer** — light, logo + "אור הצדיק – רונית ברש" + tagline.
15. **Custom cursor** — gold dot that grows into a "צפייה" disc over media/links; native cursor hidden on fine-pointer devices.

## Interactions & motion
- **Smooth scroll**: `const lenis = new Lenis({lerp:.085, smoothWheel:true}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t=>lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0);` Expose for the hero scroll cue.
- **Reveals**: `gsap.fromTo('.reveal',{autoAlpha:0,y:38},{autoAlpha:1,y:0,duration:1.05,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}})`.
- **Line-mask rise** (statement + CTA): each line wrapped `.ln-mask{overflow:hidden} > .ln-in`; `gsap.from('.ln-in',{yPercent:118,duration:1.15,ease:'power4.out',stagger:.12,scrollTrigger:{start:'top 84%'}})`.
- **Parallax** (scrub): `.feature .media img` and `.pullband .bg` → `yPercent -9→9` / `-12→12`; hero bg subtle. Images are sized >100% (e.g. `height:118%`) to avoid edge gaps.
- **Staggers**: `.numrow` per section, `.icard` grid, `.form-ed .fline/.btn`.
- **Collage**: timeline scrubbed over the 300vh section; per card `fromTo({x:fx,y:fy,rotation:fr,scale:.82,autoAlpha:0},{x:0,y:0,rotation:rot,scale:1,autoAlpha:1,duration:.5},0).to({y:par,duration:.5},.5)`. Card params (left/top/w/z/rot/fx/fy/fr/par) are in the `COLLAGE` array in `app.jsx`.
- **Reduced motion** (`prefers-reduced-motion`): skip all GSAP; set `.reveal` visible; collage falls back to static/grid.

## State
Minimal — no app state. Lead form is front-end only (on submit, swap button label to a success message); **wire to your real endpoint/CRM**. Gate has a one-shot `opened` flag. Slide/scroll position handled by Lenis/native.

## Assets (in `public/`)
- Images: `crowd, hero, ceremony, dance, table, wide, joy, pair, logo` (.webp) — logo is a transparent gold filigree mark.
- Videos: posters `video-01..05.webp` only (the `.mp4`s were too large to import here — **use your repo's real `.mp4`s** as `<video muted loop playsinline>` in the marquee/gallery/feature tiles).

## Files in this bundle
- `app.jsx` — all components + the `App` effect (Lenis + ScrollTrigger setup, reveals, parallax, collage). Split into `src/components/*.tsx`.
- `site.css` — full site styling + tokens.
- `gate.css` — gate intro styling + its (dark) tokens.
- `index.html` — preview shell only (CDN libs + Babel); not for the Vite build.
