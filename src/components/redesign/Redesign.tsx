import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { buildChallahLeadPayload } from '../../lib/lead-payload';
import { meta, rd } from '../../content/copy.he';

/**
 * Cinematic "Felix-Nieto-inspired" landing page — recreated from the
 * design handoff (redesign-intro/design_handoff_challah_evening) in our
 * React + Vite + TS stack. Styling lives in src/styles/redesign.css; all
 * scroll motion is GSAP ScrollTrigger + Lenis smooth scroll (set up in
 * useRedesignScroll, gated on `ready` so it runs after the gate opens).
 */

const pad = (n: number) => ('0' + n).slice(-2);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/**
 * A media tile. Photos and most video tiles render as a still <img> (the .webp);
 * they carry `data-*` hooks so MediaFX can show a floating hover-preview (videos)
 * and a click-to-pop-out lightbox (photos + videos). `ambient` items (the hero /
 * feature bands) render the real looping muted <video> inline instead.
 * The mp4 path is derived from the poster (video-01.webp → video-01.mp4).
 */
function Media({ src, alt, video = false, ambient = false, pop = true, className }: { src: string; alt: string; video?: boolean; ambient?: boolean; pop?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const mp4 = video ? src.replace(/\.webp$/, '.mp4') : '';
  useEffect(() => {
    if (!ambient) return;
    const v = ref.current;
    if (!v) return;
    v.muted = true; // property + attribute: mobile checks both for muted autoplay
    v.setAttribute('muted', '');
    let settled = false;
    const removeGesture = () => {
      document.removeEventListener('pointerdown', onGesture);
      document.removeEventListener('touchstart', onGesture);
      document.removeEventListener('keydown', onGesture);
    };
    const tryPlay = () => {
      v.muted = true;
      const p = v.play();
      if (p && p.then) p.then(() => { settled = true; removeGesture(); }).catch(() => { /* blocked — wait for a gesture */ });
    };
    const onGesture = () => { if (!settled) tryPlay(); };
    // try immediately (and once data arrives); mobile usually blocks until the
    // first user interaction, so also play on the next tap/scroll/key
    if (v.readyState >= 2) tryPlay();
    else v.addEventListener('loadeddata', tryPlay, { once: true });
    document.addEventListener('pointerdown', onGesture, { passive: true });
    document.addEventListener('touchstart', onGesture, { passive: true });
    document.addEventListener('keydown', onGesture);
    return removeGesture;
  }, [ambient]);

  const data: Record<string, string> = { 'data-type': video ? 'video' : 'image', 'data-src': video ? mp4 : src };
  if (video) data['data-poster'] = src;
  if (pop) data['data-media'] = '';
  if (!ambient) data['data-hover'] = ''; // floating hover-preview target (photos + non-ambient videos)

  if (video && ambient) {
    return <video ref={ref} className={className} src={mp4} poster={src} muted loop playsInline autoPlay preload="metadata" aria-label={alt} disablePictureInPicture {...data} />;
  }
  return <img className={className} src={src} alt={alt} loading="lazy" {...data} />;
}

const COLLAGE = [
  { src: '/images/hero.webp', alt: 'תקיעת שופר', left: 1, top: 33, w: 25, z: 2, rot: -4, fx: -90, fy: 90, fr: -10, par: 46 },
  { src: '/videos/video-01.webp', alt: 'רגע חי מהערב', v: 1, left: 16, top: 22, w: 22, z: 4, rot: 3, fx: -40, fy: -120, fr: 8, par: -58 },
  { src: '/images/wide.webp', alt: 'רונית ברש מנחה', left: 30, top: 37, w: 29, z: 6, rot: -2, fx: 0, fy: 140, fr: -6, par: 30 },
  { src: '/videos/video-02.webp', alt: 'רגע חי מהערב', v: 1, left: 53, top: 20, w: 22, z: 5, rot: 4, fx: 40, fy: -130, fr: 10, par: -48 },
  { src: '/images/table.webp', alt: 'שולחן הטקס', left: 65, top: 35, w: 24, z: 3, rot: -3, fx: 90, fy: 100, fr: -8, par: 54 },
  { src: '/images/joy.webp', alt: 'שמחה וכפיים', left: 80, top: 24, w: 19, z: 2, rot: 5, fx: 120, fy: -80, fr: 12, par: -36 },
  { src: '/videos/video-03.webp', alt: 'רגע חי מהערב', v: 1, left: 40, top: 55, w: 23, z: 7, rot: 1, fx: 0, fy: 160, fr: 5, par: 24 },
];

function ViewLink({ href = '#lead-form', label }: { href?: string; label: string }) {
  return (
    <a className="viewlink" href={href}>
      <span className="vt">{label}</span>
      <span className="vmarq">
        <span className="run">{Array.from({ length: 10 }).map((_, i) => <span key={i}>{label}</span>)}</span>
      </span>
    </a>
  );
}

function Hero({ revealed }: { revealed: boolean }) {
  const down = () => {
    const t = document.querySelector('#site .after-hero') as HTMLElement | null;
    if (!t) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(t, { offset: 0 });
    else window.scrollTo({ top: t.offsetTop, behavior: 'smooth' });
  };
  return (
    <section id="hero" className={'eh' + (revealed ? ' eh-in' : '')} data-screen-label="Hero">
      <div className="hero-top">
        <img className="logo-badge" src="/images/logo.webp" alt="אור הצדיק · רונית ברש" />
        <span className="besd">{meta.besd}</span>
      </div>
      <div className="eh-grid">
        <div className="eh-text">
          <div className="eyebrow"><span className="ln" /><span>{rd.hero.eyebrow}</span></div>
          <h1 className="stacked eh-title">
            <span className="w">{rd.hero.words[0]}</span>
            <span className="w">{rd.hero.words[1]}</span>
            <span className="w gold">{rd.hero.words[2]}</span>
          </h1>
          <p className="eh-sub">{rd.hero.sub}</p>
          <div className="eh-actions">
            <a className="eh-cta" href="#lead-form">{rd.hero.cta}<span className="eh-cta-ar" aria-hidden /></a>
            <button className="eh-scroll-link" onClick={down}>{rd.hero.scroll}</button>
          </div>
        </div>
        <div className="eh-media">
          <Media src="/videos/video-02.webp" alt="רגע מהערב הפרשת חלה" video ambient pop={false} />
          <span className="eh-frame" aria-hidden />
          <span className="eh-tag">{rd.hero.eyebrow}</span>
        </div>
      </div>
      <button className="scroll-tag" onClick={down} aria-label={rd.hero.scroll}>
        <span>{rd.hero.scroll}</span>
        <span className="ch">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </span>
      </button>
    </section>
  );
}

function Statement() {
  return (
    <section className="collage after-hero" data-screen-label="Statement">
      <div className="container">
        <div className="marker reveal" style={{ marginBottom: 'clamp(22px,3vw,40px)' }}><span className="ln" />{rd.statement.marker}</div>
        <p className="cstatement">
          <span className="ln-mask"><span className="ln-in l1">{rd.statement.lines[0]}</span></span>
          <span className="ln-mask"><span className="ln-in l2">{rd.statement.lines[1]}</span></span>
        </p>
        <p className="copy lead reveal d2">{rd.statement.lead}</p>
      </div>
    </section>
  );
}

function Bride() {
  return (
    <section className="feature" data-screen-label="Bride">
      <div className="media"><img src="/images/pair.webp" alt="רגע מרגש בערב הפרשת חלה" /></div>
      <div className="veil" />
      <div className="fbody">
        <span className="num reveal">{rd.bride.num}</span>
        <h2 className="ftitle reveal d1">{rd.bride.title}</h2>
        <p className="frole reveal d1">{rd.bride.role}</p>
        <p className="fcopy reveal d2">{rd.bride.copy}</p>
        <div className="chips reveal d2">
          <span className="c">{rd.bride.chips[0]}</span><span className="dot" />
          <span className="c">{rd.bride.chips[1]}</span><span className="dot" />
          <span className="c">{rd.bride.chips[2]}</span>
        </div>
        <div className="reveal d3"><ViewLink label={rd.bride.cta} /></div>
      </div>
    </section>
  );
}

function Included() {
  return (
    <section className="sec alt" data-screen-label="Included">
      <div className="container">
        <div className="chead reveal"><span className="idx">{rd.included.idx}</span><div><div className="marker"><span className="ln" />{rd.included.marker}</div><h2 className="ttl">{rd.included.title}</h2></div></div>
        <figure className="incl-feat reveal">
          <img src="/images/ceremony.webp" alt="טקס הפרשת חלה — רגע של קדושה" loading="lazy" />
          <div className="veil" />
          <div className="fr" />
          <figcaption className="cap">{rd.included.caption}</figcaption>
        </figure>
        <div className="incl-cards">
          {rd.included.items.map((t, i) => (<div className="icard" key={i}><span className="n">{pad(i + 1)}</span><span className="t">{t}</span></div>))}
        </div>
        <div className="incl-foot reveal"><span className="duration">{rd.included.duration}</span></div>
      </div>
    </section>
  );
}

function PullBand({ img, label, children }: { img: string; label: string; children: ReactNode }) {
  return (
    <section className="pullband" data-screen-label={label}>
      <div className="bg" data-parallax style={{ backgroundImage: `url(${img})` }} />
      <div className="scrim" />
      <div className="inner reveal"><p className="q"><span className="mk">״</span>{children}</p></div>
    </section>
  );
}

function PerfectFor() {
  return (
    <section className="sec" data-screen-label="PerfectFor">
      <div className="container">
        <div className="chead reveal"><span className="idx">{rd.perfect.idx}</span><div><div className="marker"><span className="ln" />{rd.perfect.marker}</div><h2 className="ttl">{rd.perfect.title}</h2></div></div>
        <div className="numlist">
          {rd.perfect.items.map((x, i) => (<div className="numrow" key={i}><span className="n">{pad(i + 1)}</span><span className="x">{x}</span></div>))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="sec alt" data-screen-label="WhyUs">
      <div className="container">
        <div className="chead reveal"><span className="idx">{rd.why.idx}</span><div><div className="marker"><span className="ln" />{rd.why.marker}</div><h2 className="ttl">{rd.why.title}</h2></div></div>
        <div className="numlist cols-2">
          {rd.why.items.map(([t, d], i) => (<div className="numrow" key={i}><span className="n">{pad(i + 1)}</span><div><h3>{t}</h3><p>{d}</p></div></div>))}
        </div>
      </div>
    </section>
  );
}

function KeywordBand() {
  // repeat the set enough times that one half of the track always exceeds the
  // viewport (the translateX(-50%) loop is only seamless when one half >= screen)
  const items = Array.from({ length: 6 }, () => rd.keywords).flat();
  return (
    <section className="kwband" aria-hidden="true">
      <div className="kwtrack">{items.map((k, i) => (<div className="kw" key={i}><span>{k}</span><span className="st" /></div>))}</div>
    </section>
  );
}

// Mosaic video tile (mobile gallery): plays inline (ambient) since there is no
// hover-preview on touch. Tapping still pops it out with sound.
function VTile({ poster }: { poster: string }) {
  return (<div className="tile"><Media src={poster} alt="רגע חי מהערב" video ambient /><div className="ov" /><span className="vbadge">{rd.video}</span></div>);
}
function PTile({ src, alt, cls }: { src: string; alt: string; cls?: string }) {
  return (<div className={'tile ' + (cls || '')}><Media src={src} alt={alt} /><div className="ov" /></div>);
}

function Gallery() {
  return (
    <>
      <section className="sec gmob" data-screen-label="Gallery">
        <div className="container">
          <div className="chead reveal"><span className="idx">{rd.gallery.idx}</span><div><div className="marker"><span className="ln" />{rd.gallery.marker}</div><h2 className="ttl">{rd.gallery.title}</h2></div></div>
          <div className="mosaic reveal">
            <PTile src="/images/hero.webp" alt="תקיעת שופר" cls="t-a" />
            <VTile poster="/videos/video-01.webp" />
            <PTile src="/images/table.webp" alt="שולחן הטקס" cls="t-c" />
            <VTile poster="/videos/video-02.webp" />
            <PTile src="/images/wide.webp" alt="רונית ברש מנחה" cls="t-c" />
            <VTile poster="/videos/video-03.webp" />
            <PTile src="/images/joy.webp" alt="שמחה וכפיים" cls="t-c" />
            <VTile poster="/videos/video-04.webp" />
          </div>
        </div>
      </section>
      <section className="gcollage" id="gallery" data-screen-label="GalleryCollage">
        <div className="gcollage-pin">
          <div className="ghead"><div className="marker"><span className="ln" />{rd.gallery.marker}</div><h2 className="ttl">{rd.gallery.title}</h2></div>
          <div className="gstage">
            {COLLAGE.map((s, i) => (
              <figure className="gitem" key={i} style={{ left: s.left + '%', top: s.top + '%', width: s.w + '%', zIndex: s.z }} data-fx={s.fx} data-fy={s.fy} data-fr={s.fr} data-rot={s.rot} data-par={s.par}>
                <div className="ph"><Media src={s.src} alt={s.alt} video={!!s.v} />{s.v ? <span className="gvb"><PlayIcon />{rd.video}</span> : null}</div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function VideoFeature() {
  return (
    <section className="feature" data-screen-label="VideoMoment">
      <div className="media"><Media src="/videos/video-04.webp" alt="רגע מהערב" video ambient /></div>
      <div className="veil" />
      <div className="fbody">
        <span className="num reveal">{rd.videoMoment.num}</span>
        <h2 className="ftitle reveal d1">{rd.videoMoment.title}</h2>
        <p className="fcopy reveal d2">{rd.videoMoment.copy}</p>
        <div className="reveal d3"><ViewLink label={rd.videoMoment.cta} href="#gallery" /></div>
      </div>
    </section>
  );
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

function CtaForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const payload = buildChallahLeadPayload(new FormData(formEl), window.location.search);
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`submit failed (${res.status})`);
      setStatus('success');
      formEl.reset();
    } catch (err) {
      console.error('redesign lead submit failed', err);
      setStatus('error');
    }
  }

  const btnLabel = status === 'submitting' ? rd.form.submitting : status === 'success' ? rd.form.success : status === 'error' ? rd.form.error : rd.form.submit;

  return (
    <>
      <section className="cta-giant" data-screen-label="CTA">
        <div className="container">
          <h2 className="big">
            <span className="ln-mask"><span className="ln-in">{rd.cta.lines[0]}</span></span>
            <span className="ln-mask"><span className="ln-in gold">{rd.cta.lines[1]}</span></span>
          </h2>
          <p className="sub reveal d1">{rd.cta.sub}</p>
        </div>
      </section>
      <section id="lead-form" className="sec alt" data-screen-label="LeadForm">
        <div className="container">
          <div className="lead-grid">
            <div className="reveal"><div className="chead" style={{ gridTemplateColumns: '1fr' }}><div><div className="marker"><span className="ln" />{rd.form.marker}</div><h2 className="ttl">{rd.form.title}</h2></div></div></div>
            <form className="form-ed" onSubmit={onSubmit}>
              <div className="fgrid">
                <div className="fline"><label>{rd.form.labels.fullName}</label><input type="text" name="fullName" autoComplete="name" required /></div>
                <div className="fline"><label>{rd.form.labels.phone}</label><input type="tel" name="phone" inputMode="tel" autoComplete="tel" required /></div>
                <div className="fline"><label>{rd.form.labels.eventType}</label><select name="eventType">{rd.form.types.map((t) => <option key={t}>{t}</option>)}</select></div>
                <div className="fline"><label>{rd.form.labels.eventDate}</label><input type="date" name="eventDate" /></div>
                <div className="fline"><label>{rd.form.labels.city}</label><input type="text" name="city" autoComplete="address-level2" /></div>
                <div className="fline"><label>{rd.form.labels.hearAbout}</label><input type="text" name="hearAbout" /></div>
              </div>
              <button className="btn" type="submit" disabled={status === 'submitting'}><span className="lbl">{btnLabel}</span><span className="arrow" /></button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <img className="flogo" src="/images/logo.webp" alt="אור הצדיק · רונית ברש" />
      <div className="fbrand">{rd.footer.brand}</div>
      <div className="ftag">{rd.footer.tag}</div>
      <div className="frule" />
    </footer>
  );
}

type Pop = { type: 'image' | 'video'; src: string; poster?: string };

/**
 * Media interactions: on a fine pointer, hovering a photo or video tile shows a
 * floating preview window that follows the cursor (videos play muted); clicking
 * any photo or video tile opens it in a pop-out lightbox (video with sound).
 */
function MediaFX() {
  const [preview, setPreview] = useState<{ type: 'image' | 'video'; src: string } | null>(null);
  const [pop, setPop] = useState<Pop | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewVidRef = useRef<HTMLVideoElement>(null);
  const popVidRef = useRef<HTMLVideoElement>(null);
  const fine = typeof window !== 'undefined' && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  // floating hover-preview follows the cursor; shows the hovered video muted
  useEffect(() => {
    if (!fine) return;
    const el = previewRef.current;
    let raf = 0, x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      if (el) el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: Event) => {
      const t = (e.target as HTMLElement).closest?.('[data-hover]') as HTMLElement | null;
      if (t) setPreview({ type: t.getAttribute('data-type') === 'video' ? 'video' : 'image', src: t.getAttribute('data-src') || '' });
    };
    const out = (e: Event) => {
      const from = (e.target as HTMLElement).closest?.('[data-hover]');
      const to = (e as MouseEvent).relatedTarget as HTMLElement | null;
      if (from && !(to && to.closest && to.closest('[data-hover]'))) setPreview(null);
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
      cancelAnimationFrame(raf);
    };
  }, [fine]);

  // (re)play the preview video whenever a video is hovered
  useEffect(() => {
    if (!preview || preview.type !== 'video') return;
    const v = previewVidRef.current;
    if (!v) return;
    v.muted = true;
    try { v.currentTime = 0; } catch { /* ignore */ }
    const p = v.play(); if (p && p.catch) p.catch(() => { /* ignore */ });
  }, [preview]);

  // click any media tile → open the lightbox
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest?.('[data-media]') as HTMLElement | null;
      if (!t) return;
      e.preventDefault();
      setPreview(null);
      setPop({
        type: (t.getAttribute('data-type') as 'image' | 'video') || 'image',
        src: t.getAttribute('data-src') || '',
        poster: t.getAttribute('data-poster') || undefined,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // lightbox open: Esc to close + pause smooth scroll
  useEffect(() => {
    if (!pop) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPop(null); };
    document.addEventListener('keydown', onKey);
    const lenis = (window as any).__lenis; if (lenis && lenis.stop) lenis.stop();
    return () => {
      document.removeEventListener('keydown', onKey);
      const l = (window as any).__lenis; if (l && l.start) l.start();
    };
  }, [pop]);

  // play the popped-out video — the tap that opened it satisfies mobile autoplay;
  // if sound is blocked, fall back to muted so it still plays
  useEffect(() => {
    if (!pop || pop.type !== 'video') return;
    const v = popVidRef.current;
    if (!v) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => { v.muted = true; const p2 = v.play(); if (p2 && p2.catch) p2.catch(() => { /* ignore */ }); });
  }, [pop]);

  return (
    <>
      {fine && (
        <div className={'vpreview' + (preview ? ' show' : '')} ref={previewRef} aria-hidden>
          {preview && (preview.type === 'video'
            ? <video ref={previewVidRef} src={preview.src} muted loop playsInline preload="metadata" />
            : <img src={preview.src} alt="" />)}
          <span className="vpreview-tag">{rd.cursor}</span>
        </div>
      )}
      {pop && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setPop(null)}>
          <button className="lightbox-x" type="button" aria-label="סגירה" onClick={() => setPop(null)}>×</button>
          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            {pop.type === 'video'
              ? <video ref={popVidRef} src={pop.src} poster={pop.poster} controls autoPlay playsInline />
              : <img src={pop.src} alt="" />}
          </div>
        </div>
      )}
    </>
  );
}

// Scroll system: Lenis smooth scroll + all GSAP ScrollTrigger reveals/parallax.
// Gated on `ready` so it initialises after the gate opens (matching the handoff,
// which calls ScrollTrigger.refresh() once the gate unlocks the page).
function useRedesignScroll(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { gsap.set('#site .reveal', { autoAlpha: 1, y: 0 }); return; }

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    (window as any).__lenis = lenis;
    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('#site .reveal').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 38 }, { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      gsap.utils.toArray<HTMLElement>('.cstatement, .cta-giant').forEach((blk) => {
        const lines = blk.querySelectorAll('.ln-in');
        if (lines.length) gsap.from(lines, { yPercent: 118, duration: 1.15, ease: 'power4.out', stagger: 0.12, scrollTrigger: { trigger: blk, start: 'top 84%' } });
      });
      gsap.utils.toArray<HTMLElement>('.sec').forEach((sec) => {
        const rows = sec.querySelectorAll('.numrow');
        if (rows.length) gsap.from(rows, { autoAlpha: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: sec, start: 'top 80%' } });
      });
      gsap.utils.toArray<HTMLElement>('.incl-cards').forEach((grid) => {
        gsap.from(grid.querySelectorAll('.icard'), { autoAlpha: 0, y: 34, duration: 0.9, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: grid, start: 'top 82%' } });
      });
      gsap.utils.toArray<HTMLElement>('.form-ed').forEach((f) => {
        gsap.from(f.querySelectorAll('.fline, .btn'), { autoAlpha: 0, y: 26, duration: 0.8, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: f, start: 'top 84%' } });
      });
      if (matchMedia('(min-width:900px)').matches) {
        const stage = document.querySelector('.gcollage');
        if (stage) {
          const tlc = gsap.timeline({ scrollTrigger: { trigger: stage, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
          gsap.utils.toArray<HTMLElement>('.gcollage .gitem').forEach((el) => {
            const d = el.dataset;
            tlc.fromTo(el, { x: +d.fx!, y: +d.fy!, rotation: +d.fr!, scale: 0.82, autoAlpha: 0 }, { x: 0, y: 0, rotation: +d.rot!, scale: 1, autoAlpha: 1, ease: 'power2.out', duration: 0.5 }, 0)
              .to(el, { y: +d.par!, ease: 'none', duration: 0.5 }, 0.5);
          });
        }
      }
      gsap.utils.toArray<HTMLElement>('.feature').forEach((f) => {
        const img = f.querySelector('.media img, .media video');
        if (img) gsap.fromTo(img, { yPercent: -9 }, { yPercent: 9, ease: 'none', scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>('.pullband').forEach((p) => {
        const bg = p.querySelector('.bg');
        if (bg) gsap.fromTo(bg, { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      const ehm = document.querySelector('#hero .eh-media video, #hero .eh-media img');
      if (ehm) gsap.fromTo(ehm, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
    });

    const refresh = () => ScrollTrigger.refresh();
    const t0 = setTimeout(refresh, 100);
    const t1 = setTimeout(refresh, 800);
    addEventListener('load', refresh);

    return () => {
      clearTimeout(t0); clearTimeout(t1);
      removeEventListener('load', refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, [ready]);
}

export default function Redesign({ ready }: { ready: boolean }) {
  useRedesignScroll(ready);
  return (
    <>
      <main id="site">
        <Hero revealed={ready} />
        <Statement />
        <Bride />
        <Included />
        <PullBand img="/images/dance.webp" label="Quote">{rd.quote1}</PullBand>
        <PerfectFor />
        <WhyUs />
        <KeywordBand />
        <Gallery />
        <VideoFeature />
        <PullBand img="/images/joy.webp" label="Closing">{rd.quote2}</PullBand>
        <CtaForm />
        <Footer />
      </main>
      <div className="page-grain" />
      <MediaFX />
    </>
  );
}
