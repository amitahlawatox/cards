export interface Occasion {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  description: string;
  color: string;        // tailwind gradient from-color
  color2: string;       // tailwind gradient to-color
  tags: string[];
  searches: number;     // approx monthly searches
  templates: CardTemplate[];
}

export interface CardTemplate {
  id: string;
  name: string;
  bg: string;           // CSS background
  textColor: string;
  accentColor: string;
  defaultHeading: string;
  defaultBody: string;
  defaultFooter: string;
}

export const OCCASIONS: Occasion[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    slug: 'birthday',
    description: 'Beautiful birthday invitations and cards for every age and style.',
    color: 'from-pink-500',
    color2: 'to-rose-400',
    tags: ['birthday party', 'kids birthday', 'adult birthday', 'milestone birthday'],
    searches: 1200000,
    templates: [
      { id: 'birthday-floral', name: 'Floral', bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', textColor: '#831843', accentColor: '#ec4899', defaultHeading: "You're Invited!", defaultBody: "Please join us to celebrate\n[Name]'s Birthday", defaultFooter: "Date · Time · Location" },
      { id: 'birthday-bold', name: 'Bold & Fun', bg: 'linear-gradient(135deg,#fef9c3,#fef08a)', textColor: '#713f12', accentColor: '#f59e0b', defaultHeading: "Let's Party!", defaultBody: "[Name] is turning [Age]!\nCome celebrate with us", defaultFooter: "Date · Time · Location" },
      { id: 'birthday-elegant', name: 'Elegant', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', textColor: '#4c1d95', accentColor: '#7c3aed', defaultHeading: "You Are Cordially Invited", defaultBody: "To celebrate the birthday of\n[Name]", defaultFooter: "RSVP by [Date]" },
      { id: 'birthday-minimal', name: 'Minimal', bg: '#ffffff', textColor: '#0f172a', accentColor: '#6366f1', defaultHeading: "Happy Birthday", defaultBody: "[Name] · [Age] Years", defaultFooter: "Join us on [Date]" },
    ],
  },
  {
    id: 'wedding',
    name: 'Wedding',
    emoji: '💍',
    slug: 'wedding',
    description: 'Elegant wedding invitations that set the tone for your perfect day.',
    color: 'from-rose-400',
    color2: 'to-pink-300',
    tags: ['wedding invitation', 'wedding card', 'marriage invitation', 'bridal'],
    searches: 600000,
    templates: [
      { id: 'wedding-classic', name: 'Classic', bg: 'linear-gradient(135deg,#fdf6e3,#fef9f0)', textColor: '#44403c', accentColor: '#b45309', defaultHeading: "Together With Their Families", defaultBody: "[Partner 1] & [Partner 2]\nRequest the pleasure of your company", defaultFooter: "Date · Venue · Time" },
      { id: 'wedding-modern', name: 'Modern', bg: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', textColor: '#0f172a', accentColor: '#ec4899', defaultHeading: "We're Getting Married", defaultBody: "[Partner 1] & [Partner 2]", defaultFooter: "[Date] · [Venue]" },
      { id: 'wedding-floral', name: 'Floral', bg: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', textColor: '#831843', accentColor: '#f43f5e', defaultHeading: "Save The Date", defaultBody: "[Partner 1]\n&\n[Partner 2]", defaultFooter: "[Date] · [City]" },
    ],
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    emoji: '👶',
    slug: 'baby-shower',
    description: 'Sweet and adorable baby shower invitations for your little one.',
    color: 'from-sky-400',
    color2: 'to-blue-300',
    tags: ['baby shower', 'gender reveal', 'baby sprinkle', 'newborn'],
    searches: 400000,
    templates: [
      { id: 'baby-sweet', name: 'Sweet', bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', textColor: '#0c4a6e', accentColor: '#0284c7', defaultHeading: "Baby Shower", defaultBody: "Please join us to celebrate\nthe upcoming arrival of\n[Baby Name]", defaultFooter: "Date · Time · Location" },
      { id: 'baby-neutral', name: 'Neutral', bg: 'linear-gradient(135deg,#fef3c7,#fde68a)', textColor: '#78350f', accentColor: '#d97706', defaultHeading: "A Baby Is On The Way!", defaultBody: "Join us in celebrating\n[Parent Names]", defaultFooter: "RSVP by [Date]" },
      { id: 'baby-girl', name: 'Girl', bg: 'linear-gradient(135deg,#fce7f3,#fbcfe8)', textColor: '#831843', accentColor: '#ec4899', defaultHeading: "It's A Girl!", defaultBody: "Baby Shower for\n[Mom's Name]", defaultFooter: "Date · Time · Location" },
      { id: 'baby-boy', name: 'Boy', bg: 'linear-gradient(135deg,#dbeafe,#bfdbfe)', textColor: '#1e3a8a', accentColor: '#3b82f6', defaultHeading: "It's A Boy!", defaultBody: "Baby Shower for\n[Mom's Name]", defaultFooter: "Date · Time · Location" },
    ],
  },
  {
    id: 'graduation',
    name: 'Graduation',
    emoji: '🎓',
    slug: 'graduation',
    description: 'Celebrate academic achievements with stunning graduation invitations.',
    color: 'from-indigo-500',
    color2: 'to-blue-400',
    tags: ['graduation party', 'grad invite', 'class of 2025', 'high school graduation'],
    searches: 280000,
    templates: [
      { id: 'grad-gold', name: 'Gold & Navy', bg: 'linear-gradient(135deg,#1e3a8a,#1e40af)', textColor: '#fbbf24', accentColor: '#f59e0b', defaultHeading: "Class of 2025", defaultBody: "Please join us as we celebrate\n[Name]'s Graduation", defaultFooter: "Date · Time · Location" },
      { id: 'grad-modern', name: 'Modern', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "I Did It!", defaultBody: "[Name] has graduated from\n[School Name]", defaultFooter: "Celebration on [Date]" },
    ],
  },
  {
    id: 'christmas',
    name: 'Christmas',
    emoji: '🎄',
    slug: 'christmas',
    description: 'Festive Christmas party invitations and holiday greeting cards.',
    color: 'from-red-600',
    color2: 'to-green-600',
    tags: ['christmas party', 'holiday party', 'christmas invitation', 'xmas card'],
    searches: 350000,
    templates: [
      { id: 'xmas-classic', name: 'Classic', bg: 'linear-gradient(135deg,#14532d,#166534)', textColor: '#fef9c3', accentColor: '#dc2626', defaultHeading: "You're Invited!", defaultBody: "Join us for a\nChristmas Party", defaultFooter: "Date · Time · Location" },
      { id: 'xmas-cozy', name: 'Cozy', bg: 'linear-gradient(135deg,#fef2f2,#fee2e2)', textColor: '#7f1d1d', accentColor: '#dc2626', defaultHeading: "Merry & Bright", defaultBody: "Celebrate the season with us!", defaultFooter: "Date · Time · Venue" },
    ],
  },
  {
    id: 'retirement',
    name: 'Retirement',
    emoji: '🎉',
    slug: 'retirement',
    description: 'Honor a lifetime of work with a beautiful retirement party invitation.',
    color: 'from-amber-500',
    color2: 'to-yellow-400',
    tags: ['retirement party', 'retirement invitation', 'farewell party'],
    searches: 150000,
    templates: [
      { id: 'retire-gold', name: 'Golden Years', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', textColor: '#78350f', accentColor: '#f59e0b', defaultHeading: "Congratulations!", defaultBody: "Please join us in celebrating\n[Name]'s Retirement", defaultFooter: "Date · Time · Location" },
      { id: 'retire-fun', name: 'Fun', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', textColor: '#14532d', accentColor: '#16a34a', defaultHeading: "They're Finally Free!", defaultBody: "[Name] is retiring!\nCome celebrate!", defaultFooter: "Date · Time · Venue" },
    ],
  },
  {
    id: 'valentines',
    name: "Valentine's Day",
    emoji: '❤️',
    slug: 'valentines',
    description: "Share the love with beautiful Valentine's Day cards and invitations.",
    color: 'from-red-500',
    color2: 'to-pink-500',
    tags: ["valentine's day", 'love card', 'romantic invitation', 'galentines'],
    searches: 220000,
    templates: [
      { id: 'val-romantic', name: 'Romantic', bg: 'linear-gradient(135deg,#fff1f2,#fce7f3)', textColor: '#881337', accentColor: '#e11d48', defaultHeading: "Be My Valentine", defaultBody: "You make my heart smile.\nWill you be mine?", defaultFooter: "With love, [Your Name]" },
      { id: 'val-cute', name: 'Cute', bg: 'linear-gradient(135deg,#fce7f3,#f3e8ff)', textColor: '#6b21a8', accentColor: '#ec4899', defaultHeading: "Galentine's Party!", defaultBody: "Celebrating friendship & love\nwith the best people", defaultFooter: "Date · Time · Location" },
    ],
  },
  {
    id: 'halloween',
    name: 'Halloween',
    emoji: '🎃',
    slug: 'halloween',
    description: 'Spooky and fun Halloween party invitations for all ages.',
    color: 'from-orange-500',
    color2: 'to-orange-400',
    tags: ['halloween party', 'spooky invitation', 'costume party', 'trick or treat'],
    searches: 200000,
    templates: [
      { id: 'halloween-spooky', name: 'Spooky', bg: 'linear-gradient(135deg,#1c1917,#292524)', textColor: '#fb923c', accentColor: '#f97316', defaultHeading: "If You Dare…", defaultBody: "You're Invited to a\nHalloween Party!", defaultFooter: "Date · Time · Location" },
      { id: 'halloween-fun', name: 'Fun', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', textColor: '#7c2d12', accentColor: '#ea580c', defaultHeading: "Boo! Halloween Party", defaultBody: "Dress up and come celebrate!", defaultFooter: "Date · Time · Venue" },
    ],
  },
  {
    id: 'quinceañera',
    name: 'Quinceañera',
    emoji: '👑',
    slug: 'quinceanera',
    description: 'Celebrate a quinceañera with a stunning, unforgettable invitation.',
    color: 'from-fuchsia-500',
    color2: 'to-pink-400',
    tags: ['quinceañera', 'quince', 'mis quince', '15th birthday invitation'],
    searches: 90000,
    templates: [
      { id: 'quince-royal', name: 'Royal', bg: 'linear-gradient(135deg,#fdf4ff,#fae8ff)', textColor: '#701a75', accentColor: '#d946ef', defaultHeading: "Mis Quince Años", defaultBody: "Request the honor of your presence\nat the quinceañera of\n[Name]", defaultFooter: "Date · Time · Venue" },
      { id: 'quince-glam', name: 'Glam', bg: 'linear-gradient(135deg,#fdf2f8,#fce7f3)', textColor: '#831843', accentColor: '#ec4899', defaultHeading: "Quinceañera", defaultBody: "Celebrating 15 years of\n[Name]", defaultFooter: "Date · Venue · RSVP" },
    ],
  },
  {
    id: 'eid',
    name: 'Eid',
    emoji: '🌙',
    slug: 'eid',
    description: 'Beautiful Eid Mubarak invitations and greeting cards for family and friends.',
    color: 'from-emerald-600',
    color2: 'to-teal-500',
    tags: ['eid mubarak', 'eid party', 'eid al fitr', 'eid al adha', 'eid invitation'],
    searches: 120000,
    templates: [
      { id: 'eid-classic', name: 'Classic', bg: 'linear-gradient(135deg,#064e3b,#065f46)', textColor: '#d1fae5', accentColor: '#34d399', defaultHeading: "Eid Mubarak", defaultBody: "You are warmly invited\nto celebrate Eid with us", defaultFooter: "Date · Time · Location" },
      { id: 'eid-modern', name: 'Modern', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', textColor: '#14532d', accentColor: '#059669', defaultHeading: "Eid Mubarak 🌙", defaultBody: "Wishing you and your family\nEid filled with joy & blessings", defaultFooter: "From [Your Family Name]" },
    ],
  },
  {
    id: 'diwali',
    name: 'Diwali',
    emoji: '🪔',
    slug: 'diwali',
    description: 'Illuminate your celebrations with vibrant Diwali invitation cards.',
    color: 'from-amber-400',
    color2: 'to-orange-500',
    tags: ['diwali invitation', 'diwali party', 'deepawali', 'festival of lights'],
    searches: 100000,
    templates: [
      { id: 'diwali-vibrant', name: 'Vibrant', bg: 'linear-gradient(135deg,#7c2d12,#92400e)', textColor: '#fef9c3', accentColor: '#f59e0b', defaultHeading: "Happy Diwali! 🪔", defaultBody: "You are invited to celebrate\nthe Festival of Lights with us", defaultFooter: "Date · Time · Location" },
      { id: 'diwali-modern', name: 'Modern', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', textColor: '#92400e', accentColor: '#d97706', defaultHeading: "Diwali Celebration", defaultBody: "Join us for sweets, lights,\nand togetherness", defaultFooter: "Date · Venue · RSVP" },
    ],
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    emoji: '🏠',
    slug: 'housewarming',
    description: 'Welcome guests to your new home with a warm, beautiful invitation.',
    color: 'from-teal-500',
    color2: 'to-cyan-400',
    tags: ['housewarming party', 'new home', 'open house invitation', 'moving party'],
    searches: 130000,
    templates: [
      { id: 'house-warm', name: 'Warm', bg: 'linear-gradient(135deg,#fff7ed,#ffedd5)', textColor: '#7c2d12', accentColor: '#ea580c', defaultHeading: "We've Moved!", defaultBody: "Please come warm our new home\nwith your presence", defaultFooter: "Address · Date · Time" },
      { id: 'house-modern', name: 'Modern', bg: 'linear-gradient(135deg,#f0fdfa,#ccfbf1)', textColor: '#134e4a', accentColor: '#0d9488', defaultHeading: "Housewarming Party", defaultBody: "[Your Name]\nis hosting a housewarming!", defaultFooter: "Date · Address · RSVP" },
    ],
  },
];

export function getOccasionBySlug(slug: string) {
  return OCCASIONS.find(o => o.slug === slug);
}

export const ALL_SLUGS = OCCASIONS.map(o => o.slug);
