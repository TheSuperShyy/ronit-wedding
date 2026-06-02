import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { introGate } from '../../content/copy.he';
import './gate-intro.css';

/**
 * Cinematic "gate" entrance overlay. A procedurally-drawn gold wrought-iron gate
 * sits over the page; the visitor taps to enter, the gate swings open, the camera
 * flies through a warm flash, and the overlay fades out to reveal the real Hero
 * underneath. GSAP-driven (the one exception to the Framer-Motion-only rule — this
 * timeline is too elaborate to reproduce otherwise). Honors reduced-motion by
 * skipping straight to the site.
 *
 * Adapted from the redesign-intro/ prototype.
 */
export default function GateIntro({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  // keep the latest onDone without re-running the (heavy) effect
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    // reduced motion: never animate, reveal the site immediately
    if (reduced) {
      doneRef.current();
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    const q = <T extends Element = HTMLElement>(sel: string) => root.querySelector(sel) as T | null;
    const scene = q('.gi-scene')!;
    const bgGlow = q('.gi-bg-glow')!;
    const bokehWrap = q('.gi-bokeh')!;
    const petalWrap = q('.gi-petals')!;
    const lightBehind = q('.gi-portal-light')!;
    const rays = q('.gi-rays')!;
    const halo = q('.gi-halo')!;
    const gate3d = q('.gi-gate3d')!;
    const gframe = q('.gi-gframe')!;
    const leafL = q('.gi-leaf-left')!;
    const leafR = q('.gi-leaf-right')!;
    const emblem = q('.gi-emblem')!;
    const knock = q('.gi-knock')!;
    const head = q('.gi-gate-head')!;
    const hint = q('.gi-hint')!;
    const hintLbl = q('.gi-hint .lbl')!;
    const ffWrap = q('.gi-fireflies')!;
    const flash = q('.gi-flash')!;

    // reset everything the open timeline mutates back to the closed/idle baseline,
    // so a stale remount (e.g. an HMR reload that fired mid-open) self-heals instead
    // of leaving the gate frozen open
    gsap.set(root, { opacity: 1 });
    gsap.set(scene, { scale: 1 });
    gsap.set([leafL, leafR], { rotateY: 0 });
    gsap.set(emblem, { opacity: 1, scale: 1 });
    gsap.set([head, hint, knock], { opacity: 1 });
    gsap.set(lightBehind, { opacity: 0.12, scale: 1 });
    gsap.set(flash, { opacity: 0 });

    // lock background scroll while the gate is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let alive = true; // guards the recursive ambient loops after unmount
    // fewer particles on phones — keeps the scene at 60fps on weaker GPUs
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const FLY_N = isMobile ? 8 : 18;
    const BOKEH_N = isMobile ? 8 : 18;
    const PETAL_N = isMobile ? 6 : 13;
    const flies: HTMLElement[] = [];
    const petals: HTMLElement[] = [];
    const bokeh: HTMLElement[] = [];
    const calls: gsap.core.Tween[] = []; // delayedCall handles to kill on cleanup

    /* ---------- iron-gate scrollwork generators ---------- */
    // anchored fiddlehead scroll → smooth curl path
    function curl(ax: number, ay: number, angDeg: number, size: number, dir: number) {
      const ba = (angDeg * Math.PI) / 180;
      const steps = 38;
      const turns = 1.3;
      const cx = ax + Math.cos(ba) * size;
      const cy = ay + Math.sin(ba) * size;
      const pts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const a = ba + Math.PI + dir * t * turns * 2 * Math.PI;
        const r = size * (1 - t);
        pts.push((cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1));
      }
      return '<path d="M' + pts.join(' L') + '"/>';
    }
    const P = (d: string, w?: number) => '<path d="' + d + '" stroke-width="' + (w || 2.4) + '"/>';
    const C = (x: number, y: number, r?: number) =>
      '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (r || 4) + '" fill="#f2d99a" stroke="none"/>';

    function buildLeaf(side: 'left' | 'right') {
      const W = 252;
      const H = 760;
      const right = side === 'right';
      const fx = (x: number) => (right ? x : W - x);
      const fd = (d: number) => (right ? d : -d);
      let s = '';
      // arched top rail (high at seam x≈4, lower at hinge x≈248)
      s += P('M' + fx(4) + ',150 Q' + fx(126) + ',114 ' + fx(248) + ',236', 3.4);
      s += P('M' + fx(16) + ',168 Q' + fx(126) + ',138 ' + fx(236) + ',244', 1.8);
      // straight spring-line rail where the bars begin
      s += P('M' + fx(4) + ',300 L' + fx(248) + ',300', 3);
      // edges + base rail
      s += P('M' + fx(4) + ',150 L' + fx(4) + ',706', 3.4);
      s += P('M' + fx(248) + ',236 L' + fx(248) + ',706', 3.4);
      s += P('M' + fx(4) + ',706 L' + fx(248) + ',706', 3.4);
      // scrollwork filling the arched lunette
      for (let i = 0; i < 4; i++) {
        const t = (i + 0.5) / 4;
        const x = 10 + t * 232;
        s += '<g stroke-width="2">' + curl(fx(x), 300, -90, 22, fd(i % 2 ? 1 : -1)) + '</g>';
      }
      // small rings dotted along the arch rail
      for (let i = 0; i < 6; i++) {
        const t = i / 5;
        s += C(fx(4 + t * 244), 150 + t * 86, 3.4);
      }
      // vertical bars
      const n = 8;
      for (let i = 0; i < n; i++) {
        const bx = 18 + i * ((234 - 18) / (n - 1));
        s += P('M' + fx(bx) + ',300 L' + fx(bx) + ',660', 2.8);
      }
      // bottom scroll frieze (facing curls)
      for (let i = 0; i < 3; i++) {
        const gx = 40 + i * 86;
        s += '<g stroke-width="2.2">' + curl(fx(gx), 660, -90, 16, fd(1)) + curl(fx(gx + 34), 660, -90, 16, fd(-1)) + '</g>';
      }
      return (
        '<svg viewBox="0 0 ' + W + ' ' + H +
        '" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#ecd190" stroke-linecap="round" stroke-linejoin="round">' +
        s + '</svg>'
      );
    }

    function buildFrame() {
      const W = 600;
      const H = 760;
      let s = '';
      // grand top arch spanning both posts
      s += P('M48,252 Q300,86 552,252', 4);
      s += P('M48,252 Q300,114 552,252', 2);
      // rings along the arch
      for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const mt = 1 - t;
        const x = mt * mt * 48 + 2 * mt * t * 300 + t * t * 552;
        const y = mt * mt * 252 + 2 * mt * t * 86 + t * t * 252;
        s += C(x, y - 2, 3.6);
      }
      // crown palmette above the arch peak
      s += P('M300,150 L300,96', 2);
      s += P('M300,96 C282,78 282,52 300,34 C318,52 318,78 300,96', 2.4);
      s += P('M300,128 C262,118 246,80 262,50', 2);
      s += P('M300,128 C338,118 354,80 338,50', 2);
      s += '<g stroke-width="1.8">' + curl(262, 50, 150, 12, 1) + curl(338, 50, 30, 12, -1) + '</g>';
      s += C(300, 30, 4);
      // side posts with finials
      function post(cx: number) {
        let t = '';
        t += P('M' + (cx - 12) + ',252 L' + (cx - 12) + ',720', 3);
        t += P('M' + (cx + 12) + ',252 L' + (cx + 12) + ',720', 3);
        for (let y = 300; y <= 690; y += 78) {
          t += P('M' + (cx - 12) + ',' + y + ' L' + (cx + 12) + ',' + y, 1.4);
        }
        // finial
        t += P('M' + cx + ',252 L' + cx + ',214', 2.4);
        t += P('M' + (cx - 14) + ',214 C' + (cx - 14) + ',194 ' + (cx + 14) + ',194 ' + (cx + 14) + ',214', 2);
        t += P('M' + cx + ',214 L' + cx + ',188', 2);
        t += P('M' + (cx - 9) + ',176 L' + cx + ',188 L' + (cx + 9) + ',176 L' + cx + ',164 Z', 1.8);
        t += '<g stroke-width="1.5">' + curl(cx - 13, 198, 180, 10, 1) + curl(cx + 13, 198, 0, 10, -1) + '</g>';
        return t;
      }
      s += post(30);
      s += post(570);
      // base ground rail
      s += P('M30,720 L570,720', 3);
      return (
        '<svg viewBox="0 0 ' + W + ' ' + H +
        '" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#ecd190" stroke-linecap="round" stroke-linejoin="round">' +
        s + '</svg>'
      );
    }

    leafL.innerHTML = buildLeaf('left');
    leafR.innerHTML = buildLeaf('right');
    gframe.innerHTML = buildFrame();

    /* ---------- embers (warm sparks rising) ---------- */
    for (let i = 0; i < FLY_N; i++) {
      const f = document.createElement('div');
      f.className = 'ff';
      const sz = 3 + Math.random() * 3;
      f.style.width = f.style.height = sz + 'px';
      f.style.left = Math.random() * 100 + '%';
      ffWrap.appendChild(f);
      flies.push(f);
      const rise = () => {
        if (!alive) return;
        gsap.set(f, { x: 0, y: 0, top: 78 + Math.random() * 26 + '%', opacity: 0, scale: 0.6 + Math.random() * 0.8 });
        const dur = 7 + Math.random() * 5;
        gsap.to(f, { y: -(window.innerHeight * 0.66 + Math.random() * 120), x: (Math.random() * 2 - 1) * 60, duration: dur, ease: 'sine.inOut', onComplete: rise });
        gsap.to(f, { opacity: 0.85, duration: 1.5, delay: 0.2 });
        gsap.to(f, { opacity: 0, duration: 1.9, delay: Math.max(0.6, dur - 2) });
      };
      calls.push(gsap.delayedCall(Math.random() * 7, rise));
    }

    /* ---------- bokeh ---------- */
    for (let i = 0; i < BOKEH_N; i++) {
      const b = document.createElement('div');
      b.className = 'bokeh';
      const sz = 18 + Math.random() * 70;
      b.style.width = b.style.height = sz + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.top = Math.random() * 100 + '%';
      bokehWrap.appendChild(b);
      bokeh.push(b);
      gsap.set(b, { opacity: 0.07 + Math.random() * 0.2 });
      gsap.to(b, { opacity: 0.28 + Math.random() * 0.32, duration: 3.5 + Math.random() * 4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 4 });
      gsap.to(b, { x: (Math.random() * 2 - 1) * 70, y: (Math.random() * 2 - 1) * 52, duration: 14 + Math.random() * 10, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random() * 5 });
    }

    /* ---------- petals ---------- */
    for (let i = 0; i < PETAL_N; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      petalWrap.appendChild(p);
      petals.push(p);
      const fall = () => {
        if (!alive) return;
        // animate `y` (transform, GPU-composited) instead of `top` (triggers layout every frame)
        const travel = window.innerHeight * 1.14;
        gsap.set(p, { left: Math.random() * 100 + '%', top: '-6%', y: 0, opacity: 0, rotation: Math.random() * 360, scale: 0.7 + Math.random() * 0.7 });
        const dur = 15 + Math.random() * 11;
        gsap.to(p, { y: travel, duration: dur, ease: 'none', onComplete: fall });
        gsap.to(p, { x: (Math.random() * 2 - 1) * 80, duration: dur / 2, repeat: 1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(p, { rotation: '+=160', duration: dur, ease: 'none' });
        gsap.to(p, { opacity: 0.6, duration: 2.4, delay: 0.3 });
        gsap.to(p, { opacity: 0, duration: 2.6, delay: Math.max(0.5, dur - 3) });
      };
      calls.push(gsap.delayedCall(Math.random() * 12, fall));
    }

    /* ---------- idle invitation ---------- */
    gsap.to(halo, { scale: 1.06, opacity: 0.46, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(emblem, { scale: 1.04, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 50%' });
    gsap.fromTo(knock, { scale: 0.9, opacity: 0.35 }, { scale: 1.5, opacity: 0, duration: 4.4, repeat: -1, ease: 'sine.out' });
    gsap.fromTo(head, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.8, delay: 0.4, ease: 'power2.out' });
    gsap.fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 1.6, delay: 1, ease: 'power2.out' });
    gsap.to(hintLbl, { opacity: 0.6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.4 });

    /* continuous, slow "alive" motion */
    gsap.to(bgGlow, { scale: 1.07, opacity: 0.8, duration: 7.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(rays, { rotation: 360, duration: 130, repeat: -1, ease: 'none' });
    gsap.to(rays, { opacity: 0.3, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(scene, { scale: 1.012, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    /* ---------- OPEN: swing the gate, fly through the white light, reveal the site ---------- */
    let openTl: gsap.core.Timeline | null = null;
    let opened = false;
    function enter() {
      if (opened || !alive) return;
      opened = true;
      root!.style.cursor = 'default';
      gsap.killTweensOf([scene, halo, emblem, knock, bgGlow, rays, gate3d, hintLbl, ...flies]);

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      openTl = tl;

      // 1 — the rings glow, the invitation clears
      tl.to(emblem, { scale: 1.4, duration: 1.1, ease: 'power2.out', transformOrigin: '50% 50%' }, 0)
        .to(halo, { scale: 1.3, opacity: 0.7, duration: 1.3, ease: 'power2.out' }, 0)
        .to([head, hint, knock], { opacity: 0, duration: 1.0, ease: 'power1.inOut' }, 0.2)
        .to(emblem, { opacity: 0, scale: 0.5, duration: 0.9, ease: 'power2.in' }, 0.95);

      // 2 — the gate swings open with weight, light pours through the opening
      tl.to(leafR, { rotateY: 92, duration: 2.5, ease: 'power3.inOut' }, 0.9)
        .to(leafL, { rotateY: -92, duration: 2.5, ease: 'power3.inOut' }, 0.9)
        .to(lightBehind, { opacity: 1, scale: 1.45, duration: 2.4, ease: 'power2.in' }, 1.2)
        .to(halo, { opacity: 0.9, scale: 1.7, duration: 2.5, ease: 'power2.in' }, 1.2);

      flies.forEach((f) => {
        tl.to(f, { x: (Math.random() * 2 - 1) * window.innerWidth * 0.5, y: (Math.random() * 2 - 1) * window.innerHeight * 0.5, scale: 1.8, opacity: 0, duration: 2.6, ease: 'power1.in' }, 1.6);
      });

      // 3 — the camera rushes through the open gate
      tl.to(scene, { scale: 9, duration: 2.8, ease: 'expo.in' }, 2.9);
      // 4 — a blinding white light floods in as we fly through, peaking with the zoom
      tl.to(flash, { opacity: 1, duration: 1.9, ease: 'power2.in' }, 4.0);
      // 5 — emerge from the white into the real hero behind
      tl.to(root, { opacity: 0, duration: 1.7, ease: 'power2.inOut' }, 6.1)
        .add(() => {
          if (alive) doneRef.current();
        }, 7.8);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        enter();
      }
    }
    root.addEventListener('click', enter);
    root.addEventListener('keydown', onKey);

    return () => {
      alive = false;
      document.body.style.overflow = prevOverflow;
      root.removeEventListener('click', enter);
      root.removeEventListener('keydown', onKey);
      openTl?.kill();
      calls.forEach((c) => c.kill());
      gsap.killTweensOf([scene, bgGlow, lightBehind, rays, halo, gate3d, leafL, leafR, emblem, knock, head, hint, hintLbl, flash, ...flies, ...petals, ...bokeh]);
      // remove dynamically-appended particles so they don't accumulate on remount
      [...flies, ...petals, ...bokeh].forEach((el) => el.remove());
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div ref={rootRef} className="gate-intro" role="button" tabIndex={0} aria-label={introGate.aria}>
      <div className="gi-scene">
        <div className="gi-bg-glow" />
        <div className="golddecor">
          <div className="gc1" />
          <div className="gc2" />
          <div className="floret" />
        </div>
        <div className="gi-bokeh" />
        <div className="gi-petals" />
        <div className="foliage" />

        <div className="gi-portal">
          <div className="gi-portal-light" />
        </div>
        <div className="gi-rays" />
        <div className="gi-halo" />

        <div className="gi-gate3d">
          <div className="gi-gframe" />
          <div className="gi-leaf gi-leaf-left" />
          <div className="gi-leaf gi-leaf-right" />
          <div className="gi-emblem">
            <svg viewBox="0 0 150 96" fill="none" stroke="#ecd190" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="60" cy="54" r="30" />
              <circle cx="90" cy="54" r="30" />
              <path d="M75 8 l3.4 7 7 3.4 -7 3.4 -3.4 7 -3.4-7 -7-3.4 7-3.4z" fill="#f2d99a" stroke="none" />
            </svg>
          </div>
          <div className="gi-knock" />
        </div>

        <div className="path" />
        <div className="vignette" />

        <div className="gi-gate-head">
          <div className="ev">{introGate.brand}</div>
          <h2>
            {introGate.titleLead}
            <br />
            <span className="g">{introGate.titleAccent}</span>
          </h2>
        </div>
        <div className="gi-hint">
          <div className="lbl">{introGate.enter}</div>
          <div className="sub">{introGate.enterSub}</div>
        </div>

        <div className="gi-fireflies" />
        <div className="grain" />
      </div>
      <div className="gi-flash" />
    </div>
  );
}
