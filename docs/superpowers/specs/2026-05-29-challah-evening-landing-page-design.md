# Design Spec — Challah Separation Evening Landing Page ("Luminous Ceremony")

**Date:** 2026-05-29
**Client/Brand:** אור הצדיק – רונית ברש (Or HaTzadik – Ronit Barash)
**Project dir:** `c:\Users\SEIKYO\OneDrive\Desktop\ronit-wedding`
**Sister page (brand reference):** `../inbalel-website` (Uman / Tu B'Av trip, orhazadik brand)

## Purpose

A single-page Hebrew (RTL) landing page promoting Ronit Barash's **Challah Separation
evenings** (ערב הפרשת חלה) — luxury, emotional, women-only productions for brides,
Bat Mitzvahs, pre-birth blessings, and prayers for salvation/healing. Primary goal:
drive lead submissions via the "💍 תשרייני לי תאריך" (Reserve My Date) form.

The page must feel like a **sister** to the Uman page (same brand palette family, calm
spiritual mood) **without** being a reskin of it. It commits to its own bold aesthetic
direction, validated visually with the client: **"Luminous Ceremony."**

## Decisions (locked with client)

- **Language:** Hebrew only, RTL. (English deferred.)
- **Hero media:** The shofar-blow still photo, with slow-zoom + candle-glow + embers + foil overlay (no video hero for v1).
- **Form backend:** Spec'd to mirror the Uman page's `/api/lead` proxy → Ronit's backend (Challah board). Endpoint kept configurable. **TBD — pending client backend confirmation.** Not a build blocker.
- **Aesthetic direction:** "Luminous Ceremony" — approved via animated mockup.

## Aesthetic direction — "Luminous Ceremony"

Pearl/cream base, **candle-gold** as the dominant accent, espresso ink text. The events
photograph as bright, all-white and candlelit, so the page is **airier and lighter** than
the warm/earthy Uman page — this is the primary differentiator.

Signature, reusable elements (the page's memorable identity):
- **Gold-foil shimmer** on key headings (animated gradient text).
- **Arched "portal" photo frames** (chuppah / doorway motif), reused for hero overlay and section photos.
- **Atmosphere:** film grain + radial candle-glow washes instead of flat color fills.
- **Floating embers** rising in the hero.
- **Motion:** orchestrated staggered load in the hero; on-scroll reveals elsewhere. All motion honors `prefers-reduced-motion`.

Match implementation effort to vision: the hero is elaborate; interior sections are
restrained and precise (spacing, type hierarchy, subtle reveals).

## Stack

Mirror the Uman page for brand + engineering consistency:

- **Vite + React 18 + TypeScript** — SPA, no SSR, single page, no router (anchor scroll only).
- **Tailwind CSS** — all design tokens in `tailwind.config.ts`; no hardcoded hex in components.
- **Motion / Framer Motion** — reveal + hero choreography; built-in `useReducedMotion`.
- **Google Fonts:** `Frank Ruhl Libre` (display serif headings — the distinctive choice vs Uman's Assistant-only), `Assistant` (body), `Heebo` (small-caps labels).

## Design tokens

Extends the shared brand palette (consistency) with a candle-gold-forward accent set
for this page. All live in `tailwind.config.ts`.

| Token | Value | Purpose |
|---|---|---|
| `pearl` | `#f7f1e9` | primary page background |
| `pearl-2` | `#efe6da` | alt section background |
| `ink` | `#241a12` | deepest ink / hero base |
| `espresso` | `#3a2a1c` | headings on light sections |
| `ink-body` | `#2d2d2d` | body copy |
| `gold` | `#c8a45c` | dominant accent |
| `gold-lite` | `#e7cf9a` | foil highlight / borders |
| `gold-deep` | `#a07e3c` | small-label text |
| `taupe` | `#b89e8b` | bridges to Uman brand palette |

Fonts: `display = Frank Ruhl Libre`, `sans = Assistant`, `label = Heebo`.
Container max-width: 906px (brand standard). Mobile breakpoint: 600px.

## Page flow (sections, reading order)

1. **Hero** — shofar-blow photo; foil headline "ערב הפרשת חלה / שלא תשכחי בחיים"; kicker "אור הצדיק · רונית ברש"; subtitle; CTA "💍 תשרייני לי תאריך"; embers + glow + arch; staggered load.
2. **Intro** — "יש רגעים בחיים שמגיע להם יותר…" → יותר שמחה / קדושה / רגש / חוויה; brand promise line.
3. **For the bride** — "ערב הפרשת חלה לכלה 💍" / "לפני שאת נכנסת לחופה"; "fits everyone — דתיות / מסורתיות / חילוניות"; Ronit's light, warm, funny, connecting approach.
4. **What's included** — arched ceremony photo (dough-kneading) + gold-numbered list of all 8 items (host+shofar, sound system, 2 drummers, shofars, bride entrance carpet, ceremony, music/dancing, unforgettable experience) + "⏰ שעה וחצי עד שעתיים".
5. **Cinematic quote break** — "יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים ❤️" over a full-width candlelit photo overlay.
6. **Perfect for** — כלות / בת מצווה / ערב לקראת לידה / תפילות לישועה ורפואה / אירועים נשיים פרטיים.
7. **Why choose us** — אווירה יוקרתית / גישה קלילה / **20 שנות ניסיון** / מוזיקה ושמחה וחיבור / ליווי אישי וחם.
8. **Closing quote** band — "יש ערבים שלא שוכחים… ויש רגעים שנשארים בלב לכל החיים ❤️".
9. **Lead form** — fields: שם מלא, טלפון, סוג האירוע, תאריך האירוע, עיר, איך שמעת עלינו?; submit CTA "💍 תשרייני לי תאריך".
10. **Footer** — logo + contact (phone/WhatsApp).

## Component organization (mirrors Uman page)

- `src/components/sections/` — one file per page block in reading order (Hero → Footer).
- `src/components/ui/` — atoms: Button (gold shimmer CTA), ArchPhoto, Ornament, GrainOverlay, GlowField, Embers, Divider, LogoBadge.
- `src/components/layout/` — Section, Container.
- `src/components/motion/` — Reveal + variants (fade+Y, staggered children, hero orchestration).
- Keep files under ~120 lines; extract sub-components past that.

## Content authority

- `content/copy.he.md` — canonical human-readable Hebrew copy (client-supplied; wins on disagreement).
- `src/content/copy.he.ts` — typed export consumed by components. **No Hebrew strings in JSX.**

## Media pipeline

- Source: `דף נחיתה - הפרשות חלה/` (8 jpeg photos, 5 mp4 videos).
- Optimize photos → `public/images/*.webp` via a `sharp` script (pattern reused from Uman page).
- Hero = shofar-blow still. Ceremony (dough), dancing/drummers, crowd, table shots placed across sections.
- 5 videos retained for later (testimonials / cinematic interludes); not used in v1 hero.

## Form behavior

- `LeadForm` POSTs to `/api/lead` (Vercel Edge Function proxy), forwarding to Ronit's backend (Challah board). Endpoint in one config constant so it can be repointed.
- Reads `?ig_id=` / `?utm_source=` on mount; remaps field names to backend snake_case; translates Hebrew values where needed; state machine `idle | submitting | success | error` with per-state toast.
- Local dev with form: `npx vercel dev`. **Default behavior:** wire the same proxy as the Uman page, pointing at Ronit's Challah board, since the client believes it is the same. The endpoint lives in one config constant; if the client's backend confirmation differs, repoint that constant — no other changes needed.

## RTL rules

- `<html lang="he" dir="rtl">`.
- Logical Tailwind utilities only (`ps-/pe-/ms-/me-/start-/end-`); never `pl-/pr-/ml-/mr-`.
- Wrap LTR numerals/phone in `<bdi>` inside RTL paragraphs.

## Accessibility / performance

- `prefers-reduced-motion`: short-circuit all animations to static.
- Lazy-load non-hero imagery; `loading="lazy"`, explicit dimensions to avoid CLS.
- Sufficient contrast for gold text on light (use `gold-deep` for small text).

## Open items (non-blocking)

- **`CONTACT_PHONE`** — placeholder until client provides the phone/WhatsApp number (used in CTA links + footer).
- **Form backend** — confirm same as Uman; repoint the endpoint constant when confirmed.

## Out of scope (v1)

- English / bilingual version.
- Video hero.
- Router / additional pages.
- New animation libraries beyond Motion.

## Success criteria

- Visually distinct from the Uman page while clearly same brand.
- Renders the supplied Hebrew copy faithfully (no paraphrasing of client wording).
- Hero choreography + on-scroll reveals work and degrade under reduced-motion.
- Lead form captures all six fields and is ready to point at the live backend.
- Mobile (≤600px) layout holds; no horizontal scroll; no CLS from imagery.
