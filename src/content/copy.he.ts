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
} as const;

/** Contact details. TBD — replace placeholder when the client provides it. */
export const contact = {
  phone: '+972000000000', // TODO(client): real phone/WhatsApp number
  phoneLabel: 'לתיאום ערב',
} as const;
