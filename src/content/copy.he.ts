/**
 * Single source-of-truth for all Hebrew copy. No Hebrew strings in JSX.
 * Structured top-to-bottom in page reading order.
 */

export const meta = {
  besd: 'בס״ד',
  brand: 'אור הצדיק · רונית ברש',
  backToTop: 'חזרה לראש הדף',
} as const;

export const hero = {
  kicker: 'אור הצדיק · רונית ברש',
  titleLead: 'ערב הפרשת חלה',
  titleFoil: 'שלא תשכחי בחיים',
  subtitle: 'רגע אחד לעצור, להתרגש ולהתפלל, ערב נשי יוקרתי, עטוף באור, במוזיקה ובשמחה ✨',
  cta: '💍 תשרייני לי תאריך',
} as const;

// Cinematic "gate" entrance overlay shown on load (see GateIntro).
export const introGate = {
  brand: 'אור הצדיק · רונית ברש',
  titleLead: 'ערב הפרשת חלה',
  titleAccent: 'שלא תשכחי בחיים',
  enter: 'פתחי את השער',
  enterSub: 'ל ח צ י   ע ל   ה ש ע ר',
  aria: 'הקישי כדי להיכנס לערב הפרשת חלה',
  skip: 'דלג',
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
  body: 'יש רגע אחד לעצור, להתרגש, להתפלל ולהיות עטופה באהבה. ערב נשי, שמח ומרגש במיוחד, עם אנרגיה טובה, חיבור אמיתי והמון לב ❤️',
  fitsLabel: 'הגישה היא כל הסיפור, מתאים לכולן',
  fits: ['דתיות', 'מסורתיות', 'חילוניות'],
  cta: 'להזמנת ערב',
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
  photoTag: 'טקס הפרשת חלה, רגע של קדושה',
} as const;

export const cinematic = {
  quote: 'יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים ❤️',
} as const;

export const perfectFor = {
  label: 'כל רגע שמגיע לו אור',
  title: 'מתאים במיוחד עבור',
  items: [
    'כלות לפני חתונה',
    'ערבי בת מצווה',
    'ערב לקראת לידה',
    'תפילות לישועה ורפואה',
    'אירועים נשיים פרטיים',
  ],
} as const;

export const whyUs = {
  label: 'למה כולם מדברים על הערבים של רונית',
  title: 'למה דווקא אנחנו',
  items: [
    { title: 'אווירה יוקרתית ומרגשת', desc: 'כל פרט מעוצב בקפידה כדי שתרגישי מיוחדת' },
    { title: 'גישה קלילה שמתאימה לכולן', desc: 'דתיות, מסורתיות וחילוניות, כולן מרגישות חלק' },
    { title: '20 שנות ניסיון בהפקות אירועים', desc: 'ניסיון עשיר שמבטיח ערב חלק ומושלם' },
    { title: 'מוזיקה, שמחה, ריקודים וחיבור אמיתי', desc: 'אנרגיה שממלאת את הלב ומחברת בין כולן' },
    { title: 'ליווי אישי וחם', desc: 'מהשיחה הראשונה ועד הרגע האחרון, איתך' },
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
  error: 'משהו השתבש, נסי שוב או חייגי אלינו',
} as const;

export const footer = {
  brand: 'אור הצדיק – רונית ברש',
  tagline: 'הפקות יוקרתיות לכלות, בת-מצוות, לידות וישועות',
} as const;

export const gallery = {
  label: 'רגעים מהערב',
  title: 'גלריית תמונות',
  items: [
    { src: '/images/hero.webp', alt: 'תקיעת שופר בערב הפרשת חלה' },
    { src: '/images/ceremony.webp', alt: 'לישת הבצק בטקס הפרשת חלה' },
    { src: '/images/dance.webp', alt: 'ריקודים ומתופפות בערב' },
    { src: '/images/crowd.webp', alt: 'נשים מריעות בשמחה' },
    { src: '/images/table.webp', alt: 'שולחן הטקס המעוצב באור' },
    { src: '/images/wide.webp', alt: 'רונית ברש מנחה את הערב' },
    { src: '/images/joy.webp', alt: 'שמחה וכפיים בערב' },
    { src: '/images/pair.webp', alt: 'רגע מרגש בערב הפרשת חלה' },
  ],
} as const;

export const videoMoment = {
  kicker: 'רגע מהערב',
  caption: 'כי יש רגעים שצריך פשוט להרגיש',
  src: '/videos/video-04.mp4',
  poster: '/videos/video-04.webp',
} as const;

export const videos = {
  label: 'הערב בתנועה',
  title: 'רגעים חיים מהערב',
  items: [
    { src: '/videos/video-01.mp4', poster: '/videos/video-01.webp', portrait: true },
    { src: '/videos/video-02.mp4', poster: '/videos/video-02.webp', portrait: true },
    { src: '/videos/video-03.mp4', poster: '/videos/video-03.webp', portrait: false },
    { src: '/videos/video-04.mp4', poster: '/videos/video-04.webp', portrait: false },
    { src: '/videos/video-05.mp4', poster: '/videos/video-05.webp', portrait: false },
  ],
  playAria: 'נגני סרטון',
} as const;

/** Contact details. Office phone taken from the brand's live site (Re-Design.md
 * §9). Confirm with the client this is the right line for Challah enquiries. */
export const contact = {
  phone: '050-2696862',
  phoneLabel: 'לתיאום ערב',
} as const;

/**
 * Copy for the cinematic redesign (Felix-Nieto-inspired). Single source for all
 * Hebrew text used by the components under `components/redesign/`.
 */
export const rd = {
  hero: {
    eyebrow: 'אור הצדיק · רונית ברש',
    words: ['ערב', 'הפרשת', 'חלה'],
    sub: 'שלא תשכחי בחיים, ערב נשי יוקרתי, עטוף באור, במוזיקה, בתפילה ובשמחה.',
    cta: 'תשרייני לי תאריך',
    scroll: 'גללי',
  },
  statement: {
    marker: 'רגע אחד לעצור',
    lines: ['יש רגעים בחיים', 'שמגיע להם יותר.'],
    lead: 'אנחנו ב״אור הצדיק – רונית ברש״ מפיקות ערבי הפרשת חלה מרגשים ויוקרתיים, אווירה מיוחדת, מוזיקה, תפילות ושמחה נשית שמרחיבה את הלב.',
  },
  bride: {
    num: '01 · הכלה',
    title: 'לכלה',
    role: 'ערב הפרשת חלה לכלה',
    copy: 'לפני שאת נכנסת לחופה, רגע אחד לעצור, להתרגש, להתפלל ולהיות עטופה באהבה. ערב נשי, שמח ומרגש במיוחד.',
    chips: ['דתיות', 'מסורתיות', 'חילוניות'],
    cta: 'להזמנת ערב',
  },
  included: {
    idx: '02',
    marker: 'חוויה מלאה מתחילתה ועד סופה',
    title: 'מה כולל הערב',
    caption: 'טקס הפרשת חלה · רגע של קדושה',
    items: [
      'הנחיה מלאה של רונית ברש, המגיעה עם שופר',
      'מערכת הגברה מקצועית',
      'צוות של שתי מתופפות מקצועיות',
      'שופרות ואווירה עוצמתית',
      'שטיח כניסה חגיגי לכלה',
      'טקס הפרשת חלה מרגש ומיוחד',
      'מוזיקה, שמחה וריקודים',
      'חוויה נשית בלתי נשכחת',
    ],
    duration: 'משך הטקס · שעה וחצי עד שעתיים',
  },
  quote1: 'יש צחוק. יש דמעות של התרגשות. יש תפילות מהלב. ויש רגעים שנשארים לכל החיים.',
  perfect: {
    idx: '03',
    marker: 'כל רגע שמגיע לו אור',
    title: 'מתאים במיוחד עבור',
    items: ['כלות לפני חתונה', 'ערבי בת מצווה', 'ערב לקראת לידה', 'תפילות לישועה ורפואה', 'אירועים נשיים פרטיים'],
  },
  why: {
    idx: '04',
    marker: 'למה כולן מדברות על הערבים של רונית',
    title: 'למה דווקא אנחנו',
    items: [
      ['אווירה יוקרתית ומרגשת', 'כל פרט מעוצב בקפידה כדי שתרגישי מיוחדת.'],
      ['גישה קלילה שמתאימה לכולן', 'דתיות, מסורתיות וחילוניות, כולן מרגישות חלק.'],
      ['עשרים שנות ניסיון בהפקות', 'ניסיון עשיר שמבטיח ערב חלק ומושלם.'],
      ['מוזיקה, ריקודים וחיבור אמיתי', 'אנרגיה שממלאת את הלב ומחברת בין כולן.'],
      ['ליווי אישי וחם', 'מהשיחה הראשונה ועד הרגע האחרון, איתך.'],
    ],
  },
  keywords: ['יוקרה', 'אור', 'מוזיקה', 'תפילה', 'שמחה', 'ריקודים', 'קדושה'],
  gallery: {
    idx: '05',
    marker: 'רגעים מהערב',
    title: 'תמונות וסרטונים',
  },
  videoMoment: {
    num: 'רגע מהערב',
    title: 'להרגיש',
    copy: 'כי יש רגעים שצריך פשוט להרגיש, צחוק, דמעות של התרגשות, תפילות מהלב ורגעים שנשארים לכל החיים.',
    cta: 'לצפייה בסרטון',
  },
  cta: {
    lines: ['תשרייני לי', 'תאריך'],
    sub: 'ערב אחד שלא תשכחי בחיים. נחזור אליך בהקדם לתיאום.',
  },
  form: {
    marker: 'נשמח לשמוע ממך',
    title: 'פנייה מהירה',
    labels: {
      fullName: 'שם מלא',
      phone: 'טלפון',
      eventType: 'סוג האירוע',
      eventDate: 'תאריך',
      city: 'עיר',
      hearAbout: 'איך שמעת עלינו?',
    },
    types: ['הפרשת חלה לכלה', 'בת מצווה', 'ערב לקראת לידה', 'תפילה לישועה', 'אירוע נשי פרטי'],
    submit: 'שליחת הפנייה',
    submitting: 'שולח…',
    success: 'נשלח! נחזור אליך בהקדם',
    error: 'משהו השתבש, נסי שוב',
  },
  quote2: 'יש ערבים שלא שוכחים. ויש רגעים שנשארים בלב לכל החיים.',
  video: 'וידאו',
  footer: {
    brand: 'אור הצדיק – רונית ברש',
    tag: 'הפקות יוקרתיות · כלות · בת־מצוות · לידות · ישועות',
  },
  cursor: 'צפייה',
} as const;
