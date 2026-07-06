export interface Occasion {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  description: string;
  color: string;
  color2: string;
  tags: string[];
  searches: number;
  templates: CardTemplate[];
}

export interface CardTemplate {
  id: string;
  name: string;
  bg: string;
  textColor: string;
  accentColor: string;
  pattern?: string;   // CSS background-image for decorative layer
  defaultHeading: string;
  defaultBody: string;
  defaultFooter: string;
  defaultDate?: string;
  defaultTime?: string;
  defaultVenue?: string;
}

// ── Shared decorative pattern helpers ──────────────────────────────
const DOT_PATTERN  = "radial-gradient(circle,rgba(255,255,255,0.18) 1px,transparent 1px)";
const STAR_PATTERN = "radial-gradient(circle,rgba(255,255,255,0.22) 1.5px,transparent 1.5px)";
const STRIPE_H     = "repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,0.06) 18px,rgba(255,255,255,0.06) 19px)";
const STRIPE_D     = "repeating-linear-gradient(45deg,transparent,transparent 14px,rgba(255,255,255,0.06) 14px,rgba(255,255,255,0.06) 15px)";
const CROSS        = "radial-gradient(circle,rgba(255,255,255,0.14) 1px,transparent 1px),radial-gradient(circle,rgba(255,255,255,0.14) 1px,transparent 1px)";

export const OCCASIONS: Occasion[] = [
  // ── BIRTHDAY ────────────────────────────────────────────────────
  {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    slug: 'birthday',
    description: 'Beautiful birthday invitations and cards for every age and style.',
    color: 'from-pink-500', color2: 'to-rose-400',
    tags: ['birthday party', 'kids birthday', 'adult birthday', 'milestone birthday'],
    searches: 1200000,
    templates: [
      { id: 'birthday-floral',   name: 'Floral Pink',  bg: 'linear-gradient(160deg,#fce7f3,#fdf2f8,#f3e8ff)', pattern: DOT_PATTERN, textColor: '#831843', accentColor: '#ec4899', defaultHeading: "You're Invited!", defaultBody: "Please join us to celebrate", defaultFooter: "RSVP · [Your Name]", defaultDate: "Saturday, [Month] [Day], [Year]", defaultTime: "3:00 PM", defaultVenue: "[Venue Name], [City]" },
      { id: 'birthday-bold',     name: 'Bold & Fun',   bg: 'linear-gradient(135deg,#fef9c3,#fef08a,#fde68a)', pattern: STRIPE_D, textColor: '#713f12', accentColor: '#f59e0b', defaultHeading: "Let's Party!", defaultBody: "[Name] is turning [Age]!\nCome celebrate with us", defaultFooter: "RSVP to [Contact]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'birthday-elegant',  name: 'Elegant',      bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe,#ddd6fe)', pattern: DOT_PATTERN, textColor: '#4c1d95', accentColor: '#7c3aed', defaultHeading: "You Are Cordially Invited", defaultBody: "To celebrate the birthday of\n[Name]", defaultFooter: "RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'birthday-minimal',  name: 'Minimal',      bg: '#ffffff', textColor: '#0f172a', accentColor: '#6366f1', defaultHeading: "Happy Birthday", defaultBody: "[Name] · [Age] Years", defaultFooter: "Join us on [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'birthday-tropical', name: 'Tropical',     bg: 'linear-gradient(135deg,#d1fae5,#a7f3d0,#6ee7b7)', pattern: STRIPE_H, textColor: '#064e3b', accentColor: '#059669', defaultHeading: "Aloha! 🌺", defaultBody: "Come celebrate [Name]'s\nbirthday in style!", defaultFooter: "Beach vibes · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Beach / Location]" },
      { id: 'birthday-night',    name: 'Night Out',    bg: 'linear-gradient(135deg,#0f172a,#1e1b4b,#312e81)', pattern: STAR_PATTERN, textColor: '#e0e7ff', accentColor: '#818cf8', defaultHeading: "Birthday Night Out 🥂", defaultBody: "Join [Name] for a night to remember", defaultFooter: "Dress to impress", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'birthday-retro',    name: 'Retro',        bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', pattern: STRIPE_D, textColor: '#92400e', accentColor: '#b45309', defaultHeading: "Groovy Birthday! 🕺", defaultBody: "[Name] turns [Age]!\nLet's celebrate like it's the 70s", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'birthday-princess', name: 'Princess',     bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3,#fbcfe8)', pattern: DOT_PATTERN, textColor: '#9d174d', accentColor: '#ec4899', defaultHeading: "A Royal Birthday! 👑", defaultBody: "Princess [Name]\nis turning [Age]!", defaultFooter: "Date · Time · Venue", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── WEDDING ─────────────────────────────────────────────────────
  {
    id: 'wedding',
    name: 'Wedding',
    emoji: '💍',
    slug: 'wedding',
    description: 'Elegant wedding invitations that set the tone for your perfect day.',
    color: 'from-rose-400', color2: 'to-pink-300',
    tags: ['wedding invitation', 'wedding card', 'marriage invitation', 'bridal'],
    searches: 600000,
    templates: [
      { id: 'wedding-classic',  name: 'Classic Gold',  bg: 'linear-gradient(160deg,#fdf6e3,#fef9f0,#fffbeb)', pattern: DOT_PATTERN, textColor: '#44403c', accentColor: '#b45309', defaultHeading: "Together With Their Families", defaultBody: "[Partner 1] & [Partner 2]\nRequest the pleasure of your company", defaultFooter: "Black tie optional · RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue], [City]" },
      { id: 'wedding-modern',   name: 'Modern',        bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', textColor: '#0f172a', accentColor: '#ec4899', defaultHeading: "We're Getting Married", defaultBody: "[Partner 1] & [Partner 2]", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'wedding-floral',   name: 'Floral Rose',   bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', pattern: DOT_PATTERN, textColor: '#831843', accentColor: '#f43f5e', defaultHeading: "Save The Date", defaultBody: "[Partner 1]\n&\n[Partner 2]", defaultFooter: "[Date] · [City]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'wedding-dark',     name: 'Dark & Moody',  bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STRIPE_D, textColor: '#fef2f2', accentColor: '#fca5a5', defaultHeading: "Forever Begins Today", defaultBody: "[Partner 1] & [Partner 2]\nwould love you to celebrate with them", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'wedding-botanical', name: 'Botanical',    bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7,#bbf7d0)', pattern: STRIPE_H, textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "Join Us As We Wed", defaultBody: "[Partner 1] & [Partner 2]", defaultFooter: "[Date] · [Garden Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'wedding-minimalist', name: 'Minimalist',  bg: '#f9fafb', textColor: '#111827', accentColor: '#374151', defaultHeading: "[Partner 1] & [Partner 2]", defaultBody: "Invite you to celebrate their\nwedding day", defaultFooter: "[Date] · [Time] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── BABY SHOWER ─────────────────────────────────────────────────
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    emoji: '👶',
    slug: 'baby-shower',
    description: 'Sweet and adorable baby shower invitations for your little one.',
    color: 'from-sky-400', color2: 'to-blue-300',
    tags: ['baby shower', 'gender reveal', 'baby sprinkle', 'newborn'],
    searches: 400000,
    templates: [
      { id: 'baby-sweet',    name: 'Sweet Blue',    bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd,#7dd3fc)', pattern: STRIPE_H, textColor: '#0c4a6e', accentColor: '#0284c7', defaultHeading: "Baby Shower", defaultBody: "Please join us to celebrate\nthe upcoming arrival of\n[Baby Name]", defaultFooter: "Hosted by [Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'baby-neutral',  name: 'Neutral Honey', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', pattern: DOT_PATTERN, textColor: '#78350f', accentColor: '#d97706', defaultHeading: "A Baby Is On The Way!", defaultBody: "Join us in celebrating\n[Parent Names]", defaultFooter: "RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'baby-girl',     name: 'It\'s A Girl',  bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', pattern: DOT_PATTERN, textColor: '#831843', accentColor: '#ec4899', defaultHeading: "It's A Girl! 🎀", defaultBody: "Baby Shower for\n[Mom's Name]", defaultFooter: "Date · Time · Location", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'baby-boy',      name: 'It\'s A Boy',   bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', pattern: DOT_PATTERN, textColor: '#1e3a8a', accentColor: '#3b82f6', defaultHeading: "It's A Boy! 🐘", defaultBody: "Baby Shower for\n[Mom's Name]", defaultFooter: "Date · Time · Location", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'baby-woodland', name: 'Woodland',      bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7,#d1fae5)', pattern: STRIPE_D, textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "Little One On The Way 🌿", defaultBody: "A woodland baby shower\nfor [Parent Names]", defaultFooter: "RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'baby-modern',   name: 'Modern Blush',  bg: 'linear-gradient(135deg,#fff1f2,#fce7f3)', textColor: '#881337', accentColor: '#e11d48', defaultHeading: "Baby Shower 🌸", defaultBody: "Celebrating [Mom's Name]\nand her little one", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── GRADUATION ──────────────────────────────────────────────────
  {
    id: 'graduation',
    name: 'Graduation',
    emoji: '🎓',
    slug: 'graduation',
    description: 'Celebrate academic achievements with stunning graduation invitations.',
    color: 'from-indigo-500', color2: 'to-blue-400',
    tags: ['graduation party', 'grad invite', 'class of 2025', 'high school graduation'],
    searches: 280000,
    templates: [
      { id: 'grad-gold',    name: 'Gold & Navy',   bg: 'linear-gradient(135deg,#1e3a8a,#1e40af)', pattern: STAR_PATTERN, textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "Class of 2025 🎓", defaultBody: "Please join us as we celebrate\n[Name]'s Graduation", defaultFooter: "Hosted by [Family Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'grad-modern',  name: 'Fresh Green',   bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "I Did It! 🎉", defaultBody: "[Name] has graduated from\n[School Name]", defaultFooter: "Celebration on [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'grad-maroon',  name: 'Classic Maroon', bg: 'linear-gradient(135deg,#7f1d1d,#991b1b)', pattern: DOT_PATTERN, textColor: '#fef2f2', accentColor: '#fca5a5', defaultHeading: "Commencement 2025", defaultBody: "[Name]\nhas completed [Degree]\nfrom [University]", defaultFooter: "Reception to follow", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'grad-minimal', name: 'Minimalist',    bg: '#ffffff', textColor: '#111827', accentColor: '#374151', defaultHeading: "[Name]", defaultBody: "Class of 2025\n[School / University]", defaultFooter: "Graduation Party · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'grad-vibrant', name: 'Vibrant',       bg: 'linear-gradient(135deg,#fdf4ff,#fae8ff,#f3e8ff)', pattern: DOT_PATTERN, textColor: '#581c87', accentColor: '#9333ea', defaultHeading: "Grad Party! 🥂", defaultBody: "[Name] is graduating\nand celebrating big!", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── CHRISTMAS ───────────────────────────────────────────────────
  {
    id: 'christmas',
    name: 'Christmas',
    emoji: '🎄',
    slug: 'christmas',
    description: 'Festive Christmas party invitations and holiday greeting cards.',
    color: 'from-red-600', color2: 'to-green-600',
    tags: ['christmas party', 'holiday party', 'christmas invitation', 'xmas card'],
    searches: 350000,
    templates: [
      { id: 'xmas-classic',  name: 'Classic',       bg: 'linear-gradient(135deg,#14532d,#166534)', pattern: STAR_PATTERN, textColor: '#fef9c3', accentColor: '#dc2626', defaultHeading: "You're Invited! 🎄", defaultBody: "Join us for a\nChristmas Party", defaultFooter: "Festive attire welcome", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'xmas-cozy',     name: 'Cozy Red',      bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)', pattern: DOT_PATTERN, textColor: '#7f1d1d', accentColor: '#dc2626', defaultHeading: "Merry & Bright ✨", defaultBody: "Celebrate the season with us!", defaultFooter: "Date · Time · Venue", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'xmas-winter',   name: 'Winter Blue',   bg: 'linear-gradient(135deg,#eff6ff,#dbeafe,#bfdbfe)', pattern: STRIPE_H, textColor: '#1e3a8a', accentColor: '#3b82f6', defaultHeading: "Holiday Gathering ❄️", defaultBody: "Warm hearts, cold nights\nJoin us for the holidays!", defaultFooter: "[Date] · [Time] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'xmas-gold',     name: 'Gold & Black',  bg: 'linear-gradient(135deg,#0c0a09,#1c1917)', pattern: STAR_PATTERN, textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "Christmas Soirée 🥂", defaultBody: "You are cordially invited\nto celebrate the season", defaultFooter: "Cocktail attire · RSVP", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── ANNIVERSARY ─────────────────────────────────────────────────
  {
    id: 'anniversary',
    name: 'Anniversary',
    emoji: '💑',
    slug: 'anniversary',
    description: 'Celebrate years of love with a beautiful anniversary party invitation.',
    color: 'from-rose-500', color2: 'to-red-400',
    tags: ['anniversary party', 'anniversary invitation', 'wedding anniversary', '25th anniversary', '50th anniversary'],
    searches: 180000,
    templates: [
      { id: 'anni-gold',     name: 'Golden',        bg: 'linear-gradient(160deg,#fffbeb,#fef3c7,#fde68a)', pattern: DOT_PATTERN, textColor: '#78350f', accentColor: '#b45309', defaultHeading: "25 Years of Love 💛", defaultBody: "Please join us in celebrating\n[Partner 1] & [Partner 2]'s\nSilver Wedding Anniversary", defaultFooter: "Hosted by [Family]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'anni-romantic', name: 'Romantic Rose', bg: 'linear-gradient(135deg,#fff1f2,#fce7f3)', pattern: DOT_PATTERN, textColor: '#881337', accentColor: '#e11d48', defaultHeading: "Celebrating [X] Years ❤️", defaultBody: "[Partner 1] & [Partner 2]\nthen, now, always.", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'anni-elegant',  name: 'Elegant',       bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STRIPE_D, textColor: '#fef9c3', accentColor: '#d97706', defaultHeading: "50 Years Together 🥂", defaultBody: "A Golden Anniversary Celebration\nfor [Partner 1] & [Partner 2]", defaultFooter: "Black tie · [Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── NEW YEAR ────────────────────────────────────────────────────
  {
    id: 'new-year',
    name: 'New Year',
    emoji: '🎆',
    slug: 'new-year',
    description: "Ring in the new year with a spectacular New Year's Eve party invitation.",
    color: 'from-violet-600', color2: 'to-indigo-500',
    tags: ["new year's eve party", 'new year invitation', 'nye party', 'countdown party'],
    searches: 240000,
    templates: [
      { id: 'nye-glam',    name: 'Glam Gold',    bg: 'linear-gradient(135deg,#0c0a09,#1c1917)', pattern: STAR_PATTERN, textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "New Year's Eve 🥂", defaultBody: "Join us to toast to [Year]!\nCocktails · Dinner · Dancing", defaultFooter: "RSVP by [Date]", defaultDate: "December 31, [Year]", defaultTime: "8:00 PM", defaultVenue: "[Venue]" },
      { id: 'nye-modern',  name: 'Modern Blue',  bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', pattern: STAR_PATTERN, textColor: '#e0e7ff', accentColor: '#818cf8', defaultHeading: "Countdown to [Year] 🎆", defaultBody: "Let's celebrate the new year\ntogether!", defaultFooter: "Date · Time · Venue", defaultDate: "December 31, [Year]", defaultTime: "9:00 PM", defaultVenue: "[Venue]" },
      { id: 'nye-festive', name: 'Festive',      bg: 'linear-gradient(135deg,#fef9c3,#fef3c7)', pattern: STRIPE_D, textColor: '#713f12', accentColor: '#d97706', defaultHeading: "Happy New Year! 🎉", defaultBody: "Ring in [Year] with us!", defaultFooter: "Dec 31 · [Time] · [Venue]", defaultDate: "December 31, [Year]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── BRIDAL SHOWER ───────────────────────────────────────────────
  {
    id: 'bridal-shower',
    name: 'Bridal Shower',
    emoji: '💐',
    slug: 'bridal-shower',
    description: 'Celebrate the bride-to-be with a beautiful bridal shower invitation.',
    color: 'from-pink-400', color2: 'to-rose-300',
    tags: ['bridal shower', 'hen party', 'bachelorette', 'bride to be', 'bridal shower invitation'],
    searches: 200000,
    templates: [
      { id: 'bridal-floral',   name: 'Floral',     bg: 'linear-gradient(160deg,#fce7f3,#fdf2f8,#f3e8ff)', pattern: DOT_PATTERN, textColor: '#831843', accentColor: '#ec4899', defaultHeading: "Bridal Shower 💐", defaultBody: "Celebrating [Bride's Name]\nbefore she says 'I Do'", defaultFooter: "Hosted by [Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'bridal-elegant',  name: 'Elegant',    bg: 'linear-gradient(135deg,#fdf6e3,#fef9f0)', pattern: DOT_PATTERN, textColor: '#44403c', accentColor: '#b45309', defaultHeading: "She's Getting Married! 💍", defaultBody: "Please join us for a\nBridal Shower in honor of\n[Bride's Name]", defaultFooter: "RSVP to [Contact]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'bridal-modern',   name: 'Modern',     bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', pattern: STRIPE_H, textColor: '#14532d', accentColor: '#059669', defaultHeading: "Bride-to-Be! 🌸", defaultBody: "[Bride's Name]\nis getting married!\nCome celebrate!", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── GENDER REVEAL ───────────────────────────────────────────────
  {
    id: 'gender-reveal',
    name: 'Gender Reveal',
    emoji: '🎀',
    slug: 'gender-reveal',
    description: 'Celebrate the big reveal with a fun and memorable gender reveal invitation.',
    color: 'from-purple-500', color2: 'to-pink-400',
    tags: ['gender reveal party', 'gender reveal invitation', 'baby gender reveal', 'pink or blue'],
    searches: 170000,
    templates: [
      { id: 'reveal-pink-blue', name: 'Pink or Blue', bg: 'linear-gradient(135deg,#fce7f3,#ede9fe)', pattern: DOT_PATTERN, textColor: '#6b21a8', accentColor: '#ec4899', defaultHeading: "Pink or Blue? 💗💙", defaultBody: "Join us to find out if\n[Parent Names]'s baby is\na boy or a girl!", defaultFooter: "Hosted by [Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'reveal-modern',    name: 'Modern',       bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', textColor: '#0f172a', accentColor: '#8b5cf6', defaultHeading: "The Big Reveal! 🎉", defaultBody: "[Parent Names]\nare revealing their\nbaby's gender!", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'reveal-confetti',  name: 'Confetti',     bg: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', pattern: STAR_PATTERN, textColor: '#701a75', accentColor: '#d946ef', defaultHeading: "Pop · Poof · Reveal! 🎊", defaultBody: "He or She?\nCome find out with us!", defaultFooter: "[Date] · [Time] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── RETIREMENT ──────────────────────────────────────────────────
  {
    id: 'retirement',
    name: 'Retirement',
    emoji: '🎉',
    slug: 'retirement',
    description: 'Honor a lifetime of work with a beautiful retirement party invitation.',
    color: 'from-amber-500', color2: 'to-yellow-400',
    tags: ['retirement party', 'retirement invitation', 'farewell party'],
    searches: 150000,
    templates: [
      { id: 'retire-gold', name: 'Golden Years', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', pattern: DOT_PATTERN, textColor: '#78350f', accentColor: '#f59e0b', defaultHeading: "Congratulations! 🎉", defaultBody: "Please join us in celebrating\n[Name]'s Retirement", defaultFooter: "Hosted by [Team / Family]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'retire-fun',  name: 'Fun',          bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', pattern: STRIPE_H, textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "They're Finally Free! 🥳", defaultBody: "[Name] is retiring!\nCome celebrate!", defaultFooter: "Date · Time · Venue", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'retire-class', name: 'Classy',      bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: DOT_PATTERN, textColor: '#fef9c3', accentColor: '#d97706', defaultHeading: "A Career Well Celebrated 🥂", defaultBody: "[Name] is retiring after\n[X] years of excellence", defaultFooter: "Formal dinner · RSVP", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── VALENTINE'S ─────────────────────────────────────────────────
  {
    id: 'valentines',
    name: "Valentine's Day",
    emoji: '❤️',
    slug: 'valentines',
    description: "Share the love with beautiful Valentine's Day cards and invitations.",
    color: 'from-red-500', color2: 'to-pink-500',
    tags: ["valentine's day", 'love card', 'romantic invitation', 'galentines'],
    searches: 220000,
    templates: [
      { id: 'val-romantic', name: 'Romantic',    bg: 'linear-gradient(135deg,#fff1f2,#fce7f3)', pattern: DOT_PATTERN, textColor: '#881337', accentColor: '#e11d48', defaultHeading: "Be My Valentine ❤️", defaultBody: "You make my heart smile.\nWill you be mine?", defaultFooter: "With love, [Your Name]", defaultDate: "February 14", defaultTime: "", defaultVenue: "" },
      { id: 'val-cute',     name: 'Galentines', bg: 'linear-gradient(135deg,#fce7f3,#f3e8ff)', pattern: DOT_PATTERN, textColor: '#6b21a8', accentColor: '#ec4899', defaultHeading: "Galentine's Party! 💕", defaultBody: "Celebrating friendship & love\nwith the best people", defaultFooter: "Date · Time · Location", defaultDate: "February 13", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'val-dinner',   name: 'Dinner Date', bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STAR_PATTERN, textColor: '#fecdd3', accentColor: '#f43f5e', defaultHeading: "Dinner For Two 🕯️", defaultBody: "An intimate Valentine's evening\njust for us", defaultFooter: "February 14 · [Restaurant]", defaultDate: "February 14", defaultTime: "[Time]", defaultVenue: "[Restaurant]" },
    ],
  },

  // ── HALLOWEEN ───────────────────────────────────────────────────
  {
    id: 'halloween',
    name: 'Halloween',
    emoji: '🎃',
    slug: 'halloween',
    description: 'Spooky and fun Halloween party invitations for all ages.',
    color: 'from-orange-500', color2: 'to-orange-400',
    tags: ['halloween party', 'spooky invitation', 'costume party', 'trick or treat'],
    searches: 200000,
    templates: [
      { id: 'halloween-spooky', name: 'Spooky',      bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STAR_PATTERN, textColor: '#fb923c', accentColor: '#f97316', defaultHeading: "If You Dare… 🎃", defaultBody: "You're Invited to a\nHalloween Party!", defaultFooter: "Costumes required", defaultDate: "October 31", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'halloween-fun',    name: 'Fun Kids',    bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', pattern: DOT_PATTERN, textColor: '#7c2d12', accentColor: '#ea580c', defaultHeading: "Boo! 🎃", defaultBody: "Trick or treat!\nCome in costume!", defaultFooter: "October 31 · [Time] · [Address]", defaultDate: "October 31", defaultTime: "[Time]", defaultVenue: "[Address]" },
      { id: 'halloween-witch',  name: 'Witch Night', bg: 'linear-gradient(135deg,#1a1a2e,#16213e)', pattern: STAR_PATTERN, textColor: '#c084fc', accentColor: '#a855f7', defaultHeading: "Witch's Gathering 🧙‍♀️", defaultBody: "Broomsticks at the door\nby midnight!", defaultFooter: "Oct 31 · [Time] · [Venue]", defaultDate: "October 31", defaultTime: "8:00 PM", defaultVenue: "[Venue]" },
    ],
  },

  // ── QUINCEAÑERA ─────────────────────────────────────────────────
  {
    id: 'quinceañera',
    name: 'Quinceañera',
    emoji: '👑',
    slug: 'quinceanera',
    description: 'Celebrate a quinceañera with a stunning, unforgettable invitation.',
    color: 'from-fuchsia-500', color2: 'to-pink-400',
    tags: ['quinceañera', 'quince', 'mis quince', '15th birthday invitation'],
    searches: 90000,
    templates: [
      { id: 'quince-royal', name: 'Royal',    bg: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', pattern: DOT_PATTERN, textColor: '#701a75', accentColor: '#d946ef', defaultHeading: "Mis Quince Años 👑", defaultBody: "Request the honor of your presence\nat the quinceañera of\n[Name]", defaultFooter: "RSVP · [Contact]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'quince-glam',  name: 'Glam',     bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STAR_PATTERN, textColor: '#f9a8d4', accentColor: '#ec4899', defaultHeading: "Quinceañera 🎀", defaultBody: "Celebrating 15 years of\n[Name]", defaultFooter: "Date · Venue · RSVP", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'quince-light', name: 'Soft Pink', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3,#fbcfe8)', pattern: DOT_PATTERN, textColor: '#831843', accentColor: '#f43f5e', defaultHeading: "XV Años 🌸", defaultBody: "[Name]\ncelebrates her 15th birthday", defaultFooter: "[Date] · [Venue]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── EID ─────────────────────────────────────────────────────────
  {
    id: 'eid',
    name: 'Eid',
    emoji: '🌙',
    slug: 'eid',
    description: 'Beautiful Eid Mubarak invitations and greeting cards for family and friends.',
    color: 'from-emerald-600', color2: 'to-teal-500',
    tags: ['eid mubarak', 'eid party', 'eid al fitr', 'eid al adha', 'eid invitation'],
    searches: 120000,
    templates: [
      { id: 'eid-classic',   name: 'Classic Green', bg: 'linear-gradient(135deg,#064e3b,#065f46)', pattern: STAR_PATTERN, textColor: '#d1fae5', accentColor: '#34d399', defaultHeading: "Eid Mubarak 🌙", defaultBody: "You are warmly invited\nto celebrate Eid with us", defaultFooter: "Hosted by [Family Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'eid-modern',    name: 'Modern',        bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', pattern: STRIPE_H, textColor: '#14532d', accentColor: '#059669', defaultHeading: "Eid Mubarak 🌙", defaultBody: "Wishing you and your family\nEid filled with joy & blessings", defaultFooter: "From [Your Family Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'eid-gold',      name: 'Gold & Green',  bg: 'linear-gradient(135deg,#1a2e1a,#1c3520)', pattern: STAR_PATTERN, textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "Eid Mubarak ✨", defaultBody: "May this Eid bring peace,\njoy, and blessings to all", defaultFooter: "Celebrate with [Family Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
    ],
  },

  // ── DIWALI ──────────────────────────────────────────────────────
  {
    id: 'diwali',
    name: 'Diwali',
    emoji: '🪔',
    slug: 'diwali',
    description: 'Illuminate your celebrations with vibrant Diwali invitation cards.',
    color: 'from-amber-400', color2: 'to-orange-500',
    tags: ['diwali invitation', 'diwali party', 'deepawali', 'festival of lights'],
    searches: 100000,
    templates: [
      { id: 'diwali-vibrant', name: 'Vibrant',    bg: 'linear-gradient(135deg,#7c2d12,#92400e)', pattern: STAR_PATTERN, textColor: '#fef9c3', accentColor: '#f59e0b', defaultHeading: "Happy Diwali! 🪔", defaultBody: "You are invited to celebrate\nthe Festival of Lights with us", defaultFooter: "Hosted by [Family Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'diwali-modern',  name: 'Modern',     bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', pattern: DOT_PATTERN, textColor: '#92400e', accentColor: '#d97706', defaultHeading: "Diwali Celebration 🪔", defaultBody: "Join us for sweets, lights,\nand togetherness", defaultFooter: "Date · Venue · RSVP", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'diwali-royal',   name: 'Royal Dark', bg: 'linear-gradient(135deg,#1c1917,#292524)', pattern: STAR_PATTERN, textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "शुभ दीपावली 🪔", defaultBody: "A Diwali Celebration\nhosted by [Family Name]", defaultFooter: "Sweets · Fireworks · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── HOUSEWARMING ────────────────────────────────────────────────
  {
    id: 'housewarming',
    name: 'Housewarming',
    emoji: '🏠',
    slug: 'housewarming',
    description: 'Welcome guests to your new home with a warm, beautiful invitation.',
    color: 'from-teal-500', color2: 'to-cyan-400',
    tags: ['housewarming party', 'new home', 'open house invitation', 'moving party'],
    searches: 130000,
    templates: [
      { id: 'house-warm',   name: 'Warm',    bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', pattern: DOT_PATTERN, textColor: '#7c2d12', accentColor: '#ea580c', defaultHeading: "We've Moved! 🏠", defaultBody: "Please come warm our new home\nwith your presence", defaultFooter: "Light bites & drinks provided", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[New Address]" },
      { id: 'house-modern', name: 'Modern',  bg: 'linear-gradient(135deg,#f0fdfa,#ccfbf1)', pattern: STRIPE_H, textColor: '#134e4a', accentColor: '#0d9488', defaultHeading: "Housewarming Party 🎉", defaultBody: "[Your Name]\nis hosting a housewarming!", defaultFooter: "RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Address]" },
      { id: 'house-minimal', name: 'Minimal', bg: '#f9fafb', textColor: '#111827', accentColor: '#374151', defaultHeading: "New Home. New Memories.", defaultBody: "[Your Names]\ncordially invite you\nto celebrate their new home", defaultFooter: "[Date] · [Address]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Address]" },
    ],
  },

  // ── GET WELL SOON ───────────────────────────────────────────────
  {
    id: 'get-well',
    name: 'Get Well Soon',
    emoji: '🌻',
    slug: 'get-well',
    description: 'Send warm wishes and a speedy recovery with a heartfelt get well card.',
    color: 'from-yellow-400', color2: 'to-green-400',
    tags: ['get well soon card', 'get well card', 'speedy recovery', 'feel better card'],
    searches: 160000,
    templates: [
      { id: 'getwell-sunny',  name: 'Sunny',   bg: 'linear-gradient(135deg,#fef9c3,#fef3c7)', pattern: DOT_PATTERN, textColor: '#713f12', accentColor: '#d97706', defaultHeading: "Get Well Soon 🌻", defaultBody: "Sending you sunshine and love.\nWishing you a speedy recovery!", defaultFooter: "Warmly, [Your Name]", defaultDate: "", defaultTime: "", defaultVenue: "" },
      { id: 'getwell-floral', name: 'Floral',  bg: 'linear-gradient(135deg,#d1fae5,#a7f3d0)', pattern: STRIPE_H, textColor: '#064e3b', accentColor: '#059669', defaultHeading: "Feel Better Soon 🌸", defaultBody: "You are stronger than you know.\nWe're all rooting for you!", defaultFooter: "With love, [Your Name]", defaultDate: "", defaultTime: "", defaultVenue: "" },
      { id: 'getwell-warm',   name: 'Warm',    bg: 'linear-gradient(135deg,#fff1f2,#fce7f3)', pattern: DOT_PATTERN, textColor: '#881337', accentColor: '#e11d48', defaultHeading: "Thinking of You 💗", defaultBody: "Sending healing thoughts\nand warm wishes your way.", defaultFooter: "[Your Name]", defaultDate: "", defaultTime: "", defaultVenue: "" },
    ],
  },
  // ── ENGAGEMENT PARTY ────────────────────────────────────────────
  {
    id: 'engagement',
    name: 'Engagement Party',
    emoji: '💍',
    slug: 'engagement',
    description: 'Celebrate your "yes!" with a stunning engagement party invitation.',
    color: 'from-rose-500', color2: 'to-pink-400',
    tags: ['engagement party', 'engagement invitation', 'engaged', 'proposal party'],
    searches: 240000,
    templates: [
      { id: 'eng-romantic', name: 'Romantic', bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8,#ffe4e6)', pattern: DOT_PATTERN, textColor: '#9d174d', accentColor: '#e11d48', defaultHeading: "We Said Yes! 💍", defaultBody: "[Name] & [Name]\nare engaged!\nJoin us to celebrate!", defaultFooter: "RSVP by [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'eng-elegant', name: 'Elegant', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', pattern: DOT_PATTERN, textColor: '#4c1d95', accentColor: '#7c3aed', defaultHeading: "We're Engaged!", defaultBody: "[Partner 1] & [Partner 2]\nrequest the pleasure of your company", defaultFooter: "Cocktails & Celebrations · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'eng-dark', name: 'Dark Romance', bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', pattern: STAR_PATTERN, textColor: '#e0e7ff', accentColor: '#818cf8', defaultHeading: "She Said Yes! ✨", defaultBody: "Celebrate with [Partner 1] & [Partner 2]\non their engagement", defaultFooter: "Dress code: Cocktail", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── KIDS PARTY ──────────────────────────────────────────────────
  {
    id: 'kids-party',
    name: "Kids Party",
    emoji: '🎈',
    slug: 'kids-party',
    description: 'Fun and colourful party invitations to delight every little guest.',
    color: 'from-yellow-400', color2: 'to-orange-400',
    tags: ['kids birthday party', 'childrens party', 'kids invitation', 'party for kids'],
    searches: 310000,
    templates: [
      { id: 'kids-rainbow', name: 'Rainbow', bg: 'linear-gradient(135deg,#fef9c3,#fce7f3,#dbeafe)', pattern: DOT_PATTERN, textColor: '#1e40af', accentColor: '#f59e0b', defaultHeading: "Party Time! 🎈", defaultBody: "[Child's Name] is turning [Age]!\nCome join the fun!", defaultFooter: "RSVP to [Parent's Name]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'kids-superhero', name: 'Superhero', bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)', pattern: STRIPE_D, textColor: '#eff6ff', accentColor: '#fbbf24', defaultHeading: "Superhero Alert! 🦸", defaultBody: "[Name] is turning [Age] — assemble!", defaultFooter: "Capes welcome · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'kids-unicorn', name: 'Unicorn', bg: 'linear-gradient(135deg,#fae8ff,#ffe4e6,#dbeafe)', pattern: DOT_PATTERN, textColor: '#7e22ce', accentColor: '#ec4899', defaultHeading: "Unicorn Party! 🦄✨", defaultBody: "You're magically invited to\n[Name]'s birthday bash!", defaultFooter: "Bring your sparkle · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
    ],
  },

  // ── FAREWELL ────────────────────────────────────────────────────
  {
    id: 'farewell',
    name: 'Farewell Party',
    emoji: '✈️',
    slug: 'farewell',
    description: 'Send someone off in style with a heartfelt farewell card or invitation.',
    color: 'from-sky-500', color2: 'to-blue-400',
    tags: ['farewell party', 'going away party', 'bon voyage', 'goodbye party'],
    searches: 95000,
    templates: [
      { id: 'farewell-adventure', name: 'Adventure', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe)', pattern: STRIPE_H, textColor: '#1e40af', accentColor: '#3b82f6', defaultHeading: "Bon Voyage! ✈️", defaultBody: "We're saying see you later to\n[Name]!\nJoin us for a farewell celebration", defaultFooter: "Let's give them a great send-off!", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'farewell-warm', name: 'Warm & Heartfelt', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', pattern: DOT_PATTERN, textColor: '#7c2d12', accentColor: '#ea580c', defaultHeading: "Until We Meet Again 💛", defaultBody: "Farewell [Name]!\nYou will be deeply missed.", defaultFooter: "Come celebrate the journey ahead", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Location]" },
      { id: 'farewell-dark', name: 'Dark & Bold', bg: 'linear-gradient(135deg,#0f172a,#1e293b)', pattern: STAR_PATTERN, textColor: '#e2e8f0', accentColor: '#38bdf8', defaultHeading: "New Chapter Awaits 🌟", defaultBody: "Raising a glass to [Name]\nas they embark on their next adventure", defaultFooter: "Come for the stories · Stay for the hugs", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // ── CORPORATE EVENT ─────────────────────────────────────────────
  {
    id: 'corporate',
    name: 'Corporate Event',
    emoji: '💼',
    slug: 'corporate',
    description: 'Professional event invitations for conferences, launches, and business gatherings.',
    color: 'from-slate-600', color2: 'to-slate-500',
    tags: ['corporate event', 'business invitation', 'conference invite', 'product launch'],
    searches: 180000,
    templates: [
      { id: 'corp-sleek', name: 'Sleek Pro', bg: 'linear-gradient(135deg,#0f172a,#1e293b)', pattern: STRIPE_D, textColor: '#f8fafc', accentColor: '#818cf8', defaultHeading: "You're Invited", defaultBody: "[Company Name]\npresents [Event Name]", defaultFooter: "Business Formal · [Location]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue / Conference Center]" },
      { id: 'corp-clean', name: 'Clean White', bg: '#f8fafc', textColor: '#0f172a', accentColor: '#4F46E5', defaultHeading: "[Event Name]", defaultBody: "[Company Name] cordially invites\nyou to join us at [Event]", defaultFooter: "RSVP required · [Contact]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
      { id: 'corp-launch', name: 'Launch Night', bg: 'linear-gradient(135deg,#1e1b4b,#312e81)', pattern: STAR_PATTERN, textColor: '#e0e7ff', accentColor: '#a5b4fc', defaultHeading: "Product Launch 🚀", defaultBody: "[Company] invites you to\nexperience [Product Name]", defaultFooter: "VIP Preview · [Date]", defaultDate: "[Date]", defaultTime: "[Time]", defaultVenue: "[Venue]" },
    ],
  },

  // -- FOURTH OF JULY -------------------------------------------------------
  {
    id: 'fourth-of-july',
    name: 'Fourth of July',
    emoji: '🇺🇸',
    slug: 'fourth-of-july',
    description: 'Patriotic Fourth of July invitations for backyard cookouts, fireworks, and summer celebrations.',
    color: 'from-red-600', color2: 'to-blue-600',
    tags: ['fourth of july invitation', '4th of july party', 'independence day party', 'patriotic invitation'],
    searches: 140000,
    templates: [
      { id: 'july-stars', name: 'Stars & Stripes', bg: 'linear-gradient(135deg,#1d4ed8,#2563eb,#dc2626)', pattern: STAR_PATTERN, textColor: '#eff6ff', accentColor: '#fbbf24', defaultHeading: 'Fourth of July Party', defaultBody: 'Join us for food, fireworks,\nand summer fun', defaultFooter: 'Bring a lawn chair and festive spirit', defaultDate: 'July 4, [Year]', defaultTime: '5:00 PM', defaultVenue: '[Address]' },
      { id: 'july-bbq', name: 'Backyard BBQ', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5,#dbeafe)', pattern: STRIPE_H, textColor: '#7c2d12', accentColor: '#dc2626', defaultHeading: "You're Invited", defaultBody: 'Celebrate Independence Day\nwith a backyard BBQ', defaultFooter: 'RSVP by [Date]', defaultDate: 'July 4, [Year]', defaultTime: '3:00 PM', defaultVenue: '[Backyard / Park]' },
      { id: 'july-night', name: 'Fireworks Night', bg: 'linear-gradient(135deg,#0f172a,#1e3a8a,#7f1d1d)', pattern: STAR_PATTERN, textColor: '#f8fafc', accentColor: '#f59e0b', defaultHeading: 'Fireworks & Friends', defaultBody: 'Come celebrate the Fourth\nunder the night sky', defaultFooter: 'Snacks, sparklers, and good company', defaultDate: 'July 4, [Year]', defaultTime: '8:00 PM', defaultVenue: '[Venue]' },
    ],
  },

  // -- THANKSGIVING ---------------------------------------------------------
  {
    id: 'thanksgiving',
    name: 'Thanksgiving',
    emoji: '🦃',
    slug: 'thanksgiving',
    description: 'Warm Thanksgiving invitations for Friendsgiving dinners, family meals, and autumn gatherings.',
    color: 'from-orange-600', color2: 'to-amber-500',
    tags: ['thanksgiving invitation', 'friendsgiving invite', 'thanksgiving dinner invitation', 'fall party invitation'],
    searches: 165000,
    templates: [
      { id: 'thanks-harvest', name: 'Harvest Table', bg: 'linear-gradient(135deg,#7c2d12,#b45309,#f59e0b)', pattern: DOT_PATTERN, textColor: '#fffbeb', accentColor: '#fcd34d', defaultHeading: 'Thanksgiving Dinner', defaultBody: 'Gather with us for a cozy\nevening of gratitude', defaultFooter: 'Please RSVP by [Date]', defaultDate: '[Date]', defaultTime: '6:00 PM', defaultVenue: '[Home Address]' },
      { id: 'thanks-friendsgiving', name: 'Friendsgiving', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5,#fef3c7)', pattern: STRIPE_D, textColor: '#7c2d12', accentColor: '#d97706', defaultHeading: 'Friendsgiving Feast', defaultBody: 'Good food, great people,\nand a table full of thanks', defaultFooter: 'Bring your favorite dish if you like', defaultDate: '[Date]', defaultTime: '7:00 PM', defaultVenue: '[Location]' },
      { id: 'thanks-modern', name: 'Modern Autumn', bg: 'linear-gradient(135deg,#f8fafc,#fef3c7,#fed7aa)', textColor: '#431407', accentColor: '#ea580c', defaultHeading: 'Give Thanks Together', defaultBody: 'You are invited to a\nThanksgiving celebration', defaultFooter: 'Family dinner and dessert to follow', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },

  // -- EASTER ---------------------------------------------------------------
  {
    id: 'easter',
    name: 'Easter',
    emoji: '🐣',
    slug: 'easter',
    description: 'Bright Easter invitations for brunches, egg hunts, spring lunches, and family celebrations.',
    color: 'from-pink-400', color2: 'to-yellow-300',
    tags: ['easter invitation', 'easter brunch invitation', 'easter egg hunt invite', 'spring celebration invitation'],
    searches: 150000,
    templates: [
      { id: 'easter-pastel', name: 'Pastel Garden', bg: 'linear-gradient(135deg,#fdf2f8,#fef9c3,#d1fae5)', pattern: DOT_PATTERN, textColor: '#9d174d', accentColor: '#16a34a', defaultHeading: 'Happy Easter', defaultBody: 'Join us for an Easter\ncelebration with family and friends', defaultFooter: 'Brunch, treats, and egg hunt fun', defaultDate: '[Date]', defaultTime: '11:00 AM', defaultVenue: '[Venue]' },
      { id: 'easter-brunch', name: 'Spring Brunch', bg: 'linear-gradient(135deg,#ecfeff,#e0f2fe,#fef3c7)', pattern: STRIPE_H, textColor: '#155e75', accentColor: '#f59e0b', defaultHeading: 'Easter Brunch', defaultBody: 'Celebrate spring with us\nat our Easter table', defaultFooter: 'RSVP to [Contact]', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Home / Cafe]' },
      { id: 'easter-kids', name: 'Egg Hunt', bg: 'linear-gradient(135deg,#dbeafe,#fae8ff,#fef9c3)', pattern: DOT_PATTERN, textColor: '#1e3a8a', accentColor: '#9333ea', defaultHeading: 'Easter Egg Hunt', defaultBody: 'Baskets ready.\nLet the hunt begin', defaultFooter: 'Fun for kids and families', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Park / Garden]' },
    ],
  },

  // -- MOTHER'S DAY ---------------------------------------------------------
  {
    id: 'mothers-day',
    name: "Mother's Day",
    emoji: '🌷',
    slug: 'mothers-day',
    description: "Thoughtful Mother's Day cards and invitations for brunches, lunches, and family celebrations.",
    color: 'from-rose-400', color2: 'to-pink-400',
    tags: ["mother's day card", "mother's day invitation", 'mothers day brunch invite', 'family lunch invitation'],
    searches: 210000,
    templates: [
      { id: 'mothers-floral', name: 'Floral Brunch', bg: 'linear-gradient(135deg,#fff1f2,#fce7f3,#fdf2f8)', pattern: DOT_PATTERN, textColor: '#9f1239', accentColor: '#ec4899', defaultHeading: "Mother's Day Brunch", defaultBody: 'Celebrate the amazing moms\nwho make every day brighter', defaultFooter: 'Please join us with love', defaultDate: '[Date]', defaultTime: '11:30 AM', defaultVenue: '[Venue]' },
      { id: 'mothers-garden', name: 'Garden Lunch', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7,#fee2e2)', pattern: STRIPE_H, textColor: '#166534', accentColor: '#f43f5e', defaultHeading: 'With Love for Mom', defaultBody: 'Join us for a warm family\nMother\'s Day gathering', defaultFooter: 'RSVP by [Date]', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Home / Garden]' },
      { id: 'mothers-photo', name: 'Elegant Tribute', bg: '#fffafc', textColor: '#4c1d95', accentColor: '#db2777', defaultHeading: 'Celebrating Mom', defaultBody: 'A special day for the heart\nof our family', defaultFooter: 'Date · Time · Venue', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },

  // -- FATHER'S DAY ---------------------------------------------------------
  {
    id: 'fathers-day',
    name: "Father's Day",
    emoji: '🛠️',
    slug: 'fathers-day',
    description: "Father's Day cards and invitations for BBQs, lunches, game nights, and family get-togethers.",
    color: 'from-slate-600', color2: 'to-blue-500',
    tags: ["father's day card", "father's day invitation", 'fathers day bbq invite', 'family gathering invitation'],
    searches: 170000,
    templates: [
      { id: 'fathers-bbq', name: 'Dad BBQ', bg: 'linear-gradient(135deg,#1f2937,#374151,#1d4ed8)', pattern: STRIPE_D, textColor: '#f8fafc', accentColor: '#f59e0b', defaultHeading: "Father's Day BBQ", defaultBody: 'Fire up the grill.\nLet\'s celebrate Dad together', defaultFooter: 'Food, laughs, and family time', defaultDate: '[Date]', defaultTime: '2:00 PM', defaultVenue: '[Backyard]' },
      { id: 'fathers-classic', name: 'Classic Gathering', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe,#e2e8f0)', pattern: DOT_PATTERN, textColor: '#1e3a8a', accentColor: '#475569', defaultHeading: 'Celebrating Dad', defaultBody: 'Please join us for a\nFather\'s Day celebration', defaultFooter: 'RSVP to [Contact]', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
      { id: 'fathers-sports', name: 'Game Day', bg: 'linear-gradient(135deg,#052e16,#166534,#15803d)', pattern: STRIPE_H, textColor: '#ecfdf5', accentColor: '#facc15', defaultHeading: 'Dad\'s Day Out', defaultBody: 'Join us for food, games,\nand a laid-back celebration', defaultFooter: 'Bring your team spirit', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },

  // -- BONFIRE NIGHT --------------------------------------------------------
  {
    id: 'bonfire-night',
    name: 'Bonfire Night',
    emoji: '🎆',
    slug: 'bonfire-night',
    description: 'Bonfire Night invitations for fireworks parties, community gatherings, and cozy autumn celebrations.',
    color: 'from-orange-500', color2: 'to-red-500',
    tags: ['bonfire night invitation', 'guy fawkes night invite', 'fireworks party invitation', 'autumn event invitation'],
    searches: 35000,
    templates: [
      { id: 'bonfire-fireworks', name: 'Fireworks Glow', bg: 'linear-gradient(135deg,#111827,#1e3a8a,#7f1d1d)', pattern: STAR_PATTERN, textColor: '#f8fafc', accentColor: '#f59e0b', defaultHeading: 'Bonfire Night', defaultBody: 'Wrap up warm and join us\nfor fireworks and bonfire fun', defaultFooter: 'Hot drinks and snacks provided', defaultDate: 'November 5, [Year]', defaultTime: '6:30 PM', defaultVenue: '[Venue]' },
      { id: 'bonfire-cozy', name: 'Cozy Autumn', bg: 'linear-gradient(135deg,#fff7ed,#fed7aa,#fecaca)', pattern: DOT_PATTERN, textColor: '#7c2d12', accentColor: '#dc2626', defaultHeading: 'Fireworks Gathering', defaultBody: 'A crisp evening of sparks,\nstories, and celebration', defaultFooter: 'RSVP by [Date]', defaultDate: 'November 5, [Year]', defaultTime: '[Time]', defaultVenue: '[Location]' },
      { id: 'bonfire-community', name: 'Community Night', bg: 'linear-gradient(135deg,#312e81,#1e293b,#ea580c)', pattern: STAR_PATTERN, textColor: '#eef2ff', accentColor: '#fb7185', defaultHeading: 'Join Our Bonfire Night', defaultBody: 'Celebrate Bonfire Night\nwith neighbors, friends, and family', defaultFooter: 'Please arrive before the fireworks', defaultDate: 'November 5, [Year]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },

  // -- OKTOBERFEST ----------------------------------------------------------
  {
    id: 'oktoberfest',
    name: 'Oktoberfest',
    emoji: '🍺',
    slug: 'oktoberfest',
    description: 'Festive Oktoberfest invitations for beer nights, themed dinners, and autumn parties.',
    color: 'from-blue-600', color2: 'to-amber-500',
    tags: ['oktoberfest invitation', 'beer festival invite', 'oktoberfest party invitation', 'autumn party invite'],
    searches: 48000,
    templates: [
      { id: 'oktoberfest-bavarian', name: 'Bavarian Blue', bg: 'linear-gradient(135deg,#1d4ed8,#2563eb,#f8fafc)', pattern: CROSS, textColor: '#eff6ff', accentColor: '#f59e0b', defaultHeading: 'Oktoberfest Party', defaultBody: 'Raise a glass and join us\nfor an Oktoberfest celebration', defaultFooter: 'Food, music, and festive cheer', defaultDate: '[Date]', defaultTime: '7:00 PM', defaultVenue: '[Venue]' },
      { id: 'oktoberfest-tavern', name: 'Tavern Night', bg: 'linear-gradient(135deg,#78350f,#92400e,#f59e0b)', pattern: STRIPE_D, textColor: '#fffbeb', accentColor: '#60a5fa', defaultHeading: 'Prost!', defaultBody: 'Come celebrate with brews,\nbites, and good company', defaultFooter: 'Traditional dress welcome', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Hall / Garden]' },
      { id: 'oktoberfest-modern', name: 'Modern Fest', bg: 'linear-gradient(135deg,#eff6ff,#dbeafe,#fef3c7)', textColor: '#1e3a8a', accentColor: '#d97706', defaultHeading: 'Oktoberfest Gathering', defaultBody: 'You are invited to an\nautumn party with Oktoberfest flair', defaultFooter: 'RSVP to [Contact]', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },

  // -- MIDSUMMER ------------------------------------------------------------
  {
    id: 'midsummer',
    name: 'Midsummer',
    emoji: '🌼',
    slug: 'midsummer',
    description: 'Light-filled Midsummer invitations for garden parties, picnics, and summer gatherings across Europe.',
    color: 'from-yellow-400', color2: 'to-emerald-400',
    tags: ['midsummer invitation', 'summer solstice party', 'garden party invitation', 'picnic invitation'],
    searches: 22000,
    templates: [
      { id: 'midsummer-garden', name: 'Garden Light', bg: 'linear-gradient(135deg,#fef9c3,#d9f99d,#bbf7d0)', pattern: DOT_PATTERN, textColor: '#365314', accentColor: '#16a34a', defaultHeading: 'Midsummer Celebration', defaultBody: 'Join us for flowers, food,\nand a long summer evening', defaultFooter: 'Bring a blanket and your best stories', defaultDate: '[Date]', defaultTime: '5:30 PM', defaultVenue: '[Garden / Park]' },
      { id: 'midsummer-picnic', name: 'Picnic Party', bg: 'linear-gradient(135deg,#ecfccb,#dcfce7,#e0f2fe)', pattern: STRIPE_H, textColor: '#166534', accentColor: '#0ea5e9', defaultHeading: 'Summer Solstice Picnic', defaultBody: 'Celebrate the season\nwith us outdoors', defaultFooter: 'RSVP by [Date]', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Park / Lakeside]' },
      { id: 'midsummer-evening', name: 'Evening Glow', bg: 'linear-gradient(135deg,#fef3c7,#fde68a,#fca5a5)', pattern: DOT_PATTERN, textColor: '#7c2d12', accentColor: '#db2777', defaultHeading: 'Midsummer Night', defaultBody: 'An evening of music,\nflowers, and shared plates', defaultFooter: 'Friends and family welcome', defaultDate: '[Date]', defaultTime: '[Time]', defaultVenue: '[Venue]' },
    ],
  },
];

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find(o => o.slug === slug);
}

export const ALL_SLUGS = OCCASIONS.map(o => o.slug);
