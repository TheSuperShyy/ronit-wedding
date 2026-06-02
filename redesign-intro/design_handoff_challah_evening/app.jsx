/* global React, ReactDOM, gsap */
const { useEffect } = React;
const pad = (n) => ("0" + n).slice(-2);
const PlayIcon = () => (<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>);

function ViewLink({ href = "#lead-form", label = "להזמנה" }) {
  return (
    <a className="viewlink" href={href}>
      <span className="vt">{label}</span>
      <span className="vmarq"><span className="run">{Array.from({ length: 10 }).map((_, i) => <span key={i}>{label}</span>)}</span></span>
    </a>
  );
}

const HERO_MEDIA = [
  { s: "public/images/crowd.webp" }, { s: "public/images/pair.webp" }, { s: "public/videos/video-01.webp", v: 1 },
  { s: "public/images/ceremony.webp" }, { s: "public/videos/video-02.webp", v: 1 }, { s: "public/images/dance.webp" },
  { s: "public/images/hero.webp" }, { s: "public/videos/video-03.webp", v: 1 }, { s: "public/images/table.webp" },
  { s: "public/images/wide.webp" }, { s: "public/videos/video-05.webp", v: 1 }, { s: "public/images/joy.webp" },
  { s: "public/videos/video-04.webp", v: 1 },
];
const INCLUDED = [
  "הנחיה מלאה של רונית ברש, המגיעה עם שופר", "מערכת הגברה מקצועית", "צוות של שתי מתופפות מקצועיות",
  "שופרות ואווירה עוצמתית", "שטיח כניסה חגיגי לכלה", "טקס הפרשת חלה מרגש ומיוחד",
  "מוזיקה, שמחה וריקודים", "חוויה נשית בלתי נשכחת",
];
const PERFECT = ["כלות לפני חתונה", "ערבי בת מצווה", "ערב לקראת לידה", "תפילות לישועה ורפואה", "אירועים נשיים פרטיים"];
const WHY = [
  ["אווירה יוקרתית ומרגשת", "כל פרט מעוצב בקפידה כדי שתרגישי מיוחדת."],
  ["גישה קלילה שמתאימה לכולן", "דתיות, מסורתיות וחילוניות — כולן מרגישות חלק."],
  ["עשרים שנות ניסיון בהפקות", "ניסיון עשיר שמבטיח ערב חלק ומושלם."],
  ["מוזיקה, ריקודים וחיבור אמיתי", "אנרגיה שממלאת את הלב ומחברת בין כולן."],
  ["ליווי אישי וחם", "מהשיחה הראשונה ועד הרגע האחרון — איתך."],
];
const KEYWORDS = ["יוקרה", "אור", "מוזיקה", "תפילה", "שמחה", "ריקודים", "קדושה"];

function Hero() {
  const down = () => { const t = document.querySelector("#site .after-hero"); if (!t) return; if (window.__lenis) window.__lenis.scrollTo(t, { offset: 0 }); else window.scrollTo({ top: t.offsetTop, behavior: "smooth" }); };
  const tiles = HERO_MEDIA.concat(HERO_MEDIA);
  return (
    <section id="hero" data-screen-label="Hero">
      <div className="hero-bg" style={{ backgroundImage: "url(public/images/crowd.webp)" }}></div>
      <div className="hero-top">
        <img className="logo-badge" src="public/images/logo.webp" alt="אור הצדיק · רונית ברש" />
        <span className="besd">בס״ד</span>
      </div>
      <div className="hero-inner">
        <div className="eyebrow"><span className="ln"></span><span>אור הצדיק · רונית ברש</span></div>
        <h1 className="stacked"><span className="w">ערב</span><span className="w">הפרשת</span><span className="w gold">חלה</span></h1>
        <p className="hero-sub">שלא תשכחי בחיים — ערב נשי יוקרתי, עטוף באור, במוזיקה, בתפילה ובשמחה.</p>
      </div>
      <div className="hero-strip">
        <div className="marquee"><div className="marquee-track">
          {tiles.map((m, i) => (<div className="m-tile" key={i}><img src={m.s} alt="רגע מהערב" loading="lazy" />{m.v ? <span className="vb"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>וידאו</span> : null}</div>))}
        </div></div>
      </div>
      <button className="scroll-tag" onClick={down} aria-label="גללי"><span>גללי</span><span className="ch"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg></span></button>
    </section>
  );
}

function Collage() {
  return (
    <section className="collage after-hero" data-screen-label="Statement">
      <div className="container">
        <div className="marker reveal" style={{ marginBottom: "clamp(22px,3vw,40px)" }}><span className="ln"></span>רגע אחד לעצור</div>
        <p className="cstatement"><span className="ln-mask"><span className="ln-in l1">יש רגעים בחיים</span></span><span className="ln-mask"><span className="ln-in l2">שמגיע להם יותר.</span></span></p>
        <p className="copy lead reveal d2">אנחנו ב״אור הצדיק – רונית ברש״ מפיקות ערבי הפרשת חלה מרגשים ויוקרתיים — אווירה מיוחדת, מוזיקה, תפילות ושמחה נשית שמרחיבה את הלב.</p>
      </div>
    </section>
  );
}

function Bride() {
  return (
    <section className="feature" data-screen-label="Bride">
      <div className="media"><img src="public/images/pair.webp" alt="רגע מרגש בערב הפרשת חלה" /></div>
      <div className="veil"></div>
      <div className="fbody">
        <span className="num reveal">01 — הכלה</span>
        <h2 className="ftitle reveal d1">לכלה</h2>
        <p className="frole reveal d1">ערב הפרשת חלה לכלה</p>
        <p className="fcopy reveal d2">לפני שאת נכנסת לחופה — רגע אחד לעצור, להתרגש, להתפלל ולהיות עטופה באהבה. ערב נשי, שמח ומרגש במיוחד.</p>
        <div className="chips reveal d2"><span className="c">דתיות</span><span className="dot"></span><span className="c">מסורתיות</span><span className="dot"></span><span className="c">חילוניות</span></div>
        <div className="reveal d3"><ViewLink label="להזמנת ערב" /></div>
      </div>
    </section>
  );
}

function Included() {
  return (
    <section className="sec alt" data-screen-label="Included">
      <div className="container">
        <div className="chead reveal"><span className="idx">02</span><div><div className="marker"><span className="ln"></span>חוויה מלאה מתחילתה ועד סופה</div><h2 className="ttl">מה כולל הערב</h2></div></div>
        <figure className="incl-feat reveal">
          <img src="public/images/ceremony.webp" alt="טקס הפרשת חלה — רגע של קדושה" loading="lazy" />
          <div className="veil"></div>
          <div className="fr"></div>
          <figcaption className="cap">טקס הפרשת חלה · רגע של קדושה</figcaption>
        </figure>
        <div className="incl-cards">
          {INCLUDED.map((t, i) => (<div className="icard" key={i}><span className="n">{pad(i + 1)}</span><span className="t">{t}</span></div>))}
        </div>
        <div className="incl-foot reveal"><span className="duration">משך הטקס · שעה וחצי עד שעתיים</span></div>
      </div>
    </section>
  );
}

function PullBand({ img, label, children }) {
  return (
    <section className="pullband" data-screen-label={label}>
      <div className="bg" data-parallax style={{ backgroundImage: `url(${img})` }}></div>
      <div className="scrim"></div>
      <div className="inner reveal"><p className="q"><span className="mk">״</span>{children}</p></div>
    </section>
  );
}

function PerfectFor() {
  return (
    <section className="sec" data-screen-label="PerfectFor">
      <div className="container">
        <div className="chead reveal"><span className="idx">03</span><div><div className="marker"><span className="ln"></span>כל רגע שמגיע לו אור</div><h2 className="ttl">מתאים במיוחד עבור</h2></div></div>
        <div className="numlist">
          {PERFECT.map((x, i) => (<div className="numrow" key={i}><span className="n">{pad(i + 1)}</span><span className="x">{x}</span></div>))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="sec alt" data-screen-label="WhyUs">
      <div className="container">
        <div className="chead reveal"><span className="idx">04</span><div><div className="marker"><span className="ln"></span>למה כולן מדברות על הערבים של רונית</div><h2 className="ttl">למה דווקא אנחנו</h2></div></div>
        <div className="numlist cols-2">
          {WHY.map(([t, d], i) => (<div className="numrow" key={i}><span className="n">{pad(i + 1)}</span><div><h3>{t}</h3><p>{d}</p></div></div>))}
        </div>
      </div>
    </section>
  );
}

function KeywordBand() {
  const items = KEYWORDS.concat(KEYWORDS);
  return (
    <section className="kwband" aria-hidden="true">
      <div className="kwtrack">{items.map((k, i) => (<div className="kw" key={i}><span>{k}</span><span className="st"></span></div>))}</div>
    </section>
  );
}

function VTile({ poster }) {
  return (<div className="tile"><img src={poster} alt="רגע חי מהערב" loading="lazy" /><div className="ov"></div><span className="vbadge">וידאו</span><div className="play"><span className="pb"><PlayIcon /></span></div></div>);
}
function PTile({ src, alt, cls }) {
  return (<div className={"tile " + (cls || "")}><img src={src} alt={alt} loading="lazy" /><div className="ov"></div></div>);
}

const COLLAGE = [
  { src: "public/images/hero.webp", alt: "תקיעת שופר", left: 1, top: 33, w: 25, z: 2, rot: -4, fx: -90, fy: 90, fr: -10, par: 46 },
  { src: "public/videos/video-01.webp", alt: "רגע חי מהערב", v: 1, left: 16, top: 22, w: 22, z: 4, rot: 3, fx: -40, fy: -120, fr: 8, par: -58 },
  { src: "public/images/wide.webp", alt: "רונית ברש מנחה", left: 30, top: 37, w: 29, z: 6, rot: -2, fx: 0, fy: 140, fr: -6, par: 30 },
  { src: "public/videos/video-02.webp", alt: "רגע חי מהערב", v: 1, left: 53, top: 20, w: 22, z: 5, rot: 4, fx: 40, fy: -130, fr: 10, par: -48 },
  { src: "public/images/table.webp", alt: "שולחן הטקס", left: 65, top: 35, w: 24, z: 3, rot: -3, fx: 90, fy: 100, fr: -8, par: 54 },
  { src: "public/images/joy.webp", alt: "שמחה וכפיים", left: 80, top: 24, w: 19, z: 2, rot: 5, fx: 120, fy: -80, fr: 12, par: -36 },
  { src: "public/videos/video-03.webp", alt: "רגע חי מהערב", v: 1, left: 40, top: 55, w: 23, z: 7, rot: 1, fx: 0, fy: 160, fr: 5, par: 24 },
];
function Gallery() {
  return (
    <React.Fragment>
      <section className="sec gmob" data-screen-label="Gallery">
        <div className="container">
          <div className="chead reveal"><span className="idx">05</span><div><div className="marker"><span className="ln"></span>רגעים מהערב</div><h2 className="ttl">תמונות וסרטונים</h2></div></div>
          <div className="mosaic reveal">
            <PTile src="public/images/hero.webp" alt="תקיעת שופר" cls="t-a" />
            <VTile poster="public/videos/video-01.webp" />
            <PTile src="public/images/table.webp" alt="שולחן הטקס" cls="t-c" />
            <VTile poster="public/videos/video-02.webp" />
            <PTile src="public/images/wide.webp" alt="רונית ברש מנחה" cls="t-c" />
            <VTile poster="public/videos/video-03.webp" />
            <PTile src="public/images/joy.webp" alt="שמחה וכפיים" cls="t-c" />
            <VTile poster="public/videos/video-05.webp" />
          </div>
        </div>
      </section>
      <section className="gcollage" id="gallery" data-screen-label="GalleryCollage">
        <div className="gcollage-pin">
          <div className="ghead"><div className="marker"><span className="ln"></span>רגעים מהערב</div><h2 className="ttl">תמונות וסרטונים</h2></div>
          <div className="gstage">
            {COLLAGE.map((s, i) => (
              <figure className="gitem" key={i} style={{ left: s.left + "%", top: s.top + "%", width: s.w + "%", zIndex: s.z }} data-fx={s.fx} data-fy={s.fy} data-fr={s.fr} data-rot={s.rot} data-par={s.par}>
                <div className="ph"><img src={s.src} alt={s.alt} loading="lazy" />{s.v ? <span className="gvb"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>וידאו</span> : null}</div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function VideoFeature() {
  return (
    <section className="feature" data-screen-label="VideoMoment">
      <div className="media"><img src="public/videos/video-04.webp" alt="רגע מהערב" /></div>
      <div className="veil"></div>
      <div className="fbody">
        <span className="num reveal">רגע מהערב</span>
        <h2 className="ftitle reveal d1">להרגיש</h2>
        <p className="fcopy reveal d2">כי יש רגעים שצריך פשוט להרגיש — צחוק, דמעות של התרגשות, תפילות מהלב ורגעים שנשארים לכל החיים.</p>
        <div className="reveal d3"><ViewLink label="לצפייה בסרטון" href="#gallery" /></div>
      </div>
    </section>
  );
}

function CtaForm() {
  const onSubmit = (e) => { e.preventDefault(); const b = e.currentTarget.querySelector(".btn .lbl"); if (b) b.textContent = "נשלח! נחזור אליך בהקדם"; };
  return (
    <React.Fragment>
      <section className="cta-giant" data-screen-label="CTA">
        <div className="container">
          <h2 className="big"><span className="ln-mask"><span className="ln-in">תשרייני לי</span></span><span className="ln-mask"><span className="ln-in gold">תאריך</span></span></h2>
          <p className="sub reveal d1">ערב אחד שלא תשכחי בחיים. נחזור אליך בהקדם לתיאום.</p>
        </div>
      </section>
      <section id="lead-form" className="sec alt" data-screen-label="LeadForm">
        <div className="container">
          <div className="lead-grid">
            <div className="reveal"><div className="chead" style={{ gridTemplateColumns: "1fr" }}><div><div className="marker"><span className="ln"></span>נשמח לשמוע ממך</div><h2 className="ttl">פנייה מהירה</h2></div></div></div>
            <form className="form-ed" onSubmit={onSubmit}>
              <div className="fgrid">
                <div className="fline"><label>שם מלא</label><input type="text" name="name" /></div>
                <div className="fline"><label>טלפון</label><input type="tel" name="phone" /></div>
                <div className="fline"><label>סוג האירוע</label><select name="type"><option>הפרשת חלה לכלה</option><option>בת מצווה</option><option>ערב לקראת לידה</option><option>תפילה לישועה</option><option>אירוע נשי פרטי</option></select></div>
                <div className="fline"><label>תאריך</label><input type="date" name="date" /></div>
                <div className="fline"><label>עיר</label><input type="text" name="city" /></div>
                <div className="fline"><label>איך שמעת עלינו?</label><input type="text" name="hear" /></div>
              </div>
              <button className="btn" type="submit"><span className="lbl">שליחת הפנייה</span><span className="arrow"></span></button>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Footer() {
  return (
    <footer className="site-footer" data-screen-label="Footer">
      <img className="flogo" src="public/images/logo.webp" alt="אור הצדיק · רונית ברש" />
      <div className="fbrand">אור הצדיק – רונית ברש</div>
      <div className="ftag">הפקות יוקרתיות · כלות · בת־מצוות · לידות · ישועות</div>
      <div className="frule"></div>
    </footer>
  );
}

/* ---------------- GATE ---------------- */
function Gate() {
  useEffect(() => {
    const gate = document.getElementById("gate");
    const scene = document.getElementById("scene");
    const flash = document.getElementById("flash");
    const hero = document.getElementById("hero");
    const halo = document.getElementById("halo");
    const knock = document.getElementById("knock");
    const emblem = document.getElementById("emblem");
    const head = document.querySelector(".gate-head");
    const hint = document.getElementById("hint");
    const ffWrap = document.getElementById("fireflies");
    const lightBehind = document.getElementById("lightBehind");
    const leafL = document.getElementById("leafL");
    const leafR = document.getElementById("leafR");

    function curl(ax, ay, angDeg, size, dir) {
      const ba = angDeg * Math.PI / 180, steps = 38, turns = 1.3;
      const cx = ax + Math.cos(ba) * size, cy = ay + Math.sin(ba) * size, pts = [];
      for (let i = 0; i <= steps; i++) { const t = i / steps, a = ba + Math.PI + dir * t * turns * 2 * Math.PI, r = size * (1 - t); pts.push((cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1)); }
      return '<path d="M' + pts.join(" L") + '"/>';
    }
    const P = (d, w) => '<path d="' + d + '" stroke-width="' + (w || 2.4) + '"/>';
    const C = (x, y, r) => '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (r || 4) + '" fill="#f2d99a" stroke="none"/>';

    function buildLeaf(side) {
      const W = 252, H = 760, right = (side === "right");
      const fx = (x) => right ? x : (W - x); const fd = (d) => right ? d : -d; let s = "";
      s += P("M" + fx(4) + ",150 Q" + fx(126) + ",114 " + fx(248) + ",236", 3.4);
      s += P("M" + fx(16) + ",168 Q" + fx(126) + ",138 " + fx(236) + ",244", 1.8);
      s += P("M" + fx(4) + ",300 L" + fx(248) + ",300", 3);
      s += P("M" + fx(4) + ",150 L" + fx(4) + ",706", 3.4);
      s += P("M" + fx(248) + ",236 L" + fx(248) + ",706", 3.4);
      s += P("M" + fx(4) + ",706 L" + fx(248) + ",706", 3.4);
      for (let i = 0; i < 4; i++) { const t = (i + 0.5) / 4, x = 10 + t * 232; s += '<g stroke-width="2">' + curl(fx(x), 300, -90, 22, fd(i % 2 ? 1 : -1)) + "</g>"; }
      for (let i = 0; i < 6; i++) { const t = i / 5; s += C(fx(4 + t * 244), 150 + t * 86, 3.4); }
      const n = 8;
      for (let i = 0; i < n; i++) { const bx = 18 + i * ((234 - 18) / (n - 1)); s += P("M" + fx(bx) + ",300 L" + fx(bx) + ",660", 2.8); }
      for (let i = 0; i < 3; i++) { const gx = 40 + i * 86; s += '<g stroke-width="2.2">' + curl(fx(gx), 660, -90, 16, fd(1)) + curl(fx(gx + 34), 660, -90, 16, fd(-1)) + "</g>"; }
      return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#ecd190" stroke-linecap="round" stroke-linejoin="round">' + s + "</svg>";
    }
    function buildFrame() {
      const W = 600, H = 760; let s = "";
      s += P("M48,252 Q300,86 552,252", 4); s += P("M48,252 Q300,114 552,252", 2);
      for (let i = 0; i <= 10; i++) { const t = i / 10, mt = 1 - t; const x = mt * mt * 48 + 2 * mt * t * 300 + t * t * 552; const y = mt * mt * 252 + 2 * mt * t * 86 + t * t * 252; s += C(x, y - 2, 3.6); }
      s += P("M300,150 L300,96", 2);
      s += P("M300,96 C282,78 282,52 300,34 C318,52 318,78 300,96", 2.4);
      s += P("M300,128 C262,118 246,80 262,50", 2); s += P("M300,128 C338,118 354,80 338,50", 2);
      s += '<g stroke-width="1.8">' + curl(262, 50, 150, 12, 1) + curl(338, 50, 30, 12, -1) + "</g>"; s += C(300, 30, 4);
      function post(cx) {
        let t = "";
        t += P("M" + (cx - 12) + ",252 L" + (cx - 12) + ",720", 3); t += P("M" + (cx + 12) + ",252 L" + (cx + 12) + ",720", 3);
        for (let y = 300; y <= 690; y += 78) { t += P("M" + (cx - 12) + "," + y + " L" + (cx + 12) + "," + y, 1.4); }
        t += P("M" + cx + ",252 L" + cx + ",214", 2.4);
        t += P("M" + (cx - 14) + ",214 C" + (cx - 14) + ",194 " + (cx + 14) + ",194 " + (cx + 14) + ",214", 2);
        t += P("M" + cx + ",214 L" + cx + ",188", 2);
        t += P("M" + (cx - 9) + ",176 L" + cx + ",188 L" + (cx + 9) + ",176 L" + cx + ",164 Z", 1.8);
        t += '<g stroke-width="1.5">' + curl(cx - 13, 198, 180, 10, 1) + curl(cx + 13, 198, 0, 10, -1) + "</g>";
        return t;
      }
      s += post(30); s += post(570); s += P("M30,720 L570,720", 3);
      return '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid meet" fill="none" stroke="#ecd190" stroke-linecap="round" stroke-linejoin="round">' + s + "</svg>";
    }

    leafL.innerHTML = buildLeaf("left"); leafR.innerHTML = buildLeaf("right");
    document.getElementById("gframe").innerHTML = buildFrame();

    const flies = [];
    for (let i = 0; i < 18; i++) {
      const f = document.createElement("div"); f.className = "ff";
      const sz = 3 + Math.random() * 3; f.style.width = f.style.height = sz + "px"; f.style.left = Math.random() * 100 + "%";
      ffWrap.appendChild(f); flies.push(f);
      (function (f) {
        const rise = () => {
          gsap.set(f, { x: 0, y: 0, top: (78 + Math.random() * 26) + "%", opacity: 0, scale: .6 + Math.random() * .8 });
          const dur = 7 + Math.random() * 5;
          gsap.to(f, { y: -(innerHeight * 0.66 + Math.random() * 120), x: (Math.random() * 2 - 1) * 60, duration: dur, ease: "sine.inOut", onComplete: rise });
          gsap.to(f, { opacity: .85, duration: 1.5, delay: .2 }); gsap.to(f, { opacity: 0, duration: 1.9, delay: Math.max(.6, dur - 2) });
        };
        gsap.delayedCall(Math.random() * 7, rise);
      })(f);
    }
    const bokehWrap = document.getElementById("bokeh");
    for (let i = 0; i < 18; i++) {
      const b = document.createElement("div"); b.className = "bokeh";
      const sz = 18 + Math.random() * 70; b.style.width = b.style.height = sz + "px"; b.style.left = Math.random() * 100 + "%"; b.style.top = Math.random() * 100 + "%";
      bokehWrap.appendChild(b);
      gsap.set(b, { opacity: .07 + Math.random() * .2 });
      gsap.to(b, { opacity: .28 + Math.random() * .32, duration: 3.5 + Math.random() * 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random() * 4 });
      gsap.to(b, { x: (Math.random() * 2 - 1) * 70, y: (Math.random() * 2 - 1) * 52, duration: 14 + Math.random() * 10, repeat: -1, yoyo: true, ease: "sine.inOut", delay: Math.random() * 5 });
    }
    const petalWrap = document.getElementById("petals");
    for (let i = 0; i < 13; i++) {
      const p = document.createElement("div"); p.className = "petal"; petalWrap.appendChild(p);
      (function (p) {
        const fall = () => {
          gsap.set(p, { left: Math.random() * 100 + "%", top: "-6%", opacity: 0, rotation: Math.random() * 360, scale: .7 + Math.random() * .7 });
          const dur = 15 + Math.random() * 11;
          gsap.to(p, { top: "106%", duration: dur, ease: "none", onComplete: fall });
          gsap.to(p, { x: (Math.random() * 2 - 1) * 80, duration: dur / 2, repeat: 1, yoyo: true, ease: "sine.inOut" });
          gsap.to(p, { rotation: "+=160", duration: dur, ease: "none" });
          gsap.to(p, { opacity: .6, duration: 2.4, delay: .3 }); gsap.to(p, { opacity: 0, duration: 2.6, delay: Math.max(.5, dur - 3) });
        };
        gsap.delayedCall(Math.random() * 12, fall);
      })(p);
    }
    const bgGlow = document.getElementById("bgGlow"); const rays = document.getElementById("rays");
    gsap.to(halo, { scale: 1.06, opacity: .46, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(emblem, { scale: 1.04, duration: 3.8, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "50% 50%" });
    gsap.fromTo(knock, { scale: .9, opacity: .35 }, { scale: 1.5, opacity: 0, duration: 4.4, repeat: -1, ease: "sine.out" });
    gsap.from(head, { opacity: 0, y: 16, duration: 1.8, delay: .4, ease: "power2.out" });
    gsap.fromTo(hint, { opacity: 0 }, { opacity: 1, duration: 1.6, delay: 1, ease: "power2.out" });
    gsap.to(".enter-hint .lbl", { opacity: .55, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2.4 });
    gsap.fromTo(".enter-hint .sub", { scaleY: .2, opacity: .3 }, { scaleY: 1, opacity: 1, duration: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(bgGlow, { scale: 1.07, opacity: .8, duration: 7.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(rays, { rotation: 360, duration: 130, repeat: -1, ease: "none" });
    gsap.to(rays, { opacity: .3, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(scene, { scale: 1.012, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to("#gate3d", { filter: "drop-shadow(0 2px 2px rgba(40,26,4,.5)) drop-shadow(0 0 7px rgba(255,242,200,.85)) drop-shadow(0 0 20px rgba(232,205,138,.5))", duration: 3.4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    let opened = false;
    function enter() {
      if (opened) return; opened = true;
      gate.style.cursor = "default";
      gsap.killTweensOf([scene, halo, emblem, knock, bgGlow, rays, "#gate3d", ".enter-hint .lbl", ".enter-hint .sub"]);
      gsap.killTweensOf(flies);
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
      tl.to(emblem, { scale: 1.4, duration: 1.1, ease: "power2.out", transformOrigin: "50% 50%" }, 0)
        .to(halo, { scale: 1.3, opacity: .7, duration: 1.3, ease: "power2.out" }, 0)
        .to([head, hint, knock], { opacity: 0, duration: 1.0, ease: "power1.inOut" }, 0.2)
        .to(emblem, { opacity: 0, scale: .5, duration: .9, ease: "power2.in" }, 0.95);
      tl.to(leafR, { rotateY: 92, duration: 2.5, ease: "power3.inOut" }, 0.9)
        .to(leafL, { rotateY: -92, duration: 2.5, ease: "power3.inOut" }, 0.9)
        .to(lightBehind, { opacity: 1, scale: 1.12, duration: 2.4, ease: "power2.in" }, 1.2)
        .to(halo, { opacity: .8, scale: 1.5, duration: 2.5, ease: "power2.in" }, 1.2);
      flies.forEach((f) => { tl.to(f, { x: (Math.random() * 2 - 1) * innerWidth * .5, y: (Math.random() * 2 - 1) * innerHeight * .5, scale: 1.8, opacity: 0, duration: 2.6, ease: "power1.in" }, 1.6); });
      tl.to(scene, { scale: 9, duration: 2.8, ease: "expo.in" }, 2.9);
      tl.to(flash, { opacity: .9, duration: 1.3, ease: "power2.in" }, 4.7);
      tl.add(() => { gate.style.pointerEvents = "none"; document.body.classList.remove("locked"); if (window.ScrollTrigger) ScrollTrigger.refresh(); if (window.__lenis) window.__lenis.resize(); }, 5.8)
        .to(hero, { opacity: 1, scale: 1, duration: 2.6, ease: "expo.out" }, 5.3)
        .set(gate, { visibility: "hidden" }, 5.9)
        .to(flash, { opacity: 0, duration: 1.7, ease: "power2.out" }, 6.0);
      tl.from(".hero-inner > *", { opacity: 0, y: 34, duration: 1.4, stagger: .16, ease: "power3.out" }, 6.3)
        .from(".hero-top", { opacity: 0, duration: 1.3, ease: "power2.out" }, 6.3);
    }
    gate.addEventListener("click", enter);
    gate.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enter(); } });
  }, []);

  return (
    <div id="gate" role="button" tabIndex={0} aria-label="הקישי כדי להיכנס">
      <div id="scene">
        <div className="bg-glow" id="bgGlow"></div>
        <div className="golddecor"><div className="gc1"></div><div className="gc2"></div><div className="floret"></div></div>
        <div id="bokeh"></div><div id="petals"></div><div className="foliage"></div>
        <div className="portal" id="portal"><div className="portal-light" id="lightBehind"></div></div>
        <div id="rays"></div><div className="halo" id="halo"></div>
        <div className="gate3d" id="gate3d">
          <div className="gframe" id="gframe"></div>
          <div className="leaf left" id="leafL"></div>
          <div className="leaf right" id="leafR"></div>
          <div className="emblem" id="emblem">
            <svg viewBox="0 0 150 96" fill="none" stroke="#ecd190" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="60" cy="54" r="30" /><circle cx="90" cy="54" r="30" />
              <path d="M75 8 l3.4 7 7 3.4 -7 3.4 -3.4 7 -3.4-7 -7-3.4 7-3.4z" fill="#f2d99a" stroke="none" />
            </svg>
          </div>
          <div className="knock" id="knock"></div>
        </div>
        <div className="gate-path"></div><div className="vignette"></div>
        <div className="gate-head"><div className="ev">אור הצדיק · רונית ברש</div><h2 className="serif">ערב הפרשת חלה<br /><span className="g">שלא תשכחי בחיים</span></h2></div>
        <div className="enter-hint" id="hint"><div className="lbl serif">הקישי כדי להיכנס</div><div className="sub"></div></div>
        <div id="fireflies"></div><div className="gate-grain"></div>
      </div>
      <div id="flash"></div>
    </div>
  );
}

function Cursor() {
  const ref = React.useRef(null);
  useEffect(() => {
    if (matchMedia("(hover:none),(pointer:coarse)").matches) return;
    const el = ref.current; let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const sel = ".feature,.tile,.m-tile,.viewlink,.scroll-tag";
    const over = (e) => { if (e.target.closest && e.target.closest(sel)) el.classList.add("big"); };
    const out = (e) => { if (e.target.closest && e.target.closest(sel)) el.classList.remove("big"); };
    addEventListener("mousemove", move); document.addEventListener("mouseover", over); document.addEventListener("mouseout", out);
    let raf = requestAnimationFrame(function loop() { x += (tx - x) * .18; y += (ty - y) * .18; el.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px) translate(-50%,-50%)"; raf = requestAnimationFrame(loop); });
    return () => { removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); cancelAnimationFrame(raf); };
  }, []);
  return <div className="cursor" ref={ref}><span className="cl">צפייה</span></div>;
}

function App() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { gsap.set("#site .reveal", { autoAlpha: 1, y: 0 }); return; }
    gsap.registerPlugin(ScrollTrigger);
    let lenis;
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      lenis._tick = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(lenis._tick);
      gsap.ticker.lagSmoothing(0);
    }
    const ctx = gsap.context(() => {
      gsap.utils.toArray("#site .reveal").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 38 }, {
          autoAlpha: 1, y: 0, duration: 1.05, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray(".cstatement, .cta-giant").forEach((blk) => {
        const lines = blk.querySelectorAll(".ln-in");
        if (lines.length) gsap.from(lines, { yPercent: 118, duration: 1.15, ease: "power4.out", stagger: .12,
          scrollTrigger: { trigger: blk, start: "top 84%" } });
      });
      gsap.utils.toArray(".sec").forEach((sec) => {
        const rows = sec.querySelectorAll(".numrow");
        if (rows.length) gsap.from(rows, { autoAlpha: 0, y: 30, duration: .9, ease: "power3.out", stagger: .08,
          scrollTrigger: { trigger: sec, start: "top 80%" } });
      });
      gsap.utils.toArray(".incl-cards").forEach((grid) => {
        gsap.from(grid.querySelectorAll(".icard"), { autoAlpha: 0, y: 34, duration: .9, ease: "power3.out", stagger: .07,
          scrollTrigger: { trigger: grid, start: "top 82%" } });
      });
      gsap.utils.toArray(".form-ed").forEach((f) => {
        gsap.from(f.querySelectorAll(".fline, .btn"), { autoAlpha: 0, y: 26, duration: .8, ease: "power3.out", stagger: .06,
          scrollTrigger: { trigger: f, start: "top 84%" } });
      });
      if (matchMedia("(min-width:900px)").matches) {
        const stage = document.querySelector(".gcollage");
        if (stage) {
          const tlc = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top top", end: "bottom bottom", scrub: .6 } });
          gsap.utils.toArray(".gcollage .gitem").forEach((el) => {
            const d = el.dataset;
            tlc.fromTo(el, { x: +d.fx, y: +d.fy, rotation: +d.fr, scale: .82, autoAlpha: 0 },
              { x: 0, y: 0, rotation: +d.rot, scale: 1, autoAlpha: 1, ease: "power2.out", duration: .5 }, 0)
               .to(el, { y: +d.par, ease: "none", duration: .5 }, .5);
          });
        }
      }
      gsap.utils.toArray(".feature").forEach((f) => {
        const img = f.querySelector(".media img");
        if (img) gsap.fromTo(img, { yPercent: -9 }, { yPercent: 9, ease: "none",
          scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray(".pullband").forEach((p) => {
        const bg = p.querySelector(".bg");
        if (bg) gsap.fromTo(bg, { yPercent: -12 }, { yPercent: 12, ease: "none",
          scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
      });
      const hb = document.querySelector("#hero .hero-bg");
      if (hb) gsap.fromTo(hb, { yPercent: -4 }, { yPercent: 10, ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true } });
    });
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    const t1 = setTimeout(refresh, 800);
    const t2 = setTimeout(refresh, 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); removeEventListener("load", refresh); ctx.revert(); if (lenis) { gsap.ticker.remove(lenis._tick); lenis.destroy(); window.__lenis = null; } };
  }, []);
  return (
    <React.Fragment>
      <main id="site">
        <Hero />
        <Collage />
        <Bride />
        <Included />
        <PullBand img="public/images/dance.webp" label="Quote">יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים.</PullBand>
        <PerfectFor />
        <WhyUs />
        <KeywordBand />
        <Gallery />
        <VideoFeature />
        <PullBand img="public/images/joy.webp" label="Closing">יש ערבים שלא שוכחים. ויש רגעים שנשארים בלב לכל החיים.</PullBand>
        <CtaForm />
        <Footer />
      </main>
      <Gate />
      <div className="page-grain"></div>
      <Cursor />
    </React.Fragment>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
